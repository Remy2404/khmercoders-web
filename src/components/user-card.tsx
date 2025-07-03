import * as schema from '@/libs/db/schema';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './generated/avatar';
import { UserLevelBadge } from './user-level-badge';

export function UserCard({ user, profile }: UserCardProps) {
  return (
    <Link
      href={`/@${profile.alias}`}
      className="flex gap-3 bg-secondary p-3 rounded hover:ring-2 cursor-pointer transition-colors"
    >
      {user.image && <img src={user.image} className="rounded-full w-16 h-16 shrink-0" alt="" />}
      <div className="flex flex-col justify-center leading-tight">
        <div className="font-semibold">{user.name}</div>
        <div className="text-xs text-muted-foreground line-clamp-2">{profile.title}</div>
        <div className="mt-1.5">
          <UserLevelBadge level={user.level} />
        </div>
      </div>
    </Link>
  );
}

export function UserSmallCard({ user, profile }: UserCardProps) {
  return (
    <Link href={`/@${profile.alias}`} className="inline-flex gap-3">
      <Avatar>
        {user.image ? <AvatarImage src={user.image} alt={user.name} /> : <AvatarFallback />}
      </Avatar>

      <div className="flex flex-col justify-center leading">
        <div className="font-semibold text-sm">{user.name}</div>
        <div className="text-xs text-zinc-400 line-clamp-2">{profile.title}</div>
      </div>
    </Link>
  );
}

interface UserCardProps {
  user: typeof schema.user.$inferSelect;
  profile: typeof schema.memberProfile.$inferSelect;
}
