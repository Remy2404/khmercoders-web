import { AuthProvider } from '@/components/auth-provider';
import { MODERATOR_ACCESS } from '@/constants';
import { getDB } from '@/libs/db';
import * as schema from '@/libs/db/schema';
import { auth } from '@/utils/auth';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return {};

  // Get the user profile from the session
  const db = await getDB();
  const profile = await db.query.memberProfile.findFirst({
    where: eq(schema.memberProfile.userId, session.user.id),
  });

  return {
    profile,
    isModerator: MODERATOR_ACCESS.includes(session.user.level),
    session: {
      user: session.user as typeof schema.user.$inferSelect,
      session: session.session as typeof schema.session.$inferSelect,
    },
  };
}

export async function SessionProvider({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return <AuthProvider value={session}>{children}</AuthProvider>;
}
