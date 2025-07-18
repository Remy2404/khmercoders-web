'use client';

import { ChartContainer } from '@/components/generated/chart';
import { ProfileInsight } from '@/server/services/insight';
import { format, parseISO } from 'date-fns';
import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

interface InsightChartProps {
  insight: ProfileInsight;
}

export function InsightChart({ insight }: InsightChartProps) {
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

  console.log('Chart Data:', chartData);

  return (
    <div className="flex flex-col gap-4 border rounded-lg my-4 bg-card">
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
      <div className="h-[300px] w-full p-4">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                allowEscapeViewBox={{ x: false, y: false }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
