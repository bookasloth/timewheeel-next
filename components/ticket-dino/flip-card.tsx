"use client";

import { useState, type ReactNode } from "react";
import { Check, RotateCcw } from "lucide-react";

export function TdFlipCard({
  icon,
  name,
  desc,
  bullets,
}: {
  icon: ReactNode;
  name: string;
  desc: string;
  bullets: string[];
}) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((v) => !v);

  return (
    <div
      className={`td-flip${flipped ? " is-flipped" : ""}`}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${name}. ${flipped ? "Show summary" : "Show details"}`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <div className="td-flip-inner">
        <div className="td-flip-face td-flip-front">
          <span className="td-ic">{icon}</span>
          <h3 className="td-card-name">{name}</h3>
          <p className="td-card-desc">{desc}</p>
          <div className="td-flip-stub">
            <span className="td-flip-barcode" aria-hidden="true" />
            <span className="td-flip-hint">
              See details
              <span className="td-flip-dot" aria-hidden="true" />
            </span>
          </div>
        </div>
        <div className="td-flip-face td-flip-back">
          <span className="td-flip-back-label">Inside</span>
          <h3 className="td-card-name">{name}</h3>
          <ul className="td-bullets">
            {bullets.map((b) => (
              <li key={b}>
                <Check size={13} strokeWidth={2.6} aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
          <div className="td-flip-stub">
            <span className="td-flip-barcode" aria-hidden="true" />
            <span className="td-flip-hint">
              <RotateCcw size={12} strokeWidth={2.4} aria-hidden="true" />
              Back
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
