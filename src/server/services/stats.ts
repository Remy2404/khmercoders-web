'use server';

import { KV_TELERAM_MEMBER_COUNT, KV_TOTAL_MEMBER_COUNT } from '@/constants';
import { getDB } from '@/libs/db';
import { type ServerStats } from '@/types';

export async function getServerStats(): Promise<ServerStats> {
  const db = await getDB();
  const stats = await db.query.cacheTable.findMany({
    where: (cacheTable, { inArray }) =>
      inArray(cacheTable.key, [
        KV_TELERAM_MEMBER_COUNT,
        'discord_member_count',
        'facebook_member_count',
        KV_TOTAL_MEMBER_COUNT,
      ]),
  });

  const telegramMemberCount = Number(
    stats.find(stat => stat.key === KV_TELERAM_MEMBER_COUNT)?.value || 0
  );

  const discordMemberCount = Number(
    stats.find(stat => stat.key === 'discord_member_count')?.value || 0
  );

  const facebookMemberCount = Number(
    stats.find(stat => stat.key === 'facebook_member_count')?.value || 0
  );

  const totalMemberCount = Number(
    stats.find(stat => stat.key === KV_TOTAL_MEMBER_COUNT)?.value || 0
  );

  return {
    telegramMembers: telegramMemberCount,
    discordMembers: discordMemberCount,
    facebookMembers: facebookMemberCount,
    totalMembers: totalMemberCount,
  };
}
