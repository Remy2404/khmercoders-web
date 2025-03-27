import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Github,
  Twitter,
  Linkedin,
  Globe,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/generated/button";
import { Badge } from "@/components/generated/badge";
import { ICommunityMember } from "@/types";
import { entrepreneurs, risingStars, techLeaders } from "@/data/members";

export default function MembersPage() {
  return (
    <main className="container mx-auto px-4 pb-20">
      {/* Featured Members */}
      <section className="mb-20">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-gray-800 flex-grow"></div>
          <h2 className="text-2xl md:text-3xl font-bold px-6">Tech Leaders</h2>
          <div className="h-px bg-gray-800 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techLeaders.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* Entrepreneurs */}
      <section className="mb-20">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-gray-800 flex-grow"></div>
          <h2 className="text-2xl md:text-3xl font-bold px-6">
            Tech Entrepreneurs
          </h2>
          <div className="h-px bg-gray-800 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entrepreneurs.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* Rising Stars */}
      <section>
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-gray-800 flex-grow"></div>
          <h2 className="text-2xl md:text-3xl font-bold px-6">Rising Stars</h2>
          <div className="h-px bg-gray-800 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {risingStars.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* Join the Community CTA */}
      <section className="mt-24 bg-gray-900 rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Join Our Community
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Connect with these influential members and become part of Cambodia's
          largest tech community. Share knowledge, collaborate on projects, and
          grow your career.
        </p>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
          Join Khmer Coders
        </Button>
      </section>
    </main>
  );
}

function MemberCard({ member }: { member: ICommunityMember }) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 flex flex-col h-full">
      <div className="relative">
        <div className="h-48 w-full relative">
          <Image
            src={member.coverImage || "/placeholder.svg?height=400&width=600"}
            alt={`${member.name} cover`}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-gray-900 relative">
            <Image
              src={member.image || "/placeholder.svg?height=200&width=200"}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="p-6 pt-16 flex-grow flex flex-col">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold">{member.name}</h3>
          <p className="text-yellow-500">{member.role}</p>
        </div>

        {member.badges && member.badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {member.badges.map((badge, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-yellow-500/30 text-yellow-500"
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}

        <p className="text-gray-400 text-center mb-6">{member.shortBio}</p>

        <div className="flex justify-center gap-4 mb-6">
          {member.github && (
            <Link
              href={member.github}
              className="text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </Link>
          )}
          {member.twitter && (
            <Link
              href={member.twitter}
              className="text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
            </Link>
          )}
          {member.linkedin && (
            <Link
              href={member.linkedin}
              className="text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          )}
          {member.website && (
            <Link
              href={member.website}
              className="text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="h-5 w-5" />
            </Link>
          )}
        </div>

        <Link href={`/members/${member.id}`} className="mt-auto">
          <Button
            variant="outline"
            className="w-full border-gray-700 hover:bg-gray-800"
          >
            View Profile <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
