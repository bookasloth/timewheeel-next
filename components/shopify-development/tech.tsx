import {
  ArrowRightLeft,
  Blocks,
  CodeXml,
  Layers,
  Megaphone,
  Plug,
  SquareDashed,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/reveal";
import { SdSectionHeading } from "@/components/shopify-development/section-heading";
import { sd } from "@/lib/shopify-development";

const ICONS: Record<string, LucideIcon> = {
  layers: Layers,
  "code-xml": CodeXml,
  blocks: Blocks,
  plug: Plug,
  megaphone: Megaphone,
  "arrow-right-left": ArrowRightLeft,
};

export function SdTech() {
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <SdSectionHeading
          label={sd.tech.label}
          heading={sd.tech.heading}
          accent={sd.tech.headingAccent}
          body={sd.tech.body}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sd.tech.groups.map((g, i) => {
            const Icon = ICONS[g.icon] ?? SquareDashed;
            return (
              <Reveal key={g.name} delay={(i % 3) * 0.05} className="h-full">
                <div
                  style={{ "--sd-accent": g.accent } as CSSProperties}
                  className="group h-full rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-[color:var(--sd-accent)]"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="grid size-6 shrink-0 place-items-center rounded-md transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${g.accent}1f`, color: g.accent }}
                    >
                      {Icon ? <Icon className="size-3.5" /> : null}
                    </span>
                    <h3
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: g.accent }}
                    >
                      {g.name}
                    </h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors duration-300 group-hover:border-[color:var(--sd-accent)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
