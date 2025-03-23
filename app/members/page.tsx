import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Github, Twitter, Linkedin, Globe, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-12 px-4">
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-yellow-500 mb-8">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Influential Members</h1>
          <p className="text-xl text-gray-400">
            Meet the talented individuals who are driving Cambodia's tech ecosystem forward through their contributions
            to Khmer Coders.
          </p>
        </div>
      </header>

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
            <h2 className="text-2xl md:text-3xl font-bold px-6">Tech Entrepreneurs</h2>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Connect with these influential members and become part of Cambodia's largest tech community. Share
            knowledge, collaborate on projects, and grow your career.
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Join Khmer Coders</Button>
        </section>
      </main>

      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Khmer Coders. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Member Card Component
// Define the Member type
interface IMember {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  bio?: string;
  badges?: string[];
  image?: string;
  coverImage?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

function MemberCard({ member }: { member: IMember }) {
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
              <Badge key={index} variant="outline" className="border-yellow-500/30 text-yellow-500">
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
          <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
            View Profile <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

// Sample Data
const techLeaders = [
  {
    id: "visal-sok",
    name: "Visal Sok",
    role: "CTO at TechCambodia",
    shortBio:
      "15+ years of experience in software development. Leading technical innovation at one of Cambodia's largest tech companies.",
    badges: ["AWS Certified", "Tech Speaker", "Open Source Contributor"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  },
  {
    id: "dara-hok",
    name: "Dara Hok",
    role: "Lead Engineer at Google",
    shortBio:
      "Software engineer with experience at global tech companies. Specializes in machine learning and AI applications.",
    badges: ["Google Developer Expert", "AI Specialist", "PhD in Computer Science"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "bopha-pich",
    name: "Bopha Pich",
    role: "Senior Developer Advocate",
    shortBio: "Developer advocate focusing on cloud technologies. Regular speaker at international tech conferences.",
    badges: ["Cloud Expert", "Tech Educator", "Community Builder"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  },
]

const entrepreneurs = [
  {
    id: "sovann-tech",
    name: "Sovann Tech",
    role: "Founder & CEO of KhmerDev",
    shortBio: "Founded KhmerDev, a successful software development company employing over 50 Cambodian developers.",
    badges: ["Startup Founder", "Tech Investor", "Mentor"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  },
  {
    id: "channary-rin",
    name: "Channary Rin",
    role: "Co-founder of EduTech Cambodia",
    shortBio: "Building educational technology solutions to improve access to quality education across Cambodia.",
    badges: ["EdTech Pioneer", "Social Entrepreneur", "Women in Tech"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "makara-pen",
    name: "Makara Pen",
    role: "Founder of FinTech Startup",
    shortBio: "Developing innovative financial technology solutions to increase financial inclusion in Cambodia.",
    badges: ["FinTech Innovator", "Blockchain Expert", "Angel Investor"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  },
]

const risingStars = [
  {
    id: "sokha-meas",
    name: "Sokha Meas",
    role: "Frontend Developer & UI/UX Designer",
    shortBio:
      "Award-winning designer creating beautiful and accessible web experiences. Active open source contributor.",
    badges: ["UI/UX Specialist", "React Expert", "Design Systems"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    twitter: "https://twitter.com",
    website: "https://example.com",
  },
  {
    id: "veasna-kim",
    name: "Veasna Kim",
    role: "Mobile App Developer",
    shortBio:
      "Self-taught developer who has published several popular mobile apps with over 500,000 combined downloads.",
    badges: ["Flutter Expert", "Firebase Specialist", "Mobile UI"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "theary-choun",
    name: "Theary Choun",
    role: "Data Scientist & ML Engineer",
    shortBio: "Working on machine learning applications to solve local challenges in agriculture and healthcare.",
    badges: ["AI Researcher", "Python Expert", "TensorFlow"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
]

