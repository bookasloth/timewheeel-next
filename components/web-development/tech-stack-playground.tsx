"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import {
  siNextdotjs, siReact, siTypescript, siJavascript, siTailwindcss, siHtml5, siCss, siSass, siVuedotjs,
  siSvelte, siAstro, siVite,
  siNodedotjs, siExpress, siPython, siPhp, siLaravel, siGraphql, siPrisma,
  siPostgresql, siMysql, siMongodb, siRedis, siSupabase, siFirebase,
  siWordpress, siShopify, siWoocommerce, siStripe, siSanity,
  siVercel, siCloudflare, siNetlify, siDocker, siGit, siGithub,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

// The tech pool, ordered foundation -> top level. Index 0 sits at the base of
// the wall; later entries stack on top, like masonry. Each pill shows the brand
// logo + name with a brand-coloured outline (no solid fill), from simple-icons.
const ICONS: SimpleIcon[] = [
  // foundation: core languages + version control
  siHtml5, siCss, siJavascript, siSass, siGit, siPhp, siPython,
  // runtime + data
  siNodedotjs, siExpress, siMysql, siPostgresql, siMongodb, siRedis, siFirebase, siSupabase,
  // typed layer + APIs + frameworks
  siTypescript, siGraphql, siPrisma, siReact, siVuedotjs, siSvelte, siLaravel,
  // meta-frameworks + tooling
  siNextdotjs, siAstro, siVite, siTailwindcss,
  // CMS + commerce
  siWordpress, siWoocommerce, siShopify, siSanity, siStripe,
  // platforms + infra (top level)
  siDocker, siCloudflare, siNetlify, siVercel, siGithub,
];

const PILL_H = 40;
type Pill = { id: string; name: string; color: string; path: string; w: number };
const PILLS: Pill[] = ICONS.map((ic) => ({
  id: ic.slug,
  name: ic.title,
  color: `#${ic.hex}`,
  path: ic.path,
  w: Math.max(96, Math.round(ic.title.length * 8.6 + 58)),
}));

// Masonry wall: pack pills into rows (foundation first), stack the rows bottom
// -> top, and right-align every row so the wall sits against the right edge.
function wallTargets(W: number, H: number): { x: number; y: number }[] {
  const gapX = 10;
  const gapY = 8;
  const rowStep = PILL_H + gapY;
  const rightX = W - 18;
  const maxRow = Math.min(W - 32, 660);

  const rows: number[][] = [];
  let cur: number[] = [];
  let curW = 0;
  PILLS.forEach((p, i) => {
    const add = p.w + (cur.length ? gapX : 0);
    if (curW + add > maxRow && cur.length) {
      rows.push(cur);
      cur = [];
      curW = 0;
    }
    cur.push(i);
    curW += p.w + (cur.length > 1 ? gapX : 0);
  });
  if (cur.length) rows.push(cur);

  const out: { x: number; y: number }[] = [];
  const baseY = H - 22 - PILL_H / 2;
  rows.forEach((row, rIdx) => {
    const y = baseY - rIdx * rowStep;
    const totalW = row.reduce((s, idx) => s + PILLS[idx].w, 0) + gapX * (row.length - 1);
    let x = rightX - totalW; // left start so the row's right edge = rightX
    row.forEach((idx) => {
      out[idx] = { x: x + PILLS[idx].w / 2, y };
      x += PILLS[idx].w + gapX;
    });
  });
  return out;
}

