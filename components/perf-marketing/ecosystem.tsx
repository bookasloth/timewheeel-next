"use client";

import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Bot,
  MessageCircle,
  PenLine,
  Plus,
  Sparkles,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const NODE_META: Record<string, { icon: LucideIcon; role: string; accent: string }> = {
  "Google Ads": { icon: Target, role: "Intent traffic", accent: "#ffcc1c" },
  Social: { icon: MessageCircle, role: "Build audience", accent: "#f4b400" },
  "Meta Ads": { icon: Bot, role: "Reach & retarget", accent: "#ea580c" },
  Content: { icon: PenLine, role: "Attract & educate", accent: "#fb923c" },
  Email: { icon: Workflow, role: "Nurture & convert", accent: "#f59e0b" },
  Analytics: { icon: BarChart3, role: "Measure & improve", accent: "#FFCC1C" },
  SEO: { icon: Sparkles, role: "Rank & get found", accent: "#fbbf24" },
  Conversions: { icon: ArrowRight, role: "The one goal", accent: "#ffcc1c" },
};

const ORBIT: Array<{ name: string; dx: number; dy: number }> = [
  { name: "Content", dx: -141.4, dy: -141.4 },
  { name: "Google Ads", dx: 0, dy: -200 },
  { name: "Social", dx: 141.4, dy: -141.4 },
  { name: "Email", dx: 200, dy: 0 },
  { name: "Analytics", dx: 141.4, dy: 141.4 },
  { name: "Meta Ads", dx: -141.4, dy: 141.4 },
  { name: "SEO", dx: -200, dy: 0 },
  { name: "Conversions", dx: 0, dy: 200 },
];

const CANVAS = 660;
const CENTER = 330;

function NodeCard({
  name,
  lit,
  onEnter,
  onLeave,
}: {
  name: string;
  lit: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const meta = NODE_META[name] ?? { icon: Sparkles, role: "Works together", accent: "#ffcc1c" };
  const Icon = meta.icon;
  const isConversion = name === "Conversions";
  const accent = isConversion ? "#ffcc1c" : meta.accent;
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        "flex min-h-[84px] w-full flex-col items-center justify-center gap-1 rounded-[12px] border border-white/10 px-3 py-3 text-center transition-all duration-300",
        isConversion ? "border-brand/50 bg-brand/[0.12]" : "bg-white/[0.05]",
      )}
      style={
        !isConversion && lit
          ? { borderColor: accent }
          : undefined
      }
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${accent}1f`, color: accent }}
      >
        <Icon className="size-[13px]" strokeWidth={1.75} />
      </span>
      <span
        className={cn("text-[13px] font-bold leading-tight", isConversion && "text-brand")}
        style={!isConversion && lit ? { color: accent } : undefined}
      >
        {name}
      </span>
      <span
        className={cn("text-[11px] leading-tight", isConversion ? "text-brand" : "text-white/55")}
        style={!isConversion && lit ? { color: accent } : undefined}
      >
        {meta.role}
      </span>
    </div>
  );
}

export function PmEcosystem() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] text-white pm-dark">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(55% 55% at 50% 0%, rgba(139,92,246,0.2), transparent 60%), radial-gradient(50% 50% at 50% 100%, rgba(59,130,246,0.16), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 md:pb-24 md:pt-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Every Channel, Working Toward One Goal
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          SEO, paid ads, social, content, email, and analytics, connected into
          a single growth system around your brand.
        </p>
      </Reveal>

      <Reveal stagger className="mt-6 grid grid-cols-2 gap-2 md:hidden">
        {ORBIT.map(({ name }) => {
          if (name === "Conversions") return null;
          return (
            <NodeCard
              key={name}
              name={name}
              lit={active === name}
              onEnter={() => setActive(name)}
              onLeave={() => setActive(null)}
            />
          );
        })}

        <div className="col-span-2 mt-3 flex flex-col items-center">
          <ChevronDown aria-hidden className="mb-2 size-4 text-border" />
          <div
            onMouseEnter={() => setActive(null)}
            onMouseLeave={() => setActive(null)}
            className="flex min-h-[88px] w-full flex-col items-center justify-center gap-1.5 rounded-[12px] border border-white/15 px-6 py-4 text-center pm-panel"
          >
            <span className="inline-flex items-center gap-1.5">
              <Plus className="size-3.5 text-brand" strokeWidth={2.5} />
              <span className="text-sm font-black uppercase tracking-wide text-white">
                Timewheel
              </span>
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/45">
              The system
            </span>
          </div>
        </div>

        <div className="col-span-2 mt-3 flex flex-col items-center">
          <ChevronDown aria-hidden className="mb-2 size-4 text-border" />
          <NodeCard
            name="Conversions"
            lit={active === "Conversions"}
            onEnter={() => setActive("Conversions")}
            onLeave={() => setActive(null)}
          />
        </div>
      </Reveal>

      <Reveal stagger className="relative mx-auto mt-4 hidden md:block">
        <div className="relative mx-auto h-[660px] w-[660px]">
          <svg
            aria-hidden
            viewBox={`0 0 ${CANVAS} ${CANVAS}`}
            fill="none"
            className="absolute inset-0 h-full w-full"
          >
            <circle cx={CENTER} cy={CENTER} r={104} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={168}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              strokeDasharray="2 7"
            />
            {ORBIT.map(({ name, dx, dy }) => {
              const isConversion = name === "Conversions";
              const lit = active === name;
              const accent = NODE_META[name]?.accent ?? "#ffcc1c";
              return (
                <line
                  key={name}
                  x1={CENTER}
                  y1={CENTER}
                  x2={CENTER + dx}
                  y2={CENTER + dy}
                  style={{
                    stroke: lit ? accent : isConversion ? "#ffcc1c" : "rgba(255,255,255,0.14)",
                    strokeWidth: lit ? 1.6 : 1,
                    opacity: lit ? 1 : isConversion ? 0.6 : 0.9,
                    transition:
                      "stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease",
                  }}
                  strokeDasharray="3 5"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div
              onMouseEnter={() => setActive(null)}
              onMouseLeave={() => setActive(null)}
              className="flex min-h-[88px] w-[128px] flex-col items-center justify-center gap-1.5 rounded-[12px] border border-white/15 px-6 py-4 text-center pm-panel"
            >
              <span className="inline-flex items-center gap-1.5">
                <Plus className="size-3.5 text-brand" strokeWidth={2.5} />
                <span className="text-sm font-black uppercase tracking-wide text-white">
                  Timewheel
                </span>
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/45">
                The system
              </span>
            </div>
          </div>

          {ORBIT.map(({ name, dx, dy }) => {
            const lit = active === name;
            return (
              <div
                key={name}
                className="absolute left-1/2 top-1/2 z-10 w-[112px]"
                style={{
                  transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px)`,
                }}
              >
                <NodeCard
                  name={name}
                  lit={lit}
                  onEnter={() => setActive(name)}
                  onLeave={() => setActive(null)}
                />
              </div>
            );
          })}
        </div>
      </Reveal>
      </div>
    </section>
  );
}
