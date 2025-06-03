import { KCLinks } from "@/data/link";
import Link from "next/link";

export function HomeHeroBanner() {
  return (
    <section className="container mx-auto md:py-20 px-4">
      <h1 className="font-retro text-5xl text-yellow-500 leading-12">
        Cambodia's Largest
        <br />
        Coding Community
      </h1>

      <div className="font-mono my-6 max-w-[500px]">
        Founded in 2018, Khmer Coders has grown to become Cambodia's largest
        coding community. We bring together developers, designers, and tech
        enthusiasts to learn, share, and grow together.
      </div>

      <div className="flex gap-4">
        <div className="border border-4 border-gray-400 border-double p-4 font-mono">
          <div>Facebook Group</div>
          <div>11,724</div>
          <Link
            target="_blank"
            href={KCLinks.facebookGroupLink}
            className="text-yellow-500 hover:underline hover:decoration-double"
          >
            Join here
          </Link>
        </div>

        <div className="border border-4 border-gray-400 border-double p-4 font-mono">
          <div>Telegram Group</div>
          <div>1,297</div>
          <Link
            target="_blank"
            href={KCLinks.telegramLink}
            className="text-yellow-500 hover:underline hover:decoration-double"
          >
            Join here
          </Link>
        </div>

        <div className="border border-4 border-gray-400 border-double p-4 font-mono">
          <div>Discord Group</div>
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
