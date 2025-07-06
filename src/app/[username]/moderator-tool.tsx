'use client';

import { useSession } from '@/components/auth-provider';
import { Button } from '@/components/generated/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/generated/dropdown-menu';
import { MODERATOR_ACCESS } from '@/constants';
import { promoteUserLevelAction } from '@/server/actions/admin';
import { UserLevel, UserRecord } from '@/types';
import { useMemo } from 'react';

export function UserModeratorTool({ user }: { user: UserRecord }) {
  const { session } = useSession();

  const levels = useMemo(() => {
    return [
      { level: UserLevel.Regular, label: 'Regular' },
      { level: UserLevel.Premium, label: 'Premium' },
      { level: UserLevel.Contributor, label: 'Contributor' },
      { level: UserLevel.Moderator, label: 'Moderator' },
      { level: UserLevel.Director, label: 'Director' },
    ];
  }, []);

  if (!session?.user) {
    return null;
  }

  if (!MODERATOR_ACCESS.includes(session.user.level)) {
    return null;
  }

  return (
    <div className="mx-auto container p-2 px-4 flex items-center my-2 border border-2 border-orange-500 bg-orange-200/20 rounded-md gap-2">
      <div className="text-sm grow">Moderation Tools</div>

      {session.user.level === UserLevel.SuperAdmin && (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size={'sm'} variant={'outline'}>
              Promote
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {levels.map(item => (
              <DropdownMenuItem
                key={item.level}
                onClick={async () => {
                  promoteUserLevelAction(user.id, item.level)
                    .then(() => {
                      window.location.reload();
                    })
                    .catch();
                }}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
