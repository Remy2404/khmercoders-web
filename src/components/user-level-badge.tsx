import { UserLevel } from "@/types";
import { BadgeCheck, Crown, Shield } from "lucide-react";

export function UserLevelBadge({ level }: { level: UserLevel }) {
  if (level === UserLevel.SuperAdmin) {
    return (
      <span className="inline-flex  font-mono py-0.5 px-2 rounded text-xs bg-orange-500 items-center gap-1">
        <Crown className="w-3 h-3" />
        <span>Founder</span>
      </span>
    );
  }

  if (level === UserLevel.Moderator) {
    return (
      <span className="inline-flex font-mono py-0.5 px-2 rounded text-xs bg-blue-500 items-center gap-1">
        <Shield className="w-3 h-3" />
        <span>Moderator</span>
      </span>
    );
  }

  if (level === UserLevel.Premium) {
    return (
      <span className="inline-flex font-mono py-0.5 px-2 rounded text-xs bg-purple-500 items-center gap-1">
        <BadgeCheck className="w-3 h-3" />
        <span>Premium</span>
      </span>
    );
  }

  return null;
}
