"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import {
  Blocks,
  Calendar,
  Check,
  HeartHandshake,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { bas } from "@/lib/book-a-sloth";
import { cn } from "@/lib/utils";

const tabIconMap = {
  calendar: Calendar,
  users: Users,
  wallet: Wallet,
  blocks: Blocks,
  shield: ShieldCheck,
  heart: HeartHandshake,
} as const;

export function BasFeatures() {
  const [active, setActive] = useState(0);
  const categories = bas.features.categories;
  const current = categories[active];

  const rows = [];
  for (let i = 0; i < current.items.length; i += 2) {
    rows.push(current.items.slice(i, i + 2));
  }

  const ActiveIcon = tabIconMap[current.icon as keyof typeof tabIconMap];

  return (
    <section className="sx-sec sx-features-sec">
      <div className="sx-container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="sx-h2">{bas.features.title}</h2>
        </Reveal>

        <Reveal className="mt-10">
          <div className="sx-feat">
            <div className="sx-feat-tabs" role="tablist" aria-label="Features">
              {categories.map((category, i) => {
                const Icon = tabIconMap[category.icon as keyof typeof tabIconMap];
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    id={`bas-feat-tab-${category.id}`}
                    aria-selected={i === active}
                    aria-controls="bas-feat-panel"
                    className={cn("sx-feat-tab", i === active && "is-active")}
                    style={{ "--tint": category.color } as CSSProperties}
                    onClick={() => setActive(i)}
                  >
                    <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                    <span>{category.tab}</span>
                  </button>
                );
              })}
            </div>

            <div
              id="bas-feat-panel"
              role="tabpanel"
              aria-labelledby={`bas-feat-tab-${current.id}`}
              className="sx-feat-body"
            >
              <div key={current.id} className="sx-feat-panel" style={{ "--tint": current.color } as CSSProperties}>
                <div className="sx-feat-side">
                  <span className="sx-feat-module-ic">
                    <ActiveIcon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <p className="sx-feat-module">{current.module}</p>
                  <h3 className="sx-feat-title">{current.title}</h3>
                  <p className="sx-feat-desc">{current.body}</p>
                </div>

                <div className="sx-feat-grid">
                  {rows.map((row, ri) => (
                    <div key={ri} className="sx-feat-row">
                      {row.map((item) => (
                        <div key={item} className="sx-feat-cell">
                          <span className="sx-feat-check" aria-hidden="true">
                            <Check size={13} strokeWidth={2.4} />
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}