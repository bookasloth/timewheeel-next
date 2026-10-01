import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";
import { cn } from "@/lib/utils";
import { RevealHeading } from "@/components/anim/reveal-heading";

// Package tiers. Card pattern matches the shared microsite pricing cards
// (components/seo/pricing.tsx) so the section reads like the rest of the site;
// colour comes from the .smm-page scope (crimson rose primary + pink/fuchsia
// accents) rather than a per-tier tone. Prices are placeholders (see lib) — set
// real pricing or keep Custom.
export function SmmPackages() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
          <span className="size-1.5 rounded-full bg-brand" />
          {smm.packages.eyebrow}
        </p>
        <RevealHeading as="h2" className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
          {smm.packages.heading}
        </RevealHeading>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{smm.packages.body}</p>
      </Reveal>

      <Reveal stagger className="mt-12 grid gap-5 lg:grid-cols-3">
        {smm.packages.tiers.map((t) => (
          <div
            key={t.name}
            className={cn(
              "flex h-full flex-col rounded-2xl border bg-card p-7 transition-transform duration-300 hover:-translate-y-1",
              t.featured ? "border-brand shadow-lg shadow-brand/10" : "border-border",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold">{t.name}</h3>
              {t.featured && (
                <span className="rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold text-brand-foreground">
                  Most popular
                </span>
              )}
            </div>
            <p className="mt-4 flex items-baseline gap-1.5">
              <span className="text-2xl font-black tracking-tight text-foreground">
                {t.price}
              </span>
              {t.price !== "Custom" && (
                <span className="text-sm text-muted-foreground">/ {t.cadence}</span>
              )}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
            <ul className="mt-6 flex-1 space-y-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={smm.hero.primaryCta.href}
              className={cn(
                "group mt-7 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold",
                t.featured ? "btn btn-primary" : "btn btn-outline",
              )}
            >
              Get started
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        ))}
      </Reveal>

      <Reveal>
        <p className="mt-8 text-center text-xs text-muted-foreground">{smm.packages.note}</p>
      </Reveal>
    </section>
  );
}
