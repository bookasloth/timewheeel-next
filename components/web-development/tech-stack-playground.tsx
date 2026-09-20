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

// The tech pool. Each pill shows the brand logo + name with the brand-coloured
// outline (no solid fill), driven straight off simple-icons (title/hex/path).
const ICONS: SimpleIcon[] = [
  siNextdotjs, siReact, siTypescript, siJavascript, siTailwindcss, siHtml5, siCss, siSass, siVuedotjs,
  siSvelte, siAstro, siVite,
  siNodedotjs, siExpress, siPython, siPhp, siLaravel, siGraphql, siPrisma,
  siPostgresql, siMysql, siMongodb, siRedis, siSupabase, siFirebase,
  siWordpress, siShopify, siWoocommerce, siStripe, siSanity,
  siVercel, siCloudflare, siNetlify, siDocker, siGit, siGithub,
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

function pyramidRows(n: number): number[] {
  const rows: number[] = [];
  let r = 1;
  let left = n;
  while (left > 0) {
    const c = Math.min(r, left);
    rows.push(c);
    left -= c;
    r += 1;
  }
  return rows;
}

function pyramidTargets(W: number, H: number): { x: number; y: number }[] {
  const rows = pyramidRows(PILLS.length);
  const spacingX = Math.min(150, (W - 30) / Math.max(...rows));
  const topY = 44;
  const gapY = rows.length > 1 ? (H - 70 - topY) / (rows.length - 1) : 0;
  const out: { x: number; y: number }[] = [];
  let idx = 0;
  rows.forEach((count, row) => {
    const y = topY + row * gapY;
    for (let j = 0; j < count && idx < PILLS.length; j += 1, idx += 1) {
      out.push({ x: W / 2 + (j - (count - 1) / 2) * spacingX, y });
    }
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
    const targets = pyramidTargets(W, H);
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
