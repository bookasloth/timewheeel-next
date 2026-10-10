import type { CSSProperties } from "react";
import { ChartColumn, PenLine, Search, Sparkles, Target, type LucideIcon } from "lucide-react";
import { STATUS_META, type Program, type ProgramIcon as IconName, type ProgramStatus } from "@/lib/academy";
import { cn } from "@/lib/utils";

const ICONS: Record<IconName, LucideIcon> = {
  search: Search,
  content: PenLine,
  ai: Sparkles,
  performance: Target,
  analytics: ChartColumn,
};

/** The program's icon on a tile tinted with its accent. Decorative. */
export function ProgramIcon({ program, className }: { program: Pick<Program, "icon" | "accent">; className?: string }) {
  const Icon = ICONS[program.icon];
  return (
    <span
      aria-hidden
      className={cn("grid size-11 shrink-0 place-items-center rounded-lg bg-[var(--a)]/12 text-[var(--a)]", className)}
      style={{ "--a": program.accent } as CSSProperties}
    >
      <Icon className="size-5" strokeWidth={1.9} />
    </span>
  );
}

const DOT: Record<ProgramStatus, string> = {
  enrolling: "bg-rating",
  interest: "bg-brand",
  upcoming: "bg-muted-foreground/60",
};

/** Status as plain text with a dot. Text carries the meaning, not the colour. */
export function ProgramStatusLine({ status, className }: { status: ProgramStatus; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground", className)}>
      <span aria-hidden className={cn("size-1.5 rounded-full", DOT[status])} />
      {STATUS_META[status].label}
    </p>
  );
}
