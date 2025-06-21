import { IPartnerWithTags, SponsorType } from '@/data/partners';
import { cn } from '@/utils';
import { ExternalLink } from 'lucide-react';
import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TagOrder: SponsorType[] = [
  'Gold Sponsor',
  'Silver Sponsor',
  'Co-organizer',
  'Venue',
  'Ticket Partner',
  'Media Partner',
];

const TAG_STYLES = {
  Venue: 'bg-green-700',
  'Gold Sponsor': 'bg-yellow-700',
  'Co-organizer': 'bg-blue-700',
  'Silver Sponsor': 'bg-gray-600',
  default: 'bg-gray-600',
} as const;

// Partner Card Component
export function PartnerCard({ partner }: { partner: IPartnerWithTags }) {
  const cardClasses =
    'bg-gray-900 rounded-lg overflow-hidden border border-gray-800 flex flex-col h-full';

  const tagElements = useMemo(
    () => (
      <div className="text-sm flex gap-2 mb-4">
        {TagOrder.map(tagType => {
          const tag = partner.tags[tagType];
          if (tag) {
            return (
              <div
                className={cn(
                  TAG_STYLES[tagType as keyof typeof TAG_STYLES] || TAG_STYLES.default,
                  'px-2 py-1 rounded flex gap-2'
                )}
                key={tagType}
              >
                <span>
                  {tagType}
                  {tag > 1 && ` • ${tag}`}
                </span>
              </div>
            );
          }
          return null;
        })}
      </div>
    ),
    [partner.tags, TAG_STYLES]
  );

  return (
    <article className={cardClasses}>
      <div className="relative aspect-[2/1] w-full bg-gray-800 flex items-center justify-center p-6">
        <figure className="relative w-full h-full max-w-[240px] max-h-[120px]">
          <Image
            src={partner.logo || '/placeholder.svg'}
            alt={partner.name}
            fill
            className="object-contain"
          />
        </figure>
      </div>

      <section className="p-6 flex-grow" aria-labelledby="partner-name">
        {tagElements}
        <h3 id="partner-name" className="text-xl font-bold mb-2">
          {partner.name}
        </h3>
        <p className="text-gray-400 mb-4">{partner.description}</p>
        <Link
          href={partner.website}
          className="inline-flex items-center text-yellow-500 hover:text-yellow-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Website <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      </section>
    </article>
  );
}
