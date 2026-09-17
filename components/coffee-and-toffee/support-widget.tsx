"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Candy,
  Coffee,
  HeartHandshake,
  Minus,
  Plus,
} from "lucide-react";
import { cf } from "@/lib/coffee-and-toffee";

const itemIcons = { coffee: Coffee, toffee: Candy } as const;
const prices: Record<string, number> = Object.fromEntries(
  cf.widget.items.map((i) => [i.id, i.price])
);

export function CfSupportWidget() {
  const [qty, setQty] = useState<Record<string, number>>({ ...cf.widget.defaults });
  const [coverFee, setCoverFee] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const subTotal = useMemo(
    () =>
      cf.widget.items.reduce((acc, it) => acc + (qty[it.id] || 0) * prices[it.id], 0),
    [qty]
  );
  const fee = coverFee ? Math.round(subTotal * cf.widget.feeRate) : 0;
  const total = subTotal + fee;
  const max = cf.widget.noteMax;

  const step = (id: string, delta: number) =>
    setQty((prev) => ({
      ...prev,
      [id]: Math.min(Math.max((prev[id] || 0) + delta, 0), 99),
    }));

  const onPay = () => {
    if (total <= 0 || sent) return;
    setSent(true);
    setTimeout(() => setSent(false), 2800);
  };

  return (
    <div className="cf-widget">
      <div className="cf-widget-head">
        <span className="cf-widget-badge">
          <HeartHandshake size={16} aria-hidden="true" />
        </span>
        <div>
          <h2 className="cf-widget-title">{cf.widget.name}</h2>
          <p className="cf-widget-sub">{cf.widget.sub}</p>
        </div>
      </div>

      <div className="cf-widget-items">
        {cf.widget.items.map((item) => {
          const Icon = itemIcons[item.id as keyof typeof itemIcons];
          return (
            <div className="cf-widget-item" key={item.id}>
              <div className="cf-wi-top">
                <span className="cf-wi-name">
                  <Icon size={13} strokeWidth={2.2} aria-hidden="true" />
                  {item.name}
                </span>
                <span className="cf-wi-price">
                  ₹{item.price} / {item.unit}
                </span>
              </div>
              <div className="cf-stepper">
                <button
                  type="button"
                  aria-label={`Fewer ${item.name}`}
                  onClick={() => step(item.id, -1)}
                  disabled={(qty[item.id] || 0) <= 0}
                >
                  <Minus size={14} strokeWidth={2.4} aria-hidden="true" />
                </button>
                <span className="cf-stepper-qty">{qty[item.id] || 0}</span>
                <button
                  type="button"
                  aria-label={`More ${item.name}`}
                  onClick={() => step(item.id, 1)}
                  disabled={(qty[item.id] || 0) >= 99}
                >
                  <Plus size={14} strokeWidth={2.4} aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cf-widget-fields">
        <div className="cf-field">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={cf.widget.namePlaceholder}
            aria-label={cf.widget.namePlaceholder}
          />
        </div>
        <div className="cf-field">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={cf.widget.emailPlaceholder}
            aria-label={cf.widget.emailPlaceholder}
            type="email"
          />
        </div>
        <div className="cf-field">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, max))}
            placeholder={cf.widget.messagePlaceholder}
            aria-label={cf.widget.messagePlaceholder}
            maxLength={max}
          />
          <span className="cf-field-char">
            {message.length}/{max}
          </span>
        </div>
      </div>

      <div className="cf-widget-options">
        <label className="cf-toggle">
          <span>{cf.widget.feeLabel}</span>
          <input
            type="checkbox"
            checked={coverFee}
            onChange={(e) => setCoverFee(e.target.checked)}
          />
          <span className="cf-switch" aria-hidden="true" />
        </label>
        <label className="cf-toggle">
          <span>{cf.widget.anonymousLabel}</span>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />
          <span className="cf-switch" aria-hidden="true" />
        </label>
      </div>

      <div className="cf-widget-total">
        <span className="cf-total-label">
          {coverFee
            ? `Includes ₹${fee} ${cf.widget.feeNote}`
            : `You'll send`}
        </span>
        <span className="cf-total-value">₹{total}</span>
      </div>

      <button
        type="button"
        className={`cf-btn cf-btn--gold cf-widget-cta ${sent ? "cf-widget-cta--sent" : ""}`}
        onClick={onPay}
        disabled={total <= 0}
      >
        {sent ? (
          <>
            <Check size={16} strokeWidth={2.6} aria-hidden="true" />
            {cf.widget.sent}
          </>
        ) : (
          cf.widget.cta.replace("{total}", String(total))
        )}
      </button>
      <p className="cf-widget-note">{cf.widget.demoNote}</p>
    </div>
  );
}