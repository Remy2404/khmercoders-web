import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  Github,
  Twitter,
  Linkedin,
  Globe,
  MapPin,
  Briefcase,
  Award,
  Calendar,
  GraduationCap,
} from "lucide-react";

import { Button } from "@/components/generated/button";
import { Badge } from "@/components/generated/badge";
import {
  entrepreneurs,
  memberProfiles,
  risingStars,
  techLeaders,
} from "@/data/member-profiles";

// This would typically come from a database
const getMembers = () => {
  return [...techLeaders, ...entrepreneurs, ...risingStars];
};

interface Params {
  id: string;
}

export async function generateMetadata({ params }: { params: Params }) {
  const members = getMembers();
  const member = members.find((m) => m.id === params.id);

  if (!member) {
    return {
      title: "Member Not Found | Khmer Coders",
      description: "The requested member profile could not be found.",
    };
  }

  return {
    title: `${member.name} | Khmer Coders`,
    description: member.shortBio,
  };
}

export default function MemberProfile({ params }: { params: Params }) {
  const members = getMembers();
  const member = members.find((m) => m.id === params.id);

  if (!member) {
    notFound();
  }

  // Combine the sample data with the detailed profile data
  const profile = {
    ...member,
    ...(memberProfiles[params.id as keyof typeof memberProfiles] || {}),
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Cover Image */}
      <div className="relative h-64 md:h-80 w-full">
        <Image
          src={profile.coverImage || "/placeholder.svg?height=400&width=1200"}
          alt={`${profile.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>

        <div className="container mx-auto px-4 relative h-full flex items-end pb-6">
          <Link
            href="/members"
            className="absolute top-6 left-4 inline-flex items-center text-sm text-white bg-black/50 hover:bg-black/70 px-3 py-1 rounded-full"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Members
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              {/* Profile Image and Basic Info */}
              <div className="md:w-1/3 flex flex-col items-center md:items-start">
                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-gray-900 relative mb-4">
                  <Image
                    src={
                      profile.image || "/placeholder.svg?height=200&width=200"
                    }
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-1 text-center md:text-left">
                  {profile.name}
                </h1>
                <p className="text-yellow-500 mb-4 text-center md:text-left">
                  {profile.role}
                </p>

                {profile.location && (
                  <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}

                {profile.badges && profile.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {profile.badges.map((badge, index) => (
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

                <div className="flex gap-4 mb-6">
                  {profile.github && (
                    <Link
                      href={profile.github}
                      className="text-gray-400 hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                  )}
                  {profile.twitter && (
                    <Link
                      href={profile.twitter}
                      className="text-gray-400 hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-5 w-5" />
                    </Link>
                  )}
                  {profile.linkedin && (
                    <Link
                      href={profile.linkedin}
                      className="text-gray-400 hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  )}
                  {profile.website && (
                    <Link
                      href={profile.website}
                      className="text-gray-400 hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="h-5 w-5" />
                    </Link>
                  )}
                </div>

                {profile.skills && (
                  <div className="w-full">
                    <h3 className="font-bold mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="bg-gray-800 hover:bg-gray-700 text-white"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bio and Experience */}
              <div className="md:w-2/3">
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">About</h2>
                  <div className="text-gray-300 space-y-4">
                    {profile.bio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {profile.experience && profile.experience.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <Briefcase className="mr-2 h-5 w-5 text-yellow-500" />
                      Work Experience
                    </h2>
                    <div className="space-y-6">
                      {profile.experience.map((exp, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-gray-800 pl-4 pb-2"
                        >
                          <h3 className="font-bold">{exp.role}</h3>
                          <p className="text-yellow-500">{exp.company}</p>
                          <p className="text-sm text-gray-400 mb-2">
                            {exp.period}
                          </p>
                          <p className="text-gray-300">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {profile.achievements && profile.achievements.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <Award className="mr-2 h-5 w-5 text-yellow-500" />
                      Achievements
                    </h2>
                    <div className="space-y-4">
                      {profile.achievements.map((achievement, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg">
                          <h3 className="font-bold">{achievement.title}</h3>
                          <p className="text-sm text-gray-400 mb-1">
                            {achievement.year}
                          </p>
                          <p className="text-gray-300">
                            {achievement.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {profile.education && profile.education.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5 text-yellow-500" />
                      Education
                    </h2>
                    <div className="space-y-4">
                      {profile.education.map((edu, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-gray-800 pl-4 pb-2"
                        >
                          <h3 className="font-bold">{edu.degree}</h3>
                          <p className="text-yellow-500">{edu.institution}</p>
                          <p className="text-sm text-gray-400">{edu.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Community Contributions */}
        {profile.contributions && (
          <div className="mt-8 bg-gray-900 rounded-lg border border-gray-800 p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-yellow-500" />
              Contributions to Khmer Coders
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.contributions.map((contribution, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">{contribution.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {contribution.date}
                  </p>
                  <p className="text-gray-300">{contribution.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connect CTA */}
        <div className="mt-8 mb-20 text-center">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Connect with {profile.name.split(" ")[0]}
          </Button>
        </div>
      </div>

      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Khmer Coders. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
