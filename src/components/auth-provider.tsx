'use client';
import { createContext, PropsWithChildren, useContext } from 'react';
import * as schema from '../libs/db/schema';

interface AuthContextProps {
  profile?: typeof schema.memberProfile.$inferSelect;
  session?: {
    session: typeof schema.session.$inferSelect;
    user: typeof schema.user.$inferSelect;
  };
  isModerator?: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useSession() {
  const session = useContext(AuthContext);

  if (!session) {
    throw new Error('useSession must be used within an AuthProvider');
  }

  return session;
}

export function AuthProvider({ children, value }: PropsWithChildren<{ value: AuthContextProps }>) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
