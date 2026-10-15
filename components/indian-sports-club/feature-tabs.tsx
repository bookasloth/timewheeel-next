"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CalendarDays, Check, ClipboardList, Crown, MapPin, ShieldCheck, Trophy, Users } from "lucide-react";

const iconMap = {
  fixtures: Trophy,
  teams: Users,
  tournaments: CalendarDays,
  membership: Crown,
  bookings: MapPin,
  admin: ShieldCheck,
} as const;

const AUTOPLAY_MS = 3000;

type Feature = { icon: string; name: string; desc: string; bullets: string[] };

export function IscFeatureTabs({ items }: { items: Feature[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const current = items[active];
  const ActiveIcon = iconMap[current.icon as keyof typeof iconMap] ?? ClipboardList;

  const move = useCallback(
    (next: number) => {
      const i = (next + items.length) % items.length;
      setActive(i);
      tabRefs.current[i]?.focus();
    },
    [items.length],
  );

  useEffect(() => {
    if (paused || reduced || items.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduced, items.length]);

  return (
    <div
      className="isc-tabs"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="isc-tabs-nav" role="tablist" aria-orientation="vertical" aria-label="What's inside">
        {items.map((item, i) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? ClipboardList;
          const isActive = i === active;
          return (
            <button
              key={item.name}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`isc-tab-${i}`}
              aria-selected={isActive}
              aria-controls={`isc-panel-${i}`}
              tabIndex={isActive ? 0 : -1}
              className={`isc-tab${isActive ? " is-active" : ""}`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  move(active + 1);
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  move(active - 1);
                } else if (e.key === "Home") {
                  e.preventDefault();
                  move(0);
                } else if (e.key === "End") {
                  e.preventDefault();
                  move(items.length - 1);
                }
              }}
            >
              <span className="isc-tab-ic">
                <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <span className="isc-tab-name">{item.name}</span>
            </button>
          );
        })}
      </div>

      <div
        key={active}
        className="isc-tab-panel"
        role="tabpanel"
        id={`isc-panel-${active}`}
        aria-labelledby={`isc-tab-${active}`}
      >
        <span className="isc-panel-ic">
          <ActiveIcon size={26} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <h3 className="isc-panel-name">{current.name}</h3>
        <p className="isc-panel-desc">{current.desc}</p>
        <ul className="isc-panel-bullets">
          {current.bullets.map((b) => (
            <li key={b}>
              <Check size={14} strokeWidth={2.6} aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
