'use client';

import { getServerStats } from '@/server/services/stats';
import { ServerStats } from '@/types';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

const ServerStatsContext = createContext<ServerStats | undefined>(undefined);

export function useServerStats() {
  return useContext(ServerStatsContext);
}

export function ServerStatsProvider({ children }: PropsWithChildren) {
  const [stats, setStats] = useState<ServerStats>();

  useEffect(() => {
    getServerStats().then(setStats);
  }, []);

  return <ServerStatsContext.Provider value={stats}>{children}</ServerStatsContext.Provider>;
}
