'use client';
import { ArticlePreviewRecord } from '@/types';
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

interface ArticlePreviewItemProps {
  data: ArticlePreviewRecord;
  showControlPanel?: boolean;
}

export function ArticlePreviewItem({ data, showControlPanel }: ArticlePreviewItemProps) {
  const [published, setPublished] = useState(data.published);

  const { mutate: togglePublished, isPending } = useMutation({
    mutationFn: async (data: { articleId: string; status: boolean }) => {
      return await updateArticlePublishAction(data.articleId, data.status);
    },
    onSuccess: () => {
      setPublished(!published);
    },
  });

  return (
    <article className="flex-col lg:flex-row p-4 border rounded-lg shadow-md mb-4 flex gap-2 lg:items-center items-start">
      <div className="grow order-2 lg:order-1">
        <Link
          href={`/@${data.user.profile.alias}/articles/${data.id}${data.slug ? `/${data.slug}` : ''}`}
          className="block"
        >
          <>
            <h2 className="text-lg font-semibold hover:text-primary hover:underline">
              {data.title}
            </h2>

            <div className="text-xs text-muted-foreground">
              {data.createdAt && (
                <time suppressHydrationWarning>
                  {new Date(data.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  at{' '}
                  {new Date(data.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
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

        <div className="flex gap-2 items-center mt-2">
          <Avatar className="w-6 h-6">
            {data.user.image ? <AvatarImage src={data.user.image} /> : <AvatarFallback />}
          </Avatar>
          <span className="text-sm">{data.user.name}</span>
        </div>

        <div className="flex gap-2 mt-4">
          <LikeButton
            defaultLiked={data.hasCurrentUserLiked}
            defaultCount={data.likeCount}
            resourceId={data.id}
            resourceType="article"
          />
          <CommentButton />
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
