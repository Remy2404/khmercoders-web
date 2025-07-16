'use server';
import { PostableResourceType } from '@/types';
import { PostList } from './PostList';
import { getDB } from '@/libs/db';

interface CommentWidgetProps {
  resourceType: PostableResourceType;
  resourceId: string | null;
}

export async function CommentWidget({ resourceId, resourceType }: CommentWidgetProps) {
  const db = await getDB();

  const posts = await db.query.posts.findMany({
    where: (posts, { eq, isNull }) =>
      eq(posts.resourceType, resourceType) &&
      (resourceId == null ? isNull(posts.resourceId) : eq(posts.resourceId, resourceId)),
    orderBy: (posts, { desc }) => desc(posts.createdAt),
    with: {
      user: {
        with: {
          profile: true,
        },
      },
    },
  });

  return (
    <div>
      <PostList posts={posts} resourceId={resourceId} resourceType={resourceType} />
    </div>
  );
}
