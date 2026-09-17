"use client";

import { useState } from "react";
import {
  Candy,
  Coffee,
  Mail,
  Minus,
  Plus,
  Repeat,
  ShoppingBag,
  Users,
  Zap,
} from "lucide-react";
import { type CfData } from "@/lib/coffee-and-toffee";
import { Reveal } from "@/components/reveal";

const icons = [Coffee, Repeat, ShoppingBag, Mail, Users, Zap];

type MiniQty = { coffee: number; toffee: number };
const PRICES = { coffee: 5, toffee: 10 };

function MiniWidget() {
  const [qty, setQty] = useState<MiniQty>({ coffee: 1, toffee: 0 });
  const step = (key: keyof MiniQty, delta: number) =>
    setQty((p) => {
      const n = Math.min(Math.max((p[key] || 0) + delta, 0), 9);
      return { ...p, [key]: n };
    });
  const total =
    qty.coffee * PRICES.coffee + qty.toffee * PRICES.toffee;

  return (
    <div className="cf-mini-widget">
      <div className="cf-mini-row">
        <span className="cf-mini-label">
          <Coffee size={13} strokeWidth={2.2} aria-hidden="true" />
          Coffee ₹5
        </span>
        <span className="cf-mini-stepper">
          <button type="button" aria-label="Fewer coffees" onClick={() => step("coffee", -1)}>
            <Minus size={12} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <span className="cf-mini-qty">{qty.coffee}</span>
          <button type="button" aria-label="More coffees" onClick={() => step("coffee", 1)}>
            <Plus size={12} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </span>
      </div>
      <div className="cf-mini-row">
        <span className="cf-mini-label">
          <Candy size={13} strokeWidth={2.2} aria-hidden="true" />
          Toffee ₹10
        </span>
        <span className="cf-mini-stepper">
          <button type="button" aria-label="Fewer toffees" onClick={() => step("toffee", -1)}>
            <Minus size={12} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <span className="cf-mini-qty">{qty.toffee}</span>
          <button type="button" aria-label="More toffees" onClick={() => step("toffee", 1)}>
            <Plus size={12} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </span>
      </div>
      <div className="cf-mini-foot">
        <span className="cf-mini-total-label">You&apos;ll send</span>
        <span className="cf-mini-total">₹{total}</span>
      </div>
    </div>
  );
}

export function CfFeatures({ data }: { data: CfData }) {
  const [feature, ...rest] = data.features.items;

  return (
    <section className="cf-sec cf-features">
      <div className="cf-container">
        <Reveal className="cf-head" data-ghost={data.features.number}>
          <h2 className="cf-h">{data.features.title}</h2>
          <p className="cf-lede">{data.features.body}</p>
        </Reveal>

        <div className="cf-feature-grid">
          {/* livable demo tile, spans 2 columns */}
          <Reveal className="cf-card cf-feature cf-feature--wide">
            <span className="cf-feature-label">
              <span className="cf-feature-ic">
                <Coffee size={16} strokeWidth={1.9} aria-hidden="true" />
              </span>
              {feature.name}
            </span>
            <p className="cf-card-desc">{feature.desc}</p>
            <MiniWidget />
          </Reveal>

          {rest.map((item, i) => {
            const Icon = icons[(i + 1) % icons.length];
            return (
              <Reveal key={item.name} className="cf-card cf-feature">
                <span className="cf-feature-ic">
                  <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <h3 className="cf-card-title">{item.name}</h3>
                <p className="cf-card-desc">{item.desc}</p>
                <ul className="cf-feature-bullets">
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
