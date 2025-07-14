import { DiscordIcon } from '@/components/atoms/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/generated/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/generated/table';
import { UserLevelBadge } from '@/components/user-level-badge';
import { UserLeaderboard } from '@/libs/db/chatbot';
import { Send } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

interface UserLeaderboardProps {
  data: UserLeaderboard[];
}

export function UserLeaderboardComponent({ data }: UserLeaderboardProps) {
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => b.message_count - a.message_count);
  }, [data]);

  return (
    <div className="font-mono text-lg">
      <h2 className="text-2xl font-bold">Top Contributors</h2>
      <p>Most active members in our community chats over the last 30 days</p>

      <div className="border rounded bg-card my-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Messages</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((user, index) => (
              <TableRow key={`${user.platform}-${user.display_name}-${index}`}>
                <TableCell className="font-medium border-foreground">{index + 1}</TableCell>
                <TableCell className="border-foreground font-bold">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 relative">
                      <Avatar className="w-10 h-10">
                        {user.user?.image ? (
                          <AvatarImage src={user.user.image} />
                        ) : (
                          <AvatarFallback />
                        )}
                      </Avatar>
                      <div className="w-6 h-6 absolute -bottom-2 -right-2 bg-gray-600 flex items-center justify-center rounded-full">
                        {user.platform === 'telegram' ? (
                          <Send className="w-4 h-4 text-white" />
                        ) : (
                          <DiscordIcon className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className={user.user ? 'flex gap-2 mb-1' : 'flex gap-2'}>
                        {user.user?.profile ? (
                          <Link className="hover:underline" href={`/@${user.user.profile.alias}`}>
                            {user.display_name}
                          </Link>
                        ) : (
                          <span>{user.display_name}</span>
                        )}
                        {user.user && <UserLevelBadge level={user.user.level} />}
                      </p>
                      {user.user && (
                        <p className="text-gray-600 dark:text-gray-400 font-medium text-xs">
                          Linking to {user.user.name}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right border-gray-400">{user.message_count}</TableCell>
              </TableRow>
            ))}
            {sortedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/*
                  {user.user ? (
                    user.user.profile?.alias ? (
                      <Link
                        href={`/@${user.user.profile.alias}`}
                        className="flex gap-2 items-center"
                      >
                        <Avatar className="h-6 w-6">
                          {user.user.image ? (
                            <AvatarImage src={user.user.image} />
                          ) : (
                            <AvatarFallback />
                          )}
                        </Avatar>
                        <span>{user.user.name}</span>
                      </Link>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <Avatar className="h-6 w-6">
                          {user.user.image ? (
                            <AvatarImage src={user.user.image} />
                          ) : (
                            <AvatarFallback />
                          )}
                        </Avatar>
                        <span>{user.user.name}</span>
                      </div>
                    )
                  ) : (
                    <span></span>
                  )}
*/
