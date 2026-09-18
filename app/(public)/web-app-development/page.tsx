import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/lib/site";
import { wa } from "@/lib/web-app-development";
import { organizationLd, breadcrumbLd } from "@/lib/jsonld";
import { WaHero } from "@/components/web-app-development/hero";
import { WaFeatureStrip } from "@/components/web-app-development/feature-strip";
import { WaSolutions } from "@/components/web-app-development/solutions";
import { WaExpertise } from "@/components/web-app-development/expertise";
import { WaTechStack } from "@/components/web-app-development/tech-stack";
import { WaProcess } from "@/components/web-app-development/process";
import { WaBenefits } from "@/components/web-app-development/benefits";
import { WaFinalCta } from "@/components/web-app-development/final-cta";
import { GrowthBlueprintModal } from "@/components/shared/growth-blueprint-modal";

const PATH = "/web-app-development";
const url = `${site.url}${PATH}`;

export const metadata: Metadata = {
  title: wa.meta.title,
  description: wa.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: wa.meta.title,
    description: wa.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: wa.meta.title,
    description: wa.meta.description,
  },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    {
      "@type": "Service",
      name: "Web App Development",
      serviceType: "Web application development and product design",
      provider: { "@id": `${site.url}/#organization` },
      url,
      description: wa.meta.description,
      offers: wa.solutions.cards.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.title },
      })),
    },
  ],
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Web App Development", path: PATH },
];

export default function WebAppDevelopmentPage() {
  return (
    <div className="overflow-x-clip wa-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />


      <WaHero />
      <WaFeatureStrip />
      <WaSolutions />
      <WaExpertise />
      <WaTechStack />
      <WaProcess />
      <WaBenefits />
      <WaFinalCta />
      <GrowthBlueprintModal service="Web App Development" />
    </div>
  );
}