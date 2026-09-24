import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { wd } from "@/lib/web-development";
import { organizationLd, breadcrumbLd, localBusinessLd } from "@/lib/jsonld";
import { WdHero } from "@/components/web-development/hero";
import { WebProjectCard } from "@/components/web-development/web-project-card";
import { WdStats } from "@/components/web-development/stats";
import { WdPortfolio } from "@/components/web-development/portfolio";
import { WdStandards } from "@/components/web-development/standards";
import { WdServices } from "@/components/web-development/services";
import { WdTechStack } from "@/components/web-development/tech-stack";
import { WdPricing } from "@/components/web-development/pricing";
import { WdProcess } from "@/components/web-development/process";
import { WdOwnership } from "@/components/web-development/ownership";
import { WdIndustries } from "@/components/web-development/industries";
import { WdFaq } from "@/components/web-development/faq";
import { WdFinalCta } from "@/components/web-development/final-cta";
import { LeadForm } from "@/components/shared/lead-form";
import { GrowthBlueprintModal } from "@/components/shared/growth-blueprint-modal";
import { Reveal } from "@/components/reveal";

const PATH = "/web-development-company-in-nagpur";
const url = `${site.url}${PATH}`;

export const metadata: Metadata = {
  title: wd.meta.title,
  description: wd.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: wd.meta.title,
    description: wd.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: wd.meta.title,
    description: wd.meta.description,
  },
  // Local-intent hints for the "in Nagpur" query.
  other: { "geo.region": "IN-MH", "geo.placename": "Nagpur" },
};

// Service schema, provider is the shared Organization node; areaServed Nagpur.
const serviceLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    localBusinessLd(),
    {
      "@type": "Service",
      name: "Web Development",
      serviceType: "Web development and web application development",
      areaServed: { "@type": "City", name: "Nagpur" },
      provider: { "@id": `${site.url}/#organization` },
      url,
      description: wd.meta.description,
      offers: wd.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name },
      })),
    },
  ],
};

// FAQPage, must mirror the visible FAQ exactly (source: wd.faq).
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: wd.faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Web Development Company in Nagpur", path: PATH },
];

export default function WebDevelopmentPage() {
  return (
    <div className="overflow-x-clip wd-india">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <WdHero />

      {/* Stats band. Top margin on lg leaves a transparent gap for the hero's
          two bottom tiles to bleed into, before this opaque band starts. */}
      <div className="lg:mt-28">
        <WdStats />
      </div>

      {/* Our Work — titled projects section, now below the stats numbers. */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-14 pt-16">
        <div className="mb-8 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand-text">
            Our Work
          </p>
          <h2 className="mt-3 font-black tracking-tight text-navy text-3xl md:text-4xl">
            Builds we&apos;re proud of
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <WebProjectCard title="Ticket Dino:" subtitle="Events that sell out" href="#" image="/hero/web-dev.png" accent="#3987C9" />
          <WebProjectCard title="Book A Sloth:" subtitle="Bookings on autopilot" href="#" image="/hero/web-design.png" accent="#29a66f" />
          <WebProjectCard title="CoffeeForMe:" subtitle="Orders, zero commission" href="#" image="/hero/social.png" accent="#f45b0a" />
          <WebProjectCard title="The Parliament:" subtitle="Community on autopilot" href="#" image="/hero/shopify.png" accent="#ff4d93" />
        </div>

        {/* Recent-work proof cards, stacked below the four project cards */}
        <WdPortfolio />

        <Reveal className="mt-12">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-white px-6 py-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-base font-bold tracking-tight">Want to see your business here?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Every project above started with a conversation about a goal.
              </p>
            </div>
            <Link
              href="#contact"
              className="group btn btn-primary inline-flex shrink-0 items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
            >
              Start a Project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>
      <WdStandards />
      <WdServices />
      <WdTechStack />
      <WdPricing />
      <WdProcess />
      <WdOwnership />
      <WdIndustries />
      <WdFaq />
      <WdFinalCta />
      <LeadForm
        idPrefix="wd"
        source="Web Development Company in Nagpur"
        eyebrow="Start your project"
        heading="Get a Fixed Quote in 24 Hours"
        blurb="Tell us what you need built. You'll get a clear scope, a fixed price and a written timeline, no obligation, no jargon."
        infoRows={[
          { k: "Based in", v: "Nagpur, Maharashtra" },
          { k: "Serving", v: "Clients across India & abroad" },
          { k: "Quote turnaround", v: "Within one business day" },
          { k: "You own", v: "Code, domain, hosting, data" },
        ]}
        serviceOptions={wd.serviceOptions}
        serviceLabel="What do you need?"
        submitLabel="Get My Fixed Quote"
        successHeading="Thanks, your quote is on the way."
        successBody="We've received your project details and will send a fixed quote and timeline within one business day."
      />
      <GrowthBlueprintModal service="Web Development" />
    </div>
  );
}
