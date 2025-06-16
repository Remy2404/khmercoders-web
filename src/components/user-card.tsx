import * as schema from "@/libs/db/schema";
import { UserLevelBadge } from "./user-level-badge";
import Link from "next/link";

export function UserCard({ user, profile }: UserCardProps) {
  return (
    <Link
      href={`/@${profile.alias}`}
      className="flex gap-3 bg-zinc-950 p-2 rounded border items-center cursor-pointer hover:border-yellow-700 transition-colors"
    >
      {user.image && (
        <img src={user.image} className="rounded-full w-16 h-16 shrink-0" />
      )}
      <div className="flex flex-col justify-center">
        <div className="text-sm text-yellow-400">{user.name}</div>
        <div className="text-xs line-clamp-1">{profile.title}</div>
        <div className="mt-1">
          <UserLevelBadge level={user.level} />
        </div>
      </div>
    </Link>
  );
}

interface UserCardProps {
  user: typeof schema.user.$inferSelect;
  profile: typeof schema.memberProfile.$inferSelect;
}
