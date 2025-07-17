'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/generated/avatar';
import { MarkdownContent } from '@/components/MarkdownContent';
import type { PostRecordWithProfile } from '@/types';
import { formatAgo } from '@/utils/format';
import { LucideDot } from 'lucide-react';

export function CommentItem({ comment }: { comment: PostRecordWithProfile }) {
  return (
    <div key={comment.id} className="bg-card border my-4 p-4 rounded flex gap-4">
      <div>
        <Avatar className="w-10 h-10">
          {comment.user.image ? (
            <AvatarImage src={comment.user.image} alt={comment.user.name} />
          ) : (
            <AvatarFallback />
          )}
        </Avatar>
      </div>

      <div>
        <div className="flex gap-2 mb-1">
          <span className="font-bold">{comment.user.name}</span>
          <LucideDot className="-mx-2 text-muted-foreground" />
          <span className="text-muted-foreground">{formatAgo(comment.createdAt)}</span>
        </div>
        <MarkdownContent withoutMedia>{comment.content}</MarkdownContent>
      </div>
    </div>
  );
}
