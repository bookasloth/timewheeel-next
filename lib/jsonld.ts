// Typed JSON-LD builders (next-seo pattern, no dependency).
// Native Metadata API in layout.tsx handles meta/OG/Twitter; this file
// only produces structured data for rich results + AI-search crawlers.
import { products, type Product } from "@/lib/products";
import { site } from "@/lib/site";

type Thing = Record<string, unknown>;

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

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
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.contact.email,
      telephone: site.contact.phone,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
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
      addressLocality: site.contact.city,
      addressRegion: site.contact.region,
      addressCountry: "IN",
      // ponytail: add streetAddress + postalCode when the real office address is confirmed.
    },
    areaServed: { "@type": "City", name: site.contact.city },
    // ponytail: keep in sync with site.contact.hours (human string), schema needs machine format.
    openingHours: "Mo-Sa 10:00-19:00",
    ...(sameAs.length ? { sameAs } : {}),
  };
}
