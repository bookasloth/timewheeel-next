import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { AcademyPageHeader } from "@/components/academy/page-header";
import { LearningLoop } from "@/components/academy/learning-loop";
import { ProgramIcon } from "@/components/academy/program-icon";
import { RegisterSection } from "@/components/academy/register-section";
import { getProgram, programPath, SAMPLE_PROJECT_NOTE, sampleProjects } from "@/lib/academy";
import { breadcrumbLd, organizationLd, webPageLd } from "@/lib/jsonld";
import { social } from "@/lib/metadata";

const TITLE = "Practical Digital Marketing Projects for Students | Timewheel Academy";
const DESC =
  "Sample SEO, content, AI and campaign analysis projects from Timewheel Academy: SEO audits, content clusters, a 30-day content calendar, landing-page plans and AI workflows.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/academy/projects" },
  ...social({ path: "/academy/projects", title: TITLE, description: DESC }),
};

const TRAIL = [
  { name: "Academy", path: "/academy" },
  { name: "Projects", path: "/academy/projects" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    webPageLd({ name: "Practical projects and assignments", path: "/academy/projects", description: DESC }),
    breadcrumbLd([{ name: "Home", path: "/" }, ...TRAIL]),
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <AcademyPageHeader
        trail={TRAIL}
        eyebrow="Practical projects"
        title="Assignments that look like the job."
        intro={
          <p>
            Each program is built around briefs like these. You do the work, measure it, improve it, and write it
            up as a case study you can show.
          </p>
        }
      >
        <p className="mt-8 flex max-w-2xl gap-3 rounded-lg border border-border bg-card px-4 py-3.5 text-sm leading-relaxed">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-blue" />
          <span>{SAMPLE_PROJECT_NOTE}</span>
        </p>
      </AcademyPageHeader>

      {/* Quick index so every project is one jump away. */}
      <nav aria-label="Projects on this page" className="mx-auto max-w-6xl px-6 pt-12">
        <ol className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {sampleProjects.map((p, i) => (
            <li key={p.slug}>
              <a href={`#${p.slug}`} className="text-muted-foreground hover:text-foreground">
                <span className="tabular-nums text-brand-text">0{i + 1}</span> {p.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-6 md:pb-28">
        {sampleProjects.map((p, i) => {
          const program = getProgram(p.program);
          return (
            <Reveal key={p.slug}>
              <article
                id={p.slug}
                aria-labelledby={`${p.slug}-title`}
                className="grid scroll-mt-32 gap-8 border-t border-border py-12 lg:grid-cols-[1fr_1fr] lg:gap-14"
              >
                <div>
                  <p className="font-heading text-sm font-bold tabular-nums text-brand-text">
                    Project {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 id={`${p.slug}-title`} className="mt-3 font-black tracking-tight">
                    {p.title}
                  </h2>
                  <p className="mt-4 text-sm">
                    <span className="font-semibold">Sample brief: </span>
                    <span className="text-muted-foreground">{p.setting}.</span>
                  </p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{p.brief}</p>
                  {program && (
                    <Link
                      href={programPath(program)}
                      className="group mt-6 inline-flex items-center gap-3 text-sm font-semibold"
                    >
                      <ProgramIcon program={program} className="size-9" />
                      <span>
                        <span className="block text-xs font-normal text-muted-foreground">Part of</span>
                        <span className="group-hover:text-brand-text">{program.title}</span>
                      </span>
                    </Link>
                  )}
                </div>
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">What you&apos;ll do</h3>
                  <ol className="mt-4 space-y-3">
                    {p.tasks.map((t, n) => (
                      <li key={t} className="flex gap-3 text-sm leading-relaxed">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold tabular-nums">
                          {n + 1}
                        </span>
                        {t}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 border-t border-border pt-4 text-sm">
                    <p>
                      <span className="font-semibold">You hand in: </span>
                      <span className="text-muted-foreground">{p.deliverable}</span>
                    </p>
                    <p className="mt-2">
                      <span className="font-semibold">Skills: </span>
                      <span className="text-muted-foreground">{p.skills.join(", ")}</span>
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}

        <Reveal className="border-t border-border pt-10">
          <Link
            href="/academy/programs"
            className="group btn btn-outline inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
          >
            See the programs these belong to
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>

      <LearningLoop
        id="method"
        title="Every project runs the same loop"
        intro="Learn the concept, execute the brief, measure the result against data or a clear standard, then prove it with a written case study."
      />
      <RegisterSection />
    </>
  );
}
