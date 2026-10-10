import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programPath, type Program } from "@/lib/academy";
import { ProgramIcon, ProgramStatusLine } from "@/components/academy/program-icon";

/** Launch program card: cover (image or typographic), status, summary, key facts. */
export function ProgramCard({ program, headingLevel = "h3" }: { program: Program; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-brand/50">
      {/* Accent rule stands in for a cover image until real ones exist. */}
      {program.image ? (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
          <Image
            src={program.image.src}
            alt={program.image.alt}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <span aria-hidden className="block h-1" style={{ background: program.accent }} />
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <ProgramIcon program={program} />
          <ProgramStatusLine status={program.status} className="mt-1 text-right" />
        </div>
        <Heading className="mt-5 text-lg font-extrabold leading-snug tracking-tight">
          <Link href={programPath(program)} className="after:absolute after:inset-0 focus-visible:outline-none">
            {program.title}
          </Link>
        </Heading>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{program.summary}</p>
        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
          <div>
            <dt className="font-semibold uppercase tracking-wider text-muted-foreground">Level</dt>
            <dd className="mt-1 font-semibold text-foreground">{program.level}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wider text-muted-foreground">Duration</dt>
            <dd className="mt-1 font-semibold text-foreground">{program.duration}</dd>
          </div>
        </dl>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text">
          View program
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
      {/* Keyboard focus ring for the stretched link, drawn on the card. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-lg ring-brand group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}

/** Compact row for later programs. */
export function ProgramRow({ program }: { program: Program }) {
  return (
    <li>
      <Link
        href={programPath(program)}
        className="group flex items-center gap-4 rounded-lg border border-border bg-card/60 p-4 transition-colors hover:border-brand/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <ProgramIcon program={program} className="size-10" />
        <span className="min-w-0 flex-1">
          <span className="block font-bold leading-snug">{program.title}</span>
          <span className="mt-0.5 block text-sm text-muted-foreground">{program.summary}</span>
        </span>
        <ProgramStatusLine status={program.status} className="hidden shrink-0 sm:inline-flex" />
        <ArrowRight aria-hidden className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </Link>
    </li>
  );
}
