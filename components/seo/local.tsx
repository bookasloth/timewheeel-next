import { MapPin, Languages, Locate } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";
import { RevealHeading } from "@/components/anim/reveal-heading";

const icons = [Locate, Languages, MapPin] as const;

// One accent per card, from the same palette the digital-marketing and
// client-grid sections use, so the page reads as a set.
const ACCENTS = ["#269CEF", "#FF4D93", "#FE5100"] as const;

export function SeoLocal() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">Local expertise</p>
        <RevealHeading as="h2" className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{seo.local.title}</RevealHeading>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{seo.local.body}</p>
      </Reveal>
      <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {seo.local.cards.map((c, i) => {
          const Icon = icons[i % icons.length];
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <div
              key={c.title}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-6"
            >
              {/* accent wash, clipped to the card. Titles stay in the default
                  foreground: the accents are light enough to fail contrast at
                  18px. */}
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
              <h3 className="relative mt-4 text-lg font-bold">{c.title}</h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
