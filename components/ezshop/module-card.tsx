"use client";

import { useRef, type MouseEvent } from "react";
import { Boxes, Check, CreditCard, MessageCircle, Receipt, Store, Truck } from "lucide-react";

const iconMap = {
  store: Store,
  box: Boxes,
  card: CreditCard,
  receipt: Receipt,
  truck: Truck,
  message: MessageCircle,
} as const;

export type ModuleIcon = keyof typeof iconMap;

type Props = {
  index: number;
  name: string;
  desc: string;
  bullets: string[];
  icon: ModuleIcon;
};

// Which edge of the card the pointer is nearest to, returned as the offset the
// reveal panel should slide in from ([x%, y%]).
function entryOffset(el: HTMLElement, clientX: number, clientY: number): [number, number] {
  const r = el.getBoundingClientRect();
  const x = clientX - r.left;
  const y = clientY - r.top;
  const top = y;
  const bottom = r.height - y;
  const left = x;
  const right = r.width - x;
  const min = Math.min(top, bottom, left, right);
  if (min === top) return [0, -100];
  if (min === bottom) return [0, 100];
  if (min === left) return [-100, 0];
  return [100, 0];
}

export function EzModuleCard({ index, name, desc, bullets, icon }: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const Icon = iconMap[icon];

  // The panel is parked at the entry edge without a transition, then released
  // so it slides in from whichever side the cursor came from.
  const onEnter = (e: MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    const reveal = revealRef.current;
    if (!card || !reveal) return;
    const [ox, oy] = entryOffset(card, e.clientX, e.clientY);
    reveal.style.transition = "none";
    reveal.style.transform = `translate(${ox}%, ${oy}%)`;
    reveal.getBoundingClientRect();
    reveal.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
    reveal.style.transform = "translate(0, 0)";
  };

  const onLeave = (e: MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    const reveal = revealRef.current;
    if (!card || !reveal) return;
    const [ox, oy] = entryOffset(card, e.clientX, e.clientY);
    reveal.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0s";
    reveal.style.transform = `translate(${ox}%, ${oy}%)`;
  };

  return (
    <article
      ref={cardRef}
      className="ez-module"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="ez-module-index" aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>
      <span className="ez-ic">
        <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <h3 className="ez-card-title">{name}</h3>
      <p className="ez-card-desc">{desc}</p>

      {/* Reveal card: the checklist lives here and slides in from the cursor
          side. The index/icon/title are decorative repeats of the front card,
          so only the list is exposed to assistive tech. */}
      <div ref={revealRef} className="ez-module-reveal">
        <h3 className="ez-card-title" aria-hidden="true">
          {name}
        </h3>
        <ul className="ez-ticks">
          {bullets.map((b) => (
            <li key={b}>
              <Check size={14} strokeWidth={2.4} aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
