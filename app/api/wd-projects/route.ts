import { NextResponse } from "next/server";

// Placeholder project pool for the web-dev "Our Work" Load-more button. Served
// on demand so these cards are NOT in the initial page HTML. Swap POOL for real
// project data later; the shape (see Item) is all the client card needs.
// ponytail: static in-memory pool, replace with a DB/CMS query when real.

export const runtime = "nodejs";

type Item = {
  id: string;
  name: string;
  tagline: string;
  result: string;
  accent: string;
  iconKey: string;
  live: boolean;
};

const ACCENTS = ["#3987C9", "#29a66f", "#f45b0a", "#ff4d93", "#ffcc1c", "#8b5cf6"];
const ICONS = ["rocket", "chart", "chat", "calendar", "ticket", "coffee"];
const TAGLINES = [
  "Marketing site",
  "Web application",
  "E-commerce build",
  "Booking platform",
  "Community portal",
  "Landing page",
];
const RESULTS = [
  "Design, build and launch, shipped on Next.js.",
  "Fast, SEO-ready site with a fixed timeline.",
  "Custom dashboard, live in production.",
  "Storefront rebuilt for speed and conversion.",
  "Full product build, code owned by the client.",
  "Rebuild that kept the SEO and doubled speed.",
];
const POOL_SIZE = 30;

const POOL: Item[] = Array.from({ length: POOL_SIZE }, (_, i) => {
  const n = i + 1;
  return {
    id: `demo-${n}`,
    name: `Client Project ${String(n).padStart(2, "0")}`,
    tagline: TAGLINES[i % TAGLINES.length],
    result: RESULTS[i % RESULTS.length],
    accent: ACCENTS[i % ACCENTS.length],
    iconKey: ICONS[i % ICONS.length],
    live: i % 4 === 0,
  };
});

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = Math.max(0, Number(searchParams.get("offset")) || 0);
  const limit = Math.min(12, Math.max(1, Number(searchParams.get("limit")) || 6));
  const items = POOL.slice(offset, offset + limit);
  return NextResponse.json({ items, hasMore: offset + limit < POOL.length });
}
