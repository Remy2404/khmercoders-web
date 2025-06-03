import { DonorDatabase } from "@/data/donors";
import { partners } from "@/data/partners";
import { foundingMembers, moderators, volunteers } from "@/data/teams";
import Image from "next/image";
import Link from "next/link";

export function HomeFoundingSection() {
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto font-mono text-lg my-12 tracking-tight">
      <TeamSection />
      <BackerSection />
    </div>
  );
}

function BackerSection() {
  return (
    <div>
      <h2 className="font-retro text-5xl my-4">Backers</h2>
      <p>
        We are backed by community members, local companies and global companies
      </p>

      <div className="flex gap-4">
        <div className="my-4 border border-double border-gray-400 border-4 p-4 w-[150px] text-center">
          <div className="text-4xl font-bold">{partners.length}</div>
          <div className="text-lg">Companies</div>
          <Link
            href="/partners"
            className="text-yellow-500 underline hover:text-yellow-300"
          >
            Explore
          </Link>
        </div>

        <div className="my-4 border border-double border-gray-400 border-4 p-4 w-[150px] text-center">
          <div className="font-bold text-4xl">{DonorDatabase.length}</div>
          <div className="text-lg">Donors</div>
          <Link
            href="/donate"
            className="text-yellow-500 underline hover:text-yellow-300"
          >
            Explore
          </Link>
        </div>
      </div>

      <div></div>
    </div>
  );
}

function TeamSection() {
  return (
    <div>
      <h2 className="font-retro text-5xl my-4">Teams</h2>
      <p className="text-lg max-w-2xl mb-8">
        This group represents the collaborative effort of our founding team and
        dedicated volunteers, brought together by their passion and commitment
        to the community.
      </p>
      <div className="flex gap-8 my-4 flex-wrap">
        {foundingMembers.map((member) => (
          <div key={member.name} className="flex gap-2">
            <Image
              src={member.image}
              alt={member.name}
              width={64}
              height={64}
              className="rounded"
              key={member.name}
            />
            <div className="leading-5 flex justify-center flex-col">
              <div className="font-bold text-lg">{member.name}</div>
              <div>{member.role2}</div>
              <div>{member.role3}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="my-8">
        And over{" "}
        <Link
          href="/teams"
          className="font-semibold text-yellow-500 underline hover:text-yellow-300"
        >
          {foundingMembers.length + volunteers.length + moderators.length} other
          of our volunteers and community moderators.
        </Link>
      </div>
    </div>
  );
}
