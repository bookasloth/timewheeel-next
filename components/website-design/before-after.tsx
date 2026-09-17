"use client";

import { useState } from "react";
import { ArrowLeftRight, Check, X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { palette, wd } from "@/lib/website-design";
import { cn } from "@/lib/utils";

function Bar({ w, className }: { w?: string; className?: string }) {
  return <span className={cn("block h-1.5 rounded-full bg-foreground/10", w ?? "w-full", className)} />;
}

/* Before: dated, cluttered, everything competing for attention. */
function BeforeSite() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex items-center justify-between bg-[#ffe9a8] px-3 py-1.5">
        <span className="animate-pulse text-[8px] font-black uppercase tracking-wide text-[#7a6a00]">
          🔥 Welcome to our website!!! Click here for best deals 🔥
        </span>
        <span className="text-[8px] font-black text-red-600">X</span>
      </div>
      <div className="flex items-center justify-between border-b-4 border-[#bada55] px-3 py-2">
        <span className="text-[9px] font-black italic" style={{ color: "#c0392b" }}>
          WelcomeToOurBusinessSite
        </span>
        <div className="flex gap-1">
          {["Home", "About Us", "Services", "More", "Contact", "Blog", "Shop"].map((l) => (
            <span key={l} className="rounded border border-dashed border-[#7b5cbf] px-1 py-0.5 text-[7px] font-bold text-[#7b5cbf]">
              {l}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-[#e6f0ff] px-3 py-4 text-center">
        <span className="block text-[11px] font-black text-[#0b4f8f]">
          WELCOME TO OUR COMPANY WEBSITE
        </span>
        <span className="mx-auto mt-1.5 block h-px w-3/5 bg-[#0b4f8f]/40" />
        <span className="mt-2 block text-[7px] leading-tight text-[#33577a]">
          We are a company that does company things for companies. Click here to
          learn more about our company and what we offer. Lorem ipsum dolor sit amet.
        </span>
        <div className="mt-2 flex items-end justify-center gap-1.5">
          <span className="h-8 w-7 rounded-sm bg-[#ff6b6b]" />
          <span className="h-12 w-7 rounded-sm bg-[#ff6b6b]" />
          <span className="h-9 w-7 rounded-sm bg-[#ff6b6b]" />
          <span className="h-14 w-7 rounded-sm bg-[#ff6b6b]" />
          <span className="h-10 w-7 rounded-sm bg-[#ff6b6b]" />
        </div>
        <span className="mt-1.5 inline-block rounded border-2 border-dotted border-[#f39c12] bg-[#fdebd0] px-2 py-0.5 text-[7px] font-black text-[#c76d00]">
          CLICK HERE TO READ MORE
        </span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-1.5 p-3">
        <div className="rounded border-2 border-[#9b59b6]/50 bg-[#f7effb] p-1.5 text-center">
          <span className="block text-[8px] font-black text-[#8e44ad]">SERVICES</span>
          <Bar className="mx-auto mt-1 h-1 w-4/5 bg-[#8e44ad]/30" />
          <Bar className="mx-auto mt-1 h-1 w-3/5 bg-[#8e44ad]/20" />
        </div>
        <div className="rounded border-2 border-[#e67e22]/50 bg-[#fdf3e7] p-1.5 text-center">
          <span className="block text-[8px] font-black text-[#ca6f1e]">ABOUT US</span>
          <Bar className="mx-auto mt-1 h-1 w-4/5 bg-[#e67e22]/30" />
          <Bar className="mx-auto mt-1 h-1 w-2/3 bg-[#e67e22]/20" />
        </div>
        <div className="rounded border-2 border-[#27ae60]/50 bg-[#eafbf1] p-1.5 text-center">
          <span className="block text-[8px] font-black text-[#1e8449]">WHY US?</span>
          <Bar className="mx-auto mt-1 h-1 w-4/5 bg-[#27ae60]/30" />
          <Bar className="mx-auto mt-1 h-1 w-1/2 bg-[#27ae60]/20" />
        </div>
      </div>
      <div className="flex justify-between bg-[#333] px-3 py-1.5 text-[6px] text-[#ccc]">
        <span>Copyright 2012 Your Company. All rights reserved.</span>
        <span>Privacy · Terms · Sitemap · FAQ · Careers</span>
      </div>
    </div>
  );
}

/* After: clear hierarchy, generous spacing, premium and calm. */
function AfterSite() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
        <span className="flex items-center gap-1.5">
          <span className="size-4 rounded-md" style={{ backgroundColor: palette.blue }} />
          <span className="text-[10px] font-black tracking-tight text-foreground">Your Brand</span>
        </span>
        <span className="hidden items-center gap-4 text-[8px] font-semibold text-muted-foreground sm:flex">
          <span className="text-foreground">Home</span>
          <span>Services</span>
          <span>Work</span>
          <span>About</span>
        </span>
        <span className="rounded-md px-2.5 py-1 text-[8px] font-bold text-white" style={{ backgroundColor: palette.blue }}>
          Start a Project
        </span>
      </div>
      <div className="flex-1 px-5 pb-1 pt-6 sm:px-7">
        <span
          className="inline-block rounded-full px-2 py-0.5 text-[7px] font-bold uppercase tracking-widest"
          style={{ backgroundColor: `${palette.purple}15`, color: palette.purple }}
        >
          Premium Web Design
        </span>
        <p className="mt-3 max-w-md text-base font-black leading-tight tracking-tight text-foreground sm:text-lg">
          Websites that build trust <br className="hidden sm:block" />
          and grow business.
        </p>
        <p className="mt-2 max-w-sm text-[9px] leading-relaxed text-muted-foreground">
          Clear strategy, thoughtful design and clean development, one studio, one team, one goal.
        </p>
        <div className="mt-3.5 flex gap-2">
          <span className="rounded-md px-3 py-1.5 text-[8px] font-bold text-white" style={{ backgroundColor: palette.blue }}>
            Start a Project
          </span>
          <span className="rounded-md border border-border px-3 py-1.5 text-[8px] font-bold text-foreground/70">
            See our work
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2.5 px-5 pb-5 pt-1 sm:px-7">
        {[
          { t: "Strategy", c: palette.blue },
          { t: "Design", c: palette.purple },
          { t: "Build", c: palette.green },
        ].map((c) => (
          <div key={c.t} className="rounded-lg border border-border/70 p-2.5">
            <span className="size-1.5 rounded-full" style={{ backgroundColor: c.c }} />
            <p className="mt-1.5 text-[9px] font-bold text-foreground">{c.t}</p>
            <Bar className="mt-1.5 h-1" />
            <Bar className="mt-1 h-1 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function WdBeforeAfter() {
  const [pos, setPos] = useState(58);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-wblue">{wd.beforeAfter.label}</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-[2.75rem]">
          {wd.beforeAfter.title}
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">{wd.beforeAfter.body}</p>
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-4xl">
        <div className="relative aspect-[4/3] select-none overflow-hidden rounded-2xl border border-border bg-white shadow-[0_40px_80px_-48px_rgba(17,24,39,0.45)] sm:aspect-[16/9]">
          <AfterSite />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <BeforeSite />
          </div>

          {/* divider + handle */}
          <div className="pointer-events-none absolute inset-y-0 z-20" style={{ left: `${pos}%` }} aria-hidden>
            <div className="absolute inset-y-0 -translate-x-1/2">
              <div className="h-full w-0.5 bg-white shadow-[0_0_0_1px_rgba(17,24,39,0.2)]" />
            </div>
            <span className="absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-white shadow-lg">
              <ArrowLeftRight className="size-4" style={{ color: palette.blue }} />
            </span>
          </div>

          {/* labels */}
          <span className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            <X className="size-3" /> {wd.beforeAfter.beforeTitle}
          </span>
          <span className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            <Check className="size-3" style={{ color: palette.green }} /> {wd.beforeAfter.afterTitle}
          </span>

          {/* range control (keyboard + touch accessible) */}
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Slide to compare before and after website design"
            className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
            style={{ touchAction: "pan-y" }}
          />
        </div>
        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs font-semibold text-muted-foreground">
          <ArrowLeftRight className="size-3.5" /> Drag the handle, same business, two websites
        </p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
        {[
          {
            title: wd.beforeAfter.beforeTitle,
            points: wd.beforeAfter.beforePoints,
            good: false,
          },
          {
            title: wd.beforeAfter.afterTitle,
            points: wd.beforeAfter.afterPoints,
            good: true,
          },
        ].map((col, i) => (
          <Reveal key={col.title} delay={i * 0.1}>
            <div className={cn("h-full rounded-2xl border p-6", col.good ? "border-wblue/20 bg-wblue/[0.03]" : "border-border bg-wsoft/50")}>
              <p className={cn("text-xs font-bold uppercase tracking-widest", col.good ? "text-wblue" : "text-muted-foreground")}>
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <span
                      className={cn(
                        "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                        col.good ? "text-white" : "bg-destructive/10 text-destructive",
                      )}
                      style={col.good ? { backgroundColor: palette.green } : undefined}
                    >
                      {col.good ? <Check className="size-3" /> : <X className="size-3" />}
                    </span>
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}