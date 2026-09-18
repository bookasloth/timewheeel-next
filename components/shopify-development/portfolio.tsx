import { TrendingUp } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SdSectionHeading } from "@/components/shopify-development/section-heading";
import { sd } from "@/lib/shopify-development";

export function SdPortfolio() {
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <SdSectionHeading
          label={sd.portfolio.label}
          heading={sd.portfolio.heading}
          accent={sd.portfolio.headingAccent}
          body={sd.portfolio.body}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {sd.portfolio.cards.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
                <div aria-hidden className="relative aspect-video overflow-hidden bg-gradient-to-br from-brand/15 via-card to-accent-blue/10">
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="text-lg font-black tracking-tight text-brand/60">{c.name}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-base font-bold">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.problem}</p>
                  <p className="mt-auto flex items-start gap-2 pt-4 text-sm font-semibold text-brand-text">
                    <TrendingUp className="mt-0.5 size-4 shrink-0" />
                    {c.result}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
