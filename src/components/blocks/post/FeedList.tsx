'use client';
import type { FeedRecord } from '@/types';
import { FeedItem } from './FeedItem';
import { useState } from 'react';
import { getFeedAction } from '@/server/actions/feeds';
import { Loader } from 'lucide-react';

export function FeedListWithLoadMore({
  initialFeeds,
  cursor,
}: {
  initialFeeds: FeedRecord[];
  cursor?: string;
}) {
  const [feeds, setFeeds] = useState<FeedRecord[]>(initialFeeds);
  const [nextCursor, setNextCursor] = useState<string | undefined>(cursor);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    if (!nextCursor || isLoading) return;

    setIsLoading(true);
    try {
      const moreFeeds = await getFeedAction({
        before: Number(nextCursor),
        limit: 20,
      });

      setFeeds(prevFeeds => [...prevFeeds, ...moreFeeds.data]);
      setNextCursor(moreFeeds.pagination.next);
    } catch (error) {
      console.error('Failed to load more feeds:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        {feeds.map(feed => (
          <FeedItem feed={feed} key={feed.id} />
        ))}
      </div>
      {nextCursor && (
        <button
          className={`
            m-4 mt-0 p-2 rounded text-sm bg-secondary text-secondary-foreground hover:bg-secondary/90
          `}
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          {isLoading ? <Loader className="animate-spin w-4 h-4 mr-2 inline" /> : null}
          {isLoading ? 'Loading...' : 'Show more posts'}
        </button>
      )}
    </>
  );
}

export function FeedList({ feeds }: { feeds: FeedRecord[] }) {
  return (
    <div className="flex flex-col">
      {feeds.map(f => (
        <FeedItem feed={f} key={f.id} />
      ))}
    </div>
  );
}
