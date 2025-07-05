'use server';
import { withAuthAction } from './middleware';
import * as schema from '@/libs/db/schema';
import { and, eq, sql } from 'drizzle-orm';

/**
 * Action to like an article. Returns the updated like count if successful.
 * If the user has already liked the article, it does nothing and returns the current like count
 *
 * @returns {Promise<number|null>} The updated like count or null if operation failed.
 */
export const likeArticleAction = withAuthAction(async ({ db, user }, articleId: string) => {
  // Check if it is valid article ID
  const article = await db.query.article.findFirst({
    where: eq(schema.article.id, articleId),
  });

  if (!article) {
    throw new Error('Article not found or invalid article ID.');
  }

  const [_, likeStats] = await db.batch([
    db
      .insert(schema.likes)
      .values({
        userId: user.id,
        resourceId: articleId,
        type: 'article',
        createdAt: new Date(),
      })
      .onConflictDoNothing(),
    db
      .update(schema.article)
      .set({
        likeCount: sql`${schema.article.likeCount} + 1`,
      })
      .where(and(eq(schema.article.id, articleId), sql`changes() > 0`))
      .returning({
        count: schema.article.likeCount,
      }),
  ]);

  return likeStats[0]?.count ?? null;
});

export const unlikeArticleAction = withAuthAction(async ({ db, user }, articleId: string) => {
  // Check if it is valid article ID
  const article = await db.query.article.findFirst({
    where: eq(schema.article.id, articleId),
  });

  if (!article) {
    throw new Error('Article not found or invalid article ID.');
  }

  const [_, likeStats] = await db.batch([
    db
      .delete(schema.likes)
      .where(
        and(
          eq(schema.likes.resourceId, articleId),
          eq(schema.likes.userId, user.id),
          eq(schema.likes.type, 'article')
        )
      ),
    db
      .update(schema.article)
      .set({
        likeCount: sql`${schema.article.likeCount} - 1`,
      })
      .where(and(eq(schema.article.id, articleId), sql`changes() > 0`))
      .returning({
        count: schema.article.likeCount,
      }),
  ]);

  return likeStats[0]?.count ?? null;
});
