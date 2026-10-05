// Starting prices for the six services we sell, grouped Tech / Marketing to
// match the navbar "What We Built" dropdown (names, taglines, icons, accents
// and hrefs are kept in sync with components/nav/navbar.tsx).
//
// Prices are "Starting ₹X" floors, not fixed quotes. Edit the numbers here.

import {
  Code,
  FileText,
  MagnifyingGlass,
  PenNib,
  ShareNetwork,
  Storefront,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

export type ServicePrice = {
  name: string;
  tagline: string;
  href: string;
  icon: Icon;
  /** brand accent (hex), used as the icon dab */
  accent: string;
  /** starting price, e.g. "₹12,000" */
  price: string;
  /** billing unit, e.g. "/ project" or "/ month" */
  unit: string;
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
      },
      {
        name: "Website Development",
        tagline: "Fast, clean builds that ship on time.",
        href: "/web-development-company-in-nagpur",
        icon: Code,
        accent: "#269cef",
        price: "₹12,000",
        unit: "/ project",
      },
      {
        name: "Shopify Development",
        tagline: "Storefronts tuned to sell.",
        href: "/shopify-development-company-in-nagpur",
        icon: Storefront,
        accent: "#5e8e3e",
        price: "₹18,000",
        unit: "/ project",
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
      },
      {
        name: "Search Engine Optimization",
        tagline: "Rank higher. Get found. Get leads.",
        href: "/seo-company-in-nagpur",
        icon: MagnifyingGlass,
        accent: "#4ab765",
        price: "₹15,000",
        unit: "/ month",
      },
      {
        name: "Digital Marketing",
        tagline: "Ad spend that pays back.",
        href: "/digital-marketing-company-in-nagpur",
        icon: FileText,
        accent: "#ffcc1c",
        price: "₹8,000",
        unit: "/ month + ad spend",
      },
    ],
  },
];
