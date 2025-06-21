import { UserLevel } from '@/types';
import { getDB } from './db';
import * as schema from './db/schema';
import { eq, inArray } from 'drizzle-orm';

export async function getUserFromLevels(levels: UserLevel[]) {
  const db = await getDB();

  return db
    .select()
    .from(schema.user)
    .innerJoin(schema.memberProfile, eq(schema.user.id, schema.memberProfile.userId))
    .where(inArray(schema.user.level, levels));
}
