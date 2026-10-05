import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { serviceGroups, type ServicePrice } from "@/lib/pricing";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent starting prices for every service, website design, development, Shopify, social media, SEO and digital marketing. Limited project slots each month.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing, Timewheel",
    description:
      "Transparent starting prices for every service, website design, development, Shopify, social media, SEO and digital marketing.",
    url: "/pricing",
  },
};

function ServiceRow({ service }: { service: ServicePrice }) {
  const { icon: Icon, accent, name, tagline, href, price, unit, points, capacity } =
    service;
  const { month, slotsLeft, slotsTotal } = capacity;
  const soldOut = slotsLeft <= 0;
  // raw accent is used for fills (dab, border, dots); accentText is the
  // readable shade for type, so light accents like yellow stay legible.
  const accentText = service.accentText ?? accent;

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {/* 66% — pricing / details card */}
      <div
        className="flex flex-col rounded-2xl border border-l-4 border-border bg-card p-7 transition-colors hover:border-brand/40 md:col-span-2"
        style={{ borderLeftColor: accent }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="grid size-11 place-items-center rounded-xl"
              style={{ backgroundColor: `${accent}1f`, color: accent }}
            >
              <Icon className="size-5" />
            </span>
            <div>
              <p className="font-bold">{name}</p>
              <p className="text-xs text-muted-foreground">{tagline}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Starting
            </p>
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-3xl font-extrabold leading-none"
                style={{ color: accentText }}
              >
                {price}
              </span>
              <span className="text-xs text-muted-foreground">{unit}</span>
            </div>
          </div>
        </div>

        <div className="my-5 h-px w-full bg-border" />

        <ul className="grid gap-2.5 sm:grid-cols-2">
          {points.map((pt) => (
            <li key={pt} className="flex items-start gap-2.5 text-sm">
              <Check
                className="mt-0.5 size-4 shrink-0"
                style={{ color: accentText }}
              />
              <span className="text-muted-foreground">{pt}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-4 pt-1">
          <Link
            href={site.demoUrl}
            className="btn btn-primary rounded-lg px-4 py-2 text-sm font-semibold text-brand-foreground"
          >
            Get started
          </Link>
          <Link href={href} className="text-sm font-semibold hover:text-brand">
            Learn more
          </Link>
        </div>
      </div>

      {/* 33% — monthly availability counter */}
      <div
        className="flex flex-col items-center justify-center rounded-2xl border border-border bg-secondary/40 p-6 text-center"
        style={{ backgroundColor: `${accent}0d` }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {month}
        </p>
        <p
          className="mt-1 text-5xl font-extrabold leading-none"
          style={{ color: soldOut ? undefined : accentText }}
        >
          {soldOut ? "0" : slotsLeft}
        </p>
        <p className="mt-1 text-sm font-semibold">
          {soldOut ? "fully booked" : slotsLeft === 1 ? "slot left" : "slots left"}
        </p>

        <div className="mt-4 flex justify-center gap-1.5">
          {Array.from({ length: slotsTotal }).map((_, i) => (
            <span
              key={i}
              className="size-2.5 rounded-full"
              style={{
                backgroundColor: i < slotsLeft ? accent : "var(--border)",
              }}
            />
          ))}
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          {slotsLeft} of {slotsTotal} project slots open
        </p>

        <Link
          href={site.demoUrl}
          className="mt-5 text-sm font-semibold hover:underline"
          style={{ color: accentText }}
        >
          {soldOut ? "Join the waitlist" : "Reserve a slot"}
        </Link>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      {/* hero */}
      <Reveal className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">
          Pricing
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold md:text-6xl">
          Transparent starting prices
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          End-to-end tech and marketing, built in Nagpur. Every service has a
          clear starting price and a limited number of project slots each month,
          so the work stays good.
        </p>
      </Reveal>

      {/* service groups */}
      {serviceGroups.map((group) => (
        <div key={group.title} className="mt-16">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {group.title}
            </h2>
          </Reveal>

          <Reveal stagger className="mt-6 space-y-5">
            {group.services.map((s) => (
              <ServiceRow key={s.name} service={s} />
            ))}
          </Reveal>
        </div>
      ))}

      {/* closing note + CTA */}
      <Reveal className="mt-20 rounded-3xl border border-border bg-secondary/50 px-8 py-12 text-center">
        <h2 className="text-2xl font-extrabold md:text-3xl">
          Not sure where to start?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Tell us your goal and we&apos;ll scope the right mix of services and a
          clear quote, no pressure, no lock-in.
        </p>
        <Link
          href={site.demoUrl}
          className="btn btn-primary mt-7 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Book a Demo
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </div>
  );
}
