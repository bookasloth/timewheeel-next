"use client";

import { useRef } from "react";
import { Boxes, Coins, ShieldCheck, type LucideIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ponytail: card content is a placeholder default (ownership pillars). Swap freely.
const pillars: {
  icon: LucideIcon;
  title: string;
  body: string;
  color: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "You own your data",
    body: "Your customers, revenue, and audience live in systems you control — never rented, never locked in.",
    color: "#269cef",
  },
  {
    icon: Coins,
    title: "Zero platform commissions",
    body: "Keep what you earn. No per-transaction cuts skimmed by a middleman platform.",
    color: "#ff4d93",
  },
  {
    icon: Boxes,
    title: "Portable infrastructure",
    body: "One connected foundation for bookings, payments, events, and communities — that moves with you.",
    color: "#fe5100",
  },
];

const traces = [
  { d: "M560 108 V170 Q560 180 550 180 H210 Q200 180 200 190 V300", color: "#269cef" },
  { d: "M600 124 V300", color: "#ff4d93" },
  { d: "M640 108 V170 Q640 180 650 180 H990 Q1000 180 1000 190 V300", color: "#fe5100" },
];

export function PoweredBy() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const paths = gsap.utils.toArray<SVGPathElement>(".pb-pulse");
        paths.forEach((path, i) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: `28 ${len}`, strokeDashoffset: 0 });
          gsap.to(path, {
            strokeDashoffset: -(len + 28),
            duration: 2.6,
            ease: "none",
            repeat: -1,
            delay: i * 0.5,
          });
        });
      });
      // intro
      gsap.from(".pb-card", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight md:text-4xl">
        Built on a foundation you actually{" "}
        <span className="text-brand">control</span>
      </h2>

      {/* circuit */}
      <div className="relative mt-14">
        <svg
          viewBox="0 0 1200 320"
          className="h-auto w-full"
          fill="none"
          aria-hidden
        >
          {/* dim base traces */}
          {traces.map((t, i) => (
            <path
              key={`base-${i}`}
              d={t.d}
              stroke="currentColor"
              className="text-border"
              strokeWidth={2}
            />
          ))}
          {/* animated colored pulses */}
          {traces.map((t, i) => (
            <path
              key={`pulse-${i}`}
              className="pb-pulse"
              d={t.d}
              stroke={t.color}
              strokeWidth={2.5}
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 6px ${t.color})` }}
            />
          ))}
          {/* endpoint nodes */}
          {[200, 600, 1000].map((x, i) => (
            <circle key={x} cx={x} cy={300} r={4} fill={traces[i].color} />
          ))}
          {/* chip */}
          <g>
            {Array.from({ length: 5 }).map((_, i) => (
              <rect
                key={`tp-${i}`}
                x={548 + i * 22}
                y={44}
                width={6}
                height={12}
                rx={2}
                className="fill-border"
              />
            ))}
            <rect
              x={532}
              y={56}
              width={136}
              height={52}
              rx={12}
              className="fill-card stroke-border"
              strokeWidth={1.5}
            />
            <text
              x={600}
              y={87}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize={15}
              fontWeight={600}
            >
              Powered By
            </text>
          </g>
        </svg>

        {/* cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="pb-card rounded-2xl border border-border bg-card p-7"
            >
              <span
                className="grid size-11 place-items-center rounded-xl"
                style={{ backgroundColor: `${p.color}1f`, color: p.color }}
              >
                <p.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
