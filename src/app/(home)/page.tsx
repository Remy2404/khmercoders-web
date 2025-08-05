import { getSession } from '../session';
import { MainLayout } from '@/components/blocks/layout/MainLayout';
import { getFeed } from '@/server/services/feed';
import { FeedListWithLoadMore } from '@/components/blocks/post/FeedList';

export const revalidate = 3600; // Cache the page for 3600 seconds (1 hour)

export default async function LandingPage() {
  const { session } = await getSession();

  const feeds = await getFeed(
    {
      limit: 20,
    },
    session?.user?.id
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-4 lg:p-0">
        <FeedListWithLoadMore initialFeeds={feeds.data} cursor={feeds.pagination.next} />
      </div>
    </MainLayout>
  );
}
