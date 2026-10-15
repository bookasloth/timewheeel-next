import {
  ArrowsClockwise,
  BellRinging,
  Blueprint,
  Bug,
  CalendarCheck,
  ChartLineUp,
  ChatCircle,
  Coffee,
  CreditCard,
  Cube,
  GraduationCap,
  HandHeart,
  IdentificationCard,
  Lightning,
  LinkSimple,
  MagnifyingGlass,
  MapPin,
  Megaphone,
  Percent,
  QrCode,
  Receipt,
  ShieldCheck,
  Storefront,
  Student,
  Tag,
  Target,
  Ticket,
  Truck,
  Trophy,
  UsersThree,
  VideoCamera,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
// Type-only: erased at runtime, so it won't pull IconContext into server
// components (the /dist/ssr GOTCHA applies to icon *values*, not this type).
import type { Icon } from "@phosphor-icons/react";

export type ProductFeature = {
  icon: Icon;
  /** short block heading */
  title: string;
  /** one-line block subheading */
  description: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  icon: Icon;
  /** brand accent (hex), placeholder until real product palettes land */
  accent: string;
  /** external app URL, placeholder "#" until live URLs provided */
  href: string;
  /** featured on homepage + navbar with blurb + six feature blocks */
  featured?: boolean;
  blurb?: string;
  /** six illustrated capabilities, rendered as a 2x3 / 3x2 block grid */
  features?: ProductFeature[];
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
    features: [
      { icon: IdentificationCard, title: "Verified directory", description: "Confirmed by the institution" },
      { icon: MagnifyingGlass, title: "Directory search", description: "By batch, city or profession" },
      { icon: ChatCircle, title: "Batch groups", description: "Reunions and batch chats" },
      { icon: CalendarCheck, title: "Paid events", description: "With online registration" },
      { icon: CreditCard, title: "Memberships", description: "Fees, invoices and receipts" },
      { icon: Megaphone, title: "Fundraising", description: "Donations and broadcasts" },
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
    features: [
      { icon: CalendarCheck, title: "24/7 booking", description: "Any time, from one page" },
      { icon: CreditCard, title: "Pay up front", description: "UPI and Razorpay at booking" },
      { icon: ArrowsClockwise, title: "Calendar sync", description: "Two-way Google Calendar" },
      { icon: BellRinging, title: "Auto reminders", description: "WhatsApp and email" },
      { icon: Receipt, title: "GST invoicing", description: "Compliant invoices, built in" },
      { icon: ChartLineUp, title: "Dashboard", description: "Bookings and revenue" },
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
    features: [
      { icon: HandHeart, title: "One-tap support", description: "Back a creator in one tap" },
      { icon: Percent, title: "0% fee", description: "No platform cut on tips" },
      { icon: Lightning, title: "Instant payouts", description: "Straight to their bank" },
      { icon: ChatCircle, title: "Supporter messages", description: "Two-way, direct support" },
      { icon: Wallet, title: "No monthly fee", description: "Costs only when support does" },
      { icon: QrCode, title: "Page and QR", description: "Link, page and QR code" },
    ],
  },
  {
    slug: "ticket-dino",
    name: "Ticket Dino",
    tagline: "Sell Events & Tickets",
    icon: Ticket,
    accent: "#00b67a",
    href: "/products/ticket-dino",
    featured: true,
    blurb:
      "An event ticketing and management platform engineered for modern organizers who need reliability at scale, from ticket sales and attendee management to analytics and operational workflows.",
    features: [
      { icon: Ticket, title: "Ticket sales", description: "Types, capacity, windows" },
      { icon: Tag, title: "Coupons", description: "Discounts and early-bird" },
      { icon: QrCode, title: "QR check-in", description: "Scan with a live count" },
      { icon: ChartLineUp, title: "Live analytics", description: "Attendee tracking in real time" },
      { icon: UsersThree, title: "Attendee list", description: "Manage and export the list" },
      { icon: Lightning, title: "Scales at rush", description: "Built for doors-open spikes" },
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
    features: [
      { icon: ChatCircle, title: "Feed and groups", description: "Posts, groups and events" },
      { icon: UsersThree, title: "Memberships", description: "Paid tiers, recurring billing" },
      { icon: Ticket, title: "Paid events", description: "Tickets via Razorpay" },
      { icon: VideoCamera, title: "DMs and calls", description: "Messages and video by tier" },
      { icon: ShieldCheck, title: "Moderation", description: "Roles and a report queue" },
      { icon: Megaphone, title: "Broadcasts", description: "WhatsApp and email" },
    ],
  },
  {
    slug: "indian-sports-club",
    name: "Indian Sports Club",
    tagline: "Online & Offline Sports Community",
    icon: Trophy,
    accent: "#008c45",
    href: "/products/indian-sports-club",
    featured: true,
    blurb:
      "A community app for sports clubs in India: fixtures and results, teams and rosters, tournaments with paid registration, ground and slot bookings, a member directory, club memberships via Razorpay and moderation, online and on the ground.",
    features: [
      { icon: Trophy, title: "Fixtures and tables", description: "Results and points tables" },
      { icon: UsersThree, title: "Teams and rosters", description: "Squads and selection" },
      { icon: Ticket, title: "Tournaments", description: "Paid entry, live brackets" },
      { icon: CreditCard, title: "Memberships", description: "Season fees and subscriptions" },
      { icon: MapPin, title: "Ground bookings", description: "Court and slot booking" },
      { icon: ShieldCheck, title: "Club moderation", description: "Roles, reports and alerts" },
    ],
  },
  {
    slug: "archflow",
    name: "Archflow",
    tagline: "Project Workspace for Architects",
    icon: Blueprint,
    accent: "#0d9488",
    href: "/products/archflow",
  },
  {
    slug: "leader",
    name: "Leader",
    tagline: "Build Lead Lists From Maps",
    icon: Target,
    accent: "#5b8f6f",
    href: "/products/leader",
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
    features: [
      { icon: Storefront, title: "Storefront", description: "Catalogue, ready to sell" },
      { icon: Cube, title: "Variants and stock", description: "Options and inventory" },
      { icon: CreditCard, title: "Payments", description: "UPI, cards and COD" },
      { icon: Receipt, title: "GST invoices", description: "Compliant invoices" },
      { icon: Truck, title: "Shipping", description: "Rates and tracking" },
      { icon: ChatCircle, title: "WhatsApp updates", description: "Order and shipping alerts" },
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
    tagline: "SEO & Growth Marketing",
    icon: Bug,
    accent: "#fe5100",
    href: "/products/marketing-bug",
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
