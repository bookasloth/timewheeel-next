import type { Metadata } from "next";
import { site } from "@/lib/site";
import { organizationLd, breadcrumbLd, faqLd } from "@/lib/jsonld";
import { aimFaq, aimServiceOptions } from "@/lib/ai-marketing";
import { AimHeroCentered } from "@/components/ai-marketing/hero-centered";
import { AimTrust } from "@/components/ai-marketing/trust";
import { AimIntro } from "@/components/ai-marketing/intro";
import { AimWhy } from "@/components/ai-marketing/why";
import { AimServices } from "@/components/ai-marketing/services";
import { AimAudience } from "@/components/ai-marketing/audience";
import { AimEcosystem } from "@/components/ai-marketing/ecosystem";
import { AimTestimonials } from "@/components/ai-marketing/testimonials";
import { AimFaq } from "@/components/ai-marketing/faq";
import { AimFinalCta } from "@/components/ai-marketing/final-cta";
import { LeadForm } from "@/components/shared/lead-form";
import { GrowthBlueprintModal } from "@/components/shared/growth-blueprint-modal";

const PATH = "/ai-marketing-automation-company-in-nagpur";
const url = `${site.url}${PATH}`;

export const metadata: Metadata = {
  title: "AI Marketing Automation Company in Nagpur",
  description:
    "AI marketing automation in Nagpur, smarter ads, WhatsApp chatbots, predictive lead scoring, AI content and journey automation, one connected system that captures and converts more enquiries.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: "AI Marketing Automation Company in Nagpur",
    description:
      "AI-powered marketing automation in Nagpur, ads, chatbots, lead scoring, content and journeys working as one system.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Marketing Automation Company in Nagpur",
    description:
      "AI-powered marketing automation in Nagpur, ads, chatbots, lead scoring, content and journeys working as one system.",
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "AI Marketing Automation", path: PATH },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Marketing Automation Services",
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
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Ad Optimization" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Chatbots & WhatsApp Automation" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Predictive Lead Scoring" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Content Generation" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Email & Journey Automation" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marketing Analytics & Insights" } },
  ],
};

export default function AiMarketingAutomationPage() {
  return (
    <div className="overflow-x-clip ai-marketing-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(aimFaq)) }}
      />
      <AimHeroCentered />
      <AimTrust />
      <AimIntro />
      <AimWhy />
      <AimServices />
      <AimAudience />
      <AimEcosystem />
      <AimTestimonials />
      <AimFaq />
      <AimFinalCta />
      <div id="contact">
        <LeadForm
          idPrefix="aim"
          source="AI Marketing Automation in Nagpur"
          eyebrow="Start the conversation"
          heading="Get Your Free AI Marketing Plan"
          blurb="Tell us your business and goals. We'll come back with a clear, honest plan for where AI automation actually moves the needle, with no obligation and no jargon."
          infoRows={[
            { k: "Based in", v: "Nagpur, Maharashtra" },
            { k: "Serving", v: "Businesses across India" },
            { k: "Response", v: "Within one business day" },
            { k: "Guarantees", v: "Honest timelines, you stay in control of every automation" },
          ]}
          serviceOptions={aimServiceOptions}
          serviceLabel="Service you need"
          submitLabel="Get My Free Plan"
          successHeading="Thanks, we'll be in touch."
          successBody="Your enquiry is in. We'll review your setup and reach out within one business day with a clear next step."
        />
      </div>
      <GrowthBlueprintModal service="AI Marketing Automation" />
    </div>
  );
}
