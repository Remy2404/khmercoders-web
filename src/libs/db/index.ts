import { drizzle } from 'drizzle-orm/d1';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import type { DrizzleD1Database } from 'drizzle-orm/d1';

import * as schema from './schema';

export let db: DrizzleD1Database<typeof schema> | null = null;

/**
 * Get the D1 database instance. Override is used primary for cron which
 * it does not have getCloudflareContext access.
 *
 * @param overrideEnv Override the Cloudflare environment if needed.
 * @returns
 */
export const getDB = async (overrideEnv?: CloudflareEnv) => {
  if (db) {
    return db;
  }

  const env = overrideEnv || (await getCloudflareContext({ async: true })).env;

  if (!env.DB) {
    throw new Error('D1 database not found');
  }

  db = drizzle(env.DB, { schema, logger: true });

  return db;
};
