import type { Metadata } from "next";
import { site } from "@/lib/site";

// Social tags (Open Graph + X/Twitter) for a page. Next merges metadata
// shallowly per key, so a page that sets its own `openGraph` drops the root one,
// while a page that sets nothing inherits the homepage's og:url and twitter
// title. Every page builds both blocks here so url, title, description and
// image always travel together.

// Share cards in public/og, one per kind of page (1200 x 630).
const card = (file: string, alt: string) => ({ url: `/og/${file}.png`, width: 1200, height: 630, alt });

export const OG_CARDS = {
  home: card("home", "Timewheel: growth systems for brands that want to scale"),
  about: card("about", "About Timewheel: the team behind the work"),
  blog: card("blog", "Timewheel blog: notes on SEO, ads, web and growth"),
  caseStudy: card("case-study", "Timewheel case study: the brief, the build and the results"),
  contact: card("contact", "Contact Timewheel: tell us what you're building"),
  legal: card("legal", "Timewheel legal: policies, terms and the fine print"),
  product: card("product", "Timewheel products: software built for how Indian businesses run"),
  services: card("services", "Timewheel services: what we do, and how we do it"),
};

/** Default card for pages with no better match (and the root layout). */
export const SITE_CARD = OG_CARDS.home;

const SERVICE_PATHS = ["-company-in-nagpur", "/restaurant-marketing", "/solutions", "/pricing", "/seo-report"];
const PRODUCT_PATHS = ["/products/", "/coffee-and-toffee"];
const CONTACT_PATHS = ["/contact", "/book-a-demo", "/partners", "/write-for-us"];
const ABOUT_PATHS = ["/about", "/careers"];

/** Pick the share card for a path, e.g. "/legal/terms" gets the Legal card. */
export function cardFor(path: string) {
  const p = new URL(path, site.url).pathname;
  const starts = (list: string[]) => list.some((x) => p === x || p.startsWith(`${x}/`));
  if (p.startsWith("/legal/")) return OG_CARDS.legal;
  if (p === "/case-studies" || p.startsWith("/case-studies/")) return OG_CARDS.caseStudy;
  if (p === "/blog" || p.startsWith("/blog/")) return OG_CARDS.blog;
  if (PRODUCT_PATHS.some((x) => p.startsWith(x))) return OG_CARDS.product;
  if (SERVICE_PATHS.some((x) => p.includes(x))) return OG_CARDS.services;
  if (starts(CONTACT_PATHS)) return OG_CARDS.contact;
  if (starts(ABOUT_PATHS)) return OG_CARDS.about;
  return SITE_CARD;
}

export function social(o: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  // false = the route ships its own opengraph-image file. Config images would
  // override that file, so leave them out and let the file supply the card.
  image?: false;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const url = new URL(o.path, site.url).toString();
  const images = o.image === false ? {} : { images: [cardFor(o.path)] };
  return {
    openGraph: { type: o.type ?? "website", url, siteName: site.name, title: o.title, description: o.description, ...images },
    twitter: { card: "summary_large_image", title: o.title, description: o.description, ...images },
  };
}
