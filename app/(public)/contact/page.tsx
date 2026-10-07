import type { Metadata } from "next";
import { breadcrumbLd, organizationLd, orgRef, webPageLd } from "@/lib/jsonld";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactChannels } from "@/components/contact/contact-channels";
import { ContactSteps } from "@/components/contact/contact-steps";
import { ContactLocate } from "@/components/contact/contact-locate";
import { ContactFaq, faqs } from "@/components/contact/contact-faq";

export const metadata: Metadata = {
  title: { absolute: "Contact, Timewheel" },
  description:
    "Contact Timewheel, a product idea, a project brief, or a question. We reply within one business day with a clear, scoped next step.",
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact, Timewheel",
    description:
      "Say hello. We read every message, replies within one business day.",
    siteName: "Timewheel",
  },
  alternates: { canonical: "/contact" },
};

// ContactPage + canonical Organization (stable @id) + breadcrumb in one graph.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageLd({
      type: "ContactPage",
      name: "Contact Timewheel",
      path: "/contact",
      mainEntity: orgRef(),
    }),
    organizationLd(),
    { ...breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]), "@context": undefined },
  ],
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
      {/* ContactForm (wired to /api/lead) replaced by design-only ContactLocate.
          Re-add <ContactForm /> if you want backend capture back. */}
      <ContactLocate />
      <ContactFaq />
    </>
  );
}