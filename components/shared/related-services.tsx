import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { caseStudiesFor, servicePages } from "@/lib/services";

// Cross-links for a service page: real case studies that prove this service,
// then the other services. Gives every service page links to its proof and its
// neighbours, so none is a dead end. Pass showResults={false} on pages that
// already show their own case studies.
export function RelatedServices({ current, showResults = true }: { current: string; showResults?: boolean }) {
  const results = showResults ? caseStudiesFor(current) : [];
  const others = servicePages.filter((s) => s.href !== current);

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        {results.length > 0 && (
          <div className="mb-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">Results</p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">Work we&apos;ve shipped</h2>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                All case studies
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((cs) => (
                <CaseStudyCard key={cs.slug} cs={cs} />
              ))}
            </div>
          </div>
        )}

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
