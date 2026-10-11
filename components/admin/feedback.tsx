import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Loading primitives for the admin console, from the loading-states kit
// (skeletons, spinner, loading region), restyled to the console: gray-200
// placeholders, 3px radii. Server-safe; the interactive ones are in
// feedback-client.tsx.

/** Size it like the real content so nothing shifts when data arrives. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-[3px] bg-gray-200 motion-reduce:animate-none", className)} />;
}

/** Wrap a skeleton tree so screen readers hear the label once. */
export function LoadingRegion({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div aria-busy="true" className={className}>
      <span role="status" className="sr-only">
        {label}
      </span>
      {children}
    </div>
  );
}

/** Pass `label` only when the spinner stands alone. */
export function Spinner({ className, label }: { className?: string; label?: string }) {
  const ring = <span aria-hidden="true" className={cn("inline-block size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent", className)} />;
  if (!label) return ring;
  return (
    <span role="status" className="inline-flex items-center">
      {ring}
      <span className="sr-only">{label}</span>
    </span>
  );
}

/** PageHeader placeholder: title + description, optional action button. */
export function HeaderSkeleton({ action = false }: { action?: boolean }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div className="space-y-2">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-4 w-72 max-w-[60vw]" />
      </div>
      {action && <Skeleton className="h-9 w-32" />}
    </div>
  );
}

export function StatsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-[5px] border border-gray-200 bg-white p-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-3 h-6 w-28" />
          <Skeleton className="mt-2 h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

/** A Panel holding a table: header row + a few body rows. */
export function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  const grid = { gridTemplateColumns: `2fr repeat(${cols - 1}, minmax(0, 1fr))` };
  return (
    <div className="overflow-hidden rounded-[5px] border border-gray-200 bg-white">
      <div className="grid gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3" style={grid}>
        {Array.from({ length: cols }).map((_, c) => (
          <Skeleton key={c} className="h-3 w-16" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="grid items-center gap-4 border-b border-gray-100 px-4 py-3.5 last:border-0" style={grid}>
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          {Array.from({ length: cols - 1 }).map((_, c) => (
            <Skeleton key={c} className="h-4 w-4/5" />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Form column + preview, the shape of the invoice and blog editors. */
export function EditorSkeleton({ label }: { label: string }) {
  return (
    <LoadingRegion label={label}>
      <HeaderSkeleton action />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="space-y-4">
          {[4, 3, 3].map((fields, i) => (
            <div key={i} className="space-y-3 rounded-[5px] border border-gray-200 bg-white p-4">
              <Skeleton className="h-3 w-24" />
              {Array.from({ length: fields }).map((_, f) => (
                <div key={f} className="space-y-1.5">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-9 w-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="rounded-[5px] border border-gray-200 bg-gray-200/60 p-5">
          <div className="mx-auto max-w-[794px] space-y-5 bg-white p-8">
            <div className="flex justify-between">
              <Skeleton className="h-12 w-56" />
              <Skeleton className="h-12 w-32" />
            </div>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="ml-auto h-24 w-60" />
          </div>
        </div>
      </div>
    </LoadingRegion>
  );
}
