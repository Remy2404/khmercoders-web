"use client";
import {
  getCurrentProfileInsightAction,
  type ProfileInsight,
} from "@/actions/insight";
import { useSession } from "@/components/auth-provider";
import { ChartContainer } from "@/components/generated/chart";
import { useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

export default function ProfileInsightPage() {
  const { session } = useSession();
  const [insight, setInsight] = useState<ProfileInsight>();

  useEffect(() => {
    getCurrentProfileInsightAction().then(setInsight).catch();
  }, []);

  if (!session) {
    return <div>You must be logged in to view this page.</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold">Insight</h1>
      <p className="text-sm text-muted-foreground mb-4">
        View metrics for your profile including page views and unique visitors
        in the last 30 days. Track how users engage with your profile content.
      </p>
      {insight ? <InsightSection insight={insight} /> : <Placeholder />}
    </div>
  );
}

function InsightSection({ insight }: { insight: ProfileInsight }) {
  const chartConfig = useMemo(() => {
    return {
      page_view: {
        label: "Page Views",
        color: "#2563eb", // Default blue
      },
    };
  }, []);

  const chartData = useMemo(() => {
    return insight.dailyInsight.map((item) => ({
      date: item.date,
      page_view: item.count,
    }));
  }, [insight]);

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), "MMM d");
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col gap-4 border rounded-lg my-4 overflow-hidden">
      <div className="bg-zinc-900 border-b flex">
        <div className="bg-background p-4 border-r" style={{ width: 150 }}>
          <h2 className="text-sm font-semibold">Page Views</h2>
          <p className="text-3xl">{insight.totalInsight.count}</p>
        </div>

        <div className="bg-background p-4 border-r w-md" style={{ width: 150 }}>
          <h2 className="text-sm font-semibold">Visitors</h2>
          <p className="text-3xl">{insight.totalInsight.unique_visitor}</p>
        </div>
      </div>

      {/* Chart Section */}
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <ResponsiveContainer height={"100%"} width={"100%"}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="page_view" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <Area
              type="monotone"
              dataKey={"page_view"}
              name={"page_view"}
              stroke={"#f97316"}
              fill="url(#page_view)"
              fillOpacity={1}
            />

            <Tooltip
              wrapperClassName="bg-background"
              contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
              formatter={(value: number) => {
                return [`${value} pageview`];
              }}
              labelFormatter={(label) => formatDate(label as string)}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="container mx-auto">
      <div className="text-center text-gray-500">Loading...</div>
    </div>
  );
}
