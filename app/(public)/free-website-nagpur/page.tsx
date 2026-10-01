import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Globe,
  MessageCircle,
  Phone,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { organizationLd, localBusinessLd, breadcrumbLd, faqLd } from "@/lib/jsonld";
import { FreeWebsiteForm } from "@/components/free-website/lead-form";

const PATH = "/free-website-nagpur";
const url = `${site.url}${PATH}`;

const TITLE = "Free Website for Businesses in Nagpur | Timewheel";
const DESC =
  "Run a business in Nagpur? Get a professional, mobile-ready website built for free. No cost, no card. Fill the form and we build and launch your site. Limited spots.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: url },
  openGraph: { type: "website", url, siteName: site.name, title: TITLE, description: DESC },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

const FAQ = [
  {
    q: "Is the website really free?",
    a: "Yes. We build and launch a professional website for your Nagpur business at no cost and with no card required. It is how we introduce ourselves to local businesses. You are never obligated to buy anything else.",
  },
  {
    q: "What's the catch?",
    a: "There is no catch. We hope that once you see the quality, you will consider us for paid add-ons later like SEO, marketing, maintenance or hosting. Those are optional. The website itself is yours for free.",
  },
  {
    q: "What kind of website do I get?",
    a: "A clean, fast, mobile-ready website with your business details, services, photos, a contact option and a WhatsApp or call button. Enough to look professional online and bring you enquiries.",
  },
  {
    q: "How long does it take?",
    a: "Most sites go live within a few days of you sharing your details and content. We will confirm a timeline when we call you.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. The website is yours. We build on systems you control, so you are never locked in.",
  },
  {
    q: "Which businesses in Nagpur can apply?",
    a: "Any genuine local business: restaurants, shops, clinics, salons, gyms, coaching classes, real estate, professional services and more. Spots are limited and first come, first served.",
  },
];

const INCLUDED = [
  { icon: Smartphone, title: "Mobile-ready design", body: "Looks sharp on every phone, where most of your customers will find you." },
  { icon: Search, title: "Found on Google", body: "Built on clean, search-friendly foundations so people can find your business." },
  { icon: MessageCircle, title: "WhatsApp & call buttons", body: "One tap for a customer to message or call you directly. More enquiries, less friction." },
  { icon: Globe, title: "Your business, online", body: "Services, photos, hours, location and contact, all in one professional place." },
  { icon: ShieldCheck, title: "Yours to keep", body: "You own the site. No lock-in, no platform commissions, no rented infrastructure." },
  { icon: Rocket, title: "Live in days", body: "We build and launch quickly so you start looking professional online right away." },
];

const STEPS = [
  { icon: Sparkles, title: "Fill the form", body: "Share your business details and what you want the website to do. Takes two minutes." },
  { icon: Phone, title: "We call you", body: "We reach out within one business day to confirm the details and collect your content." },
  { icon: Rocket, title: "Your site goes live", body: "We build, you review, and your free website launches. One of a limited set of Nagpur spots." },
];

const TRUST = [
  { v: "Free", k: "No cost, no card" },
  { v: "Nagpur", k: "Local team, local support" },
  { v: "Days", k: "Not weeks to launch" },
  { v: "100%", k: "You own it" },
];

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Free Website for Businesses in Nagpur", path: PATH },
];

const offerLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    localBusinessLd(),
    {
      "@type": "Service",
      name: "Free Website for Businesses in Nagpur",
      serviceType: "Free website design and development for local Nagpur businesses",
      description: DESC,
      provider: { "@id": `${site.url}/#organization` },
      url,
      areaServed: {
        "@type": "City",
        name: "Nagpur",
        containedInPlace: { "@type": "AdministrativeArea", name: "Maharashtra, India" },
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        availability: "https://schema.org/LimitedAvailability",
        url,
      },
    },
  ],
};

export default function FreeWebsiteNagpurPage() {
  return (
    <div className="overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQ)) }} />

      {/* Hero */}
      <section className="relative border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
                Free website · Nagpur businesses
              </p>
              <RevealHeading as="h1" className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
                A professional website for your Nagpur business, free
              </RevealHeading>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                No cost. No card. We design, build and launch a clean, mobile-ready website for your business
                so you look professional online and bring in more enquiries. Spots are limited.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#claim"
                  className="group btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-brand-foreground"
                >
                  Claim my free website
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href={`https://wa.me/${site.contact.whatsappDigits}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  <MessageCircle className="size-4" /> Ask on WhatsApp
                </a>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                <BadgeCheck className="size-4 text-rating" /> Trusted local team based in Nagpur
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {TRUST.map((t) => (
                  <div key={t.k} className="rounded-2xl border border-border bg-card px-6 py-7 text-center">
                    <div className="text-3xl font-extrabold tracking-tight text-brand">{t.v}</div>
                    <div className="mt-1.5 text-sm text-muted-foreground">{t.k}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">What you get</p>
            <RevealHeading as="h2" className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Everything your business needs to look professional online
            </RevealHeading>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((f) => (
              <Reveal key={f.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                  <f.icon className="size-5" strokeWidth={1.9} />
                </span>
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">How it works</p>
            <RevealHeading as="h2" className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Three simple steps to your free website
            </RevealHeading>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} className="rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-brand text-sm font-extrabold text-brand-foreground">
                    {i + 1}
                  </span>
                  <s.icon className="size-5 text-brand" strokeWidth={1.9} />
                </div>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Claim / form */}
      <section id="claim" className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Claim your spot</p>
              <RevealHeading as="h2" className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
                Get your free website
              </RevealHeading>
              <p className="mt-4 max-w-md text-muted-foreground md:text-lg">
                Fill in your details and we will call you within one business day to get started. Free to apply,
                free to launch, and only a limited number of Nagpur businesses at a time.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  { Icon: Phone, k: "Call us", v: site.contact.phone },
                  { Icon: MessageCircle, k: "WhatsApp", v: site.contact.phone },
                  { Icon: Clock, k: "Response", v: site.contact.responseTime },
                  { Icon: Globe, k: "Based in", v: `${site.contact.city}, Maharashtra` },
                ].map(({ Icon, k, v }) => (
                  <div key={k} className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-3.5 text-sm">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                      <Icon className="size-4" strokeWidth={1.9} />
                    </span>
                    <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                      <span className="font-semibold text-foreground">{k}</span>
                      <span className="truncate text-right text-muted-foreground">{v}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <FreeWebsiteForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Questions</p>
          <RevealHeading as="h2" className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Frequently asked questions
          </RevealHeading>
          <div className="mt-10 divide-y divide-border/70 border-y border-border/70">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                  {f.q}
                  <ArrowRight className="size-4 shrink-0 text-brand transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Prefer to talk first?{" "}
            <Link href="/contact" className="font-semibold text-brand underline underline-offset-2">
              Contact us
            </Link>{" "}
            or message us on WhatsApp.
          </p>
        </div>
      </section>
    </div>
  );
}
