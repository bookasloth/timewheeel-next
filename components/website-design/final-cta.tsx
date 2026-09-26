import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/website-design";
import { RevealHeading } from "@/components/anim/reveal-heading";

export function WdFinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-8 pt-2 md:pb-12">
      <Reveal className="relative overflow-hidden rounded-3xl bg-black text-center text-white">
        <div className="relative px-6 py-20 md:px-12 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/50">Let&apos;s talk</p>
          <RevealHeading as="h2" className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight md:text-6xl">
            {wd.finalCta.title}
          </RevealHeading>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">{wd.finalCta.sub}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={wd.finalCta.cta.href}
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
            >
              {wd.finalCta.cta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={wd.finalCta.secondary.href}
              className="group inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {wd.finalCta.secondary.label}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}