import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Car,
  IndianRupee,
  ListChecks,
  MapPin,
  Target,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { site } from "@/lib/site";
import type { Job } from "@/lib/jobs";

// Icon per "at a glance" fact label, so the rail reads at a glance. Anything
// unrecognised falls back to a neutral dot.
const FACT_ICON: Record<string, typeof MapPin> = {
  Location: MapPin,
  "Work type": Car,
  Experience: Users,
  Employment: BriefcaseBusiness,
  Compensation: IndianRupee,
};

function bullets(items: string[]) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.975rem] leading-relaxed">
          <span
            aria-hidden
            className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-brand"
          />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** A single role, on its own page. Sticky facts rail + the full description. */
export function JobDetail({ job }: { job: Job }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-14">
        {/* Description */}
        <div>
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link href="/careers" className="hover:text-foreground">
              Careers
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span className="text-foreground">{job.title}</span>
          </nav>

          <Reveal>
            <RevealHeading
              as="h1"
              className="mt-5 font-black tracking-tight"
            >
              {job.title}
            </RevealHeading>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-brand-text">
              <span>{job.department}</span>
              <span aria-hidden>·</span>
              <span>{job.employmentType}</span>
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {job.intro}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-brand-foreground"
              >
                Apply for this role
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent(
                  `Application: ${job.title}`,
                )}`}
                className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold"
              >
                Send your CV by email
              </a>
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <div className="flex items-center gap-2.5">
              <ListChecks className="size-5 text-brand" strokeWidth={1.9} />
              <RevealHeading as="h2" className="font-extrabold tracking-tight">
                What you&apos;ll do
              </RevealHeading>
            </div>
            {bullets(job.responsibilities)}
          </Reveal>

          <Reveal className="mt-14">
            <div className="flex items-center gap-2.5">
              <Target className="size-5 text-brand" strokeWidth={1.9} />
              <RevealHeading as="h2" className="font-extrabold tracking-tight">
                What we&apos;re looking for
              </RevealHeading>
            </div>
            {bullets(job.requirements)}
          </Reveal>

          <Reveal className="mt-14">
            <div className="flex items-center gap-2.5">
              <IndianRupee className="size-5 text-brand" strokeWidth={1.9} />
              <RevealHeading as="h2" className="font-extrabold tracking-tight">
                Compensation
              </RevealHeading>
            </div>
            <div className="mt-5 rounded-2xl border border-border bg-card p-6">
              <p className="text-xl font-extrabold tracking-tight text-brand-text">
                ₹10,000/month + Sales Bonus + Commission
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Your earnings increase with performance. There is no fixed
                ceiling on incentives.
              </p>
              <ul className="mt-5 space-y-2.5">
                {job.compensation.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm">
                    <span
                      aria-hidden
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rating"
                    />
                    <span className="text-muted-foreground">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* At-a-glance rail */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                At a glance
              </p>
              <dl className="mt-5 space-y-4">
                {job.facts.map((f) => {
                  const Icon = FACT_ICON[f.k];
                  return (
                    <div key={f.k} className="flex gap-3">
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                        {Icon ? (
                          <Icon className="size-4" strokeWidth={1.9} />
                        ) : (
                          <span className="size-1.5 rounded-full bg-brand" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {f.k}
                        </dt>
                        <dd className="mt-0.5 text-sm font-semibold leading-snug">
                          {f.v}
                        </dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </div>

            {/* <p className="mt-4 rounded-2xl border border-border bg-secondary/50 p-5 text-sm leading-relaxed text-muted-foreground">
              Applying through this page takes about two minutes. If you have a
              portfolio, a LinkedIn profile, or a short note on how you&apos;d
              approach a business owner, add it — it counts for more than a
              formal CV.
            </p> */}
          </Reveal>
        </aside>
      </div>
    </section>
  );
}