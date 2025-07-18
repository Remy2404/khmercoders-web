'use client';
import { getCurrentProfileInsightAction, type ProfileInsight } from '@/server/actions/insight';
import { useSession } from '@/components/auth-provider';
import { ChartContainer } from '@/components/generated/chart';
import { useEffect, useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

export default function ProfileInsightPage() {
  const { session } = useSession();
  const [insight, setInsight] = useState<ProfileInsight>();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCurrentProfileInsightAction()
      .then(setInsight)
      .catch(err => {
        console.error('Error fetching profile insight:', err);
        setError('Failed to load insights. Please try again later.');
      });
  }, []);

  if (!session) {
    return <div>You must be logged in to view this page.</div>;
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
        <InsightSection insight={insight} />
      ) : (
        <Placeholder />
      )}
    </div>
  );
}

function InsightSection({ insight }: { insight: ProfileInsight }) {
  const chartConfig = useMemo(() => {
    return {
      page_view: {
        label: 'Page Views',
        color: '#2563eb', // Default blue
      },
    };
  }, []);

  const chartData = useMemo(() => {
    return insight.dailyInsight.map(item => ({
      date: item.date,
      page_view: item.count,
    }));
  }, [insight]);

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), 'MMM d');
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col gap-4 border rounded-lg my-4 overflow-hidden bg-card">
      <div className="border-b flex">
        <div className="p-4 border-r" style={{ width: 150 }}>
          <h2 className="text-sm font-semibold">Page Views</h2>
          <p className="text-3xl">{insight.totalInsight.count}</p>
        </div>

        <div className="p-4 border-r w-md" style={{ width: 150 }}>
          <h2 className="text-sm font-semibold">Visitors</h2>
          <p className="text-3xl">{insight.totalInsight.unique_visitor}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[300px] w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="page_view" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                {...({ stroke: 'hsl(var(--muted))' } as any)}
              />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' } as any}
                tickMargin={10}
                axisLine={{ stroke: 'hsl(var(--border))' } as any}
              />
              <Area
                type="monotone"
                dataKey="page_view"
                name="page_view"
                stroke="#f97316"
                fill="url(#page_view)"
                fillOpacity={1}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  color: 'hsl(var(--foreground))',
                }}
                formatter={(value: number) => {
                  return [`${value} pageview`];
                }}
                labelFormatter={label => formatDate(label as string)}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="flex flex-col gap-4 border rounded-lg my-4 overflow-hidden bg-card">
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
