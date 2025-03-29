import Link from "next/link";
import Image from "next/image";
import {
  Code,
  Users,
  Calendar,
  MessageSquare,
  ChevronRight,
  Github,
  Twitter,
} from "lucide-react";

import { Button } from "@/components/generated/button";

export default function LandingPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Cambodia&apos;s Largest{" "}
              <span className="text-yellow-500">Coding Community</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl">
              Connecting developers, sharing knowledge, and building the future
              of tech in Cambodia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Join Our Community
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Learn More <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 relative w-full md:w-auto">
            <div className="relative h-[350px] w-full md:w-[500px] rounded-lg overflow-hidden border-2 border-gray-800">
              <Image
                src="/hero-banner.jpg"
                alt="Khmer Coders Community"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-2 md:-bottom-6 left-2 md:-left-6 bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">10,000+</p>
                  <p className="text-sm text-gray-400">Community Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center gap-4">
                <Users className="h-10 w-10 text-yellow-500" />
                <div>
                  <p className="text-3xl font-bold">10,000+</p>
                  <p className="text-gray-400">Active Members</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center gap-4">
                <Calendar className="h-10 w-10 text-blue-500" />
                <div>
                  <p className="text-3xl font-bold">6+</p>
                  <p className="text-gray-400">Events Per Year</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center gap-4">
                <MessageSquare className="h-10 w-10 text-green-500" />
                <div>
                  <p className="text-3xl font-bold">10+</p>
                  <p className="text-gray-400">Partner Companies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto py-20 px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About Khmer Coders
          </h2>
          <p className="text-gray-400 text-lg">
            Founded in 2018, Khmer Coders has grown to become Cambodia&apos;s
            largest coding community. We bring together developers, designers,
            and tech enthusiasts to learn, share, and grow together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <div className="h-12 w-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Inclusive Community</h3>
            <p className="text-gray-400">
              We welcome developers of all skill levels, from beginners to
              experts, creating a supportive environment for everyone.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
              <Code className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Skill Development</h3>
            <p className="text-gray-400">
              Regular workshops, hackathons, and coding sessions to help members
              improve their technical skills.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
              <Calendar className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Networking</h3>
            <p className="text-gray-400">
              Connect with industry professionals, find mentors, and discover
              job opportunities in Cambodia&apos;s tech sector.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Upcoming Events
            </h2>
            <p className="text-gray-400 text-lg">
              Join us for our regular meetups, workshops, and special events
              throughout the year.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black rounded-lg overflow-hidden border border-gray-800">
              <div className="h-48 relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Hackathon Event"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-yellow-500 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">March 25, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Web Development Workshop
                </h3>
                <p className="text-gray-400 mb-4">
                  Learn modern web development techniques with React and
                  Next.js.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 hover:bg-gray-800"
                >
                  Register Now
                </Button>
              </div>
            </div>

            <div className="bg-black rounded-lg overflow-hidden border border-gray-800">
              <div className="h-48 relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Meetup Event"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-yellow-500 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">April 10, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Phnom Penh Tech Meetup
                </h3>
                <p className="text-gray-400 mb-4">
                  Network with local developers and tech companies in a casual
                  setting.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 hover:bg-gray-800"
                >
                  Register Now
                </Button>
              </div>
            </div>

            <div className="bg-black rounded-lg overflow-hidden border border-gray-800">
              <div className="h-48 relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Hackathon Event"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-yellow-500 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">May 15-16, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Cambodia Code Hackathon
                </h3>
                <p className="text-gray-400 mb-4">
                  48-hour hackathon to build solutions for local challenges.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 hover:bg-gray-800"
                >
                  Register Now
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              View All Events <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="community" className="container mx-auto py-20 px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Community Voices
          </h2>
          <p className="text-gray-400 text-lg">
            Hear from our members about their experiences with Khmer Coders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <p className="text-gray-300 mb-6">
              "Joining Khmer Coders was a turning point in my career. The
              community helped me learn new skills and find my current job as a
              frontend developer."
            </p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Testimonial"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Sokha Chea</p>
                <p className="text-sm text-gray-400">Frontend Developer</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <p className="text-gray-300 mb-6">
              "The workshops and mentorship I received through Khmer Coders
              helped me transition from a student to a professional software
              engineer."
            </p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Testimonial"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Dara Kim</p>
                <p className="text-sm text-gray-400">Software Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-yellow-900/40 to-gray-900/40 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Cambodia&apos;s Largest Coding Community
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Connect with fellow developers, learn new skills, and be part of the
            growing tech ecosystem in Cambodia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              Join Our Discord
            </Button>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10"
            >
              Attend Next Event
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
