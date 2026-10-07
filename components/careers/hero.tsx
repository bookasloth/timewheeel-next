import { Briefcase, MapPin, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { jobs } from "@/lib/jobs";

const DOT_GRID = "radial-gradient(circle, rgba(15,17,17,0.06) 1px, transparent 1px)";

// Careers index hero. States plainly how many roles are open and points at them,
// rather than selling the company first.
export function CareersHero() {
  const open = jobs.length;

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-secondary/40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: DOT_GRID, backgroundSize: "26px 26px" }}
        />
        <div className="absolute -left-24 top-1/4 size-72 rounded-full bg-brand/10 blur-[110px]" />
      </div>

      <Reveal className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand">
          <span className="size-1.5 rounded-full bg-brand" />
          Careers at Timewheel
        </p>

        <RevealHeading
          as="h1"
          className="mt-6 max-w-3xl text-[2.35rem] font-black leading-[1.08] tracking-tight sm:text-5xl"
        >
          <span className="block">Open roles at </span>
          <span className="block text-brand">Timewheel Internet (P) Ltd.</span>
        </RevealHeading>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          We&apos;re a Nagpur digital studio selling websites, SEO, marketing and
          AI automation to businesses across the region. We hire for people who
          talk to business owners, not for people who fill spreadsheets.
        </p>

        <dl className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {[
            { k: "Open roles", v: String(open), icon: Briefcase },
            { k: "Based in", v: "Nagpur, Maharashtra", icon: MapPin },
            { k: "Hiring for", v: "Sales & delivery", icon: Sparkles },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-border bg-card px-5 py-4"
            >
              <s.icon className="size-4 text-brand" strokeWidth={1.9} />
              <dt className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {s.k}
              </dt>
              <dd className="mt-1 text-base font-bold tracking-tight">{s.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}