"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Check,
  Globe,
  Heart,
  Mail,
  Search,
  Star,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { palette, wd } from "@/lib/website-design";

function Tile({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex h-full flex-col rounded-2xl border border-border bg-white p-6 ${className}`}>
      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="mt-5 flex-1">{children}</div>
    </div>
  );
}

export function WdDesignSystem() {
  const [subscribe, setSubscribe] = useState(true);
  const [activeNav, setActiveNav] = useState("Services");
  const [typeScale, setTypeScale] = useState(5.5);
  const [active, setActive] = useState<string>(palette.blue);

  const brandTextFor = (hex: string) => {
    const map: Record<string, string> = {
      [palette.blue]: "#3b1132",
      "#a63d5f": "#7a2a45",
      [palette.orange]: "#9c3d08",
      [palette.green]: "#167a52",
      [palette.dark]: "#0a0e16",
    };
    return map[hex] ?? "#3b1132";
  };

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".wd-page");
    if (!root) return;
    root.style.setProperty("--brand", active);
    root.style.setProperty("--brand-text", brandTextFor(active));
    root.style.setProperty("--ring", active);
  }, [active]);

  const navItems = ["Home", "Services", "Work", "About"];

  return (
    <section className="border-y border-border/60 bg-soft/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">{wd.designSystem.label}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-[2.75rem]">
            {wd.designSystem.title}
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">{wd.designSystem.body}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Typography — live scale slider */}
          <Reveal className="h-full lg:row-span-2">
            <Tile label="Typography" className="h-full justify-between">
              <div>
                <span
                  className="block font-black leading-none tracking-tighter transition-[font-size] duration-200"
                  style={{ fontFamily: "var(--font-heading)", fontSize: `${typeScale}rem`, color: "var(--brand)" }}
                >
                  Aa
                </span>
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-lg font-extrabold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                      Plus Jakarta Sans, headings
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">Bold, confident, easy to scan.</p>
                  </div>
                  <div>
                    <p className="text-base font-medium">Poppins, body text</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Clean and readable across every device and length of copy.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-xl border border-border bg-soft p-4">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>Display size</span>
                  <span className="text-foreground">{typeScale.toFixed(1)}rem</span>
                </div>
                <input
                  type="range"
                  min={3.5}
                  max={7}
                  step={0.1}
                  value={typeScale}
                  onChange={(e) => setTypeScale(Number(e.target.value))}
                  aria-label="Adjust the display type size"
                  className="mt-3 w-full"
                  style={{ accentColor: "var(--brand)" }}
                />
              </div>
            </Tile>
          </Reveal>

          {/* Colors — click to copy */}
          <Reveal delay={0.06} className="h-full">
            <Tile label="Colors">
              <div className="flex flex-wrap items-center gap-4">
                {wd.designSystem.colors.map((c) => {
                  const selected = active === c.hex;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setActive(c.hex)}
                      title={`Set theme color to ${c.hex}`}
                      aria-label={`Set theme color ${c.hex}`}
                      className="group flex flex-col items-center gap-2"
                    >
                      <span
                        className={`grid size-11 place-items-center rounded-full border border-black/5 shadow-inner transition-transform duration-200 group-hover:scale-110 ${
                          selected ? "ring-2 ring-foreground ring-offset-2 ring-offset-white" : ""
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {selected && <Check className="size-4 text-white drop-shadow" />}
                      </span>
                      <span className="text-[10px] font-bold text-foreground">{c.name}</span>
                      <span className="inline-flex items-center gap-1 text-[9px] uppercase text-muted-foreground transition-colors group-hover:text-foreground">
                        {selected ? "Active" : c.hex}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Tile>
          </Reveal>

          {/* Buttons */}
          <Reveal delay={0.12} className="h-full">
            <Tile label="Buttons">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={wd.finalCta.cta.href}
                  className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold active:scale-95"
                >
                  Start a Project
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <span className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold active:scale-95">
                  Secondary
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Clear labels, comfortable touch targets, and a satisfying hover on every action.
              </p>
            </Tile>
          </Reveal>

          {/* Icons — one consistent family */}
          <Reveal delay={0.15} className="h-full">
            <Tile label="Icons">
              <div className="flex items-center gap-2.5">
                {[
                  { Icon: Bell, c: palette.blue },
                  { Icon: Heart, c: palette.orange },
                  { Icon: Star, c: palette.purple },
                  { Icon: Globe, c: palette.green },
                ].map(({ Icon, c }, i) => (
                  <span
                    key={i}
                    className="grid size-10 place-items-center rounded-xl border border-border bg-soft transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ color: c }}
                  >
                    <Icon className="size-5" />
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                One icon family with a consistent stroke and weight, so users learn the language once.
              </p>
            </Tile>
          </Reveal>

          {/* Forms — working toggle */}
          <Reveal delay={0.18} className="h-full">
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
                <button
                  type="button"
                  onClick={() => setSubscribe((v) => !v)}
                  role="switch"
                  aria-checked={subscribe}
                  className="flex items-center gap-2"
                >
                  <span
                    className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200"
                    style={{ backgroundColor: subscribe ? "var(--brand)" : "rgba(17,24,39,0.15)" }}
                  >
                    <span
                      className="absolute size-4 rounded-full bg-white shadow transition-transform duration-200"
                      style={{
                        left: "0.125rem",
                        transform: subscribe ? "translateX(1rem)" : "translateX(0)",
                      }}
                    />
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {subscribe ? "Subscribed to updates" : "Subscribe to updates"}
                  </span>
                </button>
                <Link
                  href={wd.finalCta.cta.href}
                  className="btn btn-primary block rounded-lg px-4 py-2 text-center text-sm font-semibold active:scale-[0.98]"
                >
                  Send
                </Link>
              </div>
            </Tile>
          </Reveal>

          {/* Navigation — clickable tabs */}
          <Reveal delay={0.36} className="h-full lg:col-span-3">
            <Tile label="Navigation">
              <div className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-2.5 shadow-sm">
                <span className="flex items-center gap-1.5">
                  <span className="size-5 rounded-md text-white" style={{ backgroundColor: "var(--brand)" }} />
                  <span className="text-xs font-black tracking-tight text-foreground">Brand</span>
                </span>
                <span className="hidden items-center gap-1 sm:flex">
                  {navItems.map((item) => {
                    const active = activeNav === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setActiveNav(item)}
                        aria-current={active ? "page" : undefined}
                        className={`rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition-colors duration-200 ${
                          active
                            ? "bg-foreground/5 text-foreground"
                            : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[10px] font-bold text-white transition-transform active:scale-95" style={{ backgroundColor: "var(--brand)" }}>
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