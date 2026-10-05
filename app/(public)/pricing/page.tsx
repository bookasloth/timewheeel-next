import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceGroups } from "@/lib/pricing";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent starting prices for every service, website design, development, Shopify, social media, SEO and digital marketing. Pay for what you run.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing, Timewheel",
    description:
      "Transparent starting prices for every service, website design, development, Shopify, social media, SEO and digital marketing.",
    url: "/pricing",
  },
};

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
          clear starting price, scope it up from there. No lock-in, no hidden
          platform fees.
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

          <Reveal stagger className="mt-6 grid gap-5 md:grid-cols-3">
            {group.services.map((s) => {
              const { icon: Icon, accent, name, tagline, href, price, unit } = s;
              return (
                <div
                  key={name}
                  className="flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-brand/40"
                >
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

                  <div className="my-5 h-px w-full bg-border" />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Starting
                    </p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold leading-none">
                        {price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {unit}
                      </span>
                    </div>
                  </div>

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
