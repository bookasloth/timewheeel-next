import type { Metadata } from "next";
import { site } from "@/lib/site";
import { RmHero } from "@/components/restaurant-marketing/hero";
import { RmTrust } from "@/components/restaurant-marketing/trust";
import { RmIntro } from "@/components/restaurant-marketing/intro";
import { RmStrengths } from "@/components/restaurant-marketing/strengths";
import { RmAbout } from "@/components/restaurant-marketing/about";
import { RmServices } from "@/components/restaurant-marketing/services";
import { RmTestimonials } from "@/components/restaurant-marketing/testimonials";
import { RmFaq } from "@/components/restaurant-marketing/faq";
import { RmFinalCta } from "@/components/restaurant-marketing/final-cta";
import { RmContact } from "@/components/restaurant-marketing/contact";

export const metadata: Metadata = {
  title: "Digital Marketing Agency for Restaurants | Social Media Strategies",
  description:
    "Boost your restaurant's brand engagement and bring more customers with our top-rated digital marketing agency for restaurants — social media, local SEO, content, video, and paid ads.",
  alternates: { canonical: `${site.url}/restaurant-marketing` },
  openGraph: {
    type: "website",
    url: `${site.url}/restaurant-marketing`,
    siteName: site.name,
    title: "Digital Marketing Agency for Restaurants | Social Media Strategies",
    description:
      "Restaurant marketing agency with top social media and digital marketing services — more walk-ins, more table bookings, more repeat guests across India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Agency for Restaurants | Social Media Strategies",
    description:
      "Restaurant marketing agency with top social media and digital marketing services — more walk-ins, more table bookings, more repeat guests across India.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Restaurant Marketing Services",
  areaServed: ["Mumbai", "Pune", "Delhi", "Maharashtra", "India"],
  provider: {
    "@type": "Organization",
    name: "Grey Hawks Media Pvt. Ltd.",
    url: site.url,
  },
  offers: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Marketing" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing Strategy" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content Creation" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Creative Solutions" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video Recording & Editing" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design & Development" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Market Research" } },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why do restaurants need a dedicated digital marketing agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Restaurants compete on visibility, footfall, and repeat visits. A dedicated agency understands dining trends, local search behavior, and social media appetite — helping you turn searches and scrolls into tables and loyal guests.",
      },
    },
    {
      "@type": "Question",
      name: "Which locations do you serve for restaurant marketing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are an advertising agency based in Mumbai and we help restaurants build their brand presence across India — from local eateries to established F&B brands in every major city.",
      },
    },
    {
      "@type": "Question",
      name: "Can you market a small or single-location restaurant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Our strategies scale to your goals — whether you run a local eatery or an established F&B brand, we tailor the plan to your budget, location, and growth ambitions.",
      },
    },
  ],
};

export default function RestaurantMarketingPage() {
  return (
    <div className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <RmHero />
      <RmTrust />
      <RmIntro />
      <RmStrengths />
      <RmAbout />
      <RmServices />
      <RmTestimonials />
      <RmFaq />
      <RmFinalCta />
    </div>
  );
}
