import { CommentButton, LikeButton } from '@/components/interaction-button';
import { FeedRecord } from '@/types';
import { formatAgo } from '@/utils/format';
import Link from 'next/link';

export function FeedItem({ feed }: { feed: FeedRecord }) {
  if (feed.type === 'article') {
    return (
      <div className="p-4 border-b flex gap-2 w-full">
        <div className="shrink-0">
          <Link href={`/@${feed.data.user?.profile?.alias}`}>
            <img
              src={feed.data.user.image ?? ''}
              alt={feed.data.title}
              className="w-12 h-12 rounded-full"
            />
          </Link>
        </div>
        <div className="flex flex-col grow gap-1">
          <div className="text-sm">
            <Link
              className="hover:underline font-bold"
              href={`/@${feed.data.user?.profile?.alias}`}
            >
              {feed.data.user.name}
            </Link>{' '}
            <span className="text-muted-foreground">is posting article</span>
          </div>
          <time className="text-xs text-muted-foreground">{formatAgo(feed.data.createdAt)}</time>

          <Link
            href={`/@${feed.data.user?.profile?.alias}/articles/${feed.data.id}`}
            className="block"
          >
            <article className="w-full rounded-lg overflow-hidden border my-2">
              {feed.data.image && (
                <div className="relative w-full">
                  <div className="pb-[50%]"></div>
                  <img
                    src={feed.data.image}
                    alt={feed.data.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{feed.data.title}</h2>
                <p className="text-sm text-muted-foreground">{feed.data.summary}</p>
              </div>
            </article>
          </Link>

          <div className="flex gap-2">
            <LikeButton
              defaultCount={feed.data.likeCount}
              defaultLiked={feed.data.hasCurrentUserLiked}
              resourceId={feed.data.id}
              resourceType="article"
            />

            <CommentButton count={feed.data.commentCount} />
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
}
