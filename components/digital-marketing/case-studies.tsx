import Link from "next/link";
import { ArrowUpRight, Rocket, Search, Target, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CollageCover } from "@/components/digital-marketing/dm-illustrations";
import { dmCaseStudies } from "@/lib/digital-marketing";

const visualStyles = [
  "from-brand/30 to-transparent",
  "from-accent-blue/30 to-transparent",
  "from-accent-yellow/25 to-transparent",
];

const accents = ["#fe5100", "#269cef", "#ffcc1c"];

// Editorial strip describing the standard, repeatable way we work. No invented
// client claims here — this is the framework real case studies will slot into.
const framework = [
  {
    step: "01",
    label: "Challenge",
    icon: Search,
    text: "We diagnose where your brand is losing visibility and momentum.",
  },
  {
    step: "02",
    label: "Strategy",
    icon: Target,
    text: "A focused plan built around your goals, audience, and market.",
  },
  {
    step: "03",
    label: "Execution",
    icon: Rocket,
    text: "Campaigns, content, and channels run as one integrated system.",
  },
  {
    step: "04",
    label: "Result",
    icon: TrendingUp,
    text: "Measured, reported, and refined for compounding growth.",
  },
];

export function DmCaseStudies() {
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

      {/* approach framework */}
      {/* <Reveal className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
        {framework.map((f) => (
          <div key={f.step} className="group border-t-2 border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors duration-300 group-hover:border-brand/30 group-hover:bg-brand/10 group-hover:text-brand">
                <f.icon className="size-4" strokeWidth={1.75} />
              </span>
              <span className="text-xs font-black tracking-widest text-muted-foreground/40">
                {f.step}
              </span>
            </div>
            <h3 className="mt-4 text-base font-bold">{f.label}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {f.text}
            </p>
          </div>
        ))}
      </Reveal> */}

      {/* placeholder case study cards */}
      <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {dmCaseStudies.map((cs, i) => (
          <article
            key={cs.brand}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand/40"
          >
            {/* abstract visual header */}
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
              <Link
                href={cs.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:text-brand"
              >
                Explore Case Study
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}