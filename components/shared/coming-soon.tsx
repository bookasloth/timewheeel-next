import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Reveal } from "@/components/reveal";

// Reusable placeholder for service pages that are announced in the nav but not
// built yet. Keeps links live (no dead "#") and routes intent to /contact.
export function ComingSoon({
  eyebrow,
  title,
  blurb,
  accent = "var(--brand)",
}: {
  eyebrow: string;
  title: string;
  blurb: string;
  /** hex or CSS color for the accent wash + chip */
  accent?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 size-72 rounded-full opacity-10" style={{ background: accent }} />
        <div className="absolute -right-20 top-10 size-64 rounded-full bg-accent-blue/10" />
        <div className="absolute left-1/3 top-1/2 size-56 rounded-full bg-accent-pink/10" />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: accent, opacity: 0.4 }} />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <Reveal>
          <span
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur"
            style={{ color: accent }}
          >
            <Clock className="size-3.5" />
            {eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-navy">{title}</span>
          </h1>
          <p className="mx-auto mt-4 inline-block text-lg font-bold" style={{ color: accent }}>
            Coming soon
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {blurb}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-brand-foreground"
            >
              Talk to Our Team
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/"
              className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
