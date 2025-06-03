"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";

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
    throw new Error("D1 database not found");
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
    ).all<ChatMetric>();    return results.results;
  } catch (error) {
    console.error("Error fetching chat metrics:", error);
    return [];
  }
}

/**
 * Fetches the top users by message count across all platforms for the last 30 days
 */
export async function getUserLeaderboard(limit: number = 10): Promise<UserLeaderboard[]> {
  const { env } = await getCloudflareContext({ async: true });

  if (!env.DB_CHATBOT) {
    throw new Error("D1 database not found");
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
    ).bind(limit).all<UserLeaderboard>();

    return results.results;
  } catch (error) {
    console.error("Failed to fetch user leaderboard:", error);
    return [];
  }
}

/**
 * Fetches total metrics by platform for the last 30 days
 */
export async function getTotalMetricsByPlatform() {
  const { env } = await getCloudflareContext({ async: true });

  if (!env.DB_CHATBOT) {
    throw new Error("D1 database not found");
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
    console.error("Error fetching platform metrics:", error);
    return [];
  }
}
