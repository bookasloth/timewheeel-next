"use client";

import { FrameSequenceHero, type FrameSequenceStep } from "@/components/ui/mac-book-neo-hero";

// Interactive scroll showpiece: the calibre of work you get. Frames are the
// demo MacBook sequence loaded from GitHub. To make it yours, swap FRAME_COUNT
// + framePath for your own hosted frame set (self-hosted, not a third party).
const FRAME_COUNT = 941;
const framePath = (i: number) =>
  `https://raw.githubusercontent.com/duthiljean/hero-apple/main/frames/frame_${String(i).padStart(4, "0")}.jpg`;

const steps: FrameSequenceStep[] = [
  { from: 0.02, to: 0.28, color: "#ff9f3a", num: "01", total: "04", icon: "✦",
    title: "Designed around you.", label: "Design",
    description: "Every site is built to your brand and goals. No cookie-cutter templates." },
  { from: 0.28, to: 0.55, color: "#ff6f9c", num: "02", total: "04", icon: "◐",
    title: "Fast and refined.", label: "Build",
    description: "Hand-built, quick to load, smooth on every device. Craft you can feel." },
  { from: 0.55, to: 0.82, color: "#5e9bff", num: "03", total: "04", icon: "▣",
    title: "Made to convert.", label: "Launch",
    description: "Clear layout, sharp copy, real calls to action. A site that works for you." },
  { from: 0.82, to: 1.01, color: "#a37bff", num: "04", total: "04", icon: "⌁",
    title: "Yours to keep.", label: "Own",
    description: "You own the code, the domain, everything. No lock-in, ever." },
];

export function CraftScroll() {
  return (
    <section aria-label="What you get" className="border-b border-border/60 bg-[#07070b]">
      <FrameSequenceHero
        className="fsh-embed"
        frameCount={FRAME_COUNT}
        framePath={framePath}
        eagerCount={80}
        scrollHeight="500vh"
        title={
          <>
            <span className="fsh-title-dark">Built with</span>{" "}
            <span className="fsh-title-rainbow">obsessive craft</span>
          </>
        }
        subtitle="Scroll to explore"
        steps={steps}
      />
    </section>
  );
}
