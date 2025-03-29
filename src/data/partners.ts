export interface IPartner {
  name: string;
  description: string;
  logo: string;
  website: string;
  tags: {
    type: "Gold Sponsor" | "Silver Sponsor" | "Co-organizer" | "Venue";
    badge?: number;
  }[];
}

export const partners: IPartner[] = [
  {
    name: "Bill24",
    description:
      "​Bill24 streamlines bill payments, connecting businesses and customers through multiple channels. ",
    logo: "/assets/images/partners/bill24.png?height=200&width=400",
    website: "https://bill24.io/kh/",
    tags: [{ type: "Silver Sponsor", badge: 3 }],
  },
  {
    name: "Plasgate",
    description:
      "​PlasGate is Cambodia's largest authorized SMS gateway, connecting businesses to all major networks.",
    logo: "/assets/images/partners/plusgate.webp?height=200&width=400",
    website: "https://plasgate.com/",
    tags: [
      { type: "Gold Sponsor", badge: 2 },
      { type: "Silver Sponsor", badge: 2 },
    ],
  },
  {
    name: "Techbodia",
    description:
      "​Techbodia is a leading Cambodian IT company offering customer-satisfaction-driven services. ",
    logo: "/assets/images/partners/techbodia.png?height=200&width=400",
    website: "https://www.techbodia.com/",
    tags: [{ type: "Silver Sponsor", badge: 3 }],
  },
  {
    name: "Jobify",
    description:
      "​Jobify is Cambodia's leading IT job matching service, offering recruitment and staffing solutions to connect companies with skilled tech professionals.",
    logo: "/assets/images/partners/jobify.jpg",
    website: "https://jobify.works",
    tags: [{ type: "Co-organizer" }],
  },
  {
    name: "DataU",
    description:
      "​DataU Academy offers live, interactive data science and AI training programs in Cambodia.",
    logo: "/assets/images/partners/datau.png?height=200&width=400",
    website: "https://wedatau.org",
    tags: [{ type: "Co-organizer" }],
  },
  {
    name: "Daun Penh Data Center",
    description:
      "​Daun Penh Data Center offers colocation, dedicated servers, VPS, cloud solutions, and web hosting services in Cambodia.",
    logo: "/assets/images/partners/daunpenh.png?height=200&width=400",
    website: "https://dpdatacenter.com/en",
    tags: [{ type: "Silver Sponsor", badge: 3 }],
  },
  {
    name: "Cambodian Network Exchange",
    description:
      "​Cambodian Network Exchange (CNX) is an open, neutral internet exchange in Cambodia. ",
    logo: "/assets/images/partners/cnx.png?height=200&width=400",
    website: "https://cnx.net.kh/",
    tags: [{ type: "Silver Sponsor", badge: 1 }],
  },
  {
    name: "Sabay TeKh",
    description:
      "​Sabay Cloud offers cloud-based video streaming, storage, and transcoding services in Cambodia.",
    logo: "/assets/images/partners/sabaytekh.png?height=200&width=400",
    website: "https://cloud.sabay.com/",
    tags: [{ type: "Silver Sponsor", badge: 1 }],
  },
  {
    name: "AI Farm",
    description:
      "​AI Farm Robotic Factory, a subsidiary of Khamsa Group of Businesses (KGB), is a technology-driven company based in Phnom Penh, Cambodia.",
    logo: "/assets/images/partners/aifarm.png?height=200&width=400",
    website: "https://aifarm.dev/",
    tags: [{ type: "Silver Sponsor", badge: 2 }],
  },
  {
    name: "Dreamlab",
    description:
      "​DreamsLAB is a Cambodian software solutions company specializing in custom software, mobile apps, cloud services, AI, and blockchain integration. ",
    logo: "/assets/images/partners/dreamslab.svg?height=200&width=400",
    website: "https://www.dreamslab.dev/",
    tags: [
      { type: "Silver Sponsor", badge: 3 },
      { type: "Venue", badge: 1 },
    ],
  },
];

// Sample Data
export const platinumPartners = [
  {
    name: "Cambodia Tech Innovation Hub",
    description:
      "A leading technology innovation center supporting startups and tech education throughout Cambodia.",
    logo: "/placeholder.svg?height=200&width=400",
    website: "https://example.com",
  },
  {
    name: "Digital Cambodia",
    description:
      "Government initiative to promote digital literacy and technology adoption across the country.",
    logo: "/placeholder.svg?height=200&width=400",
    website: "https://example.com",
  },
];

export const goldPartners = [
  {
    name: "Phnom Penh Software Solutions",
    description:
      "Custom software development company specializing in web and mobile applications.",
    logo: "/placeholder.svg?height=200&width=400",
    website: "https://example.com",
  },
  {
    name: "Angkor Cloud Services",
    description:
      "Cloud infrastructure and hosting provider with data centers in Cambodia.",
    logo: "/placeholder.svg?height=200&width=400",
    website: "https://example.com",
  },
  {
    name: "Mekong Tech Academy",
    description:
      "Educational institution offering coding bootcamps and tech courses.",
    logo: "/placeholder.svg?height=200&width=400",
    website: "https://example.com",
  },
];

export const silverPartners = [
  {
    name: "BattleBridge Co-working",
    logo: "/placeholder.svg?height=150&width=300",
    website: "https://example.com",
  },
  {
    name: "Raintree Cambodia",
    logo: "/placeholder.svg?height=150&width=300",
    website: "https://example.com",
  },
  {
    name: "Factory Phnom Penh",
    logo: "/placeholder.svg?height=150&width=300",
    website: "https://example.com",
  },
  {
    name: "Cambodian Developers Association",
    logo: "/placeholder.svg?height=150&width=300",
    website: "https://example.com",
  },
  {
    name: "Startup Cambodia",
    logo: "/placeholder.svg?height=150&width=300",
    website: "https://example.com",
  },
  {
    name: "Khmer Enterprise",
    logo: "/placeholder.svg?height=150&width=300",
    website: "https://example.com",
  },
  {
    name: "Impact Hub Phnom Penh",
    logo: "/placeholder.svg?height=150&width=300",
    website: "https://example.com",
  },
  {
    name: "SmallWorld Cambodia",
    logo: "/placeholder.svg?height=150&width=300",
    website: "https://example.com",
  },
];
