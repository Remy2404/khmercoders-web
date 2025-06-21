'use client';

import { IPartnerWithTags, partners as PartnerDatabase, SponsorType } from '@/data/partners';
import { useMemo, useState } from 'react';
import { eventsDatabase } from '@/data/events';
import { PartnerCard } from '@/components/atoms/partner-card';

function calculateScore(partner: IPartnerWithTags) {
  return (
    (partner.tags['Gold Sponsor'] ?? 0) * 700 +
    (partner.tags['Silver Sponsor'] ?? 0) * 300 +
    (partner.tags['Co-organizer'] ?? 0) * 150 +
    (partner.tags['Venue'] ?? 0) * 150 +
    (partner.tags['Media Partner'] ?? 0) * 100 +
    (partner.tags['Ticket Partner'] ?? 0) * 100
  );
}

const SPONSOR_TYPES: (SponsorType | 'All')[] = [
  'All',
  'Gold Sponsor',
  'Silver Sponsor',
  'Co-organizer',
  'Venue',
  'Media Partner',
  'Ticket Partner',
];

export default function PartnersPage() {
  const [selectedType, setSelectedType] = useState<SponsorType | 'All'>('All');

  const partners = useMemo(
    () =>
      PartnerDatabase.map(partner => {
        return {
          ...partner,
          tags: eventsDatabase.reduce(
            (acc, event) => {
              const tag = event.sponsors.find(sponsor => sponsor.id === partner.id);
              if (tag) {
                acc[tag.type] = (acc[tag.type] ?? 0) + 1;
              }
              return acc;
            },
            {} as Record<SponsorType, number>
          ),
        } as IPartnerWithTags;
      }).sort((a, b) => {
        const aScore = calculateScore(a);
        const bScore = calculateScore(b);
        if (aScore === bScore) {
          return a.name.localeCompare(b.name);
        }
        return bScore - aScore;
      }),
    [PartnerDatabase, eventsDatabase]
  );

  const filteredPartners = useMemo(() => {
    if (selectedType === 'All') return partners;
    return partners.filter(partner => partner.tags[selectedType]);
  }, [partners, selectedType]);

  return (
    <main className="container mx-auto px-4 pb-20">
      <section className="mb-20" aria-labelledby="partners-heading">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-gray-800 flex-grow" />
          <h2 id="partners-heading" className="text-2xl md:text-3xl font-bold px-6">
            Partners
          </h2>
          <div className="h-px bg-gray-800 flex-grow" />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 justify-start mb-8">
          {SPONSOR_TYPES.map(type => (
            <button
              key={type}
              className={`px-4 py-1 rounded-full border transition-colors text-sm font-medium
                ${
                  selectedType === type
                    ? 'bg-yellow-500 text-black border-yellow-500'
                    : 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-yellow-700 hover:text-black hover:border-yellow-700'
                }
              `}
              onClick={() => setSelectedType(type)}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPartners.map(partner => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </section>
    </main>
  );
}
