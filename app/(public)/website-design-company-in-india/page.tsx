import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/lib/site";
import { wd } from "@/lib/website-design";
import { LeadForm } from "@/components/shared/lead-form";
import { organizationLd, breadcrumbLd } from "@/lib/jsonld";
import { WdHero } from "@/components/website-design/hero";
import { WdStats } from "@/components/website-design/stats";
import { WdAudit } from "@/components/website-design/audit";
import { WdVp } from "@/components/website-design/value-props";
import { WdPortfolio } from "@/components/website-design/portfolio";
import { WdProcess } from "@/components/website-design/process";
import { WdDesignSystem } from "@/components/website-design/design-system";
import { WdBeforeAfter } from "@/components/website-design/before-after";
import { WdServices } from "@/components/website-design/services";
import { WdWhy } from "@/components/website-design/why";
import { WdTestimonials } from "@/components/website-design/testimonials";
import { WdFaq } from "@/components/website-design/faq";
import { WdFinalCta } from "@/components/website-design/final-cta";
import { GrowthBlueprintModal } from "@/components/shared/growth-blueprint-modal";

const PATH = "/website-design-company-in-india";
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
};

const serviceLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    {
      "@type": "Service",
      name: "Web Design & Website Design Services",
      serviceType:
        "Web design, UI/UX design and website development for startups and growing businesses",
      description: wd.meta.description,
      provider: { "@id": `${site.url}/#organization` },
      url,
      offers: wd.services.included.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name },
      })),
    },
  ],
};

// FAQPage, mirrors the visible FAQ exactly (source: wd.faq.items).
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: wd.faq.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Website Design", path: PATH },
];

export default function WebsiteDesignPage() {
  return (
    <div className="overflow-x-clip wd-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <WdHero />
      <WdStats />
      <WdVp />
      <WdPortfolio />
      <WdProcess />
      <WdDesignSystem />
      {/* <WdBeforeAfter /> */}
      <WdServices />
      <WdWhy />
      <WdTestimonials />
      <WdFaq />
      {/* <WdAudit /> */}
      <WdFinalCta />
      <div id="lead">
        <LeadForm
          idPrefix="wd"
          source="Website Design"
          eyebrow="Start the conversation"
          heading="Get Your Free Website Design Plan"
          blurb="Tell us about your project. We'll come back with a clear, honest design proposal, no obligation, no jargon."
          infoRows={[
            { k: "Based in", v: "Nagpur, Maharashtra" },
            { k: "Serving", v: "Clients across India & abroad" },
            { k: "Response", v: "Within one business day" },
            { k: "Guarantees", v: "Honest timelines, never fake rankings" },
          ]}
          serviceOptions={wd.serviceOptions}
          serviceLabel="Service you need"
          submitLabel="Get My Free Design Plan"
          successHeading="Thanks, we'll be in touch."
          successBody="Your enquiry is in. We'll review your project and reach out within one business day with a clear next step."
        />
      </div>
      <GrowthBlueprintModal service="Website Design" />
    </div>
  );
}