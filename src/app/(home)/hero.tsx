import { KCLinks } from "@/data/link";
import Link from "next/link";

export function HomeHeroBanner() {
  return (
    <section className="container mx-auto my-12 text-lg tracking-tight">
      <h1 className="font-retro text-5xl text-yellow-500 leading-12">
        Cambodia's Largest
        <br />
        Coding Community
      </h1>

      <div className="font-mono my-6 max-w-2xl">
        Founded in 2018, Khmer Coders has grown to become Cambodia's largest
        coding community. We bring together developers, designers, and tech
        enthusiasts to learn, share, and grow together.
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="border border-4 border-gray-400 border-double p-4 font-mono w-full md:w-auto">
          <div className="font-bold">Facebook Group</div>
          <div>11,724</div>
          <Link
            target="_blank"
            href={KCLinks.facebookGroupLink}
            className="text-yellow-500 hover:underline hover:decoration-double"
          >
            Join here
          </Link>
        </div>

        <div className="border border-4 border-gray-400 border-double p-4 font-mono w-full md:w-auto">
          <div className="font-bold">Telegram Group</div>
          <div>1,297</div>
          <Link
            target="_blank"
            href={KCLinks.telegramLink}
            className="text-yellow-500 hover:underline hover:decoration-double"
          >
            Join here
          </Link>
        </div>

        <div className="border border-4 border-gray-400 border-double p-4 font-mono w-full md:w-auto">
          <div className="font-bold">Discord Group</div>
          <div>1,047</div>
          <Link
            target="_blank"
            href={KCLinks.discordLink}
            className="text-yellow-500 hover:underline hover:decoration-double"
          >
            Join here
          </Link>
        </div>
      </div>
    </section>
  );
}
