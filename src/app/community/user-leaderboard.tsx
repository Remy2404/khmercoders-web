import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/generated/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/generated/table";
import { UserLeaderboard } from "@/libs/db/chatbot";

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

      <Table className="border border-4 border-double border-gray-400 my-4 rounded-lg">
        <TableHeader>
          <TableRow className="border-gray-400">
            <TableHead className="w-12">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Messages</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((user, index) => (
            <TableRow
              key={`${user.platform}-${user.display_name}-${index}`}
              className="border-gray-400"
            >
              <TableCell className="font-medium border-gray-400">
                {index + 1}
              </TableCell>
              <TableCell className="border-gray-400">
                {user.platform === "telegram" ? (
                  <img
                    src="/telegram.svg"
                    alt="Telegram"
                    className="inline-block w-6 h-6 mr-2"
                  />
                ) : (
                  <img
                    src="/discord.svg"
                    alt="Discord"
                    className="inline-block w-6 h-6 mr-2"
                  />
                )}
                {user.display_name}
              </TableCell>
              <TableCell className="text-right border-gray-400">
                {user.message_count}
              </TableCell>
            </TableRow>
          ))}
          {sortedData.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-6 text-muted-foreground"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
