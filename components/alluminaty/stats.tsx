"use client";

import { useEffect, useRef, useState } from "react";
import { az } from "@/lib/alluminaty";
import { Reveal } from "@/components/reveal";

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

function StatValue({
  value,
  label,
  tag,
}: {
  value: string;
  label: string;
  tag: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const raw = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[\d]/g, "").trim();
  const count = useCountUp(raw, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="az-stat" ref={ref}>
      <span className="az-stat-tag">{tag}</span>
      <strong className="az-stat-value">
        {active ? count : 0}
        {suffix}
      </strong>
      <span className="az-stat-label">{label}</span>
    </div>
  );
}

export function AzStats() {
  return (
    <section className="az-stats">
      <div className="az-container">
        <Reveal className="az-stats-grid" stagger>
          {az.stats.map((stat) => (
            <StatValue
              key={stat.label}
              value={stat.value}
              label={stat.label}
              tag={stat.label.split(" ")[0].toUpperCase()}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}