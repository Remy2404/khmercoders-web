'use server';
import { requestWorkerAnalytic } from '@/libs/wae';
import { withAuthAction } from './middleware';

export interface ProfileInsight {
  dailyInsight: {
    date: string;
    count: number;
    unique_visitor: number;
  }[];
  totalInsight: {
    count: number;
    unique_visitor: number;
  };
}

export const getCurrentProfileInsightAction = withAuthAction(async ({ user }) => {
  const userId = user.id; // ?? session.user.id;

  if (!process.env.WAE_TOKEN) {
    // Delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Provide fake data for local development
    const dailyInsights = Array.from({ length: 30 }, (_, i) => {
      // Create a spike on day 15 to simulate overflow
      const isSpike = i > 18;
      return {
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        count: (isSpike ? 800 : 0) + Math.floor(Math.random() * 300),
        unique_visitor: isSpike ? 500 : Math.floor(Math.random() * 50),
      };
    });

    return {
      dailyInsight: dailyInsights,
      totalInsight: {
        count: Math.floor(Math.random() * 3000) + 1000,
        unique_visitor: Math.floor(Math.random() * 1500) + 500,
      },
    };
  }

  // Getting the last 30 days of insights
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const last30DaysTimestamp = currentTimestamp - 29 * 24 * 60 * 60;

  // Round to the start of the day (midnight)
  const last30Days = last30DaysTimestamp - (last30DaysTimestamp % 86400);

  const dailyInsight = await requestWorkerAnalytic<{
    date: string;
    count: number;
    unique_visitor: number;
  }>(`
      select
        formatDateTime(timestamp, '%Y-%m-%d') as "date",
        count() as "count",
        count(DISTINCT blob4) AS "unique_visitor"
      from profile_analytics 
        where index1 = '${userId}' and
        toUnixTimestamp(timestamp) between ${last30Days} AND ${currentTimestamp}
      group by "date"
      order by "date" asc
    `);

  // Filling the hole date with 0 count and unique visitor
  const dailyInsightMap: Record<string, { count: number; unique_visitor: number }> = {};
  dailyInsight.forEach(item => {
    dailyInsightMap[item.date] = {
      count: item.count,
      unique_visitor: item.unique_visitor,
    };
  });

  const dailyInsightFilled: {
    date: string;
    count: number;
    unique_visitor: number;
  }[] = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(last30Days * 1000 + i * 86400 * 1000);
    const dateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    if (dailyInsightMap[dateString]) {
      dailyInsightFilled.push({
        date: dateString,
        count: dailyInsightMap[dateString].count,
        unique_visitor: dailyInsightMap[dateString].unique_visitor,
      });
    } else {
      dailyInsightFilled.push({
        date: dateString,
        count: 0,
        unique_visitor: 0,
      });
    }
  }

  const totalInsight = await requestWorkerAnalytic<{
    count: number;
    unique_visitor: number;
  }>(
    `
      select
        count() as "count",
        count(DISTINCT blob4) AS "unique_visitor"
      from profile_analytics 
        where index1 = '${userId}' and
        toUnixTimestamp(timestamp) between ${last30Days} AND ${currentTimestamp}
    `
  );

  return {
    dailyInsight: dailyInsightFilled,
    totalInsight: totalInsight[0] || { count: 0, unique_visitor: 0 },
  };
});
