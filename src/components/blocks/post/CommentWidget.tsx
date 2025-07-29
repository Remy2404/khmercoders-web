'use server';
import { PostableResourceType } from '@/types';
import { CommentList } from './CommentList';
import { getFeedFromArticle } from '@/server/services/feed';

interface CommentWidgetProps {
  resourceType: PostableResourceType;
  resourceId: string;
  userId?: string;
}

export async function CommentWidget({ resourceId, resourceType, userId }: CommentWidgetProps) {
  const posts = await getFeedFromArticle(resourceId, userId);

  return (
    <div>
      <CommentList posts={posts.data} resourceId={resourceId} resourceType={resourceType} />
    </div>
  );
}
