import type { Metadata } from "next";
import { site } from "@/lib/site";
import { smm } from "@/lib/social-media-marketing";
import { organizationLd, localBusinessLd, breadcrumbLd } from "@/lib/jsonld";
import { SmmHero } from "@/components/social-media-marketing/hero";
import { SmmCollaborators } from "@/components/social-media-marketing/collaborators";
import { SmmMetrics } from "@/components/social-media-marketing/metrics";
import { SmmFeed } from "@/components/social-media-marketing/feed";
import { SmmTestimonials } from "@/components/social-media-marketing/testimonials";
import { SmmPackages } from "@/components/social-media-marketing/packages";
import { SmmFounder } from "@/components/social-media-marketing/founder";
import { SmmStickyCta } from "@/components/social-media-marketing/sticky-cta";
import { SmmIntro } from "@/components/social-media-marketing/intro";
import { SmmServices } from "@/components/social-media-marketing/services";
import { SmmPlatforms } from "@/components/social-media-marketing/platforms";
import { SmmApproach } from "@/components/social-media-marketing/approach";
import { SmmWhy } from "@/components/social-media-marketing/why";
import { SmmContentPurpose } from "@/components/social-media-marketing/content-purpose";
import { SmmWorkflow } from "@/components/social-media-marketing/workflow";
import { SmmFaq } from "@/components/social-media-marketing/faq";
import { SmmFinalCta } from "@/components/social-media-marketing/final-cta";
import { LeadForm } from "@/components/shared/lead-form";
import { GrowthBlueprintModal } from "@/components/shared/growth-blueprint-modal";

const PATH = "/social-media-marketing-company-in-nagpur";
const url = `${site.url}${PATH}`;
const title = "Social Media Marketing Company in Nagpur | Timewheel";
const description =
  "Social media marketing company in Nagpur, strategy, content, creative, community and paid social under one roof. One consistent brand voice, clear reporting and honest timelines.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  // Local-intent hints for the "in Nagpur" query.
  other: { "geo.region": "IN-MH", "geo.placename": "Nagpur" },
};

// Service schema, provider is the shared Organization node; areaServed Nagpur.
const serviceLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    localBusinessLd(),
    {
      "@type": "Service",
      name: "Social Media Marketing",
      serviceType: "Social media strategy, content, management and advertising",
      areaServed: { "@type": "City", name: "Nagpur" },
      provider: { "@id": `${site.url}/#organization` },
      url,
      description,
      offers: smm.services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title },
      })),
    },
  ],
};

// FAQPage, must mirror the visible FAQ exactly (source: smm.faq).
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: smm.faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Social Media Marketing", path: PATH },
];

export default function SocialMediaMarketingPage() {
  return (
    <div className="overflow-x-clip smm-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <SmmHero />
      <SmmIntro />
      <SmmMetrics />
      <SmmServices />
      <SmmPlatforms />
      <SmmFeed />
      <SmmApproach />
      <SmmWhy />
      <SmmContentPurpose />
      <SmmWorkflow />
      <SmmPackages />
      <SmmCollaborators />
      <SmmTestimonials />
      <SmmFounder />
      <SmmFaq />
      <SmmFinalCta />
      <SmmStickyCta />
      <LeadForm
        idPrefix="smm"
        source="Social Media Marketing Company in Nagpur"
        eyebrow="Start the conversation"
        heading="Get a Social Media Plan Built for Your Brand"
        blurb="Tell us about your business and what you want social media to do for it. We'll come back with an honest, personalised plan, strategy, channels and next steps, no obligation, no jargon."
        infoRows={[
          { k: "Based in", v: "Nagpur, Maharashtra" },
          { k: "Serving", v: "Businesses across India" },
          { k: "Response", v: "Within one business day" },
          { k: "Guarantees", v: "Honest timelines, never fake followers or stats" },
        ]}
        serviceOptions={smm.serviceOptions}
        serviceLabel="What do you need?"
        submitLabel="Get My Social Media Plan"
        successHeading="Thanks, we'll be in touch."
        successBody="Your enquiry is in. We'll review your presence and reach out within one business day with a clear next step."
      />
      <GrowthBlueprintModal service="Social Media Marketing" />
    </div>
  );
}
