import { getDB } from '@/libs/db';
import { cache } from 'react';

export const getFeaturedArticlesCache = cache(async () => {
  const db = await getDB();

  return await db.query.article.findMany({
    where: (article, { eq, and }) =>
      and(eq(article.approvedByAI, true), eq(article.published, true)),
    orderBy: (article, { desc }) => [desc(article.createdAt)],
    with: {
      user: {
        with: {
          profile: true,
        },
      },
    },
    limit: 5,
  });
});
