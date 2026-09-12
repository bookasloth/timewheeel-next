import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/lib/site";
import { wd } from "@/lib/web-development";
import { organizationLd, breadcrumbLd } from "@/lib/jsonld";
import { WdHero } from "@/components/web-development/hero";
import { WdStats } from "@/components/web-development/stats";
import { WdPortfolio } from "@/components/web-development/portfolio";
import { WdStandards } from "@/components/web-development/standards";
import { WdServices } from "@/components/web-development/services";
import { WdTechStack } from "@/components/web-development/tech-stack";
import { WdPricing } from "@/components/web-development/pricing";
import { WdProcess } from "@/components/web-development/process";
import { WdOwnership } from "@/components/web-development/ownership";
import { WdIndustries } from "@/components/web-development/industries";
import { WdFaq } from "@/components/web-development/faq";
import { WdFinalCta } from "@/components/web-development/final-cta";
import { WdContact } from "@/components/web-development/contact";

const PATH = "/web-development-company-in-india";
const url = `${site.url}${PATH}`;

export const metadata: Metadata = {
  title: wd.meta.title,
  description: wd.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: wd.meta.title,
    description: wd.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: wd.meta.title,
    description: wd.meta.description,
  },
  // Local-intent hints for the "in India" query.
  other: { "geo.region": "IN", "geo.placename": "India" },
};

// Service schema — provider is the shared Organization node; areaServed India-wide.
const serviceLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    {
      "@type": "Service",
      name: "Web Development",
      serviceType: "Web development and web application development",
      areaServed: { "@type": "Country", name: "India" },
      provider: { "@id": `${site.url}/#organization` },
      url,
      description: wd.meta.description,
      offers: wd.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name },
      })),
    },
  ],
};

// FAQPage — must mirror the visible FAQ exactly (source: wd.faq).
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: wd.faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Web Development Company in India", path: PATH },
];

export default function WebDevelopmentIndiaPage() {
  return (
    <div className="overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Visible breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-6 pt-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground">Home</Link></li>
          <ChevronRight className="size-3" aria-hidden />
          <li aria-current="page" className="font-medium text-foreground">
            Web Development Company in India
          </li>
        </ol>
      </nav>

      <WdHero />
      <WdStats />
      <WdPortfolio />
      <WdStandards />
      <WdServices />
      <WdTechStack />
      <WdPricing />
      <WdProcess />
      <WdOwnership />
      <WdIndustries />
      <WdFaq />
      <WdFinalCta />
      <WdContact />
    </div>
  );
}
