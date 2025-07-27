import { getDB } from '@/libs/db';
import { bindingArticleListLikeStatus } from './article';
import { FeedRecord } from '@/types';

export interface FeedFilterOptions {
  before?: number;
  offset: number;
  limit: number;
}

export async function getFeed(
  options: FeedFilterOptions,
  userId?: string
): Promise<{ data: FeedRecord[] }> {
  const { before, offset, limit } = options;
  const db = await getDB();

  const articles = await bindingArticleListLikeStatus(
    await db.query.article.findMany({
      where: (article, { lte }) => {
        return before ? lte(article.createdAt, new Date(before)) : undefined;
      },
      limit,
      offset,
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

  return {
    data: articles.map(article => ({
      id: article.id,
      type: 'article',
      createdAt: article.createdAt,
      data: article,
    })),
  };
}
