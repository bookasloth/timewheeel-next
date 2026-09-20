import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Check, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { smm } from "@/lib/social-media-marketing";

// Package tiers. Prices are placeholders (see lib) — set real pricing or keep Custom.
export function SmmPackages() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
          <span className="size-1.5 rounded-full bg-brand" />
          {smm.packages.eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
          {smm.packages.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{smm.packages.body}</p>
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {smm.packages.tiers.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06}>
            <div
              className={[
                "relative flex h-full flex-col rounded-2xl border bg-card p-7 transition-transform duration-300 hover:-translate-y-1",
                t.featured
                  ? "border-transparent shadow-[0_28px_60px_-30px_rgba(26,29,36,0.5)] ring-2"
                  : "border-border shadow-[0_18px_40px_-30px_rgba(26,29,36,0.35)]",
              ].join(" ")}
              style={t.featured ? ({ "--tw-ring-color": t.tone } as React.CSSProperties) : undefined}
            >
              {t.featured && (
                <span
                  className="absolute -top-3 left-7 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
                  style={{ backgroundColor: t.tone }}
                >
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-bold tracking-tight" style={{ color: t.tone }}>
                {t.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.blurb}</p>
              <p className="mt-5 flex items-baseline gap-1.5">
                <span className="text-3xl font-black tracking-tight">{t.price}</span>
                {t.price !== "Custom" && (
                  <span className="text-sm text-muted-foreground">/ {t.cadence}</span>
                )}
              </p>
              <ul className="mt-6 space-y-3 border-t border-border pt-6">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className="mt-0.5 size-4 shrink-0"
                      weight="bold"
                      style={{ color: t.tone }}
                    />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={smm.hero.primaryCta.href}
                className={[
                  "group mt-7 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors",
                  t.featured ? "text-white" : "btn btn-outline",
                ].join(" ")}
                style={t.featured ? { backgroundColor: t.tone } : undefined}
              >
                Get started
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
