import { getDB } from '@/libs/db';
import { auth } from '@/utils/auth';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import * as schema from '@/libs/db/schema';
import { DrizzleD1Database } from 'drizzle-orm/d1';

export function withAuthAction<ParamsType extends unknown[] = unknown[], ReturnType = unknown>(
  callback: (
    auth: {
      profile?: typeof schema.memberProfile.$inferSelect;
      session: typeof schema.session.$inferSelect;
      user: typeof schema.user.$inferSelect;
      db: DrizzleD1Database<typeof schema>;
    },
    ...args: ParamsType
  ) => Promise<ReturnType>
) {
  return withOptionalAuthAction(async (auth, ...args: ParamsType): Promise<ReturnType> => {
    if (!auth.session || !auth.user) {
      throw new Error('Unauthorized');
    }

    return await callback(
      {
        ...auth,
        session: auth.session,
        user: auth.user,
      },
      ...args
    );
  });
}

export function withOptionalAuthAction<
  ParamsType extends unknown[] = unknown[],
  ReturnType = unknown,
>(
  callback: (
    auth: {
      profile?: typeof schema.memberProfile.$inferSelect;
      session?: typeof schema.session.$inferSelect;
      user?: typeof schema.user.$inferSelect;
      db: DrizzleD1Database<typeof schema>;
    },
    ...args: ParamsType
  ) => Promise<ReturnType>
) {
  return async function (...args: ParamsType): Promise<ReturnType> {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const db = await getDB();
    const profile = session
      ? await db.query.memberProfile.findFirst({
          where: eq(schema.memberProfile.userId, session.user.id),
        })
      : undefined;

    return await callback(
      {
        db,
        profile,
        session: session?.session as typeof schema.session.$inferSelect,
        user: session?.user as typeof schema.user.$inferSelect,
      },
      ...args
    );
  };
}
