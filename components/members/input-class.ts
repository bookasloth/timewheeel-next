import { cn } from "@/lib/utils";

// Plain helper (no "use client") so server components can use it too.
export const inputClass = (err?: boolean) =>
  cn(
    "w-full rounded-lg border bg-background/70 px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 disabled:opacity-60",
    err
      ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
      : "border-border hover:border-brand/50 focus:border-brand focus:ring-4 focus:ring-brand/15",
  );
