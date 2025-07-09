'use client';
import { ArticlePreviewRecord, UserLevel } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from './generated/avatar';
import Link from 'next/link';
import { Badge } from './generated/badge';
import { Button } from './generated/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from './generated/dropdown-menu';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateArticlePublishAction } from '@/server/actions/article';
import Image from 'next/image';
import { CommentButton, LikeButton } from './interaction-button';
import { useSession } from './auth-provider';
import { MODERATOR_ACCESS } from '@/constants';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

interface ArticlePreviewItemProps {
  data: ArticlePreviewRecord;
  showControlPanel?: boolean;
}

export function ArticlePreviewItem({ data, showControlPanel }: ArticlePreviewItemProps) {
  const [published, setPublished] = useState(data.published);
  const { session } = useSession();

  const { mutate: togglePublished, isPending } = useMutation({
    mutationFn: async (data: { articleId: string; status: boolean }) => {
      return await updateArticlePublishAction(data.articleId, data.status);
    },
    onSuccess: () => {
      setPublished(!published);
    },
  });

  return (
    <article className="bg-card border rounded flex-col lg:flex-row p-4 flex gap-2 lg:items-center items-start">
      <div className="grow order-2 lg:order-1">
        <Link
          href={`/@${data.user.profile.alias}/articles/${data.id}${data.slug ? `/${data.slug}` : ''}`}
          className="block px-2 lg:px-0"
        >
          <>
            <h2 className="text-lg font-semibold hover:text-primary hover:underline">
              {data.title}
            </h2>

            <div className="text-xs text-muted-foreground">
              {data.createdAt && (
                <time suppressHydrationWarning>
                  {formatInTimeZone(
                    new Date(data.createdAt),
                    Intl.DateTimeFormat().resolvedOptions().timeZone,
                    'MMM d, yyyy'
                  )}{' '}
                  at{' '}
                  {formatInTimeZone(
                    new Date(data.createdAt),
                    Intl.DateTimeFormat().resolvedOptions().timeZone,
                    'h:mm a'
                  )}
                </time>
              )}

              {showControlPanel && (
                <Badge variant={published ? 'default' : 'secondary'} className="ml-2">
                  {published ? 'Published' : 'Draft'}
                </Badge>
              )}
            </div>

            {data.summary && (
              <p className="text-sm text-muted-foreground my-2 line-clamp-2">{data.summary}</p>
            )}
          </>
        </Link>

        <div className="flex gap-2 items-center mt-2 px-2 lg:px-0">
          <Avatar className="w-6 h-6">
            {data.user.image ? <AvatarImage src={data.user.image} /> : <AvatarFallback />}
          </Avatar>
          <span className="text-sm">{data.user.name}</span>
        </div>

        <div className="flex gap-2 mt-4 px-2 lg:px-0">
          <LikeButton
            defaultLiked={data.hasCurrentUserLiked}
            defaultCount={data.likeCount}
            resourceId={data.id}
            resourceType="article"
          />
          <CommentButton />
          {MODERATOR_ACCESS.includes(session?.user?.level ?? UserLevel.Basic) && (
            <div className="text-muted-foreground text-sm flex items-center">
              | {data.viewCount} views
            </div>
          )}
        </div>

        {showControlPanel && (
          <div className="mt-4">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild disabled={isPending}>
                <Button variant="outline" size="sm" disabled={isPending}>
                  More Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={`/profile/articles/${data.id}`} className="cursor-pointer">
                    Edit Article
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => togglePublished({ articleId: data.id, status: !published })}
                >
                  {published ? 'Unpublished' : 'Published'}
                </DropdownMenuItem>
                <DropdownMenuItem disabled>Insight (coming soon)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      {data.image ? (
        <div className="flex shrink-0 order-1 lg:order-2">
          <Link
            href={`/@${data.user.profile.alias}/articles/${data.id}${data.slug ? `/${data.slug}` : ''}`}
          >
            <Image
              width={128}
              height={64}
              src={data.image}
              alt={data.title}
              className="w-full lg:w-[128px] lg:h-[64px] h-auto aspect-[128/64]"
            />
          </Link>
        </div>
      ) : (
        <Link
          className="w-full lg:w-[128px] lg:h-[64px] h-auto aspect-[128/64] bg-secondary rounded shrink-0 order-1 lg:order-2"
          href={`/@${data.user.profile.alias}/articles/${data.id}${data.slug ? `/${data.slug}` : ''}`}
        ></Link>
      )}
    </article>
  );
}
