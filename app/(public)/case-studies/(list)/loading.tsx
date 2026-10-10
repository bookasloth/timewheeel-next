import { Skeleton, SkeletonGroup } from "@/components/ui/skeleton";

// /case-studies reads ?page=, so it renders per request. This fallback is
// prefetched, which makes clicking into the list instant while the grid
// streams in. Mirrors page.tsx: header, then the 3-col card grid.
//
// Lives in the (list) route group so it never wraps /case-studies/[slug]:
// above [slug] it put this heading in every case study's HTML and turned
// unknown slugs into 200s instead of 404s. The heading is a div, not an h1,
// because the fallback also sits in the list page's own server HTML.
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">Case Studies</p>
      <div className="mt-3 max-w-2xl text-4xl font-black tracking-tight md:text-5xl">
        Work we designed, built and shipped
      </div>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        The challenges, decisions and results behind real builds by Timewheel.
      </p>

      <SkeletonGroup label="Loading case studies" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="relative h-72 overflow-hidden rounded-2xl border border-border bg-card">
            <Skeleton className="absolute inset-0 rounded-none" />
            <Skeleton className="absolute bottom-3 left-3 h-6 w-28 rounded-full bg-border" />
          </div>
        ))}
      </SkeletonGroup>
    </div>
  );
}
