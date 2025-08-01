'use client';
import { useToast } from '@/hooks/use-toast';
import {
  likeArticleAction,
  likePostAction,
  unlikeArticleAction,
  unlikePostAction,
} from '@/server/actions/likes';
import { LikableResourceType } from '@/types';
import { cn } from '@/utils';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useSession } from './auth-provider';

interface LikeButtonProps {
  defaultLiked?: boolean;
  defaultCount: number;
  resourceId: string;
  resourceType: LikableResourceType;
}

export function LikeButton({
  defaultLiked,
  defaultCount,
  resourceId,
  resourceType,
}: LikeButtonProps) {
  const { session } = useSession();
  const { toast } = useToast();
  const [liked, setLiked] = useState(defaultLiked || false);
  const [count, setCount] = useState(defaultCount || 0);
  const [loading, setLoading] = useState(false);

  const className = cn(
    'flex items-center p-1 rounded cursor-pointer gap-2', // Base styles
    'text-sm text-muted-foreground', // Base text styles
    'border border-transparent', // Default border
    !liked && 'hover:bg-secondary hover:border hover:border-primary',
    liked && 'border border-primary text-primary bg-primary/25 hover:bg-primary/50' // Styles when liked
  );

  const handleToggleLike = useCallback(() => {
    // Check if user is logged in
    if (!session) {
      toast({
        description: 'You must sign in first to like content.',
        variant: 'destructive',
      });
      return;
    }

    if (resourceType === 'article') {
      setLoading(true);
      (liked ? unlikeArticleAction : likeArticleAction)(resourceId)
        .then(newCount => {
          setCount(oldCount => {
            if (newCount === null) return oldCount; // If operation failed, keep old
            return newCount; // Update count with new value
          });
        })
        .finally(() => {
          setLoading(false);
          setLiked(!liked);
        });
    } else if (resourceType === 'post') {
      setLoading(true);
      (liked ? unlikePostAction : likePostAction)(resourceId)
        .then(newCount => {
          setCount(oldCount => {
            if (newCount === null) return oldCount; // If operation failed, keep old
            return newCount; // Update count with new value
          });
        })
        .finally(() => {
          setLoading(false);
          setLiked(!liked);
        });
    }
  }, [liked, session, toast, resourceId, resourceType]);

  return (
    <button className={className} disabled={loading} onClick={handleToggleLike}>
      <ThumbsUp className="w-4 h-4" />
      {count} Likes
    </button>
  );
}

export function CommentButton({ count }: { count: number }) {
  const className = cn(
    'flex items-center p-1 rounded gap-2', // Base styles
    'text-sm text-muted-foreground', // Base text styles
    'border border-transparent' // Default border
  );

  return (
    <div className={className}>
      <MessageSquare className="w-4 h-4" />
      {count} Comments
    </div>
  );
}
