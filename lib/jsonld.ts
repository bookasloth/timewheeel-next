// Typed JSON-LD builders (next-seo pattern, no dependency).
// Native Metadata API in layout.tsx handles meta/OG/Twitter; this file
// only produces structured data for rich results + AI-search crawlers.
import { products, type Product } from "@/lib/products";
import { site } from "@/lib/site";

type Thing = Record<string, unknown>;

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

// Only real social profiles — placeholder "#" links are dropped.
const sameAs = Object.values(site.social).filter((u) => u !== "#");

export function organizationLd(): Thing {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    description:
      "Timewheel builds self-hosted business tools for bookings, payments, events, and communities — own your systems, no SaaS rent or platform commissions.",
    ...(sameAs.length ? { sameAs } : {}),
    // ponytail: add `logo` once a real /logo.png ships (memory: asset TODO).
  };
}

export function websiteLd(): Thing {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: site.name,
    url: site.url,
    publisher: { "@id": ORG_ID },
  };
}

function productLd(p: Product): Thing {
  return {
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: p.blurb ?? p.tagline,
    ...(p.href !== "#" ? { url: p.href } : {}),
    publisher: { "@id": ORG_ID },
  };
}

/** Homepage graph: Organization + WebSite + every product. */
export function homeLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationLd(), websiteLd(), ...products.map(productLd)],
  };
}

/** BreadcrumbList for a subpage. Pass trail from home → current page. */
export function breadcrumbLd(items: { name: string; path: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}
