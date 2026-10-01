import type { CSSProperties } from "react";
import {
  Store, Palette, SlidersHorizontal, Crown, AppWindow,
  Plug, Layers, ArrowLeftRight, Gauge, LifeBuoy, type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SdSectionHeading } from "@/components/shopify-development/section-heading";
import { sd } from "@/lib/shopify-development";

const icons: LucideIcon[] = [
  Store, Palette, SlidersHorizontal, Crown, AppWindow,
  Plug, Layers, ArrowLeftRight, Gauge, LifeBuoy,
];

// One accent per card so the row doesn't read as a single green wall. Shopify
// green leads, then a spread of distinct hues; each tile tints its own icon.
const ACCENTS = [
  "#5e8e3e",
  "#269cef",
  "#7c4dff",
  "#ff7a3d",
  "#ec4899",
  "#14b8a6",
  "#f59e0b",
  "#ef4444",
  "#0ea5e9",
  "#8b5cf6",
];

export function SdServices() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <SdSectionHeading
        label={sd.services.label}
        heading={sd.services.heading}
        accent={sd.services.headingAccent}
        body={sd.services.body}
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {sd.services.cards.map((c, i) => {
          const Icon = icons[i] ?? Store;
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <Reveal key={c.title} delay={(i % 5) * 0.04} className="h-full">
              <div
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors duration-300 hover:border-[color:var(--sd-accent)]"
                style={{ "--sd-accent": accent } as CSSProperties}
              >
                <span
                  className="grid size-11 place-items-center rounded-xl transition-colors duration-300"
                  style={{ backgroundColor: `${accent}1a`, color: accent }}
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold">{c.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
