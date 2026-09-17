import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";
import { Reveal } from "@/components/reveal";

const baseMetadata: Metadata = {
  title: "Case Studies",
  description:
    "How Timewheel designs, builds and ships digital products, booking platforms, dashboards, automation and more, with the challenges and decisions behind each one.",
};

const PER_PAGE = 6;

type Props = { searchParams: Promise<{ page?: string }> };

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { page } = await searchParams;
  const n = Number(page);
  if (Number.isInteger(n) && n > 1) {
    return {
      ...baseMetadata,
      alternates: { canonical: `/case-studies?page=${n}` },
    };
  }
  return { ...baseMetadata, alternates: { canonical: "/case-studies" } };
}

export default async function CaseStudiesPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const totalPages = Math.max(1, Math.ceil(caseStudies.length / PER_PAGE));
  const rawPage = Number(page);
  const currentPage = Number.isInteger(rawPage)
    ? Math.min(Math.max(rawPage, 1), totalPages)
    : 1;
  const start = (currentPage - 1) * PER_PAGE;
  const visible = caseStudies.slice(start, start + PER_PAGE);

  const pageHref = (n: number) => (n === 1 ? "/case-studies" : `/case-studies?page=${n}`);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ])}
      />
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">
            Case Studies
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-black tracking-tight md:text-5xl">
            Work we designed, built and shipped
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            The challenges, decisions and results behind real builds by
            Timewheel.
          </p>
        </Reveal>

        {visible.length > 0 ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((cs) => (
              <Reveal key={cs.slug} className="h-full">
                <CaseStudyCard cs={cs} />
              </Reveal>
            ))}
          </div>
        ) : null}

        {caseStudies.length === 0 && (
          <div className="mt-14 flex flex-col items-center rounded-2xl border border-dashed border-border bg-secondary/40 px-6 py-20 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-brand/10 text-2xl font-black text-brand">
              ?
            </span>
            <h2 className="mt-6 text-2xl font-extrabold tracking-tight">
              Case studies coming soon
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Real client builds are being documented. Drop the first one and
              it will appear here in the same style.
            </p>
          </div>
        )}

        {totalPages > 1 ? (
          <nav
            aria-label="Case studies pagination"
            className="mt-16 flex flex-wrap items-center justify-center gap-2"
          >
            {currentPage > 1 ? (
              <Link
                href={pageHref(currentPage - 1)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:border-black/20"
              >
                <ChevronLeft className="size-4" />
                Prev
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted-foreground/50">
                <ChevronLeft className="size-4" />
                Prev
              </span>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={pageHref(n)}
                aria-current={n === currentPage ? "page" : undefined}
                className={
                  n === currentPage
                    ? "inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-sm font-bold text-brand-foreground"
                    : "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-sm font-semibold text-foreground/90 transition-colors hover:border-black/20"
                }
              >
                {n}
              </Link>
            ))}

            {currentPage < totalPages ? (
              <Link
                href={pageHref(currentPage + 1)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:border-black/20"
              >
                Next
                <ChevronRight className="size-4" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted-foreground/50">
                Next
                <ChevronRight className="size-4" />
              </span>
            )}
          </nav>
        ) : null}
      </div>
    </>
  );
}