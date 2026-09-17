import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
} from "lucide-react";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { FaqAccordion } from "@/components/case-studies/faq-accordion";
import { CountUpStat } from "@/components/case-studies/count-up";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-)|(-$)/g, "");
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

function Eyebrow({ children, accent }: { children: ReactNode; accent: string }) {
  return (
    <p
      className="text-xs font-bold uppercase tracking-[0.15em]"
      style={{ color: accent }}
    >
      {children}
    </p>
  );
}

function SectionTable({
  table,
  accent,
}: {
  table: NonNullable<CaseStudy["content"]["sections"][number]["table"]>;
  accent: string;
}) {
  const labels = table.labels ?? {
    key: "Item",
    value: "Function",
    why: "Why it matters",
  };
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border">
      <div className="flex items-center justify-between gap-2 border-b border-border bg-secondary/60 px-5 py-3">
        <p className="text-sm font-bold">{table.heading ?? "What we delivered"}</p>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {labels.key} · {labels.value} · {labels.why}
        </span>
      </div>
      <div className="divide-y divide-border">
        {table.rows.map((r) => (
          <div
            key={r.key}
            className="grid gap-x-5 gap-y-1 px-5 py-4 md:grid-cols-[150px_1fr_1fr]"
          >
            <p className="text-sm font-bold" style={{ color: accent }}>
              {r.key}
            </p>
            <p className="text-sm text-foreground/90">{r.value}</p>
            {r.why ? (
              <p className="text-sm text-muted-foreground">{r.why}</p>
            ) : null}
          </div>
        ))}
      </div>
      {table.note ? (
        <p className="border-t border-border bg-secondary/30 px-5 py-3 text-xs leading-relaxed text-muted-foreground">
          {table.note}
        </p>
      ) : null}
    </div>
  );
}



export function CaseStudyDetail({ cs }: { cs: CaseStudy }) {
  const content = cs.content;
  if (!content) return null;
  const { hero, stats, sections, closing } = content;
  const accent = cs.accent;
  const { meta, quote, faq, liveUrl } = cs;
  const related = caseStudies.filter((c) => c.slug !== cs.slug);

  return (
    <article>
      {/* top bar */}
      <div className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All case studies
          </Link>
        </div>
      </div>

      {/* header */}
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-12 md:pt-16">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span
            className="rounded-full px-3 py-1"
            style={{ backgroundColor: `${accent}1a`, color: accent }}
          >
            {cs.category}
          </span>
          {meta?.duration ? <span>{meta.duration}</span> : null}
          {meta?.budget ? <span>· {meta.budget}</span> : null}
          {meta?.date ? <span>· {meta.date}</span> : null}
          {meta?.readTime ? <span>· {meta.readTime} read</span> : null}
          {meta?.services?.length ? (
            <span className="flex flex-wrap items-center gap-1.5">
              {meta.services.map((s) => (
                <span key={s} className="rounded-full border border-border px-2.5 py-1">
                  {s}
                </span>
              ))}
            </span>
          ) : null}
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
          {hero.title}
          {hero.titleAccent ? (
            <>
              {" "}
              <span style={{ color: accent }}>{hero.titleAccent}</span>
            </>
          ) : null}
        </h1>

        {hero.summary ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {hero.summary}
          </p>
        ) : null}

        {/* byline */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span
            className="grid size-11 shrink-0 place-items-center rounded-full text-sm font-black"
            style={{ backgroundColor: `${accent}1f`, color: accent }}
          >
            {initials(cs.name)}
          </span>
          <div>
            <p className="text-sm font-bold">Built by Timewheel</p>
            <p className="text-xs text-muted-foreground">
              {meta?.client ? `${meta.client} · ` : ""}Strategy, design & engineering
            </p>
          </div>
          {liveUrl && liveUrl !== "#" ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:border-black/20"
            >
              Visit {cs.name}
              <ArrowUpRight className="size-4" />
            </a>
          ) : null}
        </div>
      </div>

      {/* body */}
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="mx-auto max-w-3xl">
            {sections.map((sec) => (
              <section
                key={sec.title}
                id={slugify(sec.title)}
                className="mb-14 scroll-mt-24"
              >
                <Eyebrow accent={accent}>{sec.eyebrow}</Eyebrow>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
                  {sec.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {sec.body}
                </p>
                {sec.bullets?.length ? (
                  <ul className="mt-5 space-y-3">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <BadgeCheck
                          className="mt-0.5 size-5 shrink-0"
                          style={{ color: accent }}
                        />
                        <span className="font-semibold">{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {sec.table ? <SectionTable table={sec.table} accent={accent} /> : null}
              </section>
            ))}

            {/* results */}
            {stats?.length ? (
              <section id="results" className="mb-14 scroll-mt-24">
                <Eyebrow accent={accent}>Results</Eyebrow>
                <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-card p-6">
                      <CountUpStat
                        value={s.value}
                        accent={accent}
                        className="text-3xl font-black tracking-tight"
                      />
                      <p className="mt-1 text-sm text-muted-foreground">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* quote */}
            {quote ? (
              <blockquote className="mb-14 border-l-4 py-1 pl-6" style={{ borderColor: accent }}>
                <p className="text-xl font-bold leading-snug tracking-tight">
                  “{quote.text}”
                </p>
                {quote.name ? (
                  <footer className="mt-3 text-sm text-muted-foreground">
                    {quote.name}
                    {quote.role ? ` · ${quote.role}` : null}
                  </footer>
                ) : null}
              </blockquote>
            ) : null}

            {/* faq */}
            {faq?.length ? (
              <section className="mb-14">
                <Eyebrow accent={accent}>Questions people ask</Eyebrow>
                <FaqAccordion items={faq} />
              </section>
            ) : null}

            {closing ? (
              <div className="mt-14 rounded-2xl border border-border bg-card p-8 text-center md:p-10">
                <Eyebrow accent={accent}>Next up</Eyebrow>
                <h2 className="mx-auto mt-3 max-w-xl text-2xl font-extrabold tracking-tight md:text-3xl">
                  {closing.title}
                </h2>
                <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
                  {closing.body}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={closing.ctaHref}
                    className="btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
                  >
                    {closing.ctaLabel}
                    <ArrowRight className="size-4" />
                  </a>
                  <Link
                    href="/case-studies"
                    className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    More case studies
                  </Link>
                </div>
              </div>
            ) : null}
        </div>
      </div>

      {/* related */}
      {related.length ? (
        <div className="border-t border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">
                  More case studies
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
                  Read another build
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                All case studies
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((c) => (
                <CaseStudyCard key={c.slug} cs={c} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}