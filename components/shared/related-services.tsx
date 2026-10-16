import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { servicePages } from "@/lib/services";

// Cross-links for a service page: the neighbouring services, so none is a dead end.
export function RelatedServices({ current }: { current: string }) {
  const others = servicePages.filter((s) => s.href !== current);

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">Related services</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">More ways we can help</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/50"
              >
                <span className="flex items-center justify-between gap-3 font-bold text-foreground">
                  {s.name}
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="mt-1.5 text-sm text-muted-foreground">{s.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
