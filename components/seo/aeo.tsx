import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";
import { RevealHeading } from "@/components/anim/reveal-heading";

// The differentiator section, AI-search visibility, tied to what the audit measures.

// One accent per point, from the same palette as the Local expertise and
// What we do grids, so the page reads as a set.
const ACCENTS = ["#269CEF", "#8B5CF6", "#FF4D93", "#14B8A6"] as const;

// The three engines the body copy names, surfaced as chips so the claim in the
// paragraph is visible rather than only stated.
const ENGINES = ["ChatGPT", "Gemini", "Google AI Overviews"] as const;

export function SeoAeo() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-brand-text">
            <Sparkles className="size-4" /> AEO · AI search
          </p>
          <RevealHeading as="h2" className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{seo.aeo.title}</RevealHeading>
          <p className="mt-4 max-w-lg text-muted-foreground md:text-lg">{seo.aeo.body}</p>
        </Reveal>
        <Reveal
          delay={0.1}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-[0_40px_80px_-48px_rgba(17,24,39,0.5)] md:p-9"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(120% 80% at 100% 0%, #8B5CF61f, transparent 60%)" }}
          />
          <ul className="relative space-y-4">
            {seo.aeo.points.map((p, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <li key={p} className="flex items-start gap-3 text-sm font-medium md:text-base">
                  <span
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: `${accent}1a`, color: accent }}
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              );
            })}
          </ul>
          <div className="relative mt-7 flex flex-wrap items-center gap-2 border-t border-border/70 pt-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Measured across
            </span>
            {ENGINES.map((e) => (
              <span
                key={e}
                className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-bold"
              >
                {e}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
