import type { Metadata } from "next";
import { site } from "@/lib/site";
import { seo } from "@/lib/seo";
import { organizationLd, breadcrumbLd, localBusinessLd } from "@/lib/jsonld";
import { LeadForm } from "@/components/shared/lead-form";
import { GrowthBlueprintModal } from "@/components/shared/growth-blueprint-modal";
import { SeoHero } from "@/components/seo/hero";
import { SeoStats } from "@/components/seo/stats";
import { SeoLocal } from "@/components/seo/local";
import { SeoServices } from "@/components/seo/services";
import { SeoAeo } from "@/components/seo/aeo";
import { SeoExpectations } from "@/components/seo/expectations";
import { SeoProcess } from "@/components/seo/process";
import { SeoDeliverables } from "@/components/seo/deliverables";
import { SeoPricing } from "@/components/seo/pricing";
import { SeoComparison } from "@/components/seo/comparison";
import { SeoLocalities } from "@/components/seo/localities";
import { SeoFaq } from "@/components/seo/faq";
import { SeoFinalCta } from "@/components/seo/final-cta";

const PATH = "/seo-company-in-nagpur";
const url = `${site.url}${PATH}`;

export const metadata: Metadata = {
  title: seo.meta.title,
  description: seo.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: seo.meta.title,
    description: seo.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.meta.title,
    description: seo.meta.description,
  },
  other: { "geo.region": "IN-MH", "geo.placename": "Nagpur" },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    localBusinessLd(),
    {
      "@type": "Service",
      name: "SEO Services in Nagpur",
      serviceType: "Search engine optimisation and AI-search visibility",
      areaServed: { "@type": "City", name: "Nagpur" },
      provider: { "@id": `${site.url}/#organization` },
      url,
      description: seo.meta.description,
      offers: seo.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name },
      })),
    },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: seo.faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "SEO Company in Nagpur", path: PATH },
];

export default function SeoCompanyNagpurPage() {
  return (
    <div id="top" className="overflow-x-clip seo-nagpur-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <SeoHero />
      <SeoStats />
      <SeoLocal />
      <SeoServices />
      <SeoAeo />
      <SeoExpectations />
      <SeoProcess />
      <SeoDeliverables />
      <SeoPricing />
      <SeoComparison />
      <SeoLocalities />
      <SeoFaq />
      <SeoFinalCta />
      <LeadForm
        idPrefix="seo"
        source="SEO Company in Nagpur"
        eyebrow="Start the conversation"
        heading="Get Your Free SEO Plan"
        blurb="Run the audit above, then tell us your goals. We'll come back with a clear, honest plan, no obligation, no jargon."
        infoRows={[
          { k: "Based in", v: "Nagpur, Maharashtra" },
          { k: "Serving", v: "Businesses across India" },
          { k: "Response", v: "Within one business day" },
          { k: "Guarantees", v: "Honest timelines, never fake rankings" },
        ]}
        serviceOptions={seo.serviceOptions}
        serviceLabel="Service you need"
        submitLabel="Get My Free SEO Plan"
        successHeading="Thanks, we'll be in touch."
        successBody="Your enquiry is in. We'll review your site and reach out within one business day with a clear next step."
      />
      <GrowthBlueprintModal service="SEO" />
    </div>
  );
}
