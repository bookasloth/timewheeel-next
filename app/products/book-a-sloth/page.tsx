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
import { BasIntegrations } from "@/components/book-a-sloth/integrations";
import { BasPricing } from "@/components/book-a-sloth/pricing";
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

const PAGE_URL = "https://timewheel.co.in/products/book-a-sloth";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${PAGE_URL}#software`,
      name: "Book A Sloth",
      url: bas.liveUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: bas.meta.description,
      author: {
        "@type": "Organization",
        name: "Timewheel",
        url: "https://timewheel.co.in",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "0",
        highPrice: "3650",
        offerCount: bas.pricing.plans.length,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: bas.testimonials.rating,
        reviewCount: bas.testimonials.reviews.replace(/\D/g, ""),
        bestRating: "5",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: bas.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
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
      <BasIntegrations />
      <BasProcess />
      <BasAutomation />
      <BasBeforeAfter />
      <BasPricing />
      <BasFaq />
      <BasCapabilities />
      <BasTestimonials />
      <BasFinalCta />
    </>
  );
}