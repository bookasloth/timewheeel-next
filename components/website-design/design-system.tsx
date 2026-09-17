import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Bell, Check, Mail, Search } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { palette, wd } from "@/lib/website-design";

function Tile({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col rounded-2xl border border-border bg-white p-6 ${className}`}>
      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="mt-5 flex-1">{children}</div>
    </div>
  );
}

export function WdDesignSystem() {
  return (
    <section className="border-y border-border/60 bg-soft/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-worange">{wd.designSystem.label}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-[2.75rem]">
            {wd.designSystem.title}
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">{wd.designSystem.body}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Typography */}
          <Reveal className="h-full lg:row-span-2">
            <Tile label="Typography" className="h-full justify-between">
              <div>
                <span className="block text-[5.5rem] font-black leading-none tracking-tighter" style={{ fontFamily: "var(--font-heading)" }}>
                  Aa
                </span>
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-lg font-extrabold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                      Plus Jakarta Sans — headings
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">Bold, confident, easy to scan.</p>
                  </div>
                  <div>
                    <p className="text-base font-medium">Poppins — body text</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Clean and readable across every device and length of copy.
                    </p>
                  </div>
                </div>
              </div>
            </Tile>
          </Reveal>

          {/* Colors */}
          <Reveal delay={0.06} className="h-full">
            <Tile label="Colors">
              <div className="flex flex-wrap items-center gap-4">
                {wd.designSystem.colors.map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-2">
                    <span
                      className="size-11 rounded-full border border-black/5 shadow-inner"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-[10px] font-bold text-foreground">{c.name}</span>
                    <span className="text-[9px] uppercase text-muted-foreground">{c.hex}</span>
                  </div>
                ))}
              </div>
            </Tile>
          </Reveal>

          {/* Buttons */}
          <Reveal delay={0.12} className="h-full">
            <Tile label="Buttons">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={wd.finalCta.cta.href}
                  className="group btn btn-blue inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
                >
                  Start a Project
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <span className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold">
                  Secondary
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Clear labels, comfortable touch targets, and a satisfying hover on every action.
              </p>
            </Tile>
          </Reveal>

          {/* Cards */}
          <Reveal delay={0.18} className="h-full">
            <Tile label="Cards">
              <div className="flex gap-3">
                {[
                  { t: "Strategy", c: palette.blue },
                  { t: "Design", c: palette.purple },
                  { t: "Growth", c: palette.green },
                ].map((c) => (
                  <div key={c.t} className="flex-1 rounded-xl border border-border p-3 transition-transform duration-200 hover:-translate-y-0.5">
                    <span className="grid size-7 place-items-center rounded-lg text-white" style={{ backgroundColor: c.c }}>
                      <Check className="size-3.5" />
                    </span>
                    <p className="mt-2.5 text-xs font-bold">{c.t}</p>
                    <span className="mt-1.5 block h-1.5 w-full rounded-full bg-foreground/10" />
                  </div>
                ))}
              </div>
            </Tile>
          </Reveal>

          {/* Forms */}
          <Reveal delay={0.24} className="h-full">
            <Tile label="Forms">
              <div className="space-y-2.5">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    aria-label="Email address example"
                    className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-wblue focus:ring-2 focus:ring-wblue/25"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative inline-flex h-5 w-9 items-center rounded-full" style={{ backgroundColor: palette.blue }}>
                    <span className="absolute left-0.5 size-4 rounded-full bg-white shadow" />
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">Subscribe to updates</span>
                </div>
                <Link
                  href={wd.finalCta.cta.href}
                  className="btn btn-blue block rounded-lg px-4 py-2 text-center text-sm font-semibold"
                >
                  Send
                </Link>
              </div>
            </Tile>
          </Reveal>

          {/* Navigation */}
          <Reveal delay={0.3} className="h-full lg:col-span-3">
            <Tile label="Navigation">
              <div className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-2.5 shadow-sm">
                <span className="flex items-center gap-1.5">
                  <span className="size-5 rounded-md text-white" style={{ backgroundColor: palette.blue }} />
                  <span className="text-xs font-black tracking-tight text-foreground">Brand</span>
                </span>
                <span className="hidden items-center gap-4 sm:flex">
                  <span className="text-[11px] font-semibold text-muted-foreground">Home</span>
                  <span className="text-[11px] font-semibold text-foreground">Services</span>
                  <span className="text-[11px] font-semibold text-muted-foreground">Work</span>
                  <span className="text-[11px] font-semibold text-muted-foreground">About</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[10px] font-bold text-white" style={{ backgroundColor: palette.blue }}>
                  <Bell className="size-3" /> Get Started
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-wsoft px-3 py-1 text-xs font-semibold">
                  <Search className="size-3" /> Clear &amp; sticky
                </span>
                <span className="hidden text-xs sm:block">Scales to hamburger on mobile</span>
              </div>
            </Tile>
          </Reveal>
        </div>
      </div>
    </section>
  );
}