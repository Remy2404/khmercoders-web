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
    <Card>
      <CardHeader>
        <CardTitle>Top Contributors</CardTitle>
        <CardDescription>
          Most active members in our community chats over the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Messages</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((user, index) => (
              <TableRow key={`${user.platform}-${user.display_name}-${index}`}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="capitalize">{user.platform}</TableCell>
                <TableCell>{user.display_name}</TableCell>
                <TableCell className="text-right">
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
      </CardContent>
    </Card>
  );
}
