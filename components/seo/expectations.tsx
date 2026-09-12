import { Check, X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";

// Honest-expectations section — candour against a market full of guarantees.
export function SeoExpectations() {
  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Straight talk</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{seo.expectations.title}</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-rating/30 bg-card p-7">
            <h3 className="flex items-center gap-2 font-bold text-rating">
              <Check className="size-5" strokeWidth={2.5} /> What we can do
            </h3>
            <ul className="mt-5 space-y-3">
              {seo.expectations.can.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-rating" strokeWidth={3} /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl border border-border bg-card p-7">
            <h3 className="flex items-center gap-2 font-bold text-muted-foreground">
              <X className="size-5" strokeWidth={2.5} /> What no honest agency can
            </h3>
            <ul className="mt-5 space-y-3">
              {seo.expectations.cannot.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" strokeWidth={3} /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
