import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/lib/site";
import { wd } from "@/lib/website-design";
import { organizationLd, breadcrumbLd } from "@/lib/jsonld";
import { WdHero } from "@/components/website-design/hero";
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

const PATH = "/website-design";
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
    <div className="overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <WdHero />
      <WdVp />
      <WdPortfolio />
      <WdProcess />
      <WdDesignSystem />
      {/* <WdBeforeAfter /> */}
      <WdServices />
      <WdWhy />
      <WdTestimonials />
      <WdFaq />
      <WdFinalCta />
    </div>
  );
}