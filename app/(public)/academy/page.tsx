import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { AcademyHero } from "@/components/academy/hero";
import { CareerSupport } from "@/components/academy/career-support";
import { LearningLoop } from "@/components/academy/learning-loop";
import { ProgramCard, ProgramRow } from "@/components/academy/program-card";
import { RegisterSection } from "@/components/academy/register-section";
import {
  getProgram,
  launchPrograms,
  NO_PROMISES,
  OUTCOMES,
  programPath,
  programs,
  SAMPLE_PROJECT_NOTE,
  sampleProjects,
  upcomingPrograms,
  VALUE_PROPS,
} from "@/lib/academy";
import { breadcrumbLd, itemListLd, organizationLd, webPageLd } from "@/lib/jsonld";
import { social } from "@/lib/metadata";

const TITLE = "Digital Marketing Academy for Students | Timewheel";
const DESC =
  "Learn SEO, content marketing, AI, and growth marketing through practical projects with Timewheel Digital Marketing Academy.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/academy" },
  ...social({ path: "/academy", title: TITLE, description: DESC }),
};

// WebPage + ItemList of programs + breadcrumb. No Course or
// EducationalOrganization markup: no cohort, schedule or price exists yet, so
// those rich results would not be eligible (or honest).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    webPageLd({
      type: "CollectionPage",
      name: "Timewheel Digital Marketing Academy",
      path: "/academy",
      description: DESC,
      mainEntity: itemListLd(programs.map((p) => ({ name: p.title, path: programPath(p) }))),
    }),
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Academy", path: "/academy" },
    ]),
  ],
};

export default function AcademyPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <AcademyHero />

      {/* B. Value proposition: a numbered list, not another card grid */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-36 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Why this Academy</p>
            <RevealHeading as="h2" className="mt-5 font-black tracking-tight">
              Less watching. More making.
            </RevealHeading>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Run by a working digital marketing studio, so the programs teach the work the way it is actually
              done, and judge progress by what you can produce.
            </p>
          </Reveal>
          <ol className="grid gap-x-10 sm:grid-cols-2">
            {VALUE_PROPS.map((v, i) => (
              <li key={v.title} className="border-t border-border py-6">
                <Reveal delay={(i % 2) * 0.05}>
                  <p className="font-heading text-sm font-bold tabular-nums text-brand-text">0{i + 1}</p>
                  <h3 className="mt-3 text-lg font-extrabold tracking-tight">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* C. Programs */}
      <section id="programs" className="scroll-mt-32 border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Learning programs</p>
              <RevealHeading as="h2" className="mt-5 font-black tracking-tight">
                Three programs first. Two more after.
              </RevealHeading>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We are starting with the skills most entry-level marketing work asks for. None is open for
                enrollment yet: register interest and we&apos;ll share cohort dates, format and fees first.
              </p>
            </div>
            <Link
              href="/academy/programs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              All programs
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {launchPrograms.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05} className="h-full">
                <ProgramCard program={p} />
              </Reveal>
            ))}
          </div>

          <p className="mt-12 text-sm font-semibold">Coming later</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {upcomingPrograms.map((p) => (
              <ProgramRow key={p.slug} program={p} />
            ))}
          </ul>
        </div>
      </section>

      {/* D. How learning works */}
      <LearningLoop />

      {/* E. Practical projects */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Practical projects</p>
          <RevealHeading as="h2" className="mt-5 font-black tracking-tight">
            The kind of work you&apos;ll do.
          </RevealHeading>
          <p className="mt-4 leading-relaxed text-muted-foreground">{SAMPLE_PROJECT_NOTE}</p>
        </Reveal>

        <ol className="mt-12 border-b border-border">
          {sampleProjects.map((proj, i) => {
            const program = getProgram(proj.program);
            return (
              <li key={proj.slug} className="border-t border-border">
                <Link
                  href={`/academy/projects#${proj.slug}`}
                  className="group grid gap-2 py-5 transition-colors hover:bg-secondary/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-6 sm:px-3"
                >
                  <span className="font-heading text-sm font-bold tabular-nums text-muted-foreground">0{i + 1}</span>
                  <span className="min-w-0">
                    <span className="block font-bold leading-snug">{proj.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      Sample brief: {proj.setting.charAt(0).toLowerCase() + proj.setting.slice(1)}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    {program?.shortTitle}
                    <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* F. Learning outcomes */}
      <section className="border-t border-border/60">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <Reveal className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Learning outcomes</p>
              <RevealHeading as="h2" className="mt-5 font-black tracking-tight">
                What you can work toward.
              </RevealHeading>
            </Reveal>
            <ul className="mt-10 space-y-6">
              {OUTCOMES.map((o) => (
                <li key={o.title} className="flex gap-4">
                  <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-brand" />
                  <div>
                    <h3 className="font-bold tracking-tight">{o.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{o.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="lg:self-end">
            <aside className="rounded-lg border border-border bg-card p-6 md:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">What we don&apos;t promise</p>
              <p className="mt-4 leading-relaxed">{NO_PROMISES}</p>
              <Link
                href="/academy/about"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text hover:underline"
              >
                How we teach
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Certificates and internships */}
      <CareerSupport />

      {/* G. Enrollment CTA */}
      <RegisterSection />
    </>
  );
}
