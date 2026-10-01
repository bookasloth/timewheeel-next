import Link from "next/link";
import {
  ArrowRightLeft,
  ArrowUpRight,
  Boxes,
  Check,
  Crown,
  Puzzle,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SdSectionHeading } from "@/components/shopify-development/section-heading";
import { sd } from "@/lib/shopify-development";
import type { CSSProperties } from "react";

const ICONS: Record<string, LucideIcon> = {
  crown: Crown,
  "arrow-right-left": ArrowRightLeft,
  puzzle: Puzzle,
  boxes: Boxes,
};

export function SdSpecialized() {
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <SdSectionHeading
          label={sd.specialized.label}
          heading={sd.specialized.heading}
          accent={sd.specialized.headingAccent}
          body={sd.specialized.body}
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {sd.specialized.cards.map((c, i) => {
            const Icon = ICONS[c.icon];
            return (
              <Reveal key={c.title} delay={(i % 2) * 0.06} className="h-full">
                <Link
                  href={c.href}
                  style={{ "--sd-accent": c.accent } as CSSProperties}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors duration-300 hover:border-[color:var(--sd-accent)]"
                >
                  <div className="relative flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="grid size-9 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${c.accent}1a`, color: c.accent }}
                      >
                        {Icon ? <Icon className="size-4" /> : null}
                      </span>
                      <h3 className="truncate text-base font-bold tracking-tight">{c.title}</h3>
                    </div>
                    <span className="shrink-0 text-3xl font-black leading-none tracking-tight text-border">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="relative mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>

                  <ul className="relative mt-3.5 space-y-1">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-[13px]">
                        <span
                          className="grid size-3.5 shrink-0 place-items-center rounded-full"
                          style={{ backgroundColor: `${c.accent}1f`, color: c.accent }}
                        >
                          <Check className="size-2" />
                        </span>
                        <span className="truncate text-muted-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="relative mt-auto flex items-center gap-1 pt-4 text-[13px] font-semibold text-brand-text">
                    Learn More
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
