// Typed JSON-LD builders (next-seo pattern, no dependency).
// Native Metadata API in layout.tsx handles meta/OG/Twitter; this file
// only produces structured data for rich results + AI-search crawlers.
import { products, type Product } from "@/lib/products";
import { site } from "@/lib/site";

type Thing = Record<string, unknown>;

export const ORG_ID = `${site.url}/#organization`;
export const SITE_ID = `${site.url}/#website`;

// Only real social profiles, placeholder "#" links are dropped.
const sameAs = Object.values(site.social).filter((u) => u !== "#");

export function organizationLd(): Thing {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: "Timewheel Internet Pvt. Ltd.",
    url: site.url,
    description:
      "Timewheel builds self-hosted business tools for bookings, payments, events, and communities, own your systems, no SaaS rent or platform commissions.",
    logo: `${site.url}/logo.webp`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.contact.email,
      telephone: site.contact.phone,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.streetAddress,
      addressLocality: site.contact.city,
      addressRegion: site.contact.addressRegion,
      postalCode: site.contact.postalCode,
      addressCountry: "IN",
    },
    ...(sameAs.length ? { sameAs } : {}),
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

/** Service offered, tied to the org and the Nagpur service area. */
export function serviceLd(opts: {
  name: string;
  path: string;
  description?: string;
  serviceType?: string;
}): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    url: `${site.url}${opts.path}`,
    ...(opts.serviceType ? { serviceType: opts.serviceType } : {}),
    ...(opts.description ? { description: opts.description } : {}),
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: site.contact.city,
      containedInPlace: { "@type": "AdministrativeArea", name: site.contact.region },
    },
  };
}

/** FAQPage mirroring an on-page FAQ. Pass the same {q,a} list the page renders. */
export function faqLd(items: { q: string; a: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** LocalBusiness for the Nagpur entity, feeds map-pack + AI "top agencies" answers. */
export function localBusinessLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    url: site.url,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.streetAddress,
      addressLocality: site.contact.city,
      addressRegion: site.contact.addressRegion,
      postalCode: site.contact.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.contact.geo.lat,
      longitude: site.contact.geo.lng,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${site.contact.geo.lat},${site.contact.geo.lng}`,
    areaServed: { "@type": "City", name: site.contact.city },
    openingHours: site.contact.openingHours,
    parentOrganization: { "@id": ORG_ID },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** Reference to the canonical Organization node, so every page links into one entity graph. */
export const orgRef = (): Thing => ({ "@id": ORG_ID });

/** WebPage-family node (AboutPage, ContactPage, CollectionPage...) tied to the WebSite + Org. */
export function webPageLd(opts: {
  type?: string;
  name: string;
  path: string;
  description?: string;
  mainEntity?: Thing;
}): Thing {
  const url = `${site.url}${opts.path}`;
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    isPartOf: { "@id": SITE_ID },
    publisher: { "@id": ORG_ID },
    ...(opts.mainEntity ? { mainEntity: opts.mainEntity } : {}),
  };
}

/** ItemList of internal URLs (for CollectionPage mainEntity). */
export function itemListLd(items: { name: string; path: string }[]): Thing {
  return {
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: `${site.url}${it.path}`,
    })),
  };
}
