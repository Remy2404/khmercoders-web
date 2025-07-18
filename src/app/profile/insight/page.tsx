import { getCurrentProfileInsight, type ProfileInsight } from '@/server/services/insight';
import { ClientOnly } from '@/components/atoms/client-only';
import { InsightChart } from './insight-chart';
import { getSession } from '@/app/session';
import { redirect } from 'next/navigation';

export default async function ProfileInsightPage() {
  const { session } = await getSession();

  if (!session) {
    redirect('/login');
  }

  let insight: ProfileInsight | null = null;
  let error: string | null = null;

  try {
    insight = await getCurrentProfileInsight(session.user.id);
  } catch (err) {
    console.error('Error fetching profile insight:', err);
    error = 'Failed to load insights. Please try again later.';
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold">Insight</h1>
      <p className="text-sm text-muted-foreground mb-4">
        View metrics for your profile including page views and unique visitors in the last 30 days.
        Track how users engage with your profile content.
      </p>
      {error ? (
        <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">{error}</div>
      ) : insight ? (
        <ClientOnly>
          <InsightChart insight={insight} />
        </ClientOnly>
      ) : (
        <Placeholder />
      )}
    </div>
  );
}

function Placeholder() {
  return (
    <div className="flex flex-col gap-4 border rounded-lg my-4 bg-card">
      <div className="border-b flex">
        <div className="p-4 border-r" style={{ width: 150 }}>
          <h2 className="text-sm font-semibold">Page Views</h2>
          <p className="text-3xl text-muted-foreground">--</p>
        </div>

        <div className="p-4 border-r w-md" style={{ width: 150 }}>
          <h2 className="text-sm font-semibold">Visitors</h2>
          <p className="text-3xl text-muted-foreground">--</p>
        </div>
      </div>

      {/* Chart Section Placeholder */}
      <div className="h-[300px] w-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">Loading...</div>
      </div>
    </div>
  );
}
