import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Search, Share2, Target, Globe, PenLine, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { dmNagpur as dm } from "@/lib/digital-marketing-nagpur";
import { organizationLd, breadcrumbLd, localBusinessLd, faqLd } from "@/lib/jsonld";
import { Reveal } from "@/components/reveal";
import { LeadForm } from "@/components/shared/lead-form";
import { GrowthBlueprintModal } from "@/components/shared/growth-blueprint-modal";

const PATH = "/digital-marketing-nagpur";
const url = `${site.url}${PATH}`;

export const metadata: Metadata = {
  title: { absolute: dm.meta.title },
  description: dm.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: dm.meta.title,
    description: dm.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: dm.meta.title,
    description: dm.meta.description,
  },
  other: { "geo.region": "IN-MH", "geo.placename": "Nagpur" },
};

// Service + Organization + LocalBusiness in one graph. LocalBusiness is what
// feeds the Google-Business-style "top agencies" answers in Gemini/AI Overviews.
const serviceLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    localBusinessLd(),
    {
      "@type": "Service",
      name: "Digital Marketing Services in Nagpur",
      serviceType: "Digital marketing, SEO, social media, Google Ads and web development",
      areaServed: { "@type": "City", name: "Nagpur" },
      provider: { "@id": `${site.url}/#organization` },
      url,
      description: dm.meta.description,
      offers: dm.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name },
      })),
    },
  ],
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Digital Marketing Company in Nagpur", path: PATH },
];

const serviceIcons = [Search, Share2, Target, Globe, PenLine, MessageCircle] as const;

export default function DigitalMarketingNagpurPage() {
  return (
    <div id="top" className="overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(dm.faq)) }} />

      {/* Hero: H1 == query, answer-first paragraph (the AI-citable block) */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: "radial-gradient(rgba(15,17,17,0.05) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage: "linear-gradient(to bottom, black, transparent 78%)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent 78%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-8 text-center md:pt-14">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">{dm.hero.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black leading-[1.06] tracking-tight md:text-5xl lg:text-[3.4rem]">
              {dm.hero.h1}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">{dm.hero.answer}</p>
            <p className="mt-5 text-sm text-muted-foreground">{dm.hero.trustLine}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="#lead" className="btn btn-primary rounded-lg px-7 py-3.5 text-base font-semibold text-brand-foreground">
                Get a free plan
              </Link>
              <Link href="/seo-company-in-nagpur#top" className="btn rounded-lg border border-border px-7 py-3.5 text-base font-semibold hover:bg-secondary">
                Run a free site audit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">What we do</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Full-service digital marketing, one connected team
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
              Six disciplines, one strategy, so your Nagpur business shows up and converts wherever customers are looking.
            </p>
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dm.services.map((s, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <div key={s.name} className="rounded-2xl border border-border bg-card p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand/15 text-brand">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Local intent */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">Local knowledge</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{dm.local.title}</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{dm.local.body}</p>
        </Reveal>
        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {dm.local.cards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Process */}
      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">Process</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{dm.process.title}</h2>
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {dm.process.steps.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="text-sm font-black text-brand">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-base font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ: native <details>, no JS, extractable by AI crawlers */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand-text">FAQ</p>
          <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
            Digital marketing in Nagpur, answered
          </h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {dm.faq.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-border bg-card p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                <h3 className="text-base">{item.q}</h3>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div id="lead">
        <LeadForm
          idPrefix="dm-nagpur"
          source="Digital Marketing Company in Nagpur"
          eyebrow="Start the conversation"
          heading="Get Your Free Digital Marketing Plan"
          blurb="Tell us your business and goals. We'll come back with a clear, honest plan across SEO, ads, social and site, with no obligation and no jargon."
          infoRows={[
            { k: "Based in", v: "Nagpur, Maharashtra" },
            { k: "Serving", v: "Businesses across India" },
            { k: "Response", v: "Within one business day" },
            { k: "Guarantees", v: "Honest timelines, never fake leads or rankings" },
          ]}
          serviceOptions={dm.serviceOptions}
          serviceLabel="Service you need"
          submitLabel="Get My Free Plan"
          successHeading="Thanks, we'll be in touch."
          successBody="Your enquiry is in. We'll review your presence and reach out within one business day with a clear next step."
        />
      </div>
      <GrowthBlueprintModal service="Digital Marketing" />
    </div>
  );
}
