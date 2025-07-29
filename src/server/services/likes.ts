import { getDB } from '@/libs/db';
import { FeedRecord } from '@/types';
import { produce } from 'immer';

export async function bindingLikeStatus(feeds: FeedRecord[], userId?: string) {
  if (!userId) {
    return feeds;
  }

  const db = await getDB();
  const ids = feeds.map(feed => feed.id);

  if (ids.length === 0) {
    return feeds;
  }

  const likedFeeds = await db.query.likes.findMany({
    where: (likes, { and, eq, inArray }) =>
      and(eq(likes.userId, userId), eq(likes.type, 'post'), inArray(likes.resourceId, ids)),
    columns: {
      resourceId: true,
    },
  });

  console.log('Liked feeds:', likedFeeds, ids, userId);

  const likedSet = new Set(likedFeeds.map(like => like.resourceId));

  return produce(feeds, draft => {
    for (const feed of draft) {
      if (feed.id && likedSet.has(feed.id)) {
        feed.data.hasCurrentUserLiked = true;
      } else {
        feed.data.hasCurrentUserLiked = false;
      }
    }
  });
}
