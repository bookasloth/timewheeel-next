import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, MapPin, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { jobs } from "@/lib/jobs";

// The open-roles list on /careers. One card per role, linking to its detail page.
export function CareersRoles() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28" id="open-roles">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
          Open positions
        </p>
        <RevealHeading as="h2" className="mt-5 max-w-2xl font-black tracking-tight">
          {jobs.length === 1
            ? "One role open right now."
            : `${jobs.length} roles open right now.`}
        </RevealHeading>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Freshers welcome on every role listed here. If nothing fits today, send
          a note anyway, we hire ahead when the timing works.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4">
        {jobs.map((job, i) => (
          <Reveal key={job.slug} delay={i * 0.05}>
            <Link
              href={`/careers/${job.slug}`}
              className="group block rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/60 md:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl font-extrabold tracking-tight">
                      {job.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-rating" />
                      Accepting applications
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <BriefcaseBusiness className="size-4" strokeWidth={1.9} />
                      {job.department}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-4" strokeWidth={1.9} />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="size-4" strokeWidth={1.9} />
                      {job.workType}
                    </span>
                  </div>

                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {job.summary}
                  </p>
                </div>

                <span className="btn btn-outline inline-flex shrink-0 items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold">
                  View role
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}