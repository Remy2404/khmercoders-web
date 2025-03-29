import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ExternalLink } from "lucide-react";

import { Button } from "@/components/generated/button";
import { IPartner, partners } from "@/data/partners";
import { useMemo } from "react";
import { cn } from "@/utils";

export default function PartnersPage() {
  return (
    <main className="container mx-auto px-4 pb-20">
      {/* Platinum Partners */}
      {/* <section className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gray-800 flex-grow"></div>
            <h2 className="text-2xl md:text-3xl font-bold px-6">Platinum Partners</h2>
            <div className="h-px bg-gray-800 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platinumPartners.map((partner, index) => (
              <PartnerCard key={index} partner={partner} tier="platinum" />
            ))}
          </div>
        </section> */}

      {/* Gold Partners */}
      <section className="mb-20">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-gray-800 flex-grow"></div>
          <h2 className="text-2xl md:text-3xl font-bold px-6">Partners</h2>
          <div className="h-px bg-gray-800 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <PartnerCard key={index} partner={partner} tier="gold" />
          ))}
        </div>
      </section>

      {/* Silver Partners */}
      {/* <section>
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gray-800 flex-grow"></div>
            <h2 className="text-2xl md:text-3xl font-bold px-6">Silver Partners</h2>
            <div className="h-px bg-gray-800 flex-grow"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {silverPartners.map((partner, index) => (
              <PartnerCard key={index} partner={partner} tier="silver" />
            ))}
          </div>
        </section> */}

      {/* Become a Partner CTA */}
      <section className="mt-24 bg-gray-900 rounded-lg p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Become a Partner
            </h2>
            <p className="text-gray-400 mb-6">
              Partner with Khmer Coders to support Cambodia's tech community and
              gain visibility for your organization. We offer various
              partnership tiers with different benefits.
            </p>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              Partnership Opportunities
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative h-64 w-full max-w-md rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Become a partner"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Partner Card Component
function PartnerCard({
  partner,
  tier,
}: {
  partner: IPartner;
  tier: "platinum" | "gold" | "silver";
}) {
  // Different styling based on partner tier
  const cardClasses = {
    platinum:
      "bg-gray-900 rounded-lg overflow-hidden border border-yellow-500/30 flex flex-col h-full",
    gold: "bg-gray-900 rounded-lg overflow-hidden border border-gray-800 flex flex-col h-full",
    silver:
      "bg-gray-900 rounded-lg overflow-hidden border border-gray-800 flex flex-col h-full p-4",
  };

  const logoSizes = {
    platinum: "h-24",
    gold: "h-20",
    silver: "h-16",
  };

  const tagElements = useMemo(() => {
    return (
      <div className="text-sm flex gap-2 mb-4">
        {partner.tags.map((tag) => {
          let tagClass = "bg-gray-600";

          if (tag.type === "Venue") {
            tagClass = "bg-green-700";
          } else if (tag.type === "Gold Sponsor") {
            tagClass = "bg-yellow-700";
          } else if (tag.type === "Co-organizer") {
            tagClass = "bg-blue-700";
          }

          return (
            <div
              className={cn(tagClass, "px-2 py-1 rounded flex gap-2")}
              key={tag.type}
            >
              <span>{tag.type}</span>
              {tag.badge && <span className="">| x{tag.badge}</span>}
            </div>
          );
        })}
      </div>
    );
  }, [partner.tags]);

  return (
    <div className={cardClasses[tier]}>
      {tier !== "silver" && (
        <div className="relative h-48 w-full bg-gray-800 flex items-center justify-center p-6">
          <Image
            src={partner.logo || "/placeholder.svg"}
            alt={partner.name}
            width={300}
            height={150}
            className={`object-contain ${logoSizes[tier]}`}
          />
        </div>
      )}

      <div
        className={
          tier === "silver" ? "flex flex-col items-center" : "p-6 flex-grow"
        }
      >
        {tier === "silver" && (
          <div className="flex items-center justify-center w-full mb-4">
            <Image
              src={partner.logo || "/placeholder.svg"}
              alt={partner.name}
              width={150}
              height={75}
              className={`object-contain ${logoSizes[tier]}`}
            />
          </div>
        )}

        {tagElements}

        <h3
          className={`font-bold ${
            tier === "silver" ? "text-center" : "text-xl mb-2"
          }`}
        >
          {partner.name}
        </h3>

        {tier !== "silver" && (
          <>
            <p className="text-gray-400 mb-4">{partner.description}</p>
            <Link
              href={partner.website}
              className="inline-flex items-center text-yellow-500 hover:text-yellow-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
