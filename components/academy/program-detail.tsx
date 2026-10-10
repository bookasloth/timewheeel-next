import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, Award, BadgeCheck, Briefcase, Check, Info } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { FaqAccordion } from "@/components/case-studies/faq-accordion";
import { Breadcrumbs, type Crumb } from "@/components/academy/page-header";
import { ProgramCard } from "@/components/academy/program-card";
import { ProgramIcon, ProgramStatusLine } from "@/components/academy/program-icon";
import { CAREER_SUPPORT, CERTIFICATE_LINE, relatedPrograms, STATUS_META, type Program } from "@/lib/academy";

function Block({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-border pt-10">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">{eyebrow}</p>
      <h2 className="mt-4 font-black tracking-tight">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Dots({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 leading-relaxed">
          <span aria-hidden className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-brand" />
          <span className="text-muted-foreground">{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** A program on its own page: header, curriculum and the facts rail. */
export function ProgramDetail({ program, trail }: { program: Program; trail: Crumb[] }) {
  const meta = STATUS_META[program.status];
  const facts = [
    { k: "Status", v: meta.label },
    { k: "Level", v: program.level },
    { k: "Duration", v: program.duration },
    { k: "Weekly effort", v: program.effort },
    { k: "Format", v: program.format },
    { k: "Certificate", v: CERTIFICATE_LINE },
    { k: "Fees", v: program.pricing },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pb-28 md:pt-14">
      <Breadcrumbs trail={trail} />

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-14">
        <div className="min-w-0">
          {/* Header */}
          <Reveal>
            <div className="flex items-center gap-4">
              <ProgramIcon program={program} />
              <ProgramStatusLine status={program.status} />
            </div>
            <RevealHeading as="h1" className="mt-6 font-black tracking-tight">
              {program.title}
            </RevealHeading>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{program.summary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#register"
                className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold"
              >
                {meta.cta}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#curriculum"
                className="group btn btn-outline inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold"
              >
                See the curriculum
                <ArrowDown aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
            {program.status !== "enrolling" && (
              <p className="mt-7 flex max-w-2xl gap-3 rounded-lg border border-border bg-card px-4 py-3.5 text-sm leading-relaxed">
                <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-blue" />
                <span>{meta.note}</span>
              </p>
            )}
          </Reveal>

          <div className="mt-16 space-y-14">
            <Block eyebrow="Overview" title="About this program">
              <div className="max-w-2xl space-y-4 leading-relaxed text-muted-foreground">
                {program.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Block>

            <Block eyebrow="Who it's for" title="Is this program for you?">
              <Dots items={program.audience} />
            </Block>

            <Block eyebrow="Skills" title="Skills you'll develop">
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {program.skills.map((s) => (
                  <li key={s} className="flex gap-3 text-sm leading-relaxed">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-rating" strokeWidth={2.2} />
                    {s}
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="curriculum" eyebrow="Curriculum" title={`${program.modules.length} modules`}>
              {program.status === "upcoming" && (
                <p className="mb-6 text-sm text-muted-foreground">Draft curriculum. It may change before the program opens.</p>
              )}
              <ol className="border-b border-border">
                {program.modules.map((m, i) => (
                  <li key={m.title} className="grid gap-2 border-t border-border py-6 sm:grid-cols-[3.5rem_1fr]">
                    <span className="font-heading text-sm font-bold tabular-nums text-brand-text">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold tracking-tight">{m.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.summary}</p>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        <span className="font-semibold text-foreground">Covers: </span>
                        {m.topics.join(" · ")}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>

            <Block eyebrow="Practical assignments" title="What you'll work on">
              <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Sample exercises with fictional businesses, practice sites or public websites you choose. Not client work.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {program.assignments.map((a) => (
                  <li key={a.title} className="flex flex-col rounded-lg border border-border bg-card p-5">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Sample exercise</p>
                    <h3 className="mt-2 font-extrabold leading-snug tracking-tight">{a.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{a.brief}</p>
                    <p className="mt-4 border-t border-border pt-3 text-sm">
                      <span className="font-semibold">You hand in: </span>
                      <span className="text-muted-foreground">{a.deliverable}</span>
                    </p>
                  </li>
                ))}
              </ul>
              <Link
                href="/academy/projects"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text hover:underline"
              >
                See all sample projects
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Block>

            <Block eyebrow="Deliverables" title="What you'll finish with">
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <h3 className="font-bold tracking-tight">For your portfolio</h3>
                  <div className="mt-4">
                    <Dots items={program.deliverables} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold tracking-tight">What you&apos;ll be able to do</h3>
                  <div className="mt-4">
                    <Dots items={program.outcomes} />
                  </div>
                </div>
              </div>
            </Block>

            <Block eyebrow="Certificates and internships" title="Beyond the program">
              <ul className="grid gap-4 md:grid-cols-3">
                {CAREER_SUPPORT.map((c) => {
                  const Icon = c.key === "certificate" ? Award : c.key === "online" ? BadgeCheck : Briefcase;
                  return (
                    <li key={c.key} className="rounded-lg border border-border bg-card p-5">
                      <Icon aria-hidden className="size-5 text-brand" strokeWidth={1.8} />
                      <h3 className="mt-4 font-extrabold tracking-tight">{c.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {c.key === "online"
                          ? `We help you prepare for and complete online certifications alongside the program. For ${program.shortTitle}, the most relevant are from ${new Intl.ListFormat("en-US", { type: "conjunction" }).format(program.certPlatforms)}. Those certificates are issued by the platforms themselves.`
                          : c.text}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Block>

            <Block eyebrow="Before you start" title="Prerequisites">
              <Dots items={program.prerequisites} />
            </Block>

            {program.faqs.length > 0 && (
              <Block eyebrow="Questions" title={`About the ${program.shortTitle} program`}>
                <FaqAccordion items={program.faqs} />
                <Link
                  href="/academy/faq"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text hover:underline"
                >
                  All Academy questions
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Block>
            )}
          </div>
        </div>

        {/* At-a-glance rail */}
        <aside aria-label="Program facts" className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-text">At a glance</p>
            <dl className="mt-5 space-y-4">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{f.k}</dt>
                  <dd className="mt-1 text-sm font-semibold leading-snug">{f.v}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#register"
              className="btn btn-primary mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold"
            >
              {meta.cta}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

/** Other programs, after the form. */
export function RelatedPrograms({ program }: { program: Program }) {
  const related = relatedPrograms(program.slug);
  if (!related.length) return null;
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Related programs</p>
        <h2 className="mt-4 font-black tracking-tight">Keep exploring</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
