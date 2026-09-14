"use client";

import { useEffect, useRef, useState } from "react";

type Tokens = {
  before: string;
  after: string;
  number: number | null;
  decimals: number;
};

function parseValue(value: string): Tokens {
  const m = value.match(/(\d[\d,]*)(\.\d+)?/);
  if (!m || m.index == null) {
    return { before: value, after: "", number: null, decimals: 0 };
  }
  const integer = m[1].replace(/,/g, "");
  const fraction = m[2] ?? "";
  return {
    before: value.slice(0, m.index),
    after: value.slice(m.index + m[0].length),
    number: parseFloat(integer + fraction),
    decimals: fraction.length > 0 ? fraction.length - 1 : 0,
  };
}

function formatNumber(n: number, decimals: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function CountUpStat({
  value,
  accent,
  className,
}: {
  value: string;
  accent: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(() => {
    const t = parseValue(value);
    return t.number == null
      ? t.before + t.after
      : t.before + formatNumber(0, t.decimals) + t.after;
  });

  useEffect(() => {
    const t = parseValue(value);
    const el = ref.current;
    if (!el) return;

    if (t.number == null) {
      setText(value);
      return;
    }

    let raf = 0;
    let started = false;

    const run = () => {
      const duration = 1200;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setText(t.before + formatNumber(t.number! * eased, t.decimals) + t.after);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value]);

  return (
    <span ref={ref} className={className} style={{ color: accent }}>
      {text}
    </span>
  );
}