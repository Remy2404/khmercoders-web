'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';

export interface ChatMetric {
  chat_date: string;
  platform: string;
  message_count: number;
  message_length: number;
}

export interface UserLeaderboard {
  platform: string;
  display_name: string;
  message_count: number;
}

/**
 * Fetches chat metrics for the last 30 days, grouped by platform and date
 */
export async function getChatMetrics(): Promise<ChatMetric[]> {
  // Get the D1 database from Cloudflare Runtime
  const { env } = await getCloudflareContext({ async: true });

  if (!env.DB_CHATBOT) {
    throw new Error('D1 database not found');
  }

  try {
    // Query to get the sum of message_count and message_length for each day and platform
    // for the last 30 days
    const results = await env.DB_CHATBOT.prepare(
      `
      SELECT 
        chat_date,
        platform,
        SUM(message_count) as message_count, 
        SUM(message_length) as message_length
      FROM chat_counter
      WHERE chat_date >= date('now', '-30 days')
      GROUP BY chat_date, platform
      ORDER BY chat_date ASC
    `
    ).all<ChatMetric>();

    // Fill in any holes in the data for the last 30 days
    const filledResults = fillDataGaps(results.results);
    return filledResults;
  } catch (error) {
    console.error('Error fetching chat metrics:', error);
    return [];
  }
}

/**
 * Fills in any gaps in the chat metrics data for the last 30 days
 * @param data - The original data from the database
 * @returns A complete dataset with entries for each platform for all 30 days
 */
function fillDataGaps(data: ChatMetric[]): ChatMetric[] {
  // Get all unique platforms from the data
  const platforms = new Set<string>();
  data.forEach(item => platforms.add(item.platform));

  // Generate dates for the last 30 days
  const today = new Date();
  const dates: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(formatDate(date));
  }

  // Create a map of existing data
  const dataMap: Record<string, Record<string, ChatMetric>> = {};
  data.forEach(item => {
    if (!dataMap[item.chat_date]) {
      dataMap[item.chat_date] = {};
    }
    dataMap[item.chat_date][item.platform] = item;
  });

  // Fill in missing data
  const result: ChatMetric[] = [];
  dates.forEach(date => {
    platforms.forEach(platform => {
      if (dataMap[date]?.[platform]) {
        result.push(dataMap[date][platform]);
      } else {
        // Create a record with 0 counts for missing data
        result.push({
          chat_date: date,
          platform,
          message_count: 0,
          message_length: 0,
        });
      }
    });
  });

  return result;
}

/**
 * Formats a date as YYYY-MM-DD
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Fetches the top users by message count across all platforms for the last 30 days
 */
export async function getUserLeaderboard(limit: number = 10): Promise<UserLeaderboard[]> {
  const { env } = await getCloudflareContext({ async: true });

  if (!env.DB_CHATBOT) {
    throw new Error('D1 database not found');
  }

  try {
    // Query to get the top users by message count for the last 30 days
    const results = await env.DB_CHATBOT.prepare(
      `
      SELECT 
        u.platform,
        u.display_name,
        SUM(c.message_count) as message_count
      FROM chat_counter c
      JOIN users u ON c.platform = u.platform AND c.user_id = u.user_id
      WHERE c.chat_date >= date('now', '-30 days')
      GROUP BY u.platform, u.user_id, u.display_name
      ORDER BY message_count DESC
      LIMIT ?
    `
    )
      .bind(limit)
      .all<UserLeaderboard>();

    return results.results;
  } catch (error) {
    console.error('Failed to fetch user leaderboard:', error);
    return [];
  }
}

/**
 * Fetches total metrics by platform for the last 30 days
 */
export async function getTotalMetricsByPlatform() {
  const { env } = await getCloudflareContext({ async: true });

  if (!env.DB_CHATBOT) {
    throw new Error('D1 database not found');
  }

  try {
    const results = await env.DB_CHATBOT.prepare(
      `
      SELECT 
        platform,
        COUNT(DISTINCT user_id) as unique_users,
        SUM(message_count) as total_messages, 
        SUM(message_length) as total_length
      FROM chat_counter
      WHERE chat_date >= date('now', '-30 days')
      GROUP BY platform
    `
    ).all<{
      platform: string;
      unique_users: number;
      total_messages: number;
      total_length: number;
    }>();

    return results.results;
  } catch (error) {
    console.error('Error fetching platform metrics:', error);
    return [];
  }
}
