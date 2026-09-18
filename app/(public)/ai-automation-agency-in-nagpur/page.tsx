import type { Metadata } from "next";
import { site } from "@/lib/site";
import { aiAuto } from "@/lib/ai-automation-nagpur";
import { organizationLd, breadcrumbLd } from "@/lib/jsonld";
import { AiHero } from "@/components/ai-automation/hero";
import { AiServices } from "@/components/ai-automation/services";
import { AiWhy } from "@/components/ai-automation/why";
import { AiProcess } from "@/components/ai-automation/process";
import { AiUseCases } from "@/components/ai-automation/use-cases";
import { AiCaseStudies } from "@/components/ai-automation/case-studies";
import { AiTestimonials } from "@/components/ai-automation/testimonials";
import { AiFinalCta } from "@/components/ai-automation/final-cta";

const PATH = "/ai-automation-agency-in-nagpur";
const url = `${site.url}${PATH}`;

export const metadata: Metadata = {
  title: aiAuto.meta.title,
  description: aiAuto.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: aiAuto.meta.title,
    description: aiAuto.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: aiAuto.meta.title,
    description: aiAuto.meta.description,
  },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    {
      "@type": "Service",
      name: "AI & Marketing Automation",
      serviceType: "AI automation and marketing automation for business",
      provider: { "@id": `${site.url}/#organization` },
      url,
      description: aiAuto.meta.description,
      areaServed: {
        "@type": "City",
        name: site.contact.city,
        containedInPlace: { "@type": "AdministrativeArea", name: site.contact.region },
      },
      offers: aiAuto.services.cards.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.title },
      })),
    },
  ],
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "AI Automation Agency in Nagpur", path: PATH },
];

export default function AiAutomationPage() {
  return (
    <div className="overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />

      <AiHero />
      <AiServices />
      <AiWhy />
      <AiProcess />
      <AiUseCases />
      <AiCaseStudies />
      <AiTestimonials />
      <AiFinalCta />
    </div>
  );
}
