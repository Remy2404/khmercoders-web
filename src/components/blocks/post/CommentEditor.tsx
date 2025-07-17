'use client';
import { Button } from '@/components/generated/button';
import { SimpleMarkdownEditor } from '@/components/markdown-editor/simple-markdown';
import { createPostAction } from '@/server/actions/post';
import { PostableResourceType, PostRecordWithProfile } from '@/types';
import { cn } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export function CommentEditor({
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
    <div className="bg-card border rounded flex flex-col gap-4">
      <textarea
        className={cn(
          'w-full h-full p-4 resize-none outline-none border-none',
          'bg-transparent text-foreground',
          'placeholder:text-muted-foreground'
        )}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder={'Please write your comment here...'}
      />

      <div className="px-4 pb-2 flex justify-end gap-2">
        <Button
          disabled={isPending}
          size="sm"
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
