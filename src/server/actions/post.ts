'use server';

import { PostableResourceType, PostRecord, PostRecordWithProfile } from '@/types';
import { withAuthAction } from './middleware';
import * as schema from './../../libs/db/schema';
import { generatePostId } from '../generate-id';
import { eq, sql } from 'drizzle-orm';

const POST_CHARACTER_LIMIT = 300; // Define a character limit for posts

export const createPostAction = withAuthAction(
  async (
    { db, user },
    resourceType: PostableResourceType,
    resourceId: string | null,
    content: string
  ): Promise<{ success: boolean; result?: PostRecordWithProfile; error?: string }> => {
    if (!content || content.trim() === '') {
      return {
        success: false,
        error: 'Content cannot be empty',
      };
    }

    if (content.length > POST_CHARACTER_LIMIT) {
      return {
        success: false,
        error: `Content exceeds the limit of ${POST_CHARACTER_LIMIT} characters`,
      };
    }

    let increaseCommentOperation;

    // Validate based on resource type
    if (resourceType === 'article' && resourceId) {
      // Check if the article exists
      const resource = await db.query.article.findFirst({
        where: (article, { eq }) => eq(article.id, resourceId),
      });

      if (!resource) {
        return {
          success: false,
          error: 'Article not found',
        };
      }

      increaseCommentOperation = db
        .update(schema.article)
        .set({
          commentCount: sql`${schema.article.commentCount} + 1`,
        })
        .where(eq(schema.article.id, resourceId));
    } else {
      return {
        success: false,
        error: 'Invalid resource type',
      };
    }

    const postId = generatePostId();

    await db.batch([
      db.insert(schema.posts).values({
        content,
        resourceType,
        resourceId,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: postId,
      }),
      increaseCommentOperation,
    ]);

    const post = await db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, postId),
      with: {
        user: {
          with: {
            profile: true,
          },
        },
      },
    });

    if (!post) {
      return {
        success: false,
        error: 'Failed to create post',
      };
    }

    return {
      success: true,
      result: post,
    };
  }
);
