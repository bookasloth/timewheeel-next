"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Heart, Minus, Plus, Send, Sparkles } from "lucide-react";
import { creatorUi } from "@/lib/creator";

const EASE = [0.22, 1, 0.36, 1] as const;

type PopBit = {
  left: string;
  delay: number;
  size: number;
  rot: number;
  c: string;
};

function MiniProfile() {
  const d = creatorUi.demo;
  const reduce = useReducedMotion();
  const [qty, setQty] = useState<Record<string, number>>({ coffee: 1, toffee: 0 });
  const [patron, setPatron] = useState(false);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const [pop, setPop] = useState<PopBit[] | null>(null);

  const price = (id: string) => d.tiers.find((t) => t.id === id)?.price ?? 0;
  const total =
    (qty.coffee || 0) * price("coffee") +
    (qty.toffee || 0) * price("toffee") +
    (patron ? price("patron") : 0);
  const pct = Math.round((d.goalNow / d.goalMax) * 100);

  const step = (id: string, delta: number) =>
    setQty((p) => {
      const n = Math.min(Math.max((p[id] || 0) + delta, 0), 9);
      return { ...p, [id]: n };
    });

  const send = () => {
    if (sent) return;
    setSent(true);
    if (reduce) return;
    const colors = ["#E0572E", "#E3A93C", "#BE8326", "#7B4A22", "#F2B8A0"];
    setPop(
      Array.from({ length: 26 }, (_, i) => ({
        left: `${8 + Math.random() * 84}%`,
        delay: Math.random() * 0.25,
        size: 6 + Math.random() * 8,
        rot: -40 + Math.random() * 80,
        c: colors[i % colors.length],
      })),
    );
  };

  return (
    <div className="ct-profile">
      <div className="ct-profile-glow" aria-hidden="true" />
      <div className="ct-profile-head">
        <span className="ct-profile-av">Å</span>
        <div>
          <p className="ct-profile-name">
            {d.name} <em className="ct-em">{d.handle}</em>
          </p>
          <p className="ct-profile-byline">{d.byline}</p>
        </div>
      </div>

      <div className="ct-goal">
        <div className="ct-goal-row">
          <span>October goal</span>
          <span>
            ₹{d.goalNow.toLocaleString("en-IN")} of ₹{d.goalMax.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="ct-goal-bar">
          <span className="ct-goal-fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="ct-goal-meta">{d.supporters} supporters · {pct}% to goal</p>
      </div>

      <div className="ct-tier-list">
        {d.tiers.map((t) =>
          t.id === "patron" ? (
            <button
              key={t.id}
              type="button"
              className={`ct-patron ${patron ? "ct-patron--on" : ""}`}
              onClick={() => setPatron((v) => !v)}
            >
              <Heart size={14} strokeWidth={2.2} aria-hidden="true" />
              <span className="ct-patron-label">Become a Patron</span>
              <span className="ct-patron-price">₹{t.price}<em>/mo</em></span>
            </button>
          ) : (
            <div key={t.id} className="ct-tier-row">
              <span className="ct-tier-label">
                <span className="ct-tier-emoji">{t.emoji}</span> {t.name} · ₹{t.price}
              </span>
              <span className="ct-stepper">
                <button type="button" aria-label={`Fewer ${t.name}s`} onClick={() => step(t.id, -1)}>
                  <Minus size={12} strokeWidth={2.4} aria-hidden="true" />
                </button>
                <span className="ct-stepper-qty">{qty[t.id] || 0}</span>
                <button type="button" aria-label={`More ${t.name}s`} onClick={() => step(t.id, 1)}>
                  <Plus size={12} strokeWidth={2.4} aria-hidden="true" />
                </button>
              </span>
            </div>
          ),
        )}
      </div>

      <label className="ct-note">
        <span className="sr-only">Note</span>
        <textarea
          rows={2}
          maxLength={d.noteMax}
          placeholder={d.messagePlaceholder}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <span className="ct-note-count">
          {msg.length}/{d.noteMax}
        </span>
      </label>

      <div className="ct-send-wrap">
        {sent && pop ? (
          <div className="ct-confetti" aria-hidden="true">
            {pop.map((p, i) => (
              <motion.span
                key={i}
                className="ct-confetti-bit"
                style={{ left: p.left, width: p.size, height: p.size, background: p.c }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{ y: 170, opacity: 0, rotate: p.rot }}
                transition={{ duration: 0.9, ease: EASE, delay: p.delay }}
              />
            ))}
          </div>
        ) : null}
        <button
          type="button"
          className={`ct-btn ct-btn--primary ct-send ${sent ? "ct-send--done" : ""}`}
          onClick={send}
        >
          {sent ? (
            <>
              <Heart size={15} strokeWidth={2.4} aria-hidden="true" /> {d.sent}
            </>
          ) : (
            <>
              <Send size={15} strokeWidth={2.2} aria-hidden="true" />
              {d.send.replace("{total}", String(total))}
            </>
          )}
        </button>
      </div>
      {!sent ? (
        <p className="ct-demo-note">A live idea, checkout connects to Razorpay in the real product.</p>
      ) : null}
    </div>
  );
}

export function CtHero() {
  const h = creatorUi.hero;
  return (
    <section className="ct-hero">
      <div className="ct-hero-glow ct-hero-glow--a" aria-hidden="true" />
      <div className="ct-hero-glow ct-hero-glow--b" aria-hidden="true" />

      <div className="ct-wrap ct-hero-inner">
        <div className="ct-hero-copy">
          <p className="ct-eyebrow">
            <span className="ct-eyebrow-dot" aria-hidden="true" /> {h.eyebrow}
          </p>
          <h1 className="ct-hero-title">
            <span className="ct-hero-line">{h.titleTop}</span>
            <span className="ct-hero-line ct-em">{h.titleEm}</span>
          </h1>
          <p className="ct-hero-body">{h.body}</p>
          <div className="ct-hero-actions">
            <a href={h.primaryHref} className="ct-btn ct-btn--primary">
              {h.primary}
              <ArrowUpRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </a>
            <a href={h.secondaryHref} className="ct-btn ct-btn--ghost">
              {h.secondary}
            </a>
          </div>
          <p className="ct-hero-proof">
            <Sparkles size={14} strokeWidth={2} aria-hidden="true" /> {h.proof}
          </p>
        </div>

        <div className="ct-hero-stage">
          <span className="ct-chip ct-chip--float ct-chip--top" aria-hidden="true">
            ☕ Ananya just supported Aarohi
          </span>
          <span className="ct-chip ct-chip--float ct-chip--bottom" aria-hidden="true">
            ✦ ₹12.4L raised this season
          </span>
          <MiniProfile />
        </div>
      </div>

      <div className="ct-wrap">
        <div className="ct-hero-stats">
          {h.stats.map((s) => (
            <div key={s.label} className="ct-stat">
              <span className="ct-stat-value">
                {"prefix" in s ? s.prefix : ""}
                {"static" in s ? s.static : s.value.toLocaleString("en-IN")}
                {"suffix" in s ? s.suffix : ""}
              </span>
              <span className="ct-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}