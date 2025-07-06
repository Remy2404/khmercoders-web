'use server';

import { UserLevel } from '@/types';
import { withAuthAction } from './middleware';
import * as schema from '@/libs/db/schema';
import { eq } from 'drizzle-orm';

export const promoteUserLevelAction = withAuthAction(
  async ({ db, user }, targetUserId: string, level: UserLevel) => {
    if (user.level !== UserLevel.SuperAdmin) {
      return new Error('You do not have permission to promote users.');
    }

    if (user.id === targetUserId) {
      return new Error('You cannot promote yourself.');
    }

    await db
      .update(schema.user)
      .set({
        level,
      })
      .where(eq(schema.user.id, targetUserId));
  }
);
