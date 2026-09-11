import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Dm2HeroCentered } from "@/components/digital-marketing2/hero-centered";
import { Dm2Trust } from "@/components/digital-marketing2/trust";
import { Dm2Intro } from "@/components/digital-marketing2/intro";
import { Dm2Why } from "@/components/digital-marketing2/why";
import { Dm2Services } from "@/components/digital-marketing2/services";
import { Dm2Audience } from "@/components/digital-marketing2/audience";
import { Dm2Ecosystem } from "@/components/digital-marketing2/ecosystem";
import { Dm2Testimonials } from "@/components/digital-marketing2/testimonials";
import { Dm2Faq } from "@/components/digital-marketing2/faq";
import { Dm2FinalCta } from "@/components/digital-marketing2/final-cta";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Nagpur | SEO, PPC, Social & More",
  description:
    "Hire a full-service digital marketing agency in Nagpur for SEO, paid ads, social media, content, email and WhatsApp marketing — one connected growth system with clear reports.",
  alternates: { canonical: `${site.url}/digital-marketing2` },
  openGraph: {
    type: "website",
    url: `${site.url}/digital-marketing2`,
    siteName: site.name,
    title: "Digital Marketing Agency in Nagpur | SEO, PPC, Social & More",
    description:
      "Full-service digital marketing in Nagpur — SEO, paid advertising, social media, content, email and WhatsApp, all working toward one goal.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Agency in Nagpur | SEO, PPC, Social & More",
    description:
      "Full-service digital marketing in Nagpur — SEO, paid advertising, social media, content, email and WhatsApp, all working toward one goal.",
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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
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

export default function DigitalMarketing2Page() {
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
      <Dm2HeroCentered />
      <Dm2Trust />
      <Dm2Intro />
      <Dm2Why />
      <Dm2Services />
      <Dm2Audience />
      <Dm2Ecosystem />
      {/* Case studies hidden until real client results replace the placeholders
          in lib/digital-marketing2.ts — re-add <Dm2CaseStudies /> then. */}
      <Dm2Testimonials />
      <Dm2Faq />
      <Dm2FinalCta />
    </div>
  );
}
