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

      <Table className="border-double border-4 border-foreground my-4 rounded-lg bg-card">
        <TableHeader>
          <TableRow className="border-foreground">
            <TableHead className="w-12">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Linked</TableHead>
            <TableHead className="text-right">Messages</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((user, index) => (
            <TableRow
              key={`${user.platform}-${user.display_name}-${index}`}
              className="border-foreground"
            >
              <TableCell className="font-medium border-foreground">{index + 1}</TableCell>
              <TableCell className="border-foreground font-bold">
                {user.platform === 'telegram' ? (
                  <Send className="inline-block w-5 h-5 mr-2 text-blue-500" />
                ) : (
                  <DiscordIcon className="inline-block w-5 h-5 mr-2 text-purple-500" />
                )}
                {user.display_name}
              </TableCell>
              <TableCell>
                {user.user ? (
                  user.user.profile ? (
                    <Link href={`/@${user.user.id}`} className="flex gap-2 items-center">
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
  );
}
