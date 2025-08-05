'use client';

import { useSession } from '@/components/auth-provider';
import { Button } from '@/components/generated/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/generated/dropdown-menu';
import { MODERATOR_ACCESS } from '@/constants';
import { ShieldEllipsis, Check, X } from 'lucide-react';
import { updateArticleStatusAction } from '@/server/actions/article';
import { ArticleRecord, ArticleReviewStatus } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function ArticleModerateActions({ article }: { article: ArticleRecord }) {
  const { session } = useSession();
  const params = useParams();
  const { toast } = useToast();

  // Local state to track the current review status
  const [currentReviewStatus, setCurrentReviewStatus] = useState<ArticleReviewStatus>(
    article.reviewStatus
  );

  const articleId = params?.articleId as string;

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async ({
      status,
      feedback,
    }: {
      status: ArticleReviewStatus;
      feedback?: string;
    }) => {
      return await updateArticleStatusAction(articleId, status, feedback);
    },
    onSuccess: result => {
      if (result.success) {
        toast({
          title: 'Success',
          description: result.message,
        });
        // Update the local state to reflect the new status
        if (result.article && result.article.reviewStatus) {
          setCurrentReviewStatus(result.article.reviewStatus);
        }
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    },
    onError: error => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update article status',
        variant: 'destructive',
      });
    },
  });

  if (!session || !session.user) {
    return null;
  }

  if (!MODERATOR_ACCESS.includes(session.user.level)) {
    return null;
  }

  if (!articleId) {
    return null;
  }

  // Determine icon and button text based on article status
  const getIconAndText = () => {
    if (isPending) {
      return { icon: <ShieldEllipsis />, text: 'Processing...' };
    }

    switch (currentReviewStatus) {
      case ArticleReviewStatus.Approved:
        return { icon: <Check />, text: 'Approved' };
      case ArticleReviewStatus.Rejected:
        return { icon: <X />, text: 'Rejected' };
      default:
        return { icon: <ShieldEllipsis />, text: 'Moderate' };
    }
  };

  const { icon, text } = getIconAndText();

  return (
    <div className="flex gap-2 justify-end grow items-center">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline" disabled={isPending}>
            {icon} {text}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem
            onClick={() => updateStatus({ status: ArticleReviewStatus.Approved })}
            disabled={isPending}
          >
            Approve this article
          </DropdownMenuItem>
          <DropdownMenuItem
            className="!text-red-600 dark:!text-red-500"
            onClick={() => updateStatus({ status: ArticleReviewStatus.Rejected })}
            disabled={isPending}
          >
            Reject this article
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