export function TechStackPlayground() {
  const boxRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const targetsRef = useRef<{ x: number; y: number }[]>([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    const box = boxRef.current;
    if (!box) return;

    const W = box.clientWidth;
    const H = box.clientHeight;
    const targets = wallTargets(W, H);
    targetsRef.current = targets;

    const engine = Matter.Engine.create();
    engine.gravity.y = 1;
    const world = engine.world;

    const wall = (x: number, y: number, w: number, h: number) =>
      Matter.Bodies.rectangle(x, y, w, h, { isStatic: true, render: { visible: false } });
    Matter.Composite.add(world, [
      wall(W / 2, H + 30, W + 120, 60),
      wall(W / 2, -30, W + 120, 60),
      wall(-30, H / 2, 60, H + 120),
      wall(W + 30, H / 2, 60, H + 120),
    ]);

    // Start static: the pills hold the pyramid until the first click / Knock / drag.
    const bodies = PILLS.map((p, i) =>
      Matter.Bodies.rectangle(targets[i].x, targets[i].y, p.w, PILL_H, {
        isStatic: true,
        chamfer: { radius: PILL_H / 2 },
        restitution: 0.26,
        friction: 0.5,
        frictionAir: 0.02,
      }),
    );
    bodiesRef.current = bodies;
    Matter.Composite.add(world, bodies);

    const wake = () => bodies.forEach((b) => b.isStatic && Matter.Body.setStatic(b, false));

    const mouse = Matter.Mouse.create(box);
    const mc = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Matter.Composite.add(world, mc);
    Matter.Events.on(mc, "mousedown", () => {
      if (!mc.body) return; // clicked empty space, leave the pyramid alone
      wake();
      Matter.Body.applyForce(mc.body, mc.body.position, {
        x: (Math.random() - 0.5) * 0.1,
        y: -0.06,
      });
    });

    const sync = () => {
      for (let i = 0; i < bodies.length; i += 1) {
        const el = pillRefs.current[i];
        const b = bodies[i];
        if (!el) continue;
        el.style.transform = `translate(${b.position.x - PILLS[i].w / 2}px, ${
          b.position.y - PILL_H / 2
        }px) rotate(${b.angle}rad)`;
      }
    };
    Matter.Events.on(engine, "afterUpdate", sync);
    sync();

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    return () => {
      Matter.Events.off(engine, "afterUpdate", sync);
      Matter.Runner.stop(runner);
      Matter.Composite.clear(world, false);
      Matter.Engine.clear(engine);
    };
  }, []);

  const knock = () => {
    bodiesRef.current.forEach((b) => {
      Matter.Body.setStatic(b, false);
      Matter.Body.applyForce(b, b.position, {
        x: (Math.random() - 0.5) * 0.13,
        y: -0.04 - Math.random() * 0.05,
      });
    });
  };

  const restack = () => {
    const targets = targetsRef.current;
    bodiesRef.current.forEach((b, i) => {
      Matter.Body.setStatic(b, false);
      Matter.Body.setVelocity(b, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(b, 0);
      Matter.Body.setAngle(b, 0);
      Matter.Body.setPosition(b, targets[i] ?? { x: 0, y: 0 });
      Matter.Body.setStatic(b, true); // hold the pyramid shape
    });
  };

  const pillInner = (p: Pill) => (
    <>
      <svg viewBox="0 0 24 24" width="16" height="16" fill={p.color} aria-hidden>
        <path d={p.path} />
      </svg>
      <span className="text-ink">{p.name}</span>
    </>
  );

  if (reduced) {
    return (
      <div className="mt-10 flex flex-wrap gap-2.5">
        {PILLS.map((p) => (
          <span
            key={p.id}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold"
            style={{ border: `2px solid ${p.color}` }}
          >
            {pillInner(p)}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div
        ref={boxRef}
        className="relative h-[560px] w-full cursor-grab overflow-hidden rounded-2xl border border-border bg-secondary/30 active:cursor-grabbing"
      >
        {PILLS.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => {
              pillRefs.current[i] = el;
            }}
            className="pointer-events-none absolute left-0 top-0 flex select-none items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold shadow-sm will-change-transform"
            style={{ width: p.w, height: PILL_H, border: `2px solid ${p.color}` }}
          >
            {pillInner(p)}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={knock}
          className="btn btn-outline rounded-lg px-4 py-2 text-sm font-semibold"
        >
          Knock it down
        </button>
        <button
          type="button"
          onClick={restack}
          className="btn btn-outline rounded-lg px-4 py-2 text-sm font-semibold"
        >
          Stack again
        </button>
        <span className="text-sm text-muted-foreground">
          Drag the pills, or tap one to topple the stack.
        </span>
      </div>
    </div>
  );
}
