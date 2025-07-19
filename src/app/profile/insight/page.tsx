import { getCurrentProfileInsight } from '@/server/services/insight';
import { ClientOnly } from '@/components/atoms/client-only';
import { InsightChart } from './insight-chart';
import { getSession } from '@/app/session';
import { redirect } from 'next/navigation';

export default async function ProfileInsightPage() {
  const { session } = await getSession();

  if (!session) {
    redirect('/login');
  }

  const insight = await getCurrentProfileInsight(session.user.id);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold">Insight</h1>
      <p className="text-sm text-muted-foreground mb-4">
        View metrics for your profile including page views and unique visitors in the last 30 days.
        Track how users engage with your profile content.
      </p>

      <ClientOnly>
        <InsightChart insight={insight} />
      </ClientOnly>
    </div>
  );
}
