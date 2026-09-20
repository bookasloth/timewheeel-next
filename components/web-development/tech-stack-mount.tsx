"use client";

import dynamic from "next/dynamic";

// Load the physics playground client-side only. It uses matter-js + per-pill
// inline styles that don't survive SSR hydration (and some browser extensions
// rewrite inline borders, forcing a hydration bail that kills the mount), so
// ssr:false renders it fresh on the client with no server HTML to mismatch.
const TechStackPlayground = dynamic(
  () => import("./tech-stack-playground").then((m) => m.TechStackPlayground),
  {
    ssr: false,
    loading: () => (
      <div className="mt-10 h-[560px] w-full rounded-2xl border border-border bg-secondary/25" />
    ),
  },
);

export function TechStackMount() {
  return <TechStackPlayground />;
}
