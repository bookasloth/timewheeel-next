import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/case-studies/faq-accordion";
import { AcademyPageHeader } from "@/components/academy/page-header";
import { academyFaqs } from "@/lib/academy";
import { breadcrumbLd, faqLd, organizationLd, webPageLd } from "@/lib/jsonld";
import { social } from "@/lib/metadata";
import { site } from "@/lib/site";

const TITLE = "Academy FAQ: Fees, Format and Enrollment | Timewheel Academy";
const DESC =
  "Answers about Timewheel Digital Marketing Academy: who it's for, enrollment status, fees, format, projects, certificates, Google, Meta, HubSpot and LinkedIn certifications, internships and how your details are used.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/academy/faq" },
  ...social({ path: "/academy/faq", title: TITLE, description: DESC }),
};

const TRAIL = [
  { name: "Academy", path: "/academy" },
  { name: "FAQ", path: "/academy/faq" },
];

// FAQPage mirrors the visible list exactly (both read academyFaqs).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    webPageLd({ name: "Timewheel Academy FAQ", path: "/academy/faq", description: DESC }),
    breadcrumbLd([{ name: "Home", path: "/" }, ...TRAIL]),
    faqLd(academyFaqs),
  ],
};

export default function AcademyFaqPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <AcademyPageHeader
        trail={TRAIL}
        eyebrow="FAQ"
        title="Questions, answered straight."
        intro={<p>Enrollment, fees, format, projects, certificates, internships and what happens to your details. If yours isn&apos;t here, email us.</p>}
      />

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <h2 className="sr-only">Frequently asked questions</h2>
        <FaqAccordion items={academyFaqs} />

        <Reveal className="mt-14 rounded-lg border border-border bg-card p-6 md:p-8">
          <p className="font-heading text-lg font-extrabold tracking-tight">Still have a question?</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Write to us and a person replies, usually within one business day.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Timewheel Academy question")}`}
              className="btn btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
            >
              <Mail aria-hidden className="size-4" />
              {site.contact.email}
            </a>
            <Link
              href="/academy#register"
              className="group btn btn-outline inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
            >
              Register interest
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
