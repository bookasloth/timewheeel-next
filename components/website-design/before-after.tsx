"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftRight, Check, X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { palette, wd } from "@/lib/website-design";
import { cn } from "@/lib/utils";

export function WdBeforeAfter() {
  const [pos, setPos] = useState(58);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">{wd.beforeAfter.label}</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-[2.75rem]">
          {wd.beforeAfter.title}
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">{wd.beforeAfter.body}</p>
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-4xl">
        <div className="relative aspect-[1908/924] select-none overflow-hidden rounded-2xl border border-border bg-white shadow-[0_40px_80px_-48px_rgba(17,24,39,0.45)]">
          <Image
            src="/bookasloth-new.PNG"
            alt="Book A Sloth website after the redesign"
            fill
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image
              src="/bookasloth-old.PNG"
              alt="Book A Sloth website before the redesign"
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover object-top"
            />
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
