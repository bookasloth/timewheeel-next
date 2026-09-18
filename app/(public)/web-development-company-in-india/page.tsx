import type { Metadata } from "next";
import { site } from "@/lib/site";
import { wd } from "@/lib/web-development";
import { organizationLd, breadcrumbLd, localBusinessLd } from "@/lib/jsonld";
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
import { LeadForm } from "@/components/shared/lead-form";
import { GrowthBlueprintModal } from "@/components/shared/growth-blueprint-modal";

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

// Service schema, provider is the shared Organization node; areaServed India-wide.
const serviceLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    localBusinessLd(),
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

// FAQPage, must mirror the visible FAQ exactly (source: wd.faq).
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
    <div className="overflow-x-clip wd-india">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

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
      <LeadForm
        idPrefix="wd"
        source="Web Development Company in India"
        eyebrow="Start your project"
        heading="Get a Fixed Quote in 24 Hours"
        blurb="Tell us what you need built. You'll get a clear scope, a fixed price and a written timeline, no obligation, no jargon."
        infoRows={[
          { k: "Based in", v: "India" },
          { k: "Serving", v: "Clients across India & abroad" },
          { k: "Quote turnaround", v: "Within one business day" },
          { k: "You own", v: "Code, domain, hosting, data" },
        ]}
        serviceOptions={wd.serviceOptions}
        serviceLabel="What do you need?"
        submitLabel="Get My Fixed Quote"
        successHeading="Thanks, your quote is on the way."
        successBody="We've received your project details and will send a fixed quote and timeline within one business day."
      />
      <GrowthBlueprintModal service="Web Development" />
    </div>
  );
}
