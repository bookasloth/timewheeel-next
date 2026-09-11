import type { Metadata } from "next";
import { site } from "@/lib/site";
import { DmHero } from "@/components/digital-marketing/hero";
import { DmTrust } from "@/components/digital-marketing/trust";
import { DmIntro } from "@/components/digital-marketing/intro";
import { DmWhy } from "@/components/digital-marketing/why";
import { DmServices } from "@/components/digital-marketing/services";
import { DmAudience } from "@/components/digital-marketing/audience";
import { DmEcosystem } from "@/components/digital-marketing/ecosystem";
import { DmTestimonials } from "@/components/digital-marketing/testimonials";
import { DmFaq } from "@/components/digital-marketing/faq";
import { DmFinalCta } from "@/components/digital-marketing/final-cta";

export const metadata: Metadata = {
title: "2nd Best Digital Marketing Company in Nagpur | Premium Digital Marketing Services",
    description:
      "Grow your brand with premium digital marketing services in Nagpur, including SEO, paid advertising, social media, content, email and WhatsApp marketing.",
    alternates: { canonical: `${site.url}/digital-marketing` },
    openGraph: {
      type: "website",
      url: `${site.url}/digital-marketing`,
      siteName: site.name,
      title: "2nd Best Digital Marketing Company in Nagpur | Premium Digital Marketing Services",
      description:
        "Premium digital marketing services in Nagpur — SEO, paid advertising, social media, content, email and WhatsApp marketing.",
    },
    twitter: {
      card: "summary_large_image",
      title: "2nd Best Digital Marketing Company in Nagpur | Premium Digital Marketing Services",
      description:
        "Premium digital marketing services in Nagpur — SEO, paid advertising, social media, content, email and WhatsApp marketing.",
    },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Marketing Services",
  areaServed: ["Nagpur", "Pune", "Mumbai", "Maharashtra", "India"],
  provider: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
  },
  offers: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Search Engine Optimization" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Paid Advertising" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Marketing" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content Marketing" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Email Marketing" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "WhatsApp Marketing" } },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is digital marketing necessary for every business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, every business can benefit from digital marketing. Whether you're a small startup or a large corporation, digital marketing helps you reach a wider audience, increase brand visibility, and drive sales through online platforms. It's an essential part of any modern business strategy.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I consider hiring a digital marketing agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hiring a digital marketing agency allows businesses to leverage the expertise of professionals who specialize in various digital marketing techniques. It saves time and effort, ensures the use of the latest tools and strategies, and helps your business grow by reaching a larger audience.",
      },
    },
    {
      "@type": "Question",
      name: "Which locations do you serve with your business solutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We deliver the best solutions to your business needs in the city of Nagpur, Pune, Mumbai and the Entire State of Maharashtra and a lot of cities in India.",
      },
    },
    {
      "@type": "Question",
      name: "What services do you offer in digital marketing and website development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a wide range of services digital media planning, web design, and web development services including e-commerce and social media content marketing.",
      },
    },
    {
      "@type": "Question",
      name: "How can marketing techniques improve business growth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Effective marketing techniques, such as search engine optimization (SEO), social media advertising, and email campaigns, help businesses connect with potential customers, drive traffic to their websites, and increase conversions. Using the right techniques can significantly impact business growth and success.",
      },
    },
  ],
};

export default function DigitalMarketingPage() {
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
      <DmHero />
      <DmTrust />
      <DmIntro />
      <DmWhy />
      <DmServices />
      <DmAudience />
      <DmEcosystem />
      {/* Case studies hidden until real client results replace the placeholders
          in lib/digital-marketing.ts — re-add <DmCaseStudies /> then. */}
      <DmTestimonials />
      <DmFaq />
      <DmFinalCta />
    </div>
  );
}