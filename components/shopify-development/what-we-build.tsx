import type { CSSProperties } from "react";
import {
  Store,
  Building2,
  RefreshCw,
  Layers3,
  Sparkles,
  Code2,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SdSectionHeading } from "@/components/shopify-development/section-heading";
import { sd } from "@/lib/shopify-development";

const icons: LucideIcon[] = [Store, Building2, RefreshCw, Layers3, Sparkles, Code2];

// One accent per card so the grid reads as six distinct offers rather than a
// wall of green. Shopify green leads, then a spread of hues.
const ACCENTS = [
  "#5e8e3e",
  "#269cef",
  "#7c4dff",
  "#ff7a3d",
  "#ec4899",
  "#0ea5e9",
];

export function SdWhatWeBuild() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <SdSectionHeading
        label={sd.build.label}
        heading={sd.build.heading}
        accent={sd.build.headingAccent}
        body={sd.build.body}
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sd.build.cards.map((c, i) => {
          const Icon = icons[i] ?? Store;
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <Reveal key={c.title} delay={(i % 3) * 0.05} className="h-full">
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-[color:var(--sd-accent)]"
                style={{ "--sd-accent": accent } as CSSProperties}
              >
                {/* Soft accent wash, bottom-left. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -left-10 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundColor: `${accent}33` }}
                />

                <div className="flex items-start justify-between">
                  <span
                    className="grid size-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${accent}1a`, color: accent }}
                  >
                    <Icon className="size-6" />
                  </span>
                  <span
                    className="text-xs font-black tabular-nums opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ color: accent }}
                  >
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>

                <span
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold opacity-0 transition-all duration-300 group-hover:opacity-100"
                  style={{ color: accent }}
                >
                  Learn more
                  <ArrowUpRight className="size-3.5" />
                </span>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
