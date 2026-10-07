import type { Metadata } from "next";
import { site } from "@/lib/site";

// Social tags (Open Graph + X/Twitter) for a page. Next merges metadata
// shallowly per key, so a page that sets its own `openGraph` drops the root one
// and with it the site card from app/opengraph-image.tsx, while a page that sets
// nothing inherits the homepage's og:url and twitter title. Every page builds
// both blocks here so url, title, description and image always travel together.
export const SITE_CARD = { url: "/opengraph-image", width: 1200, height: 630, alt: "Timewheel, build on systems you control forever" };

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
  const images = o.image === false ? {} : { images: [SITE_CARD] };
  return {
    openGraph: { type: o.type ?? "website", url, siteName: site.name, title: o.title, description: o.description, ...images },
    twitter: { card: "summary_large_image", title: o.title, description: o.description, ...images },
  };
}
