import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Check } from "lucide-react";
import { products } from "@/lib/products";
import { standardPlan, customPlan, productPricing } from "@/lib/pricing";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Per-product pricing built for ownership. No fragmented subscriptions — pay only for the systems you actually run.",
};

const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));

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
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          Pricing
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold md:text-6xl">
          Pricing built for ownership
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          No fragmented subscriptions and no platform commissions skimmed off the
          top. Pay only for the systems you actually run — transparent, per
          product.
        </p>
      </Reveal>

      {/* standard vs custom */}
      <Reveal stagger className="mt-14 grid gap-5 md:grid-cols-2">
        {/* standard */}
        <div className="relative rounded-3xl border-2 border-brand bg-card p-8">
          <span className="absolute right-6 top-6 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            Most popular
          </span>
          <h2 className="text-xl font-bold">{standardPlan.name}</h2>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            {standardPlan.tagline}
          </p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold">{standardPlan.price}</span>
            <span className="text-sm text-muted-foreground">
              {standardPlan.unit}
            </span>
          </div>
          <ul className="mt-6 space-y-3">
            {standardPlan.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm font-medium">
                <BadgeCheck className="size-5 shrink-0 text-navy" />
                {p}
              </li>
            ))}
          </ul>
          <Link
            href={site.demoUrl}
            className="btn btn-primary mt-8 block rounded-lg px-6 py-3 text-center text-sm font-semibold text-brand-foreground"
          >
            {standardPlan.cta}
          </Link>
        </div>

        {/* custom */}
        <div className="rounded-3xl border border-border bg-card p-8">
          <h2 className="text-xl font-bold">{customPlan.name}</h2>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            {customPlan.tagline}
          </p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold">{customPlan.price}</span>
            <span className="text-sm text-muted-foreground">
              {customPlan.unit}
            </span>
          </div>
          <ul className="mt-6 space-y-3">
            {customPlan.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm font-medium">
                <BadgeCheck className="size-5 shrink-0 text-navy" />
                {p}
              </li>
            ))}
          </ul>
          <Link
            href={site.demoUrl}
            className="btn btn-outline mt-8 block rounded-lg px-6 py-3 text-center text-sm font-semibold"
          >
            {customPlan.cta}
          </Link>
        </div>
      </Reveal>

      {/* per-product */}
      <div className="mt-24">
        <Reveal className="text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Transparent pricing, by product
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Every product priced on its own. Mix and match — you only pay for
            what you run.
          </p>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-2">
          {productPricing.map((pp) => {
            const product = bySlug[pp.slug];
            if (!product) return null;
            const { icon: Icon, accent, name, tagline, href } = product;
            return (
              <div
                key={pp.slug}
                className="flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-brand/40"
              >
                <div className="flex items-start justify-between gap-4">
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
                    <p className="text-2xl font-extrabold leading-none">
                      {pp.price}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {pp.unit}
                    </p>
                  </div>
                </div>

                <div className="my-5 h-px w-full bg-border" />

                <ul className="space-y-2.5">
                  {pp.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-sm">
                      <Check className="size-4 shrink-0 text-rating" />
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
                  <Link
                    href={href}
                    className="text-sm font-semibold hover:text-brand"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>

      {/* closing note + CTA */}
      <Reveal className="mt-20 rounded-3xl border border-border bg-secondary/50 px-8 py-12 text-center">
        <h2 className="text-2xl font-extrabold md:text-3xl">
          Not sure which systems you need?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Book a demo and we&apos;ll map your workflows to the products that fit —
          no pressure, no lock-in.
        </p>
        <Link
          href={site.demoUrl}
          className="btn btn-primary mt-7 inline-block rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Book a Demo
        </Link>
      </Reveal>
    </div>
  );
}
