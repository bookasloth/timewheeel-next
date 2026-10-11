import type { ReactNode } from "react";

export function AuthCard({ title, intro, children, footer }: { title: string; intro?: ReactNode; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
      <h1 className="font-heading font-extrabold tracking-tight">{title}</h1>
      {intro && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{intro}</p>}
      <div className="mt-7">{children}</div>
      {footer && <div className="mt-7 border-t border-border pt-5 text-center text-sm text-muted-foreground">{footer}</div>}
    </div>
  );
}
