import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
        {title}
      </h1>
      {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
      {children && (
        <div className="mt-10 space-y-4 text-muted-foreground">{children}</div>
      )}
    </div>
  );
}
