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

export function TechStackPlayground() {
  const boxRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const targetsRef = useRef<{ x: number; y: number }[]>([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    // Narrow screens or reduced-motion: skip physics, show a static list.
    if (
      box.clientWidth < 680 ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setReduced(true);
      return;
    }

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

    // Start static so the pyramid holds; the first grab wakes everything.
    const bodies = PILLS.map((p, i) =>
      Matter.Bodies.rectangle(targets[i].x, targets[i].y, p.w, PILL_H, {
        isStatic: true,
        chamfer: { radius: PILL_H / 2 },
        restitution: 0.2,
        friction: 0.6,
        frictionAir: 0.02,
      }),
    );
    bodiesRef.current = bodies;
    Matter.Composite.add(world, bodies);

    const wake = () => bodies.forEach((b) => b.isStatic && Matter.Body.setStatic(b, false));

    const mouse = Matter.Mouse.create(box);
    const mc = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.9, render: { visible: false } },
    });
    Matter.Composite.add(world, mc);
    // First touch/press anywhere wakes the whole stack (static bodies can't be
    // grabbed, and mc.body resolves a tick late, so wake on the raw DOM event),
    // then nudge the pill under the cursor so a tap visibly knocks the stack.
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
      box.removeEventListener("mousedown", onDown);
      box.removeEventListener("touchstart", onDown);
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
        x: (Math.random() - 0.5) * 0.14,
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
      Matter.Body.setStatic(b, true);
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
        ref={boxRef}
        className="relative h-[560px] w-full cursor-grab select-none overflow-hidden rounded-2xl border border-border bg-secondary/25 active:cursor-grabbing"
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
          Grab a pill, the stack comes alive. Pick them up and stack again.
        </span>
      </div>
    </div>
  );
}
