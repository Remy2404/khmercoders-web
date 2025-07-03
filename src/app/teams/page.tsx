import { UserCard } from '@/components/user-card';
import { foundingMembers } from '@/data/teams';
import { getUserFromLevels } from '@/libs/users';
import { ITeamMember, UserLevel } from '@/types';
import { Github, Globe, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 0; // This disables static generation and makes the page dynamic

export default async function TeamsPage() {
  const members = await getUserFromLevels([UserLevel.Moderator]);

  return (
    <main className="container mx-auto px-4 pb-20">
      {/* Founding Members Section */}
      <section className="mb-20">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-border flex-grow"></div>
          <h2 className="text-2xl md:text-3xl font-bold px-6">Founding Members</h2>
          <div className="h-px bg-border flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foundingMembers.map((member, index) => (
            <FounderCard key={index} member={member} />
          ))}
        </div>
      </section>

      {/* Community Moderators Section */}
      <section>
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-border flex-grow"></div>
          <h2 className="text-2xl md:text-3xl font-bold px-6">Moderators</h2>
          <div className="h-px bg-border flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map(member => {
            return (
              <UserCard key={member.user.id} user={member.user} profile={member.member_profile} />
            );
          })}
        </div>
      </section>
    </main>
  );
}

function FounderCard({ member }: { member: ITeamMember }) {
  return (
    <div className="bg-secondary rounded-lg overflow-hidden border border-border flex flex-col h-full">
      <div className="p-6 flex flex-col items-center">
        <div className="h-32 w-32 rounded-full overflow-hidden relative mb-4">
          <Image
            src={member.image || '/placeholder.svg'}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-xl font-bold mb-1 text-center">{member.name}</h3>
        <p className="text-yellow-500 mb-4 text-center">{member.role}</p>
        <p className="text-muted-foreground mb-4 text-center">{member.bio}</p>
      </div>
      <div className="p-4 pt-0 flex justify-center gap-4 mt-auto">
        {member.github && (
          <Link href={member.github} className="text-muted-foreground hover:text-foreground">
            <Github className="h-5 w-5" />
          </Link>
        )}
        {member.twitter && (
          <Link href={member.twitter} className="text-muted-foreground hover:text-foreground">
            <Twitter className="h-5 w-5" />
          </Link>
        )}
        {member.linkedin && (
          <Link href={member.linkedin} className="text-muted-foreground hover:text-foreground">
            <Linkedin className="h-5 w-5" />
          </Link>
        )}
        {member.website && (
          <Link href={member.website} className="text-muted-foreground hover:text-foreground">
            <Globe className="h-5 w-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
