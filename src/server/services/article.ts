import { getDB } from '@/libs/db';
import { ArticlePreviewRecord, ArticleRecord } from '@/types';
import { produce } from 'immer';

export async function bindingArticleListLikeStatus(
  articles: (ArticleRecord | ArticlePreviewRecord)[],
  userId?: string
) {
  if (!userId) {
    return articles;
  }

  const db = await getDB();
  const articleIds = articles.map(article => article.id);

  if (articleIds.length === 0) {
    return articles;
  }

  const likedArticles = await db.query.likes.findMany({
    where: (likes, { and, eq, inArray }) =>
      and(
        eq(likes.userId, userId),
        eq(likes.type, 'article'),
        inArray(likes.resourceId, articleIds)
      ),
    columns: {
      resourceId: true,
    },
  });

  const likedSet = new Set(likedArticles.map(like => like.resourceId));

  return produce(articles, draft => {
    for (const article of draft) {
      if (article.id && likedSet.has(article.id)) {
        (article as ArticleRecord).hasCurrentUserLiked = true;
      } else {
        (article as ArticleRecord).hasCurrentUserLiked = false;
      }
    }
  });
}

export async function bindingArticleLikeStatus(
  article: ArticleRecord,
  userId?: string
): Promise<ArticleRecord> {
  if (!userId) {
    return article;
  }

  const db = await getDB();

  const likedArticle = await db.query.likes.findFirst({
    where: (likes, { eq }) =>
      eq(likes.userId, userId) && eq(likes.type, 'article') && eq(likes.resourceId, article.id),
    columns: {
      resourceId: true,
    },
  });

  article.hasCurrentUserLiked = !!likedArticle;

  return article;
}
