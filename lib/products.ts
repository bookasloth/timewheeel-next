import {
  Bug,
  CalendarCheck,
  ChatCircle,
  Coffee,
  GraduationCap,
  LinkSimple,
  MagnifyingGlass,
  Storefront,
  Student,
  Ticket,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
// Type-only: erased at runtime, so it won't pull IconContext into server
// components (the /dist/ssr GOTCHA applies to icon *values*, not this type).
import type { Icon } from "@phosphor-icons/react";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  icon: Icon;
  /** brand accent (hex), placeholder until real product palettes land */
  accent: string;
  /** external app URL, placeholder "#" until live URLs provided */
  href: string;
  /** featured on homepage + navbar with blurb + bullets */
  featured?: boolean;
  blurb?: string;
  bullets?: string[];
};

// Entries marked `featured` drive the navbar "What We Built" dropdown and the
// footer product links, in this order.
export const products: Product[] = [
  {
    slug: "alluminaty",
    name: "Alluminaty",
    tagline: "Alumni Management Software",
    icon: GraduationCap,
    accent: "#269cef",
    href: "/products/alluminaty",
    featured: true,
    blurb:
      "Alumni management software for schools and colleges: a verified alumni directory your institution owns, batch groups, events, membership fees and fundraising in one branded portal.",
    bullets: [
      "Verified alumni directory and database",
      "Events, batch groups and paid memberships",
      "Fundraising with receipts and a sponsor wall",
    ],
  },
  {
    slug: "book-a-sloth",
    name: "Book A Sloth",
    tagline: "Manage Bookings & Clients",
    icon: CalendarCheck,
    accent: "#fe5100",
    href: "/products/book-a-sloth",
    featured: true,
    blurb:
      "A modern booking platform built to simplify how businesses manage appointments, reservations, and customer scheduling, built around speed, usability, and conversion-focused experiences customers actually enjoy.",
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
    href: "/coffee-and-toffee",
    featured: true,
    blurb:
      "A creator monetization platform that lets audiences support creators through simple, meaningful contributions, helping creators build sustainable income while keeping a direct connection with their communities.",
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
    href: "/products/ticket-dino",
    featured: true,
    blurb:
      "An event ticketing and management platform engineered for modern organizers who need reliability at scale, from ticket sales and attendee management to analytics and operational workflows.",
    bullets: [
      "Smart event and ticket management",
      "Real-time analytics and attendee tracking",
      "Scalable infrastructure for high-volume events",
    ],
  },
  {
    slug: "the-parliament",
    name: "The Parliament",
    tagline: "Online Community Platform",
    icon: UsersThree,
    accent: "#ff4d93",
    href: "/products/the-parliament",
    featured: true,
    blurb:
      "An online community platform for groups that outgrew WhatsApp: feed, groups, paid events and memberships via Razorpay, DMs, video calls and moderation in one app.",
    bullets: [
      "Feed, groups and events in one place",
      "Paid memberships and event tickets via Razorpay",
      "Moderation, roles and WhatsApp broadcasts",
    ],
  },
  {
    slug: "ezshop",
    name: "EZShop",
    tagline: "Online Store Builder",
    icon: Storefront,
    accent: "#10b981",
    href: "/products/ezshop",
    featured: true,
    blurb:
      "An online store builder for Indian D2C brands and local shops: UPI, cards and COD via Razorpay, GST invoices, shipping and WhatsApp order updates, with no commission on orders.",
    bullets: [
      "Storefront, catalogue, variants and stock",
      "Razorpay UPI, cards and Cash on Delivery",
      "GST invoices, Shiprocket and WhatsApp updates",
    ],
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
