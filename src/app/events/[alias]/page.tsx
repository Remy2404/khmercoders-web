import { eventsDatabase } from "@/data/events";
import { notFound } from "next/navigation";
import Image from "next/image";
import { IPartner, IPartnerWithTags, partners } from "@/data/partners";
import { PartnerCard } from "@/components/atoms/partner-card";
import { Clock, Pin } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { alias: string };
}): Promise<Metadata> {
  const event = eventsDatabase.find((event) => event.id === params.alias);

  if (!event) {
    return {
      title: "Event Not Found | Khmer Coders",
      description: "The requested event could not be found.",
    };
  }

  return {
    title: `${event.title} | Khmer Coders`,
    description: event.description,
    openGraph: {
      images: [event.image],
      title: event.title,
      description: event.description,
      siteName: "Khmer Coders",
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: [event.image],
    },
  };
}

export default function EventDetailPage({
  params: { alias },
}: {
  params: { alias: string };
}) {
  const event = eventsDatabase.find((event) => event.id === alias);

  if (!event) {
    notFound();
  }

  const sponsors = event.sponsors
    .map((sponsor) => {
      const partner = partners.find((p) => p.id === sponsor.id);
      if (!partner) return null;
      return {
        ...partner,
        tags: { [sponsor.type]: 1 },
      };
    })
    .filter(Boolean) as IPartnerWithTags[];

  return (
    <main className="max-w-[1000px] mx-auto px-4 pb-20">
      <Image
        src={event.image}
        alt={event.title}
        width={1000}
        height={400}
        className="rounded-t-xl select-none object-cover w-full h-[400px] mb-6"
      />
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-400 flex gap-2 my-1 items-center">
        <Clock className="w-5 h-5" />
        {event.date}
      </p>
      {event.location && (
        <p className="text-gray-400 mb-4 flex my-1 gap-2 items-center">
          <Pin className="w-5 h-5" />
          {event.location}
        </p>
      )}

      <p className="text-gray-300 mb-6">{event.description}</p>

      <h2 className="text-xl font-bold my-4">Sponsors</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sponsors.map((sponsor) => (
          <PartnerCard key={sponsor.id} partner={sponsor} />
        ))}
      </div>
    </main>
  );
}
