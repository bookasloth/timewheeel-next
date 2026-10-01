"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Bot,
  MessageCircle,
  PenLine,
  Sparkles,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { RevealHeading } from "@/components/anim/reveal-heading";

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

// The radial layout is the single source of truth. Nothing below may hard-code
// a second set of coordinates: the organised state is always this list.
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

// ── Loose / organised system ───────────────────────────────────────────────
// Every entry is a DELTA from that card's own ORBIT slot, never an absolute
// position. That is what keeps the organised state pixel-identical to the
// original design and makes the scatter scale down automatically on narrow
// viewports instead of pushing cards out of the section.
//
// `bow` bends the thread away from its own direction of travel, so a slack
// thread reads as slack. The sign alternates per card: curving every thread
// the same rotational way would read as a deliberate pinwheel, whereas mixed
// signs read as eight individually loose threads.
//
// `gap` holds the thread back from the hub. Every value clears the 104px inner
// ring, so in the loose state nothing touches the middle logo and the network
// reads as shattered rather than gathered. At t=0 both `bow` and `gap` are 0,
// which collapses the curve onto the midpoint and the start point onto the
// exact centre - a dead-straight line from the hub, identical to the original
// <line>.
const LOOSE: Record<
  string,
  { dx: number; dy: number; rot: number; bow: number; gap: number }
> = {
  Content: { dx: -22, dy: -14, rot: -2.6, bow: 34, gap: 128 },
  "Google Ads": { dx: 6, dy: -20, rot: 1.8, bow: -28, gap: 118 },
  Social: { dx: 24, dy: -10, rot: 2.4, bow: 40, gap: 136 },
  Email: { dx: 20, dy: 10, rot: -1.6, bow: -32, gap: 124 },
  Analytics: { dx: 22, dy: 16, rot: -2.2, bow: 26, gap: 112 },
  "Meta Ads": { dx: -20, dy: 18, rot: 2.6, bow: -36, gap: 132 },
  SEO: { dx: -22, dy: 4, rot: -1.4, bow: 30, gap: 108 },
  Conversions: { dx: 2, dy: 24, rot: 1.5, bow: -24, gap: 140 },
};

const SETTLE = 1.05; // seconds to pull the channels together
const UNSETTLE = 0.9; // seconds to let them drift back
const FLOAT = 5.2; // seconds per drift cycle
const DRIFT_X = 7;
const DRIFT_Y = -6;

// Scatter budget. The two layouts have completely different tolerances:
//   - Radial (md+): cards sit hundreds of pixels apart, so the full offset is safe.
//   - Grid (<md): cards are neighbours across an 8px gutter (gap-2), so the
//     offset is capped at half the gutter. Two cards drifting toward each other
//     then meet exactly at the gutter instead of overlapping. The idle drift is
//     budgeted the same way, since it is an offset too.
const MD_BREAKPOINT = 768;
const GUTTER = 8;
const MAX_OFFSET = 24;
const GRID_SCALE = GUTTER / (2 * MAX_OFFSET);

// Dash rhythm: 3/5 is the original look and is what the organised state
// returns to; 2/12 breaks the thread into visibly separate fragments, which is
// what sells the shattered reading while the system is loose.
const DASH_ORGANISED: [number, number] = [3, 5];
const DASH_LOOSE: [number, number] = [2, 12];

/**
 * Quadratic thread from the hub out to a card.
 * `bow` bends it sideways, `innerGap` holds its start back from the centre.
 */
function threadPath(dx: number, dy: number, bow: number, innerGap: number) {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const x1 = CENTER + ux * innerGap;
  const y1 = CENTER + uy * innerGap;
  const x2 = CENTER + dx;
  const y2 = CENTER + dy;
  const nx = -uy;
  const ny = ux;
  const k = 0.5 * bow;
  return `M ${x1} ${y1} Q ${(x1 + x2) / 2 + nx * k} ${(y1 + y2) / 2 + ny * k} ${x2} ${y2}`;
}

