import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CollageCover } from "@/components/digital-marketing/dm-illustrations";
import { dmCaseStudies } from "@/lib/digital-marketing2";

const visualStyles = [
  "from-brand/30 to-transparent",
  "from-accent-blue/30 to-transparent",
  "from-accent-yellow/25 to-transparent",
];

const accents = ["#fe5100", "#269cef", "#ffcc1c"];


export function Dm2CaseStudies() {
  return (
    <section id="case-studies" className="mx-auto max-w-6xl px-6 pb-20 pt-6 md:pb-28 md:pt-8">
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Proof
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            From Marketing Activity to Business Results
          </h2>
        </div>
        <p className="max-w-md text-muted-foreground">
          Real client stories and verified results will live here — the
          framework below shows exactly how we turn activity into outcomes.
        </p>
      </Reveal>

      <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {dmCaseStudies.map((cs, i) => (
          <article
            key={cs.brand}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand/40"
          >
            <div
              aria-hidden
              className={`relative h-44 shrink-0 overflow-hidden bg-gradient-to-br ${visualStyles[i % visualStyles.length]} bg-secondary/60`}
            >
              <div className="absolute inset-3 overflow-hidden rounded-xl border border-border/60 bg-card/40">
                <div className="relative z-10 p-4">
                  <div className="flex flex-wrap gap-1.5">
                    {cs.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-background/80 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <CollageCover index={i} accent={accents[i % accents.length]} />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-7 pt-5">
              <span className="text-xs font-bold uppercase tracking-wide text-brand">
                {cs.industry}
              </span>
              <h3 className="mt-1.5 text-lg font-bold">{cs.brand}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground/70">Challenge:</span>{" "}
                {cs.challenge}
              </p>
              <div className="my-4 h-px w-full bg-border" />
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground/70">Outcome:</span>{" "}
                {cs.outcome}
              </p>
              {cs.href && cs.href !== "#" ? (
                <Link
                  href={cs.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:text-brand"
                >
                  Explore Case Study
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ) : (
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground/60">
                  Case study coming soon
                </span>
              )}
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
