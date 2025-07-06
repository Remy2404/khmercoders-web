import { UserCard } from '@/components/user-card';
import { USER_LEVEL_DESCRIPTION } from '@/constants';
import { getUserFromLevels } from '@/libs/users';
import { ITeamMember, UserLevel } from '@/types';
import { Github, Globe, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 0; // This disables static generation and makes the page dynamic

export default async function TeamsPage() {
  const members = await getUserFromLevels([
    UserLevel.Contributor,
    UserLevel.Moderator,
    UserLevel.SuperAdmin,
    UserLevel.Premium,
  ]);

  const userPerGroup = Object.entries(USER_LEVEL_DESCRIPTION)
    .map(([level, info]) => {
      const userLevel = Number(level) as UserLevel;

      return {
        level: userLevel,
        info,
        users: members.filter(member => member.user.level === userLevel),
      };
    })
    .filter(group => group.users.length > 0)
    .sort((a, b) => b.level - a.level);

  return (
    <main className="container mx-auto px-4 pb-20 flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Meet the People Behind Khmer Coders</h1>
      <div className="max-w-3xl text-base text-muted-foreground">
        <p>
          Our community thrives thanks to the dedication and passion of many individuals who
          contribute their time, skills, and knowledge. Everyone in the Khmer Coders community plays
          a vital role in our collective growth and success.
        </p>
        <p className="mt-2">
          We are deeply grateful for their continuous support and commitment to advancing the tech
          landscape in Cambodia. Below are some of the outstanding members who help drive our
          mission forward and foster a collaborative environment for learning and innovation.
        </p>
      </div>

      {userPerGroup.map(group => (
        <section>
          <div className="my-4">
            <h2 className="text-lg font-bold">{group.info.name}</h2>
            <p className="text-muted-foreground text-sm">{group.info.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.users.map(member => {
              return (
                <UserCard key={member.user.id} user={member.user} profile={member.member_profile} />
              );
            })}
          </div>
        </section>
      ))}

      <p className="text-muted-foreground text-sm">
        and other <strong>12,000+ members</strong> who are actively participating in our community.
      </p>
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
