'use client';

import { createContext, PropsWithChildren, useContext } from 'react';

const ServerStatsContext = createContext<{
  telegramMembers: number;
  discordMembers: number;
  facebookMembers: number;
  totalMembers: number;
}>({
  telegramMembers: 0,
  discordMembers: 0,
  facebookMembers: 0,
  totalMembers: 0,
});

export function useServerStats() {
  return useContext(ServerStatsContext);
}

export function ServerStatsProvider({
  telegramMembers,
  discordMembers,
  facebookMembers,
  totalMembers,
  children,
}: PropsWithChildren<{
  telegramMembers: number;
  discordMembers: number;
  facebookMembers: number;
  totalMembers: number;
}>) {
  return (
    <ServerStatsContext.Provider
      value={{ telegramMembers, discordMembers, facebookMembers, totalMembers }}
    >
      {children}
    </ServerStatsContext.Provider>
  );
}
