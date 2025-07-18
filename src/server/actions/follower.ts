'use server';
import { withAuthAction } from './middleware';
import * as schema from '@/libs/db/schema';
import { and, eq, sql } from 'drizzle-orm';

/**
 * Action to follow a user. Returns true if successful.
 * If the user is already following the target user, it does nothing and returns true.
 * Users cannot follow themselves.
 *
 * @param targetUserId - The ID of the user to follow
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export const followUserAction = withAuthAction(async ({ db, user }, targetUserId: string) => {
  // Prevent users from following themselves
  if (user.id === targetUserId) {
    throw new Error('Cannot follow yourself');
  }

  // Check if target user exists
  const targetUser = await db.query.user.findFirst({
    where: eq(schema.user.id, targetUserId),
  });

  if (!targetUser) {
    throw new Error('User not found');
  }

  try {
    // Check if already following
    const existingFollow = await db.query.followers.findFirst({
      where: and(
        eq(schema.followers.userId, targetUserId),
        eq(schema.followers.followerId, user.id)
      ),
    });

    if (existingFollow) {
      return true; // Already following
    }

    // Insert follower relationship
    await db.insert(schema.followers).values({
      userId: targetUserId,
      followerId: user.id,
      createdAt: new Date(),
    });

    // Update follower counts
    await db.batch([
      db
        .update(schema.user)
        .set({
          followersCount: sql`${schema.user.followersCount} + 1`,
        })
        .where(eq(schema.user.id, targetUserId)),

      db
        .update(schema.user)
        .set({
          followingCount: sql`${schema.user.followingCount} + 1`,
        })
        .where(eq(schema.user.id, user.id)),
    ]);

    return true;
  } catch (error) {
    console.error('Error following user:', error);
    return false;
  }
});

/**
 * Action to unfollow a user. Returns true if successful.
 * If the user is not following the target user, it does nothing and returns true.
 *
 * @param targetUserId - The ID of the user to unfollow
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export const unfollowUserAction = withAuthAction(async ({ db, user }, targetUserId: string) => {
  // Check if target user exists
  const targetUser = await db.query.user.findFirst({
    where: eq(schema.user.id, targetUserId),
  });

  if (!targetUser) {
    throw new Error('User not found');
  }

  try {
    // Check if currently following
    const existingFollow = await db.query.followers.findFirst({
      where: and(
        eq(schema.followers.userId, targetUserId),
        eq(schema.followers.followerId, user.id)
      ),
    });

    if (!existingFollow) {
      return true; // Not following, nothing to do
    }

    // Delete follower relationship
    await db
      .delete(schema.followers)
      .where(
        and(eq(schema.followers.userId, targetUserId), eq(schema.followers.followerId, user.id))
      );

    // Update follower counts
    await db.batch([
      db
        .update(schema.user)
        .set({
          followersCount: sql`${schema.user.followersCount} - 1`,
        })
        .where(eq(schema.user.id, targetUserId)),

      db
        .update(schema.user)
        .set({
          followingCount: sql`${schema.user.followingCount} - 1`,
        })
        .where(eq(schema.user.id, user.id)),
    ]);

    return true;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return false;
  }
});
