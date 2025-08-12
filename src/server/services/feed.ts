import { getDB, getDBFromEnvironment } from '@/libs/db';
import { bindingArticleListLikeStatus } from './article';
import { ArticlePreviewRecord, ArticleReviewStatus, FeedRecord } from '@/types';
import { bindingLikeStatus } from './likes';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { requestWorkerAnalytic } from '@/libs/wae';
import { z } from 'zod';

interface FeedCursor {
  type: 'trend' | 'latest';
  offset: number;
}

export interface FeedFilterOptions {
  type?: 'trend' | 'latest';
  before?: string;
  limit: number;
}

interface FeedCursorResponse {
  data: FeedRecord[];
  pagination: FeedPagination;
}

export interface FeedPagination {
  next?: string;
}

function encodeCursor(cursor: FeedCursor) {
  return Buffer.from(JSON.stringify(cursor), 'utf-8').toString('base64');
}

function decodeCursor(encodedCursor: string) {
  const json = Buffer.from(encodedCursor, 'base64').toString('utf8');
  return JSON.parse(json) as FeedCursor;
}

export async function getFeed(
  options: FeedFilterOptions,
  userId?: string
): Promise<FeedCursorResponse> {
  const decodedCursor = options.before ? decodeCursor(options.before) : undefined;
  const type = decodedCursor?.type ?? options.type;

  if (type === 'trend') {
    return getTrendingFeed(decodedCursor?.offset, options.limit, userId);
  } else {
    return getLatestFeed(decodedCursor?.offset, options.limit, userId);
  }
}

async function getLatestFeed(
  before: number | undefined,
  limit: number,
  userId?: string
): Promise<FeedCursorResponse> {
  const db = await getDB();

  const articles = await bindingArticleListLikeStatus(
    await db.query.article.findMany({
      where: (article, { and, lte, eq }) => {
        return and(
          lte(article.createdAt, before ? new Date(before) : new Date()),
          eq(article.reviewStatus, ArticleReviewStatus.Approved),
          eq(article.published, true)
        );
      },
      limit: limit + 1,
      orderBy: (article, { desc }) => desc(article.createdAt),
      with: {
        user: {
          with: {
            profile: true,
          },
        },
      },
    }),
    userId
  );

  const hasNextPage = articles.length > limit;
  const slicedArticles = hasNextPage ? articles.slice(0, limit) : articles;

  return {
    data: slicedArticles.map(article => ({
      id: article.id,
      type: 'article',
      createdAt: article.createdAt,
      data: article,
    })),
    pagination: {
      next: hasNextPage
        ? encodeCursor({
            type: 'latest',
            offset: articles[articles.length - 1].createdAt.getTime(),
          })
        : undefined,
    },
  };
}

export async function getTrendingFeed(
  before: number | undefined,
  limit: number,
  userId?: string
): Promise<FeedCursorResponse> {
  // Getting the trending article from KV
  const { env } = getCloudflareContext();
  const trendingArticles = await env.KV.get<string>(TRENDING_ARTICLE_KEY);
  if (!trendingArticles) {
    return { data: [], pagination: { next: undefined } };
  }

  try {
    const articleIds = z
      .array(
        z.object({
          id: z.string(),
          score: z.number(),
          freshScore: z.number(),
          viewScore: z.number(),
        })
      )
      .parse(JSON.parse(trendingArticles))
      .map(article => article.id);

    if (!Array.isArray(articleIds) || articleIds.length === 0) {
      return { data: [], pagination: { next: undefined } };
    }

    const offset = Number(before ?? 0);
    const slicedArticles = articleIds.slice(offset, offset + limit + 1);
    const db = await getDB();

    const articles = await bindingArticleListLikeStatus(
      await db.query.article.findMany({
        where: (article, { and, eq, inArray }) => {
          return and(
            eq(article.reviewStatus, ArticleReviewStatus.Approved),
            eq(article.published, true),
            inArray(article.id, slicedArticles)
          );
        },
        with: {
          user: {
            with: {
              profile: true,
            },
          },
        },
      }),
      userId
    );

    const sortedArticles = slicedArticles
      .map(id => articles.find(article => article.id === id))
      .filter(Boolean) as ArticlePreviewRecord[];

    return {
      data: sortedArticles
        .map(article => {
          return {
            id: article.id,
            type: 'article',
            createdAt: article.createdAt,
            data: article,
          } as FeedRecord;
        })
        .slice(0, limit),
      pagination: {
        next:
          articleIds.length > limit
            ? encodeCursor({
                type: 'trend',
                offset: offset + limit,
              })
            : undefined,
      },
    };
  } catch (error) {
    console.error('Failed to parse trending articles from KV:', error);
    return { data: [], pagination: { next: undefined } };
  }
}

