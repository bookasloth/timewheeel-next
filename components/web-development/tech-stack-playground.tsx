"use client";

import { useCallback, useRef, useState } from "react";
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

// Ordered apex -> base: HTML5 at the top, platforms/infra along the bottom.
// 36 pills = a full 8-row pyramid (1+2+…+8).
const ICONS: SimpleIcon[] = [
  siHtml5,
  siCss, siJavascript,
  siSass, siGit, siPhp,
  siPython, siNodedotjs, siExpress, siMysql,
  siPostgresql, siMongodb, siRedis, siFirebase, siSupabase,
  siTypescript, siGraphql, siPrisma, siReact, siVuedotjs, siSvelte,
  siLaravel, siNextdotjs, siAstro, siVite, siTailwindcss, siWordpress, siWoocommerce,
  siShopify, siSanity, siStripe, siDocker, siCloudflare, siNetlify, siVercel, siGithub,
];

const PILL_H = 40;
type Pill = { id: string; name: string; color: string; path: string; w: number };
const PILLS: Pill[] = ICONS.map((ic) => ({
  id: ic.slug,
  name: ic.title,
  color: `#${ic.hex}`,
  path: ic.path,
  w: Math.max(84, Math.round(ic.title.length * 7.6 + 50)),
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

// Centered pyramid: apex at top, each row wider than the last, variable pill
// widths packed and centered per row.
function pyramidTargets(W: number, H: number): { x: number; y: number }[] {
  const rows = pyramidRows(PILLS.length);
  const gapX = 8;
  const gapY = 6;
  const rowStep = PILL_H + gapY;
  const topY = 34 + PILL_H / 2;
  const out: { x: number; y: number }[] = [];
  let idx = 0;
  rows.forEach((count, r) => {
    const y = topY + r * rowStep;
    const ids: number[] = [];
    for (let j = 0; j < count && idx < PILLS.length; j += 1, idx += 1) ids.push(idx);
    const totalW = ids.reduce((s, i) => s + PILLS[i].w, 0) + gapX * (ids.length - 1);
    let x = W / 2 - totalW / 2;
    ids.forEach((i) => {
      out[i] = { x: x + PILLS[i].w / 2, y };
      x += PILLS[i].w + gapX;
    });
  });
  return out;
}

type Sim = {
  engine: Matter.Engine;
  bodies: Matter.Body[];
  mouse: Matter.Mouse;
  targets: { x: number; y: number }[];
};

export function TechStackPlayground() {
  const boxRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<Sim | null>(null);
  const startedRef = useRef(false);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const targetsRef = useRef<{ x: number; y: number }[]>([]);
  const [reduced, setReduced] = useState(false);

  // Callback ref: fires with the real box node once it is in the DOM, so we
  // never read a null ref (a hydration mismatch was breaking useEffect timing).
  // Runs its setup once; StrictMode/HMR re-invocations are guarded out. No
  // teardown on purpose — this section lives for the whole page.
  const initBox = useCallback((box: HTMLDivElement | null) => {
    boxRef.current = box;
    if (!box || startedRef.current) return;
    if (
      box.clientWidth < 680 ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setReduced(true);
      return;
    }
    startedRef.current = true;

    const W = box.clientWidth;
    const H = box.clientHeight;
    const targets = pyramidTargets(W, H);

    // Gravity starts OFF so the dynamic pills float in the pyramid formation.
    // The first tap / Knock turns it on. (Creating bodies static and calling
    // setStatic(false) later corrupts their mass into NaN, so we avoid it.)
    const engine = Matter.Engine.create();
    engine.gravity.y = 0;
    const world = engine.world;

    const wall = (x: number, y: number, w: number, h: number) =>
      Matter.Bodies.rectangle(x, y, w, h, { isStatic: true, render: { visible: false } });
    Matter.Composite.add(world, [
      wall(W / 2, H + 30, W + 120, 60),
      wall(W / 2, -30, W + 120, 60),
      wall(-30, H / 2, 60, H + 120),
      wall(W + 30, H / 2, 60, H + 120),
    ]);

    // Start static so the pyramid holds; the first grab wakes everything.
    const bodies = PILLS.map((p, i) =>
      // Plain dynamic rectangles (a chamfer near half the height makes a
      // degenerate rounded rect that NaNs). They hold position while gravity
      // is off; the DOM pill is visually rounded regardless.
      Matter.Bodies.rectangle(targets[i].x, targets[i].y, p.w, PILL_H, {
        restitution: 0.2,
        friction: 0.6,
        frictionAir: 0.02,
      }),
    );
    Matter.Composite.add(world, bodies);

    const mouse = Matter.Mouse.create(box);
    const mc = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.9, render: { visible: false } },
    });
    Matter.Composite.add(world, mc);

    simRef.current = { engine, bodies, mouse, targets };
    bodiesRef.current = bodies;
    targetsRef.current = targets;

    const wake = () => {
      engine.gravity.y = 1;
    };
    // First touch/press turns gravity on so the stack drops, then nudges the
    // pill under the cursor for a visible knock.
    const onDown = () => {
      wake();
      const hit = Matter.Query.point(bodies, mouse.position);
      if (hit[0]) {
        Matter.Body.applyForce(hit[0], hit[0].position, {
          x: (Math.random() - 0.5) * 0.09,
          y: -0.05,
        });
      }
    };
    box.addEventListener("mousedown", onDown);
    box.addEventListener("touchstart", onDown, { passive: true });

    // Drive the engine with Matter.Runner — it manages the delta/correction
    // timing (a manual Engine.update divides by a zero lastDelta on the first
    // frame and explodes every body to NaN). On each tick, sync the live DOM
    // children (boxRef read fresh so it always targets the on-screen box).
    Matter.Events.on(engine, "afterUpdate", () => {
      const b = boxRef.current;
      if (!b) return;
      for (let i = 0; i < bodies.length; i += 1) {
        const el = b.children[i] as HTMLElement | undefined;
        const body = bodies[i];
        if (!el) continue;
        el.style.transform = `translate(${body.position.x - PILLS[i].w / 2}px, ${
          body.position.y - PILL_H / 2
        }px) rotate(${body.angle}rad)`;
      }
    });
    // Paint the pyramid once up front so it doesn't flash at (0,0) pre-first-tick.
    for (let i = 0; i < bodies.length; i += 1) {
      const el = box.children[i] as HTMLElement | undefined;
      if (el) {
        el.style.transform = `translate(${bodies[i].position.x - PILLS[i].w / 2}px, ${
          bodies[i].position.y - PILL_H / 2
        }px)`;
      }
    }

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
  }, []);

  const knock = () => {
    const engine = simRef.current?.engine;
    if (engine) engine.gravity.y = 1;
    bodiesRef.current.forEach((b) => {
      Matter.Body.applyForce(b, b.position, {
        x: (Math.random() - 0.5) * 0.14,
        y: -0.04 - Math.random() * 0.05,
      });
    });
  };

  const restack = () => {
    const engine = simRef.current?.engine;
    if (engine) engine.gravity.y = 0; // hold the reformed pyramid in place
    const targets = targetsRef.current;
    bodiesRef.current.forEach((b, i) => {
      Matter.Body.setVelocity(b, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(b, 0);
      Matter.Body.setAngle(b, 0);
      Matter.Body.setPosition(b, targets[i] ?? { x: 0, y: 0 });
    });
  };

  const pillInner = (p: Pill) => (
    <>
      <svg viewBox="0 0 24 24" width="17" height="17" fill={p.color} aria-hidden>
        <path d={p.path} />
      </svg>
      <span className="text-ink">{p.name}</span>
    </>
  );

  if (reduced) {
    return (
      <div className="mt-10 flex flex-wrap justify-center gap-2.5">
        {PILLS.map((p) => (
          <span
            key={p.id}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold"
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
        ref={initBox}
        className="relative h-[560px] w-full cursor-grab select-none overflow-hidden rounded-2xl border border-border bg-secondary/25 active:cursor-grabbing"
      >
        {PILLS.map((p) => (
          <div
            key={p.id}
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
          Grab a pill, the stack comes alive. Pick them up and stack again.
        </span>
      </div>
    </div>
  );
}
