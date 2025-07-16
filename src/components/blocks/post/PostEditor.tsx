'use client';
import { Button } from '@/components/generated/button';
import { SimpleMarkdownEditor } from '@/components/markdown-editor/simple-markdown';
import { createPostAction } from '@/server/actions/post';
import { PostableResourceType, PostRecordWithProfile } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export function PostEditor({
  resourceId,
  resourceType,
  onSuccess,
}: {
  resourceType: PostableResourceType;
  resourceId: string | null;
  onSuccess: (post: PostRecordWithProfile) => void;
}) {
  const [content, setContent] = useState<string>('');

  const { mutate, isPending } = useMutation({
    mutationFn: async (newPost: {
      content: string;
      resourceId: string | null;
      resourceType: PostableResourceType;
    }) => {
      const response = await createPostAction(resourceType, resourceId, newPost.content);
      if (!response.success) {
        throw new Error('Failed to create post');
      }

      return response.result!;
    },
    onSuccess,
  });

  return (
    <div>
      <SimpleMarkdownEditor value={content} onChange={setContent} />
      <div className="my-2">
        <Button
          disabled={isPending}
          onClick={() => {
            mutate({ content, resourceId, resourceType });
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
