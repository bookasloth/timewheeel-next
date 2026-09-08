import {
  Bug,
  CalendarCheck,
  ChatCircle,
  Coffee,
  GraduationCap,
  LinkSimple,
  MagnifyingGlass,
  Student,
  Ticket,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react/dist/ssr";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  icon: Icon;
  /** brand accent (hex) — placeholder until real product palettes land */
  accent: string;
  /** external app URL — placeholder "#" until live URLs provided */
  href: string;
  /** featured on homepage + navbar with blurb + bullets */
  featured?: boolean;
  blurb?: string;
  bullets?: string[];
};

// The first four are `featured` — they drive both the navbar "What We Built"
// dropdown and the homepage ecosystem section, in this order.
export const products: Product[] = [
  {
    slug: "alluminaty",
    name: "Alluminaty",
    tagline: "Connect Schools & Alumni",
    icon: GraduationCap,
    accent: "#269cef",
    href: "#",
    featured: true,
    blurb:
      "An alumni engagement platform that keeps schools, colleges, and their graduates connected long after they leave — directories, events, mentorship, and giving in one place instead of scattered spreadsheets and group chats.",
    bullets: [
      "Searchable alumni directories and profiles",
      "Events, reunions, and mentorship programs",
      "Fundraising and community engagement tools",
    ],
  },
  {
    slug: "book-a-sloth",
    name: "Book A Sloth",
    tagline: "Manage Bookings & Clients",
    icon: CalendarCheck,
    accent: "#fe5100",
    href: "#",
    featured: true,
    blurb:
      "A modern booking platform built to simplify how businesses manage appointments, reservations, and customer scheduling — built around speed, usability, and conversion-focused experiences customers actually enjoy.",
    bullets: [
      "Fast and frictionless booking workflows",
      "Automated scheduling and confirmations",
      "Conversion-focused customer experience",
    ],
  },
  {
    slug: "coffee-for-me",
    name: "Coffee and Toffee",
    tagline: "Collect Tips & Donations",
    icon: Coffee,
    accent: "#ffcc1c",
    href: "#",
    featured: true,
    blurb:
      "A creator monetization platform that lets audiences support creators through simple, meaningful contributions — helping creators build sustainable income while keeping a direct connection with their communities.",
    bullets: [
      "Simple tipping and creator support tools",
      "Direct audience-to-creator monetization",
      "Built for independent creators and communities",
    ],
  },
  {
    slug: "ticket-dino",
    name: "Ticket Dino",
    tagline: "Sell Events & Tickets",
    icon: Ticket,
    accent: "#269cef",
    href: "#",
    featured: true,
    blurb:
      "An event ticketing and management platform engineered for modern organizers who need reliability at scale — from ticket sales and attendee management to analytics and operational workflows.",
    bullets: [
      "Smart event and ticket management",
      "Real-time analytics and attendee tracking",
      "Scalable infrastructure for high-volume events",
    ],
  },
  {
    slug: "the-parliament",
    name: "The Parliament",
    tagline: "Run Communities & Memberships",
    icon: UsersThree,
    accent: "#ff4d93",
    href: "#",
  },
  {
    slug: "link-lantern",
    name: "Link Lantern",
    tagline: "Share Links & Profiles",
    icon: LinkSimple,
    accent: "#4ab765",
    href: "#",
  },
  {
    slug: "marketing-bug",
    name: "Marketing Bug",
    tagline: "Study Marketing Failures",
    icon: Bug,
    accent: "#fe5100",
    href: "#",
  },
  {
    slug: "whatsloom",
    name: "WhatsLoom",
    tagline: "Automate WhatsApp Workflows",
    icon: ChatCircle,
    accent: "#4ab765",
    href: "#",
  },
  {
    slug: "serp-sutra",
    name: "SERP Sutra",
    tagline: "Monitor SEO Visibility",
    icon: MagnifyingGlass,
    accent: "#ff4d93",
    href: "#",
  },
  {
    slug: "2b-navodian",
    name: "2B Navodian",
    tagline: "Enroll Your Students In JNV",
    icon: Student,
    accent: "#ffcc1c",
    href: "#",
  },
];

export const featuredProducts = products.filter((p) => p.featured);
