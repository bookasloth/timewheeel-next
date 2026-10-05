// Starting prices for the six services we sell, grouped Tech / Marketing to
// match the navbar "What We Built" dropdown (names, taglines, icons, accents
// and hrefs are kept in sync with components/nav/navbar.tsx).
//
// Prices are "Starting ₹X" floors, not fixed quotes. `points` are the
// inclusions shown on each card, and `capacity` drives the per-service
// availability counter. Edit everything here, one place.

import {
  Code,
  FileText,
  MagnifyingGlass,
  PenNib,
  ShareNetwork,
  Storefront,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

export type ServiceCapacity = {
  /** intake month shown on the counter, e.g. "November 2026" */
  month: string;
  /** how many project slots are still open */
  slotsLeft: number;
  /** total slots we take that month (drives the dots) */
  slotsTotal: number;
};

export type ServicePrice = {
  name: string;
  tagline: string;
  href: string;
  icon: Icon;
  /** brand accent (hex), used for the colour-coding on each row */
  accent: string;
  /** readable text shade when `accent` is too light for type (e.g. yellow);
      falls back to `accent` */
  accentText?: string;
  /** starting price, e.g. "₹12,000" */
  price: string;
  /** billing unit, e.g. "/ project" or "/ month" */
  unit: string;
  /** what's included, shown as the card's bullet list */
  points: string[];
  capacity: ServiceCapacity;
};

export type ServiceGroup = {
  title: string;
  services: ServicePrice[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    title: "Tech",
    services: [
      {
        name: "Website Design",
        tagline: "Interfaces built to convert, not just impress.",
        href: "/website-design-company-in-nagpur",
        icon: PenNib,
        accent: "#47143D",
        price: "₹7,000",
        unit: "/ project",
        points: [
          "Up to 6 custom-designed pages",
          "Mobile-first, conversion-focused layouts",
          "Reusable design system + brand-consistent UI",
          "2 rounds of revisions",
        ],
        capacity: { month: "November 2026", slotsLeft: 4, slotsTotal: 6 },
      },
      {
        name: "Website Development",
        tagline: "Fast, clean builds that ship on time.",
        href: "/web-development-company-in-nagpur",
        icon: Code,
        accent: "#269cef",
        price: "₹12,000",
        unit: "/ project",
        points: [
          "Up to 8 hand-coded, responsive pages",
          "Fast, SEO-ready, clean builds",
          "CMS or no-code handoff",
          "Forms, analytics & integrations",
        ],
        capacity: { month: "November 2026", slotsLeft: 3, slotsTotal: 5 },
      },
      {
        name: "Shopify Development",
        tagline: "Storefronts tuned to sell.",
        href: "/shopify-development-company-in-nagpur",
        icon: Storefront,
        accent: "#5e8e3e",
        price: "₹18,000",
        unit: "/ project",
        points: [
          "Full Shopify storefront setup",
          "Up to 20 products loaded",
          "Payment & shipping configuration",
          "Theme customization + launch support",
        ],
        capacity: { month: "November 2026", slotsLeft: 2, slotsTotal: 4 },
      },
    ],
  },
  {
    title: "Marketing",
    services: [
      {
        name: "Social Media Marketing",
        tagline: "Content that stops the scroll.",
        href: "/social-media-marketing-company-in-nagpur",
        icon: ShareNetwork,
        accent: "#be123c",
        price: "₹10,000",
        unit: "/ month",
        points: [
          "12-15 scroll-stopping posts a month",
          "Content calendar + captions",
          "2 platforms managed end-to-end",
          "Monthly performance report",
        ],
        capacity: { month: "November 2026", slotsLeft: 5, slotsTotal: 8 },
      },
      {
        name: "Search Engine Optimization",
        tagline: "Rank higher. Get found. Get leads.",
        href: "/seo-company-in-nagpur",
        icon: MagnifyingGlass,
        accent: "#4ab765",
        price: "₹15,000",
        unit: "/ month",
        points: [
          "On-page + technical SEO",
          "10 target keywords tracked",
          "Monthly content optimization",
          "Rank & traffic reporting",
        ],
        capacity: { month: "November 2026", slotsLeft: 4, slotsTotal: 6 },
      },
      {
        name: "Digital Marketing",
        tagline: "Ad spend that pays back.",
        href: "/digital-marketing-company-in-nagpur",
        icon: FileText,
        accent: "#ffcc1c",
        accentText: "#b45309",
        price: "₹8,000",
        unit: "/ month + ad spend",
        points: [
          "Google & Meta ads management",
          "Campaign setup + ad creatives",
          "Conversion tracking",
          "Weekly optimization & reports",
        ],
        capacity: { month: "November 2026", slotsLeft: 3, slotsTotal: 6 },
      },
    ],
  },
];
