import type { ReactNode } from "react";

export function MemberPageHeader({ eyebrow, title, intro, action }: { eyebrow?: string; title: string; intro?: ReactNode; action?: ReactNode }) {
  return (
    <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">{eyebrow}</p>}
        <h1 className="mt-2 font-heading font-extrabold tracking-tight">{title}</h1>
        {intro && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