export async function getFeedFromArticle(articleId: string, userId?: string) {
  const db = await getDB();

  const posts = await bindingLikeStatus(
    (
      await db.query.posts.findMany({
        where: (posts, { eq, isNull }) =>
          eq(posts.resourceType, 'article') &&
          (articleId == null ? isNull(posts.resourceId) : eq(posts.resourceId, articleId)),
        orderBy: (posts, { desc }) => desc(posts.createdAt),
        with: {
          user: {
            with: {
              profile: true,
            },
          },
        },
      })
    ).map(post => ({
      id: post.id,
      type: 'post',
      createdAt: post.createdAt,
      data: post,
    })),
    userId
  );

  return {
    data: posts,
    pagination: {
      next: undefined,
    },
  };
}

/**
 * Calculate trending articles based on various metrics and
 * mostly like cache the result for performance.
 */
export async function calculateTrending(env: CloudflareEnv) {
  console.log('Calculating trending articles...');

  const analyticsData = await requestWorkerAnalytic<{
    hour: string;
    articleId: string;
    pageview: number;
    uniqueVisitor: number;
  }>(
    `
    SELECT 
      toStartOfInterval(timestamp, INTERVAL '1' HOUR) AS hour,
      blob7 AS articleId,
      COUNT() AS pageview,
      COUNT(DISTINCT blob4) AS uniqueVisitor
    FROM profile_analytics
    WHERE blob1 = 'article' AND timestamp > NOW() - INTERVAL '3' DAY
    GROUP BY articleId, hour    
  `,
    { accountId: env.ACCOUNT_ID, token: env.WAE_TOKEN }
  );

  console.log('Got analytics data for trending articles:', analyticsData.length);

  const db = getDBFromEnvironment(env);

  const latestArticles = await db.query.article.findMany({
    where: (article, { eq }) => eq(article.reviewStatus, ArticleReviewStatus.Approved),
    orderBy: (article, { desc }) => desc(article.updatedAt),
    limit: 100,
  });

  console.log('Got latest articles for trending calculation:', latestArticles.length);

  const articleMap = new Map<string, { score: number; freshScore: number; viewScore: number }>();
  const decayDuration = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

  // Latest article will get max 100 score as a boost and it will decay over time 3 days.
  latestArticles.forEach(article => {
    const decayFactor = Math.max(0, (Date.now() - article.updatedAt.getTime()) / decayDuration);
    const decayFactorSquared = decayFactor * decayFactor; // Squared decay factor for more aggressive decay
    const score = Math.max(0, 100 - decayFactorSquared * 100);

    articleMap.set(article.id, { score: score, freshScore: score, viewScore: 0 });
  });

  // Using analytics data to add additional score
  for (const data of analyticsData) {
    const { articleId, pageview, uniqueVisitor } = data;

    // Calculate score based on pageview and unique visitor
    const decayFactor = Math.max(0, (Date.now() - new Date(data.hour).getTime()) / decayDuration);
    const decayFactorSquared = decayFactor * decayFactor; // Squared decay factor for more aggressive decay
    const score = Math.max(0, (pageview + uniqueVisitor) * (1 - decayFactorSquared));

    const found = articleMap.get(articleId);
    if (found) {
      found.score += score;
      found.viewScore += score;
    } else {
      articleMap.set(articleId, { score: score, freshScore: 0, viewScore: score });
    }
  }

  // Sort articles by score in descending order
  const sortedArticles = Array.from(articleMap.entries())
    .sort((a, b) => {
      const scoreA = a[1].score;
      const scoreB = b[1].score;
      return scoreB - scoreA;
    })
    .map(entry => ({ id: entry[0], ...entry[1] }));

  // Pushing all the threading article to KV
  console.log('Storing trending articles to KV:', sortedArticles.length);
  await env.KV.put(TRENDING_ARTICLE_KEY, JSON.stringify(sortedArticles));
}

const TRENDING_ARTICLE_KEY = 'trending_articles';
