'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/generated/badge';
import { type EventData, eventsDatabase } from '@/data/events';

const LOCATION_CHIPS = ['All', 'Phnom Penh', 'Siem Reap'];

function getEventLocationGroup(location?: string): 'Phnom Penh' | 'Siem Reap' {
  if (!location) return 'Phnom Penh';
  return location.toLowerCase().includes('siem reap') ? 'Siem Reap' : 'Phnom Penh';
}

export default function EventsPage() {
  const [selectedLocation, setSelectedLocation] = useState<string>('All');

  const eventsReversed = useMemo(() => [...eventsDatabase].reverse(), []);

  const filteredEvents = useMemo(() => {
    if (selectedLocation === 'All') return eventsReversed;
    return eventsReversed.filter(
      event => getEventLocationGroup(event.location) === selectedLocation
    );
  }, [selectedLocation, eventsReversed]);

  return (
    <main className="container mx-auto px-4 pb-20">
      <section className="mb-20">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-border flex-grow"></div>
          <h2 className="text-2xl md:text-3xl font-bold px-6">Events</h2>
          <div className="h-px bg-border flex-grow"></div>
        </div>

        {/* Location Filter Chips */}
        <div className="flex flex-wrap gap-2 justify-start mb-8">
          {LOCATION_CHIPS.map(loc => (
            <button
              key={loc}
              className={`px-4 py-1 rounded-full border transition-colors text-sm font-medium
                ${
                  selectedLocation === loc
                    ? 'bg-yellow-500 text-black border-yellow-500'
                    : 'bg-secondary text-secondary-foreground border-border hover:bg-yellow-700 hover:text-black hover:border-yellow-700'
                }
              `}
              onClick={() => setSelectedLocation(loc)}
              type="button"
            >
              {loc}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
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
      className="bg-secondary text-secondary-foreground rounded-lg overflow-hidden border border-border flex flex-col h-full"
      href={`/events/${event.id}`}
    >
      <div className="relative h-48 w-full">
        <Image
          src={event.image || '/placeholder.svg'}
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
        <p className="text-muted-foreground mb-4">{event.description}</p>

        <div className="space-y-2 mb-4">
          {event.location && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
          {event.time && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{event.time}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
