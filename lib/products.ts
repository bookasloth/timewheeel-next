import {
  Bug,
  CalendarClock,
  Coffee,
  GraduationCap,
  Link as LinkIcon,
  MessageCircle,
  School,
  Search,
  Ticket,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  /** brand accent (hex) — placeholder until real product palettes land */
  accent: string;
  /** external app URL — placeholder "#" until live URLs provided */
  href: string;
  /** featured on homepage with blurb + bullets */
  featured?: boolean;
  blurb?: string;
  bullets?: string[];
};

export const products: Product[] = [
  {
    slug: "book-a-sloth",
    name: "Book A Sloth",
    tagline: "Manage Bookings & Clients",
    icon: CalendarClock,
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
    icon: Users,
    accent: "#ff4d93",
    href: "#",
    featured: true,
    blurb:
      "A membership and subscription management platform for communities, organizations, and digital institutions — a structured ecosystem for recurring memberships, payments, engagement, and access with enterprise-grade trust.",
    bullets: [
      "Membership and subscription automation",
      "Secure recurring payment systems",
      "Community engagement and access control",
    ],
  },
  {
    slug: "coffee-for-me",
    name: "CoffeeForMe",
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
    slug: "link-lantern",
    name: "Link Lantern",
    tagline: "Share Links & Profiles",
    icon: LinkIcon,
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
    slug: "alluminaty",
    name: "Alluminaty",
    tagline: "Connect Schools & Alumni",
    icon: GraduationCap,
    accent: "#269cef",
    href: "#",
  },
  {
    slug: "whatsloom",
    name: "WhatsLoom",
    tagline: "Automate WhatsApp Workflows",
    icon: MessageCircle,
    accent: "#4ab765",
    href: "#",
  },
  {
    slug: "serp-sutra",
    name: "SERP Sutra",
    tagline: "Monitor SEO Visibility",
    icon: Search,
    accent: "#ff4d93",
    href: "#",
  },
  {
    slug: "2b-navodian",
    name: "2B Navodian",
    tagline: "Enroll Your Students In JNV",
    icon: School,
    accent: "#ffcc1c",
    href: "#",
  },
];

export const featuredProducts = products.filter((p) => p.featured);
