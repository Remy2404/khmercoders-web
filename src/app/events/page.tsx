import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

import { Badge } from "@/components/generated/badge";
import { type EventData, eventsDatabase } from "@/data/events";

export default async function EventsPage() {
  const eventsReversed = [...eventsDatabase].reverse();

  return (
    <main className="container mx-auto px-4 pb-20">
      <section className="mb-20">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-gray-800 flex-grow"></div>
          <h2 className="text-2xl md:text-3xl font-bold px-6">Events</h2>
          <div className="h-px bg-gray-800 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsReversed.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </main>
  );
}

function EventCard({ event }: { event: EventData }) {
  return (
    <Link
      className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 flex flex-col h-full"
      href={`/events/${event.id}`}
    >
      <div className="relative h-48 w-full">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
        />
        {event.badge && (
          <Badge className="absolute top-3 right-3 bg-yellow-500 text-black hover:bg-yellow-600">
            {event.badge}
          </Badge>
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
        </div>
      </div>
    </Link>
  );
}
