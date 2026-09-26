import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { projects } from "@/components/about/work";

// Laptop-framed showcase of real websites already shipped. Reuses the shared
// portfolio data (single source of truth) so the "actual work" stays in sync.
function Laptop({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full">
      {/* screen */}
      <div className="rounded-t-2xl border-[8px] border-b-0 border-neutral-800 bg-neutral-800">
        <div className="overflow-hidden rounded-[5px] bg-white">{children}</div>
      </div>
      {/* hinge + base, wider than the screen for the laptop look */}
      <div className="relative mx-auto h-2.5 w-[112%] -translate-x-[5.3%] rounded-b-xl bg-gradient-to-b from-neutral-700 to-neutral-800">
        <span className="absolute left-1/2 top-0 h-1.5 w-16 -translate-x-1/2 rounded-b-md bg-neutral-900/60" />
      </div>
    </div>
  );
}

export function WebsitesShowcase() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
            Websites for everyone
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Real websites, really shipped.
          </h2>
          <p className="mt-3 text-muted-foreground md:text-lg">
            Not templates. Here&apos;s actual work I&apos;ve built and launched for people.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className="group">
                <Link href={p.href} aria-label={`View ${p.name}`} className="block">
                  <Laptop>
                    <p.Visual />
                  </Laptop>
                </Link>
                <div className="mt-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {p.category}
                  </span>
                  <h3 className="mt-1 text-lg font-extrabold tracking-tight">{p.name}</h3>
                  <Link
                    href={p.href}
                    className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-bold text-brand transition-colors hover:text-brand-text"
                  >
                    View project
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
