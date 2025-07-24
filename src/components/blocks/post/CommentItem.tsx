'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/generated/avatar';
import { MarkdownContent } from '@/components/MarkdownContent';
import type { PostRecordWithProfile } from '@/types';
import { formatAgo } from '@/utils/format';
import { LucideDot } from 'lucide-react';

export function CommentItem({ comment }: { comment: PostRecordWithProfile }) {
  return (
    <div key={comment.id} className="p-4 rounded flex gap-4 border-t">
      <div>
        <Avatar className="w-10 h-10">
          {comment.user.image ? (
            <AvatarImage src={comment.user.image} alt={comment.user.name} />
          ) : (
            <AvatarFallback />
          )}
        </Avatar>
      </div>

      <div className="grow">
        <div className="flex gap-2 mb-1">
          <span className="font-bold">{comment.user.name}</span>
          <LucideDot className="-mx-2 text-muted-foreground" />
          <span className="text-muted-foreground">{formatAgo(comment.createdAt)}</span>
        </div>

        <div className="markdown">
          <MarkdownContent withoutMedia>{comment.content}</MarkdownContent>
        </div>
      </div>
    </div>
  );
}
