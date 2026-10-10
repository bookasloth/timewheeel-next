import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { LEARNING_LOOP } from "@/lib/academy";

// The right-hand panel is an example of the thing students leave with: a
// portfolio case study. It is labelled as an example layout with a fictional
// brief, so it can't be read as a real student's result.
const PREVIEW = [
  { k: "The brief", v: "A physiotherapy clinic wants more appointment enquiries from Google." },
  { k: "What I did", v: "Mapped 40 searches by intent and planned one pillar page with six supporting articles." },
  { k: "How I measured it", v: "Checked each planned page against what already ranks, and set the Search Console metrics to watch." },
  { k: "What I'd change next", v: "Add a location page, and test two headlines on the pillar page." },
];

export function AcademyHero() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-14 md:pb-28 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">
            Timewheel Digital Marketing Academy
          </p>
          <RevealHeading as="h1" className="mt-5 max-w-xl font-black tracking-tight">
            Learn Digital Marketing by Doing Real Work.
          </RevealHeading>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Build practical marketing skills, solve real business problems, and develop a portfolio that
            demonstrates what you can do. Start learning with Timewheel Digital Marketing Academy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/academy/programs"
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold"
            >
              Explore Programs
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#how-it-works"
              className="group btn btn-outline inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold"
            >
              How It Works
              <ArrowDown aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
          <p className="mt-8 max-w-xl text-sm text-muted-foreground">
            For college students, fresh graduates and beginners. Includes a Timewheel certificate, help with
            Google, Meta, HubSpot and LinkedIn certifications, and internships. An initiative by Timewheel
            Internet Private Limited, a digital marketing and web studio in Nagpur.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Portfolio case study</p>
              <p className="text-xs text-muted-foreground">Example layout</p>
            </div>
            <div className="p-5 md:p-6">
              <p className="font-heading text-lg font-extrabold leading-snug tracking-tight">
                Planning search content for a physiotherapy clinic
              </p>
              <dl className="mt-5 space-y-4">
                {PREVIEW.map((r) => (
                  <div key={r.k} className="grid gap-1 border-l-2 border-border pl-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{r.k}</dt>
                    <dd className="text-sm leading-relaxed">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ol aria-label="The four steps" className="grid grid-cols-4 border-t border-border text-center text-xs font-semibold">
              {LEARNING_LOOP.map((s, i) => (
                <li
                  key={s.step}
                  className={
                    i === LEARNING_LOOP.length - 1
                      ? "bg-brand/10 px-1 py-2.5 text-brand-text"
                      : "border-r border-border px-1 py-2.5 text-muted-foreground"
                  }
                >
                  {s.step}
                </li>
              ))}
            </ol>
            <figcaption className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
              What a finished assignment can look like. The clinic is a fictional sample brief.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
