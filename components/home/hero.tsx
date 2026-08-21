"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type Word = {
  key: string;
  color: string;
  label: string;
  img: string;
};

// ponytail: /hero/*.svg are placeholder screenshots — swap for real product shots.
const words: Word[] = [
  { key: "bookings", color: "#fe5100", label: "Bookings", img: "/hero/bookings.jpg" },
  { key: "payments", color: "#4ab765", label: "Payments", img: "/hero/payments.jpg" },
  { key: "events", color: "#269cef", label: "Events", img: "/hero/events.jpg" },
  { key: "communities", color: "#ff4d93", label: "Communities", img: "/hero/communities.jpg" },
];

const INTERVAL = 2000; // 2s per word → 8s full cycle

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  // auto-cycle every 2s; restarts when user picks a word (resetKey)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % words.length),
      INTERVAL,
    );
    return () => clearInterval(id);
  }, [resetKey]);

  function pick(i: number) {
    setActive(i);
    setResetKey((k) => k + 1);
  }

  useGSAP(
    () => {
      gsap.from(".hero-anim", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 pt-6 pb-12">
      <div className="grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-2">
        {/* left */}
        <div className="flex flex-col justify-center p-9 md:p-14">
          <h1
            role="tablist"
            aria-label="What you can run on Timewheel"
            className="hero-anim text-4xl font-extrabold leading-[1.15] md:text-5xl"
          >
            Run{" "}
            {words.map((w, i) => {
              const on = active === i;
              return (
                <span key={w.key}>
                  <button
                    onClick={() => pick(i)}
                    role="tab"
                    aria-selected={on}
                    className="relative inline-block cursor-pointer rounded-sm px-1.5 pb-1 align-baseline transition-transform duration-200 hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    style={{
                      color: w.color,
                      opacity: on ? 1 : 0.4,
                      backgroundColor: on ? `${w.color}22` : "transparent",
                    }}
                  >
                    {w.key}
                    {on && (
                      <span
                        key={`${active}-${resetKey}`}
                        aria-hidden
                        className="absolute inset-x-1 bottom-0.5 h-[3px] origin-left rounded-full motion-reduce:scale-x-100"
                        style={{
                          backgroundColor: w.color,
                          animation: "tw-word-progress 2s linear forwards",
                        }}
                      />
                    )}
                  </button>
                  {i < words.length - 2 ? ", " : i === words.length - 2 ? " & " : ""}
                </span>
              );
            })}{" "}
            <span className="text-foreground">on systems you own.</span>
          </h1>

          <p className="hero-anim mt-5 max-w-md text-base text-muted-foreground md:text-lg">
            One connected platform — no fragmented SaaS tools, no platform
            commissions, no rented infrastructure.
          </p>

          <div className="hero-anim mt-6">
            <Link
              href="#ecosystem"
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-9 py-4 text-base font-semibold text-brand-foreground"
            >
              Explore the Ecosystem
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* right — real image, crossfades (zoom in/out) with active word */}
        <div className="relative flex items-center justify-center border-t border-border bg-secondary/40 p-9 md:border-l md:border-t-0 md:p-14">
          <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card">
            {words.map((w, i) => {
              const on = active === i;
              return (
                <Image
                  key={w.key}
                  src={w.img}
                  alt={w.label}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover transition-all duration-[600ms] ease-out motion-reduce:transition-none"
                  style={{
                    opacity: on ? 1 : 0,
                    transform: on ? "scale(1)" : "scale(1.06)",
                    pointerEvents: "none",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
