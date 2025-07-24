'use client';

import { useSession } from '@/components/auth-provider';
import { PostableResourceType, PostRecordWithProfile } from '@/types';
import { useState } from 'react';
import { CommentEditor } from './CommentEditor';
import { CommentItem } from './CommentItem';

interface PostListProps {
  posts: PostRecordWithProfile[];
  resourceType: PostableResourceType;
  resourceId: string | null;
}

export function CommentList({ posts: defaultPostList, resourceId, resourceType }: PostListProps) {
  const { session } = useSession();
  const [posts, setPosts] = useState<PostRecordWithProfile[]>(defaultPostList);

  return (
    <div>
      {session?.user && (
        <div className="p-4 border-t">
          <CommentEditor
            resourceId={resourceId}
            resourceType={resourceType}
            onSuccess={newPost => {
              setPosts(prevPosts => [newPost, ...prevPosts]);
              console.log('New post added:', newPost);
            }}
          />
        </div>
      )}
      {posts.map(post => (
        <CommentItem key={post.id} comment={post} />
      ))}
    </div>
  );
}
