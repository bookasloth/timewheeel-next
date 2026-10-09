import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Placeholder block. Size it like the content it stands in for so nothing
// shifts when the real thing arrives. Styles live in globals.css (.skeleton).
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return <div aria-hidden data-slot="skeleton" className={cn("skeleton rounded-md", className)} {...props} />;
}

// Wraps a skeleton layout: announces loading to screen readers and holds the
// whole group back for a beat so quick loads never flash placeholders.
export function SkeletonGroup({
  label = "Loading",
  className,
  children,
}: {
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div role="status" aria-live="polite" className={cn("skeleton-delay", className)}>
      <span className="sr-only">{label}…</span>
      {children}
    </div>
  );
}
