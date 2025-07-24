'use client';

import { createContext, PropsWithChildren, useContext } from 'react';

const ServerStatsContext = createContext<{
  telegramMembers: number;
  discordMembers: number;
  facebookMembers: number;
}>({
  telegramMembers: 0,
  discordMembers: 0,
  facebookMembers: 0,
});

export function useServerStats() {
  return useContext(ServerStatsContext);
}

export function ServerStatsProvider({
  telegramMembers,
  discordMembers,
  facebookMembers,
  children,
}: PropsWithChildren<{
  telegramMembers: number;
  discordMembers: number;
  facebookMembers: number;
}>) {
  return (
    <ServerStatsContext.Provider value={{ telegramMembers, discordMembers, facebookMembers }}>
      {children}
    </ServerStatsContext.Provider>
  );
}
