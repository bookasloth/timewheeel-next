import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wa } from "@/lib/web-app-development";

export function WaFinalCta() {
  return (
    <section className="bg-navy">
      <Reveal>
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-20 text-center md:pb-28 md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70">
            <span className="size-1.5 animate-pulse rounded-full bg-rating" />
            Available for new projects
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-white md:text-5xl">
            {wa.finalCta.headingA} <span className="text-brand">{wa.finalCta.headingB}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70 md:text-lg">{wa.finalCta.body}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={wa.finalCta.primaryCta.href}
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-brand-foreground"
            >
              {wa.finalCta.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={wa.finalCta.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10"
            >
              {wa.finalCta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
