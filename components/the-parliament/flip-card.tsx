"use client";

import { useState, type ReactNode } from "react";
import { Check, RotateCcw } from "lucide-react";

export function TpFlipCard({
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
      className={`tp-flip${flipped ? " is-flipped" : ""}`}
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
      <div className="tp-flip-inner">
        <div className="tp-flip-face tp-flip-front">
          <span className="tp-ic">
            {icon}
          </span>
          <h3 className="tp-card-name">{name}</h3>
          <p className="tp-card-desc">{desc}</p>
          <span className="tp-flip-hint">
            See details
            <span className="tp-flip-dot" aria-hidden="true" />
          </span>
        </div>
        <div className="tp-flip-face tp-flip-back">
          <span className="tp-flip-back-label">Inside</span>
          <h3 className="tp-card-name">{name}</h3>
          <ul className="tp-bullets">
            {bullets.map((b) => (
              <li key={b}>
                <Check size={13} strokeWidth={2.6} aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
          <span className="tp-flip-hint">
            <RotateCcw size={12} strokeWidth={2.4} aria-hidden="true" />
            Back
          </span>
        </div>
      </div>
    </div>
  );
}
