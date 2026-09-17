import type { Metadata } from "next";
import { cf } from "@/lib/coffee-and-toffee";
import { CfHero } from "@/components/coffee-and-toffee/hero";
import { CfStats } from "@/components/coffee-and-toffee/stats";
import { CfProblem } from "@/components/coffee-and-toffee/problem";
import { CfSolution } from "@/components/coffee-and-toffee/solution";
import { CfFeatures } from "@/components/coffee-and-toffee/features";
import { CfBenefits } from "@/components/coffee-and-toffee/benefits";
import { CfProcess } from "@/components/coffee-and-toffee/process";
import { CfCapabilities } from "@/components/coffee-and-toffee/capabilities";
import { CfTestimonials } from "@/components/coffee-and-toffee/testimonials";
import { CfFaq } from "@/components/coffee-and-toffee/faq";
import { CfFinalCta } from "@/components/coffee-and-toffee/final-cta";

export const metadata: Metadata = {
  title: { absolute: cf.meta.title },
  description: cf.meta.description,
  openGraph: {
    type: "website",
    title: cf.meta.title,
    description: cf.meta.description,
    siteName: "Timewheel",
  },
  twitter: {
    card: "summary_large_image",
    title: cf.meta.title,
    description: cf.meta.description,
  },
  alternates: { canonical: "/products/coffee-for-me" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Coffee & Toffee",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: cf.meta.description,
  author: { "@type": "Organization", name: "Timewheel" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
};

export default function CoffeeAndToffeePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CfHero data={cf} />
      <CfStats data={cf} />
      <CfProblem data={cf} />
      <CfSolution data={cf} />
      <CfFeatures data={cf} />
      <CfBenefits data={cf} />
      <CfProcess data={cf} />
      <CfCapabilities data={cf} />
      <CfTestimonials data={cf} />
      <CfFaq data={cf} />
      <CfFinalCta data={cf} />
    </>
  );
}