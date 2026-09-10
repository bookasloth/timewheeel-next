import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/digital-marketing/tilt-card";
import { OrbitRings } from "@/components/digital-marketing/dm-illustrations";

// Decorative sample data for the mock growth dashboard. These are illustrative
// UI mockups only and are not claims about actual company performance.
const floating = [
  { label: "+38% organic traffic", pos: "-top-3 -left-3", color: "#4ab765", delay: "0.2s" },
  { label: "2.4K leads / month", pos: "top-[34%] -left-4", color: "#fe5100", delay: "0.5s" },
  { label: "ROAS 4.2x", pos: "bottom-8 -left-4", color: "#ff4d93", delay: "0.8s" },
  { label: "CTR 4.2%", pos: "-top-3 -right-3", color: "#269cef", delay: "0.4s" },
];

function KpiTile({ k, v, delta }: { k: string; v: string; delta?: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 px-2.5 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {k}
      </p>
      <p className="mt-0.5 flex items-baseline gap-1.5">
        <span className="text-sm font-extrabold text-foreground">{v}</span>
        {delta && (
          <span className="text-[9px] font-bold text-rating">↑ {delta}</span>
        )}
      </p>
    </div>
  );
}

function BarRow({ label, value, color, pct }: { label: string; value: string; color: string; pct: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold text-foreground">{value}</span>
      </div>
      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full" style={{ width: pct, backgroundColor: color }} />
      </div>
    </div>
  );
}

// Main area chart driven by realistic growth-shape data.
function AreaChart({ color }: { color: string }) {
  const id = "hero-area";
  const line = "M0 76 C40 68 60 70 90 52 C120 34 150 46 180 30 C210 14 240 22 270 12 C290 6 306 5 320 3";
  const area = `${line} L320 96 L0 96 Z`;
  return (
    <div className="relative">
      <svg viewBox="0 0 320 96" className="h-24 w-full" fill="none" aria-hidden>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[24, 48, 72].map((y) => (
          <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#e8e8ec" strokeWidth="1" />
        ))}
        <path d={area} fill={`url(#${id})`} />
        <path d={line} stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function CommandCenter() {
  return (
    <div className="relative">
      {/* dashboard frame */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
          <span className="size-2.5 rounded-full bg-accent-pink" />
          <span className="size-2.5 rounded-full bg-accent-yellow" />
          <span className="size-2.5 rounded-full bg-accent-blue" />
          <span className="ml-2 flex-1 rounded-md bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
            timewheel.co.in/growth
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-2 py-0.5 text-[10px] font-bold text-brand">
            <span className="size-1.5 animate-pulse rounded-full bg-brand" />
            Live
          </span>
        </div>

        <div className="p-5">
          {/* panel header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">Growth overview</p>
              <p className="text-[11px] text-muted-foreground">Last 30 days · all channels</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-rating/10 px-2.5 py-1 text-[10px] font-bold text-rating">
              <TrendingUp className="size-3" /> +12.4% vs prev
            </span>
          </div>

          {/* KPI row */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            <KpiTile k="Sessions" v="18.4K" delta="12%" />
            <KpiTile k="Leads" v="2.4K" delta="8%" />
            <KpiTile k="Conv. rate" v="4.8%" delta="0.4%" />
            <KpiTile k="ROAS" v="4.2x" delta="0.6x" />
          </div>

          {/* chart */}
          <div className="mt-4 rounded-lg border border-border bg-secondary/20 p-3">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <span>Acquisition</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-brand" />
                Conversions
              </span>
            </div>
            <div className="mt-2">
              <AreaChart color="#fe5100" />
            </div>
          </div>

          {/* lower grid */}
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                  Campaign performance
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-foreground">
                  <TrendingUp className="size-3 text-rating" /> On track
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                <BarRow label="CTR" value="4.2%" color="#fe5100" pct="82%" />
                <BarRow label="CPC" value="₹12" color="#269cef" pct="58%" />
                <BarRow label="Conv." value="9%" color="#4ab765" pct="74%" />
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                  Search visibility
                </span>
                <span className="text-xs font-bold text-foreground">Diagnostic</span>
              </div>
              <div className="mt-3 space-y-2.5">
                <BarRow label="Organic traffic" value="82%" color="#4ab765" pct="82%" />
                <BarRow label="Site authority" value="68%" color="#269cef" pct="68%" />
                <BarRow label="Keyword coverage" value="58%" color="#fe5100" pct="58%" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating decorative labels */}
      {floating.map((f) => (
        <div
          key={f.label}
          className={`hero-float absolute z-10 hidden rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-bold lg:block ${f.pos}`}
          style={{ color: f.color, animationDelay: f.delay }}
        >
          {f.label}
        </div>
      ))}
    </div>
  );
}

export function DmHero() {
  return (
    <section className="relative overflow-hidden">
      {/* full-bleed atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "radial-gradient(rgba(15,17,17,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "linear-gradient(to bottom, black, transparent 78%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 78%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-8 md:pt-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h1 className="mt-5 text-5xl font-black leading-[1.04] tracking-tight md:text-6xl lg:text-7xl">
              2nd Best{" "}
              <span
                className="dm-gradient-text"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #fe5100, #ff4d93, #ffcc1c, #fe5100)",
                }}
              >
                Digital Marketing
              </span>
              <span className="text-navy"> Company in Nagpur</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              We tailor our content, Digital Marketing, and paid marketing
              strategies to your unique brand marketing needs, delivering
              exceptional results and continuously raising the bar to ensure
              your success.
            </p>

            {/* strategy → traffic → leads → growth */}
            {/* <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Strategy
              <ArrowRight className="size-3 text-brand" />
              Traffic
              <ArrowRight className="size-3 text-brand" />
              Leads
              <ArrowRight className="size-3 text-brand" />
              Growth
            </p> */}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#contact"
                className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
              >
                Work With Us
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#services"
                className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
              >
                Digital Marketing Services
              </Link>
            </div>

            {/* availability */}
            {/* <p className="mt-7 inline-flex items-center gap-2.5 text-[13px] font-semibold text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rating opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-rating" />
              </span>
              Booking new projects this quarter
            </p> */}
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <OrbitRings className="dm-orbit pointer-events-none absolute -inset-10 -z-10 hidden text-foreground/[0.07] lg:block" />
              <TiltCard>
                <CommandCenter />
              </TiltCard>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}