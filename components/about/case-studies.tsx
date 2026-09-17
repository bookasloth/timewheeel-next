import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { Reveal } from "@/components/reveal";

export function AboutCaseStudies() {
  return (
    <section id="case-studies" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Case studies
            </p>
            <span className="h-px w-12 bg-brand/40" />
          </div>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight md:text-[2.4rem]">
            Work that moved
            <br className="hidden sm:block" /> real numbers.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            From local SEO rescues to full marketing systems, the challenges,
            the work, and the results of each build.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <Link
            href="/case-studies"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand transition-colors hover:text-navy"
          >
            View All Case Studies
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.slice(0, 3).map((cs, i) => (
          <Reveal key={cs.slug} delay={i * 0.06} className="h-full">
            <CaseStudyCard cs={cs} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}