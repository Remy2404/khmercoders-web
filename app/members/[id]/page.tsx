import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  Github,
  Twitter,
  Linkedin,
  Globe,
  MapPin,
  Briefcase,
  Award,
  Calendar,
  GraduationCap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// This would typically come from a database
const getMembers = () => {
  return [...techLeaders, ...entrepreneurs, ...risingStars];
};

interface Params {
  id: string;
}

export async function generateMetadata({ params }: { params: Params }) {
  const members = getMembers();
  const member = members.find((m) => m.id === params.id);

  if (!member) {
    return {
      title: "Member Not Found | Khmer Coders",
      description: "The requested member profile could not be found.",
    };
  }

  return {
    title: `${member.name} | Khmer Coders`,
    description: member.shortBio,
  };
}

export default function MemberProfile({ params }: { params: Params }) {
  const members = getMembers();
  const member = members.find((m) => m.id === params.id);

  if (!member) {
    notFound();
  }

  // Combine the sample data with the detailed profile data
  const profile = {
    ...member,
    ...(memberProfiles[params.id as keyof typeof memberProfiles] || {}),
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Cover Image */}
      <div className="relative h-64 md:h-80 w-full">
        <Image
          src={profile.coverImage || "/placeholder.svg?height=400&width=1200"}
          alt={`${profile.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>

        <div className="container mx-auto px-4 relative h-full flex items-end pb-6">
          <Link
            href="/members"
            className="absolute top-6 left-4 inline-flex items-center text-sm text-white bg-black/50 hover:bg-black/70 px-3 py-1 rounded-full"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Members
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              {/* Profile Image and Basic Info */}
              <div className="md:w-1/3 flex flex-col items-center md:items-start">
                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-gray-900 relative mb-4">
                  <Image
                    src={
                      profile.image || "/placeholder.svg?height=200&width=200"
                    }
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-1 text-center md:text-left">
                  {profile.name}
                </h1>
                <p className="text-yellow-500 mb-4 text-center md:text-left">
                  {profile.role}
                </p>

                {profile.location && (
                  <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}

                {profile.badges && profile.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {profile.badges.map((badge, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-yellow-500/30 text-yellow-500"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex gap-4 mb-6">
                  {profile.github && (
                    <Link
                      href={profile.github}
                      className="text-gray-400 hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                  )}
                  {profile.twitter && (
                    <Link
                      href={profile.twitter}
                      className="text-gray-400 hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-5 w-5" />
                    </Link>
                  )}
                  {profile.linkedin && (
                    <Link
                      href={profile.linkedin}
                      className="text-gray-400 hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  )}
                  {profile.website && (
                    <Link
                      href={profile.website}
                      className="text-gray-400 hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="h-5 w-5" />
                    </Link>
                  )}
                </div>

                {profile.skills && (
                  <div className="w-full">
                    <h3 className="font-bold mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="bg-gray-800 hover:bg-gray-700 text-white"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bio and Experience */}
              <div className="md:w-2/3">
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">About</h2>
                  <div className="text-gray-300 space-y-4">
                    {profile.bio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {profile.experience && profile.experience.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <Briefcase className="mr-2 h-5 w-5 text-yellow-500" />
                      Work Experience
                    </h2>
                    <div className="space-y-6">
                      {profile.experience.map((exp, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-gray-800 pl-4 pb-2"
                        >
                          <h3 className="font-bold">{exp.role}</h3>
                          <p className="text-yellow-500">{exp.company}</p>
                          <p className="text-sm text-gray-400 mb-2">
                            {exp.period}
                          </p>
                          <p className="text-gray-300">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {profile.achievements && profile.achievements.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <Award className="mr-2 h-5 w-5 text-yellow-500" />
                      Achievements
                    </h2>
                    <div className="space-y-4">
                      {profile.achievements.map((achievement, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg">
                          <h3 className="font-bold">{achievement.title}</h3>
                          <p className="text-sm text-gray-400 mb-1">
                            {achievement.year}
                          </p>
                          <p className="text-gray-300">
                            {achievement.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {profile.education && profile.education.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5 text-yellow-500" />
                      Education
                    </h2>
                    <div className="space-y-4">
                      {profile.education.map((edu, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-gray-800 pl-4 pb-2"
                        >
                          <h3 className="font-bold">{edu.degree}</h3>
                          <p className="text-yellow-500">{edu.institution}</p>
                          <p className="text-sm text-gray-400">{edu.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Community Contributions */}
        {profile.contributions && (
          <div className="mt-8 bg-gray-900 rounded-lg border border-gray-800 p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-yellow-500" />
              Contributions to Khmer Coders
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.contributions.map((contribution, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">{contribution.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {contribution.date}
                  </p>
                  <p className="text-gray-300">{contribution.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connect CTA */}
        <div className="mt-8 mb-20 text-center">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Connect with {profile.name.split(" ")[0]}
          </Button>
        </div>
      </div>

      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Khmer Coders. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Sample Data for Member Profiles
const memberProfiles = {
  "visal-sok": {
    location: "Phnom Penh, Cambodia",
    bio: [
      "Visal is a technology leader with over 15 years of experience in software development and architecture. As the CTO of TechCambodia, he leads a team of 50+ engineers building innovative solutions for both local and international clients.",
      "He is passionate about mentoring the next generation of Cambodian developers and regularly contributes to open source projects. Visal is also an AWS Certified Solutions Architect and has spoken at numerous tech conferences across Southeast Asia.",
    ],
    skills: [
      "Cloud Architecture",
      "System Design",
      "Microservices",
      "DevOps",
      "Java",
      "Golang",
      "AWS",
      "Kubernetes",
    ],
    experience: [
      {
        role: "Chief Technology Officer",
        company: "TechCambodia",
        period: "2018 - Present",
        description:
          "Leading the technical strategy and engineering teams, implementing cloud-native architecture, and driving innovation initiatives.",
      },
      {
        role: "Senior Software Architect",
        company: "Global Solutions Inc.",
        period: "2014 - 2018",
        description:
          "Designed and implemented scalable backend systems for enterprise clients across finance and e-commerce sectors.",
      },
      {
        role: "Software Engineer",
        company: "StartupHub Cambodia",
        period: "2010 - 2014",
        description:
          "Developed web applications and APIs for early-stage startups in the Cambodian ecosystem.",
      },
    ],
    achievements: [
      {
        title: "AWS Community Hero",
        year: "2022",
        description:
          "Recognized by Amazon Web Services for significant contributions to the cloud computing community in Southeast Asia.",
      },
      {
        title: "Best Tech Leadership Award",
        year: "2020",
        description:
          "Awarded by the Cambodia ICT Federation for excellence in technology leadership and innovation.",
      },
    ],
    education: [
      {
        degree: "Master of Computer Science",
        institution: "National University of Singapore",
        period: "2008 - 2010",
      },
      {
        degree: "Bachelor of Computer Science",
        institution: "Royal University of Phnom Penh",
        period: "2004 - 2008",
      },
    ],
    contributions: [
      {
        title: "Cloud Computing Workshop Series",
        date: "2023",
        description:
          "Organized and led a series of workshops on AWS and cloud architecture, training over 200 developers.",
      },
      {
        title: "Khmer Coders Hackathon Judge",
        date: "2022",
        description:
          "Served as a technical judge for the annual hackathon, providing feedback and mentorship to participants.",
      },
      {
        title: "Open Source Contribution Drive",
        date: "2021",
        description:
          "Led an initiative to increase open source contributions from Cambodian developers, resulting in 50+ pull requests to major projects.",
      },
      {
        title: "Technical Advisor",
        date: "2019 - Present",
        description:
          "Provides strategic technical guidance to the Khmer Coders leadership team on community initiatives and events.",
      },
    ],
  },
  "dara-hok": {
    location: "San Francisco, CA (Originally from Siem Reap, Cambodia)",
    bio: [
      "Dara is a Lead Engineer at Google, working on machine learning infrastructure and AI applications. With a PhD in Computer Science from Stanford University, he specializes in developing scalable ML systems that power various Google products.",
      "Before joining Google, Dara worked at several tech startups in Silicon Valley. He maintains strong connections to Cambodia and regularly returns to mentor young engineers and contribute to the local tech ecosystem.",
    ],
    skills: [
      "Machine Learning",
      "Artificial Intelligence",
      "TensorFlow",
      "Python",
      "C++",
      "Distributed Systems",
      "Data Science",
    ],
    experience: [
      {
        role: "Lead Engineer, AI/ML",
        company: "Google",
        period: "2019 - Present",
        description:
          "Leading a team developing machine learning infrastructure used across Google products. Focusing on model efficiency and scalability.",
      },
      {
        role: "Senior Software Engineer",
        company: "AI Startup",
        period: "2016 - 2019",
        description:
          "Developed computer vision algorithms for autonomous systems. The company was acquired by a major tech firm in 2019.",
      },
      {
        role: "Research Scientist",
        company: "Stanford AI Lab",
        period: "2014 - 2016",
        description:
          "Conducted research on deep learning applications for natural language processing and computer vision.",
      },
    ],
    achievements: [
      {
        title: "Google Developer Expert in Machine Learning",
        year: "2021",
        description:
          "Recognized for expertise and contributions to the machine learning developer community.",
      },
      {
        title: "Best Paper Award at NeurIPS",
        year: "2018",
        description:
          "Co-authored a paper on efficient deep learning models that received recognition at a top AI conference.",
      },
    ],
    education: [
      {
        degree: "PhD in Computer Science",
        institution: "Stanford University",
        period: "2010 - 2014",
      },
      {
        degree: "Master of Science in Computer Science",
        institution: "University of California, Berkeley",
        period: "2008 - 2010",
      },
      {
        degree: "Bachelor of Engineering",
        institution: "Royal University of Phnom Penh",
        period: "2004 - 2008",
      },
    ],
    contributions: [
      {
        title: "AI Workshop Series",
        date: "2022",
        description:
          "Conducted virtual workshops on machine learning fundamentals for Cambodian developers.",
      },
      {
        title: "Scholarship Program",
        date: "2020 - Present",
        description:
          "Established a scholarship fund for Cambodian students pursuing degrees in computer science and AI.",
      },
      {
        title: "Technical Advisor",
        date: "2018 - Present",
        description:
          "Provides guidance on AI curriculum and learning resources for the community.",
      },
    ],
  },
  "sovann-tech": {
    location: "Phnom Penh, Cambodia",
    bio: [
      "Sovann is the Founder and CEO of KhmerDev, one of Cambodia's fastest-growing software development companies. Starting with just 3 developers in 2015, he has grown the company to over 50 employees working with clients across Southeast Asia and beyond.",
      "As a serial entrepreneur, Sovann is passionate about creating opportunities for Cambodian developers to work on world-class projects while remaining in their home country. He is also an active angel investor in the local startup ecosystem.",
    ],
    skills: [
      "Business Strategy",
      "Software Development",
      "Project Management",
      "Entrepreneurship",
      "Venture Capital",
      "Team Building",
    ],
    experience: [
      {
        role: "Founder & CEO",
        company: "KhmerDev",
        period: "2015 - Present",
        description:
          "Founded and grew a software development company specializing in web and mobile applications for international clients.",
      },
      {
        role: "Co-founder",
        company: "CamboTech Ventures",
        period: "2018 - Present",
        description:
          "Co-founded an angel investment firm focusing on early-stage tech startups in Cambodia.",
      },
      {
        role: "Software Developer",
        company: "International Tech Firm",
        period: "2010 - 2015",
        description:
          "Worked as a full-stack developer on enterprise applications for banking and finance sectors.",
      },
    ],
    achievements: [
      {
        title: "Entrepreneur of the Year",
        year: "2021",
        description:
          "Awarded by the Cambodia Chamber of Commerce for outstanding business leadership and innovation.",
      },
      {
        title: "30 Under 30",
        year: "2018",
        description:
          "Named in Forbes Asia's 30 Under 30 list in the Enterprise Technology category.",
      },
    ],
    education: [
      {
        degree: "Bachelor of Computer Science",
        institution: "Institute of Technology of Cambodia",
        period: "2006 - 2010",
      },
    ],
    contributions: [
      {
        title: "Mentorship Program",
        date: "2019 - Present",
        description:
          "Mentors aspiring entrepreneurs and developers, helping them launch their own startups and projects.",
      },
      {
        title: "Internship Initiative",
        date: "2017 - Present",
        description:
          "Created a structured internship program at KhmerDev that has trained over 100 junior developers.",
      },
      {
        title: "Khmer Coders Sponsor",
        date: "2018 - Present",
        description:
          "Provides financial support and venue space for community events and hackathons.",
      },
    ],
  },
};

// Re-export the sample data from the members page
const techLeaders = [
  {
    id: "visal-sok",
    name: "Visal Sok",
    role: "CTO at TechCambodia",
    shortBio:
      "15+ years of experience in software development. Leading technical innovation at one of Cambodia's largest tech companies.",
    badges: ["AWS Certified", "Tech Speaker", "Open Source Contributor"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  },
  {
    id: "dara-hok",
    name: "Dara Hok",
    role: "Lead Engineer at Google",
    shortBio:
      "Software engineer with experience at global tech companies. Specializes in machine learning and AI applications.",
    badges: [
      "Google Developer Expert",
      "AI Specialist",
      "PhD in Computer Science",
    ],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "bopha-pich",
    name: "Bopha Pich",
    role: "Senior Developer Advocate",
    shortBio:
      "Developer advocate focusing on cloud technologies. Regular speaker at international tech conferences.",
    badges: ["Cloud Expert", "Tech Educator", "Community Builder"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  },
];

const entrepreneurs = [
  {
    id: "sovann-tech",
    name: "Sovann Tech",
    role: "Founder & CEO of KhmerDev",
    bio: [],
    shortBio:
      "Founded KhmerDev, a successful software development company employing over 50 Cambodian developers.",
    badges: ["Startup Founder", "Tech Investor", "Mentor"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  },
  {
    id: "channary-rin",
    name: "Channary Rin",
    role: "Co-founder of EduTech Cambodia",
    bio: [],
    shortBio:
      "Building educational technology solutions to improve access to quality education across Cambodia.",
    badges: ["EdTech Pioneer", "Social Entrepreneur", "Women in Tech"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "makara-pen",
    name: "Makara Pen",
    role: "Founder of FinTech Startup",
    shortBio:
      "Developing innovative financial technology solutions to increase financial inclusion in Cambodia.",
    bio: [],
    badges: ["FinTech Innovator", "Blockchain Expert", "Angel Investor"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  },
];

const risingStars = [
  {
    id: "sokha-meas",
    name: "Sokha Meas",
    role: "Frontend Developer & UI/UX Designer",
    shortBio:
      "Award-winning designer creating beautiful and accessible web experiences. Active open source contributor.",
    bio: [],
    badges: ["UI/UX Specialist", "React Expert", "Design Systems"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    twitter: "https://twitter.com",
    website: "https://example.com",
  },
  {
    id: "veasna-kim",
    name: "Veasna Kim",
    role: "Mobile App Developer",
    shortBio:
      "Self-taught developer who has published several popular mobile apps with over 500,000 combined downloads.",
    bio: [],
    badges: ["Flutter Expert", "Firebase Specialist", "Mobile UI"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "theary-choun",
    name: "Theary Choun",
    role: "Data Scientist & ML Engineer",
    shortBio:
      "Working on machine learning applications to solve local challenges in agriculture and healthcare.",
    bio: [],
    badges: ["AI Researcher", "Python Expert", "TensorFlow"],
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
];
