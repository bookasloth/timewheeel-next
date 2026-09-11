import type { Metadata } from "next";
import { bas } from "@/lib/book-a-sloth";
import { BasHero } from "@/components/book-a-sloth/hero";
import { BasProblem } from "@/components/book-a-sloth/problem";
import { BasAutomation } from "@/components/book-a-sloth/automation";
import { BasBeforeAfter } from "@/components/book-a-sloth/before-after";
import { BasCapabilities } from "@/components/book-a-sloth/capabilities";
import { BasFaq } from "@/components/book-a-sloth/faq";
import { BasProcess } from "@/components/book-a-sloth/process";
import { BasFinalCta } from "@/components/book-a-sloth/final-cta";
import { BasFeatures } from "@/components/book-a-sloth/features";
import { BasTestimonials } from "@/components/book-a-sloth/testimonials";

export const metadata: Metadata = {
  title: { absolute: bas.meta.title },
  description: bas.meta.description,
  openGraph: {
    type: "website",
    title: bas.meta.title,
    description: bas.meta.description,
    siteName: "Timewheel",
  },
  twitter: {
    card: "summary_large_image",
    title: bas.meta.title,
    description: bas.meta.description,
  },
  alternates: { canonical: "/products/book-a-sloth" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Book A Sloth",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: bas.meta.description,
  author: { "@type": "Organization", name: "Timewheel" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function BookASlothPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BasHero />
      <BasProblem />
      <BasFeatures />
      <BasProcess />
      <BasAutomation />
      <BasBeforeAfter />
      <BasFaq />
      <BasCapabilities />
      <BasTestimonials />
      <BasFinalCta />
    </>
  );
}