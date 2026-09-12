import { Check, X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";

export function SeoComparison() {
  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Why us</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{seo.comparison.title}</h2>
        </Reveal>
        <Reveal className="mt-10 overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-card text-sm">
            <div className="border-b border-border px-4 py-3 font-semibold" />
            <div className="border-b border-l border-border px-4 py-3 text-center font-semibold text-muted-foreground">
              Typical agency
            </div>
            <div className="border-b border-l border-border bg-brand/5 px-4 py-3 text-center font-bold text-brand">
              Us
            </div>
            {seo.comparison.rows.map((r) => (
              <div key={r.label} className="contents">
                <div className="border-b border-border px-4 py-3 font-medium text-foreground">{r.label}</div>
                <div className="flex items-start gap-2 border-b border-l border-border px-4 py-3 text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" /> {r.them}
                </div>
                <div className="flex items-start gap-2 border-b border-l border-border bg-brand/5 px-4 py-3 text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-rating" strokeWidth={3} /> {r.us}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
