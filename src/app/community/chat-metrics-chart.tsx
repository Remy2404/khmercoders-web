"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Dot,
} from "recharts";
import { format, parseISO } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/generated/card";
import { ChartContainer } from "@/components/generated/chart";
import { ChatMetric } from "@/libs/db/chatbot";

interface ChatMetricsProps {
  data: ChatMetric[];
}

// Helper function to format the data for the chart
const transformData = (data: ChatMetric[]) => {
  // Group by date
  const groupedByDate = data.reduce((acc, item) => {
    if (!acc[item.chat_date]) {
      acc[item.chat_date] = {
        date: item.chat_date,
      };
    }

    acc[item.chat_date][`${item.platform}_count`] = item.message_count;

    return acc;
  }, {} as Record<string, any>);

  // Convert to array and sort by date
  return Object.values(groupedByDate).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

export function ChatMetricsChart({ data }: ChatMetricsProps) {
  const chartData = React.useMemo(() => transformData(data), [data]);

  // Determine all platforms present in the data
  const platforms = React.useMemo(() => {
    const uniquePlatforms = new Set<string>();
    data.forEach((item) => uniquePlatforms.add(item.platform));
    return Array.from(uniquePlatforms);
  }, [data]);

  // Create chart config based on available platforms
  const chartConfig = React.useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};

    // Predefined colors for common platforms
    const platformColors: Record<string, string> = {
      telegram: "#0088cc", // Telegram blue
      discord: "#5865F2", // Discord purple-blue
      slack: "#4A154B", // Slack purple
      whatsapp: "#25D366", // WhatsApp green
    };

    // Default colors if platform doesn't match predefined ones
    const defaultColors = [
      "#2563eb",
      "#f97316",
      "#8b5cf6",
      "#ec4899",
      "#10b981",
    ];

    platforms.forEach((platform, index) => {
      config[platform] = {
        label: platform.charAt(0).toUpperCase() + platform.slice(1),
        color:
          platformColors[platform.toLowerCase()] ||
          defaultColors[index % defaultColors.length],
      };
    });

    return config;
  }, [platforms]);

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), "MMM d");
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="border border-double border-4 border-gray-500 rounded-lg bg-surface p-2">
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <ResponsiveContainer width="100%">
          <AreaChart data={chartData}>
            <defs>
              {platforms.map((platform) => (
                <linearGradient
                  key={`gradient-${platform}`}
                  id={`gradient-${platform}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={chartConfig[platform].color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig[platform].color}
                    stopOpacity={0.2}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />

            <Tooltip
              formatter={(value: number, name: string, props: any) => {
                // Extract platform name from the dataKey (e.g., "telegram_count" -> "Telegram")
                const platform = name.split("_")[0];
                const platformLabel =
                  platform.charAt(0).toUpperCase() + platform.slice(1);
                return [`${value} messages`, platformLabel];
              }}
              labelFormatter={(label) => formatDate(label as string)}
            />
            <Legend />
            {platforms.map((platform) => (
              <Area
                key={platform}
                type="monotone"
                dataKey={`${platform}_count`}
                name={chartConfig[platform].label}
                stroke={chartConfig[platform].color}
                fill={`url(#gradient-${platform})`}
                fillOpacity={1}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
