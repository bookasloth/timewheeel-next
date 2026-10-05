"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftRight, Check, X } from "lucide-react";
import type { CaseStudyComparison } from "@/lib/case-studies";

// Drag-to-compare screenshot pair for a case study section. The "after" image
// is the base layer and the "before" image is clipped over it, so dragging the
// handle reveals one through the other.
//
// The handle is an invisible <input type="range"> stretched over the frame
// rather than a pointer-event handler, which is what makes this keyboard and
// touch accessible for free. touchAction: "pan-y" keeps vertical page scroll
// working when the drag starts near the top of the image.

export function CaseStudyBeforeAfter({
  comparison,
  accent,
}: {
  comparison: CaseStudyComparison;
  accent: string;
}) {
  const [pos, setPos] = useState(50);

  const beforeLabel = comparison.beforeLabel ?? "Before";
  const afterLabel = comparison.afterLabel ?? "After";
  const handleColor = accent;

  return (
    <figure className="mt-8">
      <div
        className="relative w-full select-none overflow-hidden rounded-2xl border border-border bg-secondary shadow-[0_40px_80px_-48px_rgba(17,24,39,0.45)]"
        style={{ aspectRatio: comparison.aspect ?? "16/10" }}
      >
        <Image
          src={comparison.after.src}
          alt={comparison.after.alt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={comparison.before.src}
            alt={comparison.before.alt}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover object-top"
          />
        </div>

        {/* divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-20"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        >
          <div className="absolute inset-y-0 -translate-x-1/2">
            <div className="h-full w-0.5 bg-white shadow-[0_0_0_1px_rgba(17,24,39,0.2)]" />
          </div>
          <span className="absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-white shadow-lg">
            <ArrowLeftRight className="size-4" style={{ color: handleColor }} />
          </span>
        </div>

        {/* labels */}
        <span className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          <X className="size-3" /> {beforeLabel}
        </span>
        <span className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          <Check className="size-3" style={{ color: handleColor }} /> {afterLabel}
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Slide to compare the ${beforeLabel.toLowerCase()} and ${afterLabel.toLowerCase()} website`}
          className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
          style={{ touchAction: "pan-y" }}
        />
      </div>

      <figcaption className="mt-4 flex items-center justify-center gap-2 text-center text-xs font-semibold text-muted-foreground">
        <ArrowLeftRight className="size-3.5" />
        {comparison.caption ?? "Drag the handle to compare"}
      </figcaption>
    </figure>
  );
}