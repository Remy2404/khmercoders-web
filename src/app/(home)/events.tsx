import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Map } from 'lucide-react';
import { AspectRatio } from '@/components/generated/aspect-ratio';
import { eventsDatabase } from '@/data/events';

export function HomeEventSection() {
  const events = [...eventsDatabase].reverse().slice(0, 3);

  return (
    <div className="container mx-auto text-lg tracking-tight font-mono">
      <h2 className="font-retro text-5xl my-4">Events</h2>
      <p className="font-mono my-4">
        Join us for our regular meetups, workshops, and special events throughout the year.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => {
          return (
            <Link
              href={`/events/${event.id}`}
              key={event.id}
              className="border border-4 border-gray-400 border-double p-4 font-mono"
            >
              <div className="w-full relative">
                <AspectRatio ratio={16 / 9}>
                  <Image src={event.image} alt={event.title} fill className="object-cover" />
                </AspectRatio>
              </div>
              <div className="my-2">
                <h3 className="text-yellow-500 hover:underline hover:decoration-double my-2 text-lg">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    {event.date} - {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Map className="h-4 w-4" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
