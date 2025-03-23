import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Github, Twitter, Linkedin, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-12 px-4">
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-yellow-500 mb-8">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Community Members</h1>
          <p className="text-xl text-gray-400">
            Meet the dedicated individuals who make Khmer Coders the largest coding community in Cambodia.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-20">
        {/* Founding Members Section */}
        <section className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gray-800 flex-grow"></div>
            <h2 className="text-2xl md:text-3xl font-bold px-6">Founding Members</h2>
            <div className="h-px bg-gray-800 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foundingMembers.map((member, index) => (
              <FounderCard key={index} member={member} />
            ))}
          </div>
        </section>

        {/* Volunteers Section */}
        <section className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gray-800 flex-grow"></div>
            <h2 className="text-2xl md:text-3xl font-bold px-6">Volunteers</h2>
            <div className="h-px bg-gray-800 flex-grow"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {volunteers.map((member, index) => (
              <SimpleMemberCard key={index} member={member} />
            ))}
          </div>
        </section>

        {/* Community Moderators Section */}
        <section>
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gray-800 flex-grow"></div>
            <h2 className="text-2xl md:text-3xl font-bold px-6">Community Moderators</h2>
            <div className="h-px bg-gray-800 flex-grow"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {moderators.map((member, index) => (
              <SimpleMemberCard key={index} member={member} />
            ))}
          </div>
        </section>

        {/* Join the Team CTA */}
        <section className="mt-24 bg-gray-900 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to Join Our Team?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to help grow our community. If you're interested in
            volunteering or becoming a moderator, get in touch!
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Apply to Volunteer</Button>
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

// Founder Card Component with detailed bio
function FounderCard({ member }) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 flex flex-col h-full">
      <div className="p-6 flex flex-col items-center">
        <div className="h-32 w-32 rounded-full overflow-hidden relative mb-4">
          <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
        </div>
        <h3 className="text-xl font-bold mb-1 text-center">{member.name}</h3>
        <p className="text-yellow-500 mb-4 text-center">{member.role}</p>
        <p className="text-gray-400 mb-4 text-center">{member.bio}</p>
      </div>
      <div className="p-4 pt-0 flex justify-center gap-4 mt-auto">
        {member.github && (
          <Link href={member.github} className="text-gray-400 hover:text-white">
            <Github className="h-5 w-5" />
          </Link>
        )}
        {member.twitter && (
          <Link href={member.twitter} className="text-gray-400 hover:text-white">
            <Twitter className="h-5 w-5" />
          </Link>
        )}
        {member.linkedin && (
          <Link href={member.linkedin} className="text-gray-400 hover:text-white">
            <Linkedin className="h-5 w-5" />
          </Link>
        )}
        {member.website && (
          <Link href={member.website} className="text-gray-400 hover:text-white">
            <Globe className="h-5 w-5" />
          </Link>
        )}
      </div>
    </div>
  )
}

// Simple Member Card Component without bio
function SimpleMemberCard({ member }) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 flex flex-col items-center">
      <div className="h-20 w-20 rounded-full overflow-hidden relative mb-3">
        <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
      </div>
      <h3 className="font-medium text-center">{member.name}</h3>
      <p className="text-yellow-500 text-sm mb-3 text-center">{member.role}</p>
      <div className="flex gap-2">
        {member.github && (
          <Link href={member.github} className="text-gray-400 hover:text-white">
            <Github className="h-4 w-4" />
          </Link>
        )}
        {member.twitter && (
          <Link href={member.twitter} className="text-gray-400 hover:text-white">
            <Twitter className="h-4 w-4" />
          </Link>
        )}
        {member.linkedin && (
          <Link href={member.linkedin} className="text-gray-400 hover:text-white">
            <Linkedin className="h-4 w-4" />
          </Link>
        )}
        {member.website && (
          <Link href={member.website} className="text-gray-400 hover:text-white">
            <Globe className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

// Sample Data
const foundingMembers = [
  {
    name: "Visal Sak",
    role: "Founder & Lead Organizer",
    bio: "Software engineer with 10+ years of experience. Founded Khmer Coders in 2018 to build a supportive tech community in Cambodia.",
    image: "/placeholder.svg?height=400&width=400",
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  },
  {
    name: "Borey Chum",
    role: "Co-founder & Technical Lead",
    bio: "Full-stack developer specializing in web technologies. Passionate about teaching coding to the next generation of Cambodian developers.",
    image: "/placeholder.svg?height=400&width=400",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Channary Kok",
    role: "Co-founder & Community Manager",
    bio: "UX designer and community builder. Focuses on creating inclusive spaces for women in tech throughout Cambodia.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  },
]

const volunteers = [
  {
    name: "Sopheap Meas",
    role: "Event Coordinator",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Ratanak Lim",
    role: "Workshop Facilitator",
    image: "/placeholder.svg?height=400&width=400",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Sothea Tep",
    role: "Content Creator",
    image: "/placeholder.svg?height=400&width=400",
    website: "https://example.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Veasna Pich",
    role: "Outreach Coordinator",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Sokhom Ny",
    role: "Technical Writer",
    image: "/placeholder.svg?height=400&width=400",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Chenda Pov",
    role: "Design Lead",
    image: "/placeholder.svg?height=400&width=400",
    website: "https://example.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Piseth Meng",
    role: "Hackathon Organizer",
    image: "/placeholder.svg?height=400&width=400",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Theary Heng",
    role: "Student Liaison",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "https://linkedin.com",
  },
]

const moderators = [
  {
    name: "Sovann Heng",
    role: "Discord Moderator",
    image: "/placeholder.svg?height=400&width=400",
    github: "https://github.com",
    discord: "https://discord.com",
  },
  {
    name: "Kunthea Nhep",
    role: "Facebook Group Moderator",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Makara Sun",
    role: "Telegram Channel Moderator",
    image: "/placeholder.svg?height=400&width=400",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Samnang Chhun",
    role: "GitHub Organization Moderator",
    image: "/placeholder.svg?height=400&width=400",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
]

