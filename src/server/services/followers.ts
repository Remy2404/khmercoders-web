import { getDB } from '@/libs/db';
import type { UserRecord, UserRecordWithProfile } from '@/types';

export async function bindingFollowerStatusFromUser<T extends UserRecord | UserRecordWithProfile>(
  user: T,
  currentUserId?: string
): Promise<T & { hasCurrentUserFollowed: boolean }> {
  if (!currentUserId) {
    return { ...user, hasCurrentUserFollowed: false };
  }

  const db = await getDB();

  const followerStatus = await db.query.followers.findFirst({
    where: (followers, { and, eq }) =>
      and(eq(followers.userId, user.id), eq(followers.followerId, currentUserId)),
  });

  return {
    ...user,
    hasCurrentUserFollowed: !!followerStatus,
  };
}
