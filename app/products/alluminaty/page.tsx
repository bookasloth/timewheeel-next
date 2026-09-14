import type { Metadata } from "next";
import { az } from "@/lib/alluminaty";
import { AzHero } from "@/components/alluminaty/hero";
import { AzStats } from "@/components/alluminaty/stats";
import { AzMarquee } from "@/components/alluminaty/marquee";
import { AzProblem } from "@/components/alluminaty/problem";
import { AzSolution } from "@/components/alluminaty/solution";
import { AzBeforeAfter } from "@/components/alluminaty/before-after";
import { AzFeatures } from "@/components/alluminaty/features";
import { AzProcess } from "@/components/alluminaty/process";
import { AzPricing } from "@/components/alluminaty/pricing";
import { AzCapabilities } from "@/components/alluminaty/capabilities";
import { AzTestimonials } from "@/components/alluminaty/testimonials";
import { AzFaq } from "@/components/alluminaty/faq";
import { AzFinalCta } from "@/components/alluminaty/final-cta";

export const metadata: Metadata = {
  title: { absolute: az.meta.title },
  description: az.meta.description,
  openGraph: {
    type: "website",
    title: az.meta.title,
    description: az.meta.description,
    siteName: "Timewheel",
  },
  twitter: {
    card: "summary_large_image",
    title: az.meta.title,
    description: az.meta.description,
  },
  alternates: { canonical: "/products/alluminaty" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Alluminaty",
  applicationCategory: "CommunityApplication",
  operatingSystem: "Web",
  description: az.meta.description,
  author: { "@type": "Organization", name: "Timewheel" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
};

export default function AlluminatyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AzHero />
      <AzStats />
      <AzMarquee />
      <AzProblem />
      <AzSolution />
      <AzBeforeAfter />
      <AzFeatures />
      <AzProcess />
      <AzPricing />
      <AzCapabilities />
      <AzTestimonials />
      <AzFaq />
      <AzMarquee />
      <AzFinalCta />
    </>
  );
}