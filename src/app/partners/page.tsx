import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

import {
  type IPartner,
  IPartnerWithTags,
  partners as PartnerDatabase,
  SponsorType,
} from "@/data/partners";
import { useMemo } from "react";
import { cn } from "@/utils";
import { eventsDatabase } from "@/data/events";
import { PartnerCard } from "@/components/atoms/partner-card";

function calculateScore(partner: IPartnerWithTags) {
  return (
    (partner.tags["Gold Sponsor"] ?? 0) * 700 +
    (partner.tags["Silver Sponsor"] ?? 0) * 300 +
    (partner.tags["Co-organizer"] ?? 0) * 150 +
    (partner.tags["Venue"] ?? 0) * 150 +
    (partner.tags["Media Partner"] ?? 0) * 100 +
    (partner.tags["Ticket Partner"] ?? 0) * 100
  );
}

export default async function PartnersPage() {
  const partners = PartnerDatabase.map((partner) => {
    return {
      ...partner,
      tags: eventsDatabase.reduce((acc, event) => {
        const tag = event.sponsors.find((sponsor) => sponsor.id === partner.id);
        if (tag) {
          acc[tag.type] = (acc[tag.type] ?? 0) + 1;
        }
        return acc;
      }, {} as Record<SponsorType, number>),
    } as IPartnerWithTags;
  }).sort((a, b) => {
    const aScore = calculateScore(a);
    const bScore = calculateScore(b);

    if (aScore === bScore) {
      // Sort by name if scores are equal
      return a.name.localeCompare(b.name);
    }

    return bScore - aScore;
  });

  return (
    <main className="container mx-auto px-4 pb-20">
      <section className="mb-20" aria-labelledby="partners-heading">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-gray-800 flex-grow" />
          <h2
            id="partners-heading"
            className="text-2xl md:text-3xl font-bold px-6"
          >
            Partners
          </h2>
          <div className="h-px bg-gray-800 flex-grow" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </section>
    </main>
  );
}
