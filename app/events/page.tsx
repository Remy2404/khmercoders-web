import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Calendar, MapPin, Clock, ArrowRight, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-12 px-4">
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-yellow-500 mb-8">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Events</h1>
          <p className="text-xl text-gray-400">
            Join us for workshops, meetups, hackathons, and other tech events throughout Cambodia.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-20">
        {/* Upcoming Events Section */}
        <section className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gray-800 flex-grow"></div>
            <h2 className="text-2xl md:text-3xl font-bold px-6">Upcoming Events</h2>
            <div className="h-px bg-gray-800 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} event={event} isUpcoming={true} />
            ))}
          </div>
        </section>

        {/* Past Events Section */}
        <section>
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gray-800 flex-grow"></div>
            <h2 className="text-2xl md:text-3xl font-bold px-6">Past Events</h2>
            <div className="h-px bg-gray-800 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <EventCard key={index} event={event} isUpcoming={false} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
              View All Past Events <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Host an Event CTA */}
        <section className="mt-24 bg-gray-900 rounded-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to Host an Event?</h2>
              <p className="text-gray-400 mb-6">
                If you're interested in hosting a workshop, talk, or other tech event with Khmer Coders, we'd love to
                collaborate with you. We can provide venue support, promotion, and connect you with our community.
              </p>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Submit Event Proposal</Button>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative h-64 w-full max-w-md rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=400&width=600" alt="Host an event" fill className="object-cover" />
              </div>
            </div>
          </div>
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

// Event Card Component
interface Event {
  title: string;
  date: string;
  description: string;
  location?: string;
  time?: string;
  attendees?: string;
  image?: string;
  badge?: string;
}

function EventCard({ event, isUpcoming }: { event: Event; isUpcoming: boolean }) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        {event.badge && (
          <Badge className="absolute top-3 right-3 bg-yellow-500 text-black hover:bg-yellow-600">{event.badge}</Badge>
        )}
      </div>
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-2 text-yellow-500 mb-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{event.date}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-400 mb-4">{event.description}</p>

        <div className="space-y-2 mb-4">
          {event.location && (
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
          {event.time && (
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{event.time}</span>
            </div>
          )}
          {event.attendees && (
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <Users className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{event.attendees}</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 pt-0">
        {isUpcoming ? (
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">Register Now</Button>
        ) : (
          <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
            View Details
          </Button>
        )}
      </div>
    </div>
  )
}

// Sample Data
const upcomingEvents = [
  {
    title: "Web Development Workshop: React & Next.js",
    date: "March 25, 2025",
    description: "Learn modern web development techniques with React and Next.js in this hands-on workshop.",
    location: "Factory Phnom Penh, Innovation Hub",
    time: "9:00 AM - 5:00 PM",
    image: "/placeholder.svg?height=400&width=600",
    badge: "Workshop",
  },
  {
    title: "Phnom Penh Tech Meetup",
    date: "April 10, 2025",
    description: "Network with local developers and tech companies in a casual setting with lightning talks.",
    location: "BattleBridge Co-working Space",
    time: "6:30 PM - 9:00 PM",
    image: "/placeholder.svg?height=400&width=600",
    badge: "Networking",
  },
  {
    title: "Cambodia Code Hackathon",
    date: "May 15-16, 2025",
    description: "48-hour hackathon to build solutions for local challenges. Open to all skill levels.",
    location: "Royal University of Phnom Penh",
    time: "Starts at 9:00 AM",
    image: "/placeholder.svg?height=400&width=600",
    badge: "Hackathon",
  },
]

const pastEvents = [
  {
    title: "Mobile App Development with Flutter",
    date: "February 12, 2025",
    description: "Introduction to cross-platform mobile development using Flutter framework.",
    location: "Institute of Technology of Cambodia",
    attendees: "120+ attendees",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Women in Tech Cambodia",
    date: "January 28, 2025",
    description: "Panel discussion featuring leading women in Cambodia's tech industry sharing their experiences.",
    location: "Raintree Cambodia",
    attendees: "85+ attendees",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "DevOps & Cloud Computing Workshop",
    date: "December 15, 2024",
    description: "Hands-on workshop covering Docker, Kubernetes, and cloud deployment strategies.",
    location: "Factory Phnom Penh",
    attendees: "65+ attendees",
    image: "/placeholder.svg?height=400&width=600",
  },
]

