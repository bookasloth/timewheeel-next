import Link from "next/link";
import type { ReactNode } from "react";
import { RevealHeading } from "@/components/anim/reveal-heading";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail. The last crumb is the current page. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-foreground">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="hover:text-foreground">
                    {c.name}
                  </Link>
                  <span aria-hidden>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Header for Academy sub-pages: breadcrumb, eyebrow, h1, intro, optional actions. */
export function AcademyPageHeader({
  trail,
  eyebrow,
  title,
  intro,
  children,
}: {
  trail: Crumb[];
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-10 md:pb-20 md:pt-14">
        <Breadcrumbs trail={trail} />
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-brand-text">{eyebrow}</p>
        <RevealHeading as="h1" className="mt-4 max-w-3xl font-black tracking-tight">
          {title}
        </RevealHeading>
        <div className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</div>
        {children}
      </div>
    </header>
  );
}
