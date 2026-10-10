import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { site } from "@/lib/site";
import { breadcrumbLd, faqLd } from "@/lib/jsonld";
import { pmFaq } from "@/lib/perf-marketing";
import { DmCinematicHero } from "@/components/digital-marketing/cinematic-hero";
import { PmTrust } from "@/components/perf-marketing/trust";
import { PmIntro } from "@/components/perf-marketing/intro";
import { PmWhy } from "@/components/perf-marketing/why";
import { PmServices } from "@/components/perf-marketing/services";
import { PmAudience } from "@/components/perf-marketing/audience";
import { PmEcosystem } from "@/components/perf-marketing/ecosystem";
import { PmTestimonials } from "@/components/perf-marketing/testimonials";
import { PmFaq } from "@/components/perf-marketing/faq";
import { PmFinalCta } from "@/components/perf-marketing/final-cta";
import { LeadForm } from "@/components/shared/lead-form";
import { GrowthBlueprintModal } from "@/components/shared/growth-blueprint-modal";
import { dmServiceOptions } from "@/lib/digital-marketing2";
import { SmmCollaborators } from "@/components/social-media-marketing/collaborators";
import { RelatedServices } from "@/components/shared/related-services";

const TITLE = "Digital Marketing Agency in Nagpur: SEO & Ads";
const DESC =
  "Full-service digital marketing agency in Nagpur for SEO, paid ads, social media, content, email and WhatsApp marketing, run as one system with clear reports.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${site.url}/digital-marketing-company-in-nagpur` },
  ...social({ path: "/digital-marketing-company-in-nagpur", title: TITLE, description: DESC, image: false }),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Marketing Services",
  areaServed: ["Nagpur", "Pune", "Mumbai", "Maharashtra", "India"],
  provider: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  },
  offers: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Search Engine Optimization" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Paid Advertising" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Marketing" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content Marketing" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Email Marketing" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "WhatsApp Marketing" } },
  ],
};

// FAQPage, built from the FAQ the page actually shows (PmFaq reads the same list).
const faqJsonLd = faqLd(pmFaq);

export default function DigitalMarketing2Page() {
  return (
    <div className="overflow-x-clip pm-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              {
                name: "Digital Marketing Company in Nagpur",
                path: "/digital-marketing-company-in-nagpur",
              },
            ]),
          ),
        }}
      />
      <DmCinematicHero />
      <PmTrust />
      <PmIntro />
      <PmWhy />
      <PmServices />
      <PmAudience />
      <PmEcosystem />
      <PmTestimonials />
      <SmmCollaborators />
      <PmFaq />
      <RelatedServices current="/digital-marketing-company-in-nagpur" />
      <PmFinalCta />
      <div id="lead">
        <LeadForm
          idPrefix="dm2"
          source="Digital Marketing Agency in Nagpur"
          eyebrow="Start the conversation"
          heading="Get Your Free Digital Marketing Plan"
          blurb="Tell us your business and goals. We'll come back with a clear, honest plan across SEO, ads, social and site, with no obligation and no jargon."
          infoRows={[
            { k: "Based in", v: "Nagpur, Maharashtra" },
            { k: "Serving", v: "Businesses across India" },
            { k: "Response", v: "Within one business day" },
            { k: "Guarantees", v: "Honest timelines, never fake leads or rankings" },
          ]}
          serviceOptions={dmServiceOptions}
          serviceLabel="Service you need"
          submitLabel="Get My Free Plan"
          successHeading="Thanks, we'll be in touch."
          successBody="Your enquiry is in. We'll review your presence and reach out within one business day with a clear next step."
        />
      </div>
      <GrowthBlueprintModal service="Digital Marketing" />
    </div>
  );
}
