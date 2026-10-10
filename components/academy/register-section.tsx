import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { InterestForm, type ProgramOption } from "@/components/academy/interest-form";
import { launchPrograms, programs, STATUS_META, upcomingPrograms, type Program } from "@/lib/academy";
import { site } from "@/lib/site";

const option = (p: Program): ProgramOption => ({ slug: p.slug, title: p.title, status: p.status });

/**
 * The enrollment CTA: copy on the left, the interest form on the right.
 * Without `program` the visitor picks one; with it the form is fixed to that program.
 */
export function RegisterSection({
  program,
  title = "Start with your interest. We'll do the rest.",
}: {
  program?: Program;
  title?: string;
}) {
  const options = [...launchPrograms, ...upcomingPrograms].map(option);
  const meta = program ? STATUS_META[program.status] : null;

  return (
    <section id="register" className="scroll-mt-32 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">
            {meta ? meta.formTitle : "Register your interest"}
          </p>
          <RevealHeading as="h2" className="mt-5 font-black tracking-tight">
            {program ? `${meta!.cta} for ${program.shortTitle}` : title}
          </RevealHeading>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {program
              ? meta!.note
              : `First cohorts for ${new Intl.ListFormat("en-US", { type: "conjunction" }).format(launchPrograms.map((p) => p.shortTitle))} are being planned. Register interest in a program and we'll email you the dates, format and fees before anyone is asked to commit or pay.`}
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
            {["Takes under a minute", "No payment, no account", "One email when details are ready"].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            {!program && (
              <Link href="/academy/programs" className="inline-flex items-center gap-1.5 text-foreground hover:text-brand-text">
                Compare all {programs.length} programs
                <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            )}
            <a
              href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Timewheel Academy question")}`}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              Questions? {site.contact.email}
            </a>
          </div>
        </Reveal>

        <InterestForm
          programs={program ? [option(program)] : options}
          defaultProgram={program?.slug}
          lockProgram={Boolean(program)}
          idPrefix={program ? `academy-${program.slug}` : "academy"}
        />
      </div>
    </section>
  );
}
