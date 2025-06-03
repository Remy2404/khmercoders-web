import { getChatMetrics, getUserLeaderboard } from "@/libs/db/chatbot";
import { Metadata } from "next";
import { ChatMetricsChart } from "@/app/community/chat-metrics-chart";
import { UserLeaderboardComponent } from "@/app/community/user-leaderboard";
import { ClientOnly } from "@/components/atoms/client-only";

export const metadata: Metadata = {
  title: "Community Metrics | Khmer Coders",
  description:
    "Engagement metrics for the Khmer Coders community on Telegram and Discord",
};

export default async function CommunityPage() {
  const [chatMetrics, userLeaderboard] = await Promise.all([
    getChatMetrics(),
    getUserLeaderboard(30), // Get top 10 users
  ]);

  return (
    <div className="container py-12 px-2">
      <div className="mx-auto max-w-5xl space-y-8 font-mono">
        <div className="space-y-2 text-lg">
          <h1 className="text-3xl font-bold tracking-tight">
            Community Engagement
          </h1>
          <p>
            Metrics showing activity in our Telegram and Discord communities
            over the last 30 days.
          </p>
        </div>
        <ClientOnly>
          <ChatMetricsChart data={chatMetrics} />
        </ClientOnly>
        <UserLeaderboardComponent data={userLeaderboard} />
      </div>
    </div>
  );
}
