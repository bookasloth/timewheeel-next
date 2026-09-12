import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function SeoPricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Pricing</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{seo.pricing.title}</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{seo.pricing.body}</p>
      </Reveal>
      <Reveal stagger className="mt-12 grid gap-5 lg:grid-cols-3">
        {seo.pricing.tiers.map((t) => (
          <div
            key={t.name}
            className={cn(
              "flex flex-col rounded-2xl border bg-card p-7",
              t.highlight ? "border-brand shadow-lg shadow-brand/5" : "border-border",
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{t.name}</h3>
              {t.highlight && (
                <span className="rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold text-brand-foreground">
                  Most popular
                </span>
              )}
            </div>
            <p className="mt-4 text-2xl font-black tracking-tight text-foreground">{t.price}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
            <ul className="mt-6 flex-1 space-y-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-rating/10 text-rating">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="#contact"
              className={cn(
                "mt-7 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold",
                t.highlight ? "btn btn-primary text-brand-foreground" : "btn btn-outline",
              )}
            >
              {t.cta}
            </Link>
          </div>
        ))}
      </Reveal>
      <Reveal>
        <p className="mt-8 text-center text-xs text-muted-foreground">{seo.pricing.note}</p>
      </Reveal>
    </section>
  );
}
