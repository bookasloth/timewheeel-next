import type { CSSProperties } from "react";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/digital-marketing/counter";
import { Squiggle } from "@/components/digital-marketing/dm-illustrations";
import { dmStats } from "@/lib/digital-marketing";
import {
  Asterisk,
  Box,
  Compass,
  Globe2,
  Hexagon,
  Layers,
  Rocket,
  ShieldHalf,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

const statGradients = [
  "bg-gradient-to-br from-[#ff4d93] to-[#fe5100]",
  "bg-gradient-to-br from-[#ffcc1c] to-[#fe5100]",
  "bg-gradient-to-br from-[#4ab765] to-[#269cef]",
];

// Placeholder trusted-brand marks — swap in real client logos when available.
const brandMarks: Array<{ icon: LucideIcon; name: string; accent: string }> = [
  { icon: Hexagon, name: "Northwind", accent: "#ff4d93" },
  { icon: Layers, name: "Vertex Labs", accent: "#fe5100" },
  { icon: Zap, name: "Kinetiq", accent: "#ffcc1c" },
  { icon: Globe2, name: "Oryx & Co", accent: "#4ab765" },
  { icon: Compass, name: "Northstar", accent: "#269cef" },
  { icon: Box, name: "Flare.io", accent: "#8b5cf6" },
  { icon: ShieldHalf, name: "Sentinel", accent: "#25d366" },
  { icon: Rocket, name: "Atlas Works", accent: "#fe5100" },
  { icon: Sparkles, name: "Mosaic", accent: "#ffcc1c" },
  { icon: Asterisk, name: "Loom & Spine", accent: "#ff4d93" },
];

function BrandItem({ brand }: { brand: { icon: LucideIcon; name: string; accent: string } }) {
  const Icon = brand.icon;
  return (
    <span
      className="group flex items-center"
      style={{ "--bc": brand.accent } as CSSProperties}
    >
      <span className="flex items-center gap-2.5 px-9">
        <Icon
          className="size-5 text-white/35 transition-colors duration-300 group-hover:text-[var(--bc)]"
          strokeWidth={1.75}
        />
        <span className="text-base font-bold uppercase tracking-tight text-white/45 transition-colors duration-300 group-hover:text-[var(--bc)]">
          {brand.name}
        </span>
      </span>
    </span>
  );
}

// Dark "in numbers" band — gradient counts with a subtle ring decoration.
export function DmTrust() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-navy text-white">
      {/* flat tonal washes instead of blurred orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 80% at 12% 0%, rgba(254,81,0,0.14), transparent 60%), radial-gradient(50% 70% at 88% 100%, rgba(38,156,239,0.12), transparent 60%)",
        }}
      />
      {/* faint concentric-ring decoration, top-right */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        fill="none"
        className="pointer-events-none absolute -right-16 -top-16 size-64 text-white/[0.06]"
      >
        <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="1" />
        <circle
          cx="100"
          cy="100"
          r="56"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 7"
        />
        <circle cx="100" cy="36" r="4" fill="currentColor" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                Timewheel digital marketing — in numbers
              </p>
              <Squiggle className="mt-1.5 h-3 w-28 text-brand" />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-2 md:grid-cols-3">
          {dmStats.map((s, i) => (
            <div
              key={s.label}
              className={
                i % 2 === 1
                  ? "group flex flex-col items-center border-l border-white/10 pl-6 text-center md:border-l md:pl-8"
                  : "group flex flex-col items-center pr-6 text-center md:pr-8"
              }
            >
              <p className="flex -translate-y-0 items-baseline gap-1 text-5xl font-black leading-none tracking-tight transition-transform duration-300 group-hover:-translate-y-1 md:text-7xl">
                <span className={statGradients[i % statGradients.length] + " bg-clip-text text-transparent"}>
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
              </p>
              <p className="mt-2 h-px w-12 bg-white/15 transition-colors duration-300 group-hover:bg-brand/60" />
              <p className="mt-3 pb-1 text-sm font-medium text-white/55 transition-colors duration-300 group-hover:text-white">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>

      {/* trusted brands logo marquee */}
      <div className="relative border-t border-white/10 py-7 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
          We’ve helped over 20+ brands grow their brand presence online.
        </p>
        <div className="relative flex overflow-hidden">
          <div className="dm-marquee flex shrink-0 items-center whitespace-nowrap">
            {[...brandMarks, ...brandMarks].map((brand, i) => (
              <BrandItem key={i} brand={brand} />
            ))}
          </div>
          <div
            aria-hidden
            className="dm-marquee flex shrink-0 items-center whitespace-nowrap"
          >
            {[...brandMarks, ...brandMarks].map((brand, i) => (
              <BrandItem key={`dup-${i}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}