import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { projects } from "@/components/about/work";
import { RevealHeading } from "@/components/anim/reveal-heading";

// "Real websites, really shipped" as a 5 x 6 grid of 30 spots (the challenge is
// 30 websites). First cell is the "add your website here" CTA that jumps to the
// form; then the sites already shipped; the rest are open spots.
const GRID_TOTAL = 30;

export function WebsitesShowcase() {
  const openSpots = Math.max(0, GRID_TOTAL - 1 - projects.length);

  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
            Websites for everyone
          </p>
          <RevealHeading as="h2" className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Real websites, really shipped.
          </RevealHeading>
          <p className="mt-3 text-muted-foreground md:text-lg">
            30 spots. Here&apos;s the work already launched, and an open seat with your name on it.
          </p>
        </Reveal>

        <Reveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {/* 1 x 1: add your website here -> form */}
          <Link
            href="#join"
            className="group flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand/40 bg-brand/5 p-3 text-center transition-colors hover:border-brand hover:bg-brand/10"
          >
            <span className="grid size-9 place-items-center rounded-full bg-brand text-brand-foreground transition-transform group-hover:scale-110">
              <Plus className="size-5" strokeWidth={2.5} />
            </span>
            <span className="text-xs font-bold leading-tight text-brand-text">Add your website here</span>
          </Link>

          {/* shipped sites */}
          {projects.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              aria-label={`View ${p.name}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-xl border border-border bg-white"
            >
              <div className="pointer-events-none absolute inset-0 w-full">
                <p.Visual />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-2.5 pb-2 pt-7">
                <span className="truncate text-[11px] font-bold text-white">{p.name}</span>
                <ArrowUpRight className="size-3.5 shrink-0 text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}

          {/* open spots */}
          {Array.from({ length: openSpots }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-border bg-secondary/30"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                Open spot
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
