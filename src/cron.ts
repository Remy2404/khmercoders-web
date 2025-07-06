import { KV_TELERAM_MEMBER_COUNT } from './constants';
import { getDB } from './libs/db';
import { requestWorkerAnalytic } from './libs/wae';
import * as schema from './libs/db/schema';
import { eq, sql } from 'drizzle-orm';

const KHMERCODERS_TELEGRAM_GROUP_ID = '-1002628888170';

const EVERYONE_FIVE_MINUTES_CRON = '*/5 * * * *';

export const handleCloudflareScheduled: ExportedHandlerScheduledHandler<CloudflareEnv> = async (
  event,
  env
) => {
  const { cron } = event;

  if (cron === '0 */2 * * *') {
    if (!env.TELEGRAM_BOT_TOKEN) {
      console.error('Bot token or chat ID is not set in environment variables.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/getChatMembersCount?chat_id=${KHMERCODERS_TELEGRAM_GROUP_ID}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch chat members count: ${response.statusText}`);
      }

      const data = (await response.json()) as { ok: boolean; result: number };

      console.log('Telegram group member count:', JSON.stringify(data, null, 2));

      await env.KV.put(KV_TELERAM_MEMBER_COUNT, data.result.toString());
    } catch (error) {
      console.error('Error fetching chat members count:', error);
    }
  } else if (cron === EVERYONE_FIVE_MINUTES_CRON) {
    // Updating the analytics view_count
    // Getting the last cron execution time
    const db = await getDB();
    const lastExecution = await db.query.systemSetting.findFirst({
      where: (systemSetting, { eq }) => eq(systemSetting.key, 'last_cron_execution'),
      columns: {
        value: true,
      },
    });

    // Get 5 mintues ago because the analytics has data might be delay. So we have it 5 minutes to be safe
    const fiveMinutesAgoTimestamp = new Date(Date.now() - 5 * 60 * 1000).getTime();
    const lastExecutionTimestamp = Number(lastExecution ?? 0);

    if (lastExecutionTimestamp < fiveMinutesAgoTimestamp) {
      const result = await requestWorkerAnalytic<{ articleId: string; totalView: number }>(
        `
          SELECT blob7 AS articleId, COUNT() AS totalView
          FROM profile_analytics 
          WHERE blob1 = 'article' AND toUnixTimestamp(timestamp) BETWEEN ${lastExecutionTimestamp} AND ${fiveMinutesAgoTimestamp} 
          GROUP BY blob7`
      );

      const batchUpdates = result.map(articleStat =>
        db
          .update(schema.article)
          .set({
            viewCount: sql`${schema.article.viewCount} + ${articleStat.totalView}`,
          })
          .where(eq(schema.article.id, articleStat.articleId))
      );

      await db.batch([
        db
          .update(schema.systemSetting)
          .set({ value: fiveMinutesAgoTimestamp.toString() })
          .where(eq(schema.systemSetting.key, 'last_cron_execution')),
        ...batchUpdates,
      ]);
    }
  }
};
