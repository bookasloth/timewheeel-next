"use client";

import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Mail,
  MessageCircle,
  PenLine,
  Plus,
  Search,
  Share2,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const NODE_META: Record<string, { icon: LucideIcon; role: string; accent: string }> = {
  SEO: { icon: Search, role: "Get found", accent: "#4AB765" },
  "Paid Ads": { icon: Target, role: "Earn clicks", accent: "#FE5100" },
  Content: { icon: PenLine, role: "Build trust", accent: "#FF4D93" },
  "Social Media": { icon: Share2, role: "Grow reach", accent: "#269CEF" },
  Email: { icon: Mail, role: "Nurture leads", accent: "#FFCC1C" },
  WhatsApp: { icon: MessageCircle, role: "Close conversations", accent: "#25D366" },
  Analytics: { icon: BarChart3, role: "Measure impact", accent: "#8B5CF6" },
  Conversions: { icon: ArrowRight, role: "The one goal", accent: "#FE5100" },
};

const ORBIT: Array<{ name: string; dx: number; dy: number }> = [
  { name: "Content", dx: -141.4, dy: -141.4 },
  { name: "SEO", dx: 0, dy: -200 },
  { name: "Paid Ads", dx: 141.4, dy: -141.4 },
  { name: "Social Media", dx: 200, dy: 0 },
  { name: "Email", dx: 141.4, dy: 141.4 },
  { name: "WhatsApp", dx: -141.4, dy: 141.4 },
  { name: "Analytics", dx: -200, dy: 0 },
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
  const meta = NODE_META[name] ?? { icon: Search, role: "Works together", accent: "#FE5100" };
  const Icon = meta.icon;
  const isConversion = name === "Conversions";
  const accent = isConversion ? "#FE5100" : meta.accent;
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        "flex min-h-[84px] w-full flex-col items-center justify-center gap-1 rounded-[12px] border border-[#E8E8E8] px-3 py-3 text-center transition-all duration-300 hover:-translate-y-0.5",
        isConversion
          ? "border-brand/40 bg-brand/[0.06] hover:shadow-[0_14px_30px_-22px_rgba(254,81,0,0.26)]"
          : "bg-white hover:shadow-[0_14px_30px_-22px_rgba(15,17,17,0.22)]",
      )}
      style={
        !isConversion && lit
          ? { borderColor: accent, boxShadow: `0 14px 30px -22px ${accent}42` }
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
        className={cn("text-[11px] leading-tight", isConversion ? "text-brand/70" : "text-muted-foreground/90")}
        style={!isConversion && lit ? { color: accent } : undefined}
      >
        {meta.role}
      </span>
    </div>
  );
}

export function Dm2Ecosystem() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-2 pt-20 md:pb-8 md:pt-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Every Channel, Working Toward One Goal
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          SEO, paid, content, social, email, and WhatsApp — connected into a
          single growth system around your brand.
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
            className="flex min-h-[88px] w-full flex-col items-center justify-center gap-1.5 rounded-[12px] border border-white/10 bg-navy px-6 py-4 text-center shadow-[0_28px_56px_-30px_rgba(15,17,17,0.4)]"
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
            <circle cx={CENTER} cy={CENTER} r={104} stroke="#f0f0f2" strokeWidth="1" />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={168}
              stroke="#e9e9ed"
              strokeWidth="1"
              strokeDasharray="2 7"
            />
            {ORBIT.map(({ name, dx, dy }) => {
              const isConversion = name === "Conversions";
              const lit = active === name;
              const accent = NODE_META[name]?.accent ?? "#FE5100";
              return (
                <line
                  key={name}
                  x1={CENTER}
                  y1={CENTER}
                  x2={CENTER + dx}
                  y2={CENTER + dy}
                  style={{
                    stroke: lit ? accent : isConversion ? "#FE5100" : "#e4e4e8",
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
              className="flex min-h-[88px] w-[128px] flex-col items-center justify-center gap-1.5 rounded-[12px] border border-white/10 bg-navy px-6 py-4 text-center shadow-[0_28px_56px_-30px_rgba(15,17,17,0.4)]"
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
    </section>
  );
}
