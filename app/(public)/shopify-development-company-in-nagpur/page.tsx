import type { Metadata } from "next";
import { site } from "@/lib/site";
import { sd } from "@/lib/shopify-development";
import { organizationLd, breadcrumbLd, faqLd } from "@/lib/jsonld";
import { SdHero } from "@/components/shopify-development/hero";
import { SdStats } from "@/components/shopify-development/stats";
import { SdServices } from "@/components/shopify-development/services";
import { SdWhyChoose } from "@/components/shopify-development/why-choose";
import { SdWhatWeBuild } from "@/components/shopify-development/what-we-build";
import { SdPortfolio } from "@/components/shopify-development/portfolio";
import { SdProcess } from "@/components/shopify-development/process";
import { SdSpecialized } from "@/components/shopify-development/specialized";
import { SdIndustries } from "@/components/shopify-development/industries";
import { SdTech } from "@/components/shopify-development/tech";
import { SdFaq } from "@/components/shopify-development/faq";
import { SdFinalCta } from "@/components/shopify-development/final-cta";
import { GrowthBlueprintModal } from "@/components/shared/growth-blueprint-modal";

const PATH = "/shopify-development-company-in-nagpur";
const url = `${site.url}${PATH}`;

export const metadata: Metadata = {
  title: sd.meta.title,
  description: sd.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: sd.meta.title,
    description: sd.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: sd.meta.title,
    description: sd.meta.description,
  },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    {
      "@type": "Service",
      name: "Shopify Development",
      serviceType: "Shopify store development, migration and Shopify Plus",
      provider: { "@id": `${site.url}/#organization` },
      url,
      description: sd.meta.description,
      offers: sd.services.cards.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.title },
      })),
    },
  ],
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Shopify Development", path: PATH },
];

export default function ShopifyDevelopmentPage() {
  return (
    <div className="overflow-x-clip shopify-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(sd.faq)) }} />

      <SdHero />
      <SdStats />
      <SdServices />
      <SdWhyChoose />
      <SdWhatWeBuild />
      <SdPortfolio />
      <SdProcess />
      <SdSpecialized />
      <SdIndustries />
      <SdTech />
      <SdFaq />
      <SdFinalCta />
      <GrowthBlueprintModal service="Shopify Development" />
    </div>
  );
}
