// Real client websites, live and reachable. Shared by the web-design and
// web-development "Our Work" sections. Descriptions are summaries of each
// site's own positioning; accents are per-page hex. No invented metrics.

export type ClientSite = {
  name: string;
  href: string;
  /** Matching slug in lib/case-studies-clients.ts, for card -> case study links. */
  caseStudySlug: string;
  accent: string;
  category: string;
  description: string;
  iconKey: string;
  image: string;
};

export const clientSites: ClientSite[] = [
  {
    name: "DRU Foundation",
    href: "https://drufoundation.org/",
    caseStudySlug: "dru-foundation",
    accent: "#47143D",
    iconKey: "heart",
    category: "NGO",
    description:
      "Mumbai NGO founded in 2022, empowering underprivileged women through skills, education, food support and self-help groups.",
    image: "/portfolio/DRU Foundation Women Empowerment Poster.png",
  },
  {
    name: "Eureka Coworking",
    href: "https://eurekacoworking.in/",
    caseStudySlug: "eureka-coworking",
    accent: "#7c4dff",
    iconKey: "buildings",
    category: "Coworking",
    description:
      "Flexible workspace brand in Nagpur and Pune, offering hot desks, dedicated desks, private cabins and meeting rooms.",
    image: "/portfolio/Eureka Coworking_ Good People, Better Ideas.png",
  },
  {
    name: "Rising Sun Electric",
    href: "https://solarrse.com/",
    caseStudySlug: "rising-sun-electric",
    accent: "#ff7a3d",
    iconKey: "solar",
    category: "Solar EPC",
    description:
      "Mumbai solar company delivering residential, commercial and industrial systems with end-to-end EPC and subsidy support.",
    image: "/portfolio/Stone and Acres Land Development Poster.png",
  },
  {
    name: "WeCos",
    href: "https://wecos.online/",
    caseStudySlug: "wecos",
    accent: "#269cef",
    iconKey: "rocket",
    category: "Startup Services",
    description:
      "One-stop startup support covering technology, marketing, hiring, compliance, accounting, funding and operations.",
    image: "/portfolio/wecos.png",
  },
  {
    name: "Shubham Datarkar",
    href: "https://shubhamdatarkar.com/",
    caseStudySlug: "shubham-datarkar",
    accent: "#35c98a",
    iconKey: "user",
    category: "Personal Brand",
    description:
      "Founder-led brand site for an SEO, AEO and GEO consultant, packaging productised engagements and case studies.",
    image: "/portfolio/Occasion Cakes Celebration Collage.png",
  },
  {
    name: "AdEtc Studios",
    href: "https://adetcstudios.com/",
    caseStudySlug: "adetc-studios",
    accent: "#7c4dff",
    iconKey: "video",
    category: "Production Studio",
    description:
      "Ahmedabad film studio delivering ad films, TV commercials, brand films and documentaries with in-house post-production.",
    image: "/portfolio/Khiladi Adda Ludo Gaming Collage.png",
  },
  {
    name: "Power Consilium",
    href: "https://power-consilium.com/",
    caseStudySlug: "power-consilium",
    accent: "#ff7a3d",
    iconKey: "lightning",
    category: "Power Systems",
    description:
      "Pan-India UPS provider offering annual maintenance contracts, rental, multi-brand supply and battery replacement.",
    image: "/portfolio/Powerlifting Strength Collage Poster.png",
  },
  {
    name: "Ashlar Studio",
    href: "https://ashlar-studio.vercel.app/",
    caseStudySlug: "ashlar-studio",
    accent: "#35c98a",
    iconKey: "brush",
    category: "Architecture",
    description:
      "Architecture and interior design studio presenting residential and commercial design work and project enquiries.",
    image: "/portfolio/Stone and Acres Land Development Poster.png",
  },
  {
    name: "Alpha Adventures",
    href: "https://alphaadventures.in/",
    caseStudySlug: "alpha-adventures",
    accent: "#47143D",
    iconKey: "mountains",
    category: "Travel & Adventure",
    description:
      "Adventure operator running curated Sahyadri, Himalayan and Central India treks, fort cabins and camping.",
    image: "/portfolio/Eureka Coworking_ Good People, Better Ideas.png",
  },
  {
    name: "Edulocus",
    href: "https://edulocus.vercel.app/",
    caseStudySlug: "edulocus",
    accent: "#7c4dff",
    iconKey: "graduation",
    category: "Education",
    description:
      "Nagpur education consultancy offering career counselling, college planning and study-abroad guidance for MBBS students.",
    image: "/portfolio/Alumni Connections Campus Collage.png",
  },
];
