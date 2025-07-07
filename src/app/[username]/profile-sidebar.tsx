'use client';

import { useSession } from '@/components/auth-provider';
import { ProfileRecord } from '@/types';
import { ProfileAiAssistance } from './ai-assistance';

export function ProfileSidebar({ profile }: { profile: ProfileRecord }) {
  const { session } = useSession();

  return (
    <div className="w-[400px] shrink-0 text-sm hidden lg:block">
      <div className="bg-card border p-2 rounded-lg text-muted-foreground">
        <div className="relative h-32 mb-2 overflow-hidden rounded">
          <img
            src="/kc-banner.png"
            alt="Khmer Coders Community Banner"
            className="object-cover w-full h-full"
          />
        </div>

        <p className="p-2">
          Founded in 2018, Khmer Coders has grown to become Cambodia&apos;s largest coding
          community. We bring together developers, designers, and tech enthusiasts to learn, share,
          and grow together.
        </p>

        {session?.user.id === profile.userId && <ProfileAiAssistance />}
      </div>
    </div>
  );
}
