import { getDB } from '@/libs/db';
import { bindingArticleListLikeStatus } from './article';
import { FeedRecord } from '@/types';

export interface FeedFilterOptions {
  before?: number;
  limit: number;
}

export interface FeedPagination {
  next?: string;
}

export async function getFeed(
  options: FeedFilterOptions,
  userId?: string
): Promise<{ data: FeedRecord[]; pagination: FeedPagination }> {
  const { before, limit } = options;
  const db = await getDB();

  const articles = await bindingArticleListLikeStatus(
    await db.query.article.findMany({
      where: (article, { and, lte, eq }) => {
        return and(
          lte(article.createdAt, before ? new Date(before) : new Date()),
          eq(article.approvedByAI, true),
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
      next: hasNextPage ? String(articles[articles.length - 1].createdAt.getTime()) : undefined,
    },
  };
}
