// For App Router
"use client";
import { GithubIcon } from "@/components/atoms/icons";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const socialLink = {
    telegram: "#",
    linkedin: "#",
    github: "#",
    website: "#",
    youtube: "#",
    tiktok: "#",
  };

  const experiences = [
    {
      company: "Tech Innovators Inc.",
      role: "Senior Frontend Developer",
      startYear: 2021,
      endYear: null, // current
      description:
        "Leading the development of web applications using React and TypeScript. Implemented CI/CD pipelines and improved code coverage by 35%.",
    },
    {
      company: "Digital Solutions Co.",
      role: "Full Stack Developer",
      startYear: 2018,
      endYear: 2021,
      description:
        "Developed and maintained multiple client projects using MERN stack. Optimized database queries resulting in 40% performance improvement.",
    },
    {
      company: "WebCraft Agency",
      role: "Junior Developer",
      startYear: 2016,
      endYear: 2018,
      description:
        "Collaborated in agile teams to build responsive web applications. Specialized in frontend development using React and Redux.",
    },
    {
      company: "TechStart Startup",
      role: "Software Engineering Intern",
      startYear: 2015,
      endYear: 2016,
      description:
        "Assisted in developing MVP for an e-commerce platform. Implemented user authentication and product catalog features.",
    },
    {
      company: "CodeLab University",
      role: "Research Assistant",
      startYear: 2014,
      endYear: 2015,
      description:
        "Supported faculty research on ML algorithms. Developed data visualization tools and conducted literature reviews.",
    },
  ];

  return (
    <>
      <div className="relative border-b border-gray-600">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f59e0b1a_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b1a_1px,transparent_1px)] bg-[size:35px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="container relative z-10 mx-auto py-4 px-4 flex gap-2">
          <div className="w-20 h-20 rounded-full border-2 border-orange-400 bg-orange-100" />
          <div className="flex flex-col justify-center">
            <p className="font-semibold">Loren</p>
            <p className="text-gray-400 text-sm">Software Engineer at XYZ</p>
            <p className="text-gray-400 text-sm font-mono">@loren</p>
          </div>
        </div>

        <ul className="container relative z-10 mx-auto text-sm flex">
          <li className="p-2 px-4 border-b-4 border-orange-500">Profile</li>
          <li className="p-2 px-4 border-b-4 border-transparent hover:border-orange-300 transition-colors">
            Posts
          </li>
        </ul>
      </div>
      <div className="container mx-auto flex gap-4 my-4 mb-12">
        <div>
          <div className="my-4 flex gap-2 flex-wrap">
            {socialLink.telegram && (
              <SocialLink type="Telegram" link={socialLink.telegram} />
            )}
            {socialLink.linkedin && (
              <SocialLink type="LinkedIn" link={socialLink.linkedin} />
            )}
            {socialLink.github && (
              <SocialLink type="GitHub" link={socialLink.github} />
            )}
            {socialLink.website && (
              <SocialLink type="Website" link={socialLink.website} />
            )}
            {socialLink.youtube && (
              <SocialLink type="YouTube" link={socialLink.youtube} />
            )}
            {socialLink.tiktok && (
              <SocialLink type="TikTok" link={socialLink.tiktok} />
            )}
          </div>

          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra
            nisl quis erat ornare, sit amet dignissim lectus volutpat. Morbi eu
            lobortis eros. Suspendisse sed rutrum mi. Morbi efficitur quam vel
            fringilla gravida. Morbi nec tincidunt magna. Duis id euismod ante,
            sit amet malesuada orci. Duis nec sollicitudi
          </p>

          <div className="mt-6 flex flex-col gap-4">
            {experiences.map((exp, index) => (
              <div key={index} className="flex gap-2">
                <div className="border border-gray-500 bg-gray-800 h-12 w-12 rounded shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold">{exp.role}</h3>

                  <p className="text-sm text-gray-400">
                    <span className="text-yellow-400">{exp.company}</span> (
                    {exp.startYear} - {exp.endYear ? exp.endYear : "Present"})
                  </p>

                  <p className="text-sm text-gray-400">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[400px] text-sm hidden lg:block">
          <div className="border border-4 border-gray-500 p-2 rounded-lg text-gray-400">
            <div className="h-24 bg-gray-500 rounded"></div>
            <p className="p-2">
              Founded in 2018, Khmer Coders has grown to become Cambodia's
              largest coding community. We bring together developers, designers,
              and tech enthusiasts to learn, share, and grow together.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function SocialLink({ type, link }: { type: string; link: string }) {
  return (
    <Link
      target="_blank"
      href={link}
      className="items-center gap-2 font-mono border backdrop-blur-sm bg-orange-800/30 border-orange-500 p-2 inline-flex rounded text-sm shadow-lg relative overflow-hidden transition-all duration-200 hover:bg-orange-800/60 hover:shadow-orange-500/30 hover:shadow-xl hover:border-orange-400"
    >
      <GithubIcon className="w-4 h-4" />
      <span className="relative z-10 text-orange-100 hover:text-white transition-colors duration-200">
        {type}
      </span>
    </Link>
  );
}
