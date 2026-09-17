import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactChannels } from "@/components/contact/contact-channels";
import { ContactSteps } from "@/components/contact/contact-steps";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactFaq, faqs } from "@/components/contact/contact-faq";

export const metadata: Metadata = {
  title: { absolute: "Contact, Timewheel" },
  description:
    "Contact Timewheel, a product idea, a project brief, or a question. We reply within one business day with a clear, scoped next step.",
  openGraph: {
    type: "website",
    title: "Contact, Timewheel",
    description:
      "Say hello. We read every message, replies within one business day.",
    siteName: "Timewheel",
  },
  alternates: { canonical: "/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.contact.city,
    addressRegion: site.contact.region,
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.contact.email,
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
};

// FAQPage, mirrors the visible contact FAQ (source: contact-faq faqs).
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <ContactHero />
      {/* <ContactChannels /> */}
      {/* <ContactSteps /> */}
      <ContactForm />
      <ContactFaq />
    </>
  );
}