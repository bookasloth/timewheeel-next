"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { type CfData } from "@/lib/coffee-and-toffee";

function CountUp({
  value,
  prefix = "",
  suffix = "",
  staticText,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  staticText?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value]);

  if (staticText) {
    return (
      <span ref={ref}>
        {prefix}
        {staticText}
        {suffix}
      </span>
    );
  }
  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function CfStats({ data }: { data: CfData }) {
  return (
    <section className="cf-sec cf-stats">
      <div className="cf-container">
        <div className="cf-stats-grid">
          {data.stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="cf-stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            >
              <span className="cf-stat-value">
                <CountUp
                  value={s.value}
                  prefix={"prefix" in s ? s.prefix : undefined}
                  suffix={"suffix" in s ? s.suffix : undefined}
                  staticText={"static" in s ? s.static : undefined}
                />
              </span>
              <span className="cf-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
