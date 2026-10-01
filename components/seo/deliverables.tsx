import { ArrowUp, BarChart3, ClipboardCheck, ListChecks, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";
import { RevealHeading } from "@/components/anim/reveal-heading";

const icons = [ClipboardCheck, ListChecks, BarChart3, MapPin] as const;

// One accent per item, from the same palette as the Local expertise and
// What we do grids, so the page reads as a set.
const ACCENTS = ["#269CEF", "#FE5100", "#8B5CF6", "#4AB765"] as const;

export function SeoDeliverables() {
  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">Deliverables</p>
          <RevealHeading as="h2" className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{seo.deliverables.title}</RevealHeading>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{seo.deliverables.body}</p>
        </Reveal>
        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {seo.deliverables.items.map((it, i) => {
            const Icon = icons[i % icons.length];
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <div
                key={it.k}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-6"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: `radial-gradient(120% 80% at 100% 0%, ${accent}1f, transparent 60%)` }}
                />
                <span
                  className="relative grid size-11 place-items-center rounded-xl"
                  style={{ backgroundColor: `${accent}1a`, color: accent }}
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="relative mt-4 text-lg font-bold">{it.k}</h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.v}</p>
              </div>
            );
          })}
        </Reveal>
        {/* The audit lives at the top of the page, so this reads as a pointer
            back up the page rather than a footnote. */}
        <Reveal>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
              <ArrowUp className="size-4" />
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Want to see it now? Run the free audit at the top of this page, that scorecard is
              exactly what every engagement starts with.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
