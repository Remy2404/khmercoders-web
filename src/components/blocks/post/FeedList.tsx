'use client';
import type { FeedRecord } from '@/types';
import { FeedItem } from './FeedItem';

export function FeedList({ initialFeeds }: { initialFeeds: FeedRecord[] }) {
  return (
    <div className="flex flex-col">
      {initialFeeds.map(feed => (
        <FeedItem feed={feed} key={feed.id} />
      ))}
    </div>
  );
}
