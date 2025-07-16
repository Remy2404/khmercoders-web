'use client';

import { useSession } from '@/components/auth-provider';
import { PostableResourceType, PostRecordWithProfile } from '@/types';
import { useState } from 'react';
import { PostEditor } from './PostEditor';

interface PostListProps {
  posts: PostRecordWithProfile[];
  resourceType: PostableResourceType;
  resourceId: string | null;
}

export function PostList({ posts: defaultPostList, resourceId, resourceType }: PostListProps) {
  const { session } = useSession();
  const [posts, setPosts] = useState<PostRecordWithProfile[]>(defaultPostList);

  return (
    <div>
      {session?.user && (
        <PostEditor
          resourceId={resourceId}
          resourceType={resourceType}
          onSuccess={newPost => {
            setPosts(prevPosts => [newPost, ...prevPosts]);
            console.log('New post added:', newPost);
          }}
        />
      )}
      {posts.map(post => (
        <div key={post.id} className="post-item">
          <p>{post.content}</p>
          <p>Author: {post.user.name}</p>
        </div>
      ))}
    </div>
  );
}