function looseOf(name: string, scale: number) {
  const l = LOOSE[name] ?? { dx: 0, dy: 0, rot: 0, bow: 0, gap: 0 };
  return {
    dx: l.dx * scale,
    dy: l.dy * scale,
    rot: l.rot * scale,
    bow: l.bow * scale,
    gap: l.gap * scale,
  };
}

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
  const [organized, setOrganized] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const threadsRef = useRef<Record<string, SVGPathElement | null>>({});
  // Imperative handle so the click handler can drive the tween without the
  // tween living in render. `t` is the one animated scalar: 1 = loose,
  // 0 = organised.
  const driveRef = useRef<((to: number, duration: number) => void) | null>(null);

  const prefersReduced = useCallback(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      const reduced = prefersReduced();
      // Scoped to the whole section body so BOTH layouts are driven: the
      // mobile grid sits outside the desktop canvas, and both need the same
      // interaction. `div[data-node]` also keeps the SVG thread paths out of
      // the card list.
      const slotEls = Array.from(stage.querySelectorAll<HTMLElement>("div[data-node]"));
      const driftEls = Array.from(stage.querySelectorAll<HTMLElement>("[data-drift-node]"));
      const threads = ORBIT.map((s) => threadsRef.current[s.name]).filter(
        (el): el is SVGPathElement => Boolean(el),
      );

      // Layout-aware scatter budget. Below the md breakpoint the section renders
      // the two-column grid instead of the radial canvas, and the grid's gutter
      // is what limits the offset, so the full desktop delta is not safe there.
      const scale = () => (window.innerWidth < MD_BREAKPOINT ? GRID_SCALE : 1);
      const driftX = () => DRIFT_X * s;
      const driftY = () => DRIFT_Y * s;
      let s = scale();

      const state = { t: 1 };

      // Thread geometry always reads back off the ORBIT table, so a card can
      // never drift away from its own connector.
      const orbitOf = (el: HTMLElement | SVGPathElement) =>
        ORBIT.find((o) => o.name === el.dataset.node);
      const threadsAt = (t: number) => {
        // Dash rhythm is interpolated numerically so it is continuous mid
        // animation; both ends are exact.
        const dash =
          DASH_ORGANISED[0] + (DASH_LOOSE[0] - DASH_ORGANISED[0]) * t;
        const rest =
          DASH_ORGANISED[1] + (DASH_LOOSE[1] - DASH_ORGANISED[1]) * t;
        const rhythm = `${Math.round(dash * 100) / 100} ${Math.round(rest * 100) / 100}`;
        for (const el of threads) {
          const o = orbitOf(el);
          if (!o) continue;
          const l = looseOf(o.name, s);
          el.setAttribute(
            "d",
            threadPath(o.dx + l.dx * t, o.dy + l.dy * t, l.bow * t, l.gap * t),
          );
          el.style.strokeDasharray = rhythm;
        }
      };

      // Card transforms only. Threads are deliberately NOT touched here: they
      // have their own, faster tween in `settleThreads` so the slack visibly
      // pulls taut just after the card lands. Driving both from here would let
      // the slower card tween overwrite that every frame.
      const renderCards = (t: number) => {
        for (const el of slotEls) {
          const l = looseOf(el.dataset.node ?? "", s);
          gsap.set(el, { x: l.dx * t, y: l.dy * t, rotation: l.rot * t });
        }
      };

      // Instant, non-animated placement of both layers (mount, resize, and the
      // reduced-motion path, where nothing should travel).
      const render = (t: number) => {
        renderCards(t);
        threadsAt(t);
      };

      if (reduced) {
        // No drift, no travel: a plain state change between the two layouts.
        driveRef.current = (to) => render(to);
        render(1);
        return;
      }

      // Idle drift lives on its own inner layer so it composes with the
      // loose-offset layer instead of fighting it for the same `x`/`y`.
      const drift = gsap.to(driftEls, {
        x: driftX(),
        y: driftY(),
        scaleX: 1.02,
        scaleY: 0.98,
        duration: FLOAT,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.35, from: "center" },
      });

      // A thread that sags because the thread is slack, not because the thread
      // is shorter: the live bow trails the settle by ~120ms, so the connector
      // visibly pulls taut after the card has landed. Same signature in both
      // directions, and always overwrites so rapid clicks cannot desync it.
      const settleThreads = (to: number) => {
        const from = to === 0 ? 1 : 0;
        const driver = { t: from };
        gsap.to(driver, {
          t: to,
          duration: to === 0 ? 0.62 : 0.5,
          ease: to === 0 ? "power3.out" : "power2.inOut",
          overwrite: true,
          onUpdate: () => threadsAt(driver.t),
        });
      };

      const resetDrift = () => {
        const next = scale();
        const grew = next > s;
        s = next;
        drift.pause(0);
        gsap.fromTo(
          driftEls,
          { x: driftX(), y: driftY(), scaleX: 1.02, scaleY: 0.98 },
          {
            x: grew ? driftX() : 0,
            y: grew ? 0 : driftY(),
            scaleX: 1,
            scaleY: 1,
            duration: 0.3,
            ease: "power2.out",
            stagger: { each: 0.35, from: "center" },
            overwrite: true,
          },
        );
      };

      const settle = (to: number, duration: number) => {
        gsap.to(state, {
          t: to,
          duration,
          ease: to === 0 ? "back.out(1.4)" : "back.in(1.05)",
          overwrite: true,
          onUpdate: () => renderCards(state.t),
        });
        settleThreads(to);
      };

      driveRef.current = settle;

      // Start loose, and start correct if the viewport already changed size
      // between server render and hydration.
      render(1);
      resetDrift();

      // Tighten as the section arrives, but never auto-organise: the cards
      // always settle back to their loose state once the section is on screen.
      const onView = () => {
        const r = stage.getBoundingClientRect();
        if (r.top > window.innerHeight || r.bottom < 0) return;
        if (Math.abs(s - scale()) > 0.001) {
          const t = state.t;
          s = scale();
          render(t);
        }
        resetDrift();
      };
      window.addEventListener("scroll", onView, { passive: true });
      window.addEventListener("resize", onView);

      return () => {
        window.removeEventListener("scroll", onView);
        window.removeEventListener("resize", onView);
        drift.kill();
        gsap.killTweensOf(state);
        gsap.set(slotEls, { clearProps: "transform" });
      };
    },
    { scope: stageRef },
  );

  const toggle = () => {
    const next = !organized;
    setOrganized(next);
    driveRef.current?.(next ? 0 : 1, next ? SETTLE : UNSETTLE);
    if (!prefersReduced()) {
      // Pulse the logo inside whichever centre control is actually visible.
      const stage = stageRef.current;
      const visible = Array.from(
        stage?.querySelectorAll<HTMLElement>('button[aria-label="Organize marketing system"] img') ?? [],
      ).find((img) => img.offsetParent !== null);
      if (visible) {
        gsap.fromTo(
          visible,
          { scale: 1 },
          {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            overwrite: "auto",
          },
        );
      }
    }
  };

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
      <div ref={stageRef} className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 md:pb-24 md:pt-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <RevealHeading as="h2" className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Every Channel, Working Toward One Goal
        </RevealHeading>
        <p className="mt-4 text-muted-foreground md:text-lg">
          SEO, paid ads, social, content, email, and analytics, connected into
          a single growth system around your brand.
        </p>
      </Reveal>

      <Reveal stagger className="mt-6 grid grid-cols-2 gap-2 md:hidden">
        {ORBIT.map(({ name }) => {
          if (name === "Conversions") return null;
          return (
            // The outer div is what `Reveal stagger` animates. The loose
            // offset lives one level deeper so the entrance tween (y: 24) and
            // the scatter tween never fight over the same property.
            <div key={name}>
              <div data-node={name}>
                <div data-drift-node={name}>
                  <NodeCard
                    name={name}
                    lit={active === name}
                    onEnter={() => setActive(name)}
                    onLeave={() => setActive(null)}
                  />
                </div>
              </div>
            </div>
          );
        })}

        <div className="col-span-2 mt-3 flex flex-col items-center">
          <ChevronDown aria-hidden className="mb-2 size-4 text-border" />
          <button
            type="button"
            onClick={toggle}
            onMouseEnter={() => setActive(null)}
            onMouseLeave={() => setActive(null)}
            aria-pressed={organized}
            aria-label="Organize marketing system"
            className={cn(
              "flex min-h-[104px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[16px] border border-white/15 px-5 py-5 text-center pm-panel",
              "transition-[border-color,box-shadow] duration-500 outline-none",
              "hover:border-white/30 focus-visible:border-brand/70 focus-visible:ring-2 focus-visible:ring-brand/50",
              organized && "border-brand/40 shadow-[0_0_34px_-10px_rgba(255,204,28,0.55)]",
            )}
          >
            <Image
              src="/timewheel-logo.png"
              alt="Timewheel"
              width={80}
              height={80}
              className="size-20 object-contain"
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
              The system
            </span>
          </button>
        </div>

        <div className="col-span-2 mt-3 flex flex-col items-center">
          <ChevronDown aria-hidden className="mb-2 size-4 text-border" />
          <div className="w-full">
            <div data-node="Conversions">
              <div data-drift-node="Conversions">
                <NodeCard
                  name="Conversions"
                  lit={active === "Conversions"}
                  onEnter={() => setActive("Conversions")}
                  onLeave={() => setActive(null)}
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal stagger className="relative mx-auto mt-4 hidden md:block">
        <div className="relative mx-auto h-[660px] w-[660px]">
          <svg
            aria-hidden
            viewBox={`0 0 ${CANVAS} ${CANVAS}`}
            fill="none"
            className="absolute inset-0 h-full w-full overflow-visible"
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
              const l = LOOSE[name] ?? { dx: 0, dy: 0, bow: 0, gap: 0 };
              return (
                <path
                  key={name}
                  data-node={name}
                  ref={(el) => {
                    threadsRef.current[name] = el;
                  }}
                  d={threadPath(dx + l.dx, dy + l.dy, l.bow, l.gap)}
                  style={{
                    stroke: lit ? accent : isConversion ? "#ffcc1c" : "rgba(255,255,255,0.14)",
                    strokeWidth: lit ? 1.6 : 1,
                    opacity: lit ? 1 : isConversion ? 0.6 : 0.9,
                    strokeDasharray: DASH_LOOSE.join(" "),
                    transition:
                      "stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease",
                  }}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <button
              type="button"
              onClick={toggle}
              onMouseEnter={() => setActive(null)}
              onMouseLeave={() => setActive(null)}
              aria-pressed={organized}
              aria-label="Organize marketing system"
              className={cn(
                "flex min-h-[104px] w-[144px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[16px] border border-white/15 px-5 py-5 text-center pm-panel",
                "transition-[border-color,box-shadow] duration-500 outline-none",
                "hover:border-white/30 focus-visible:border-brand/70 focus-visible:ring-2 focus-visible:ring-brand/50",
                organized && "border-brand/40 shadow-[0_0_38px_-8px_rgba(255,204,28,0.5)]",
              )}
            >
              <Image
                src="/timewheel-logo.png"
                alt="Timewheel"
                width={80}
                height={80}
                className="size-20 object-contain"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
                The system
              </span>
            </button>
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
                <div data-node={name}>
                  <div data-drift-node={name}>
                    <NodeCard
                      name={name}
                      lit={lit}
                      onEnter={() => setActive(name)}
                      onLeave={() => setActive(null)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
      </div>
    </section>
  );
}
