import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { palette, wd } from "@/lib/website-design";

export function WdFinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-8 pt-2 md:pb-12">
      <Reveal className="relative overflow-hidden rounded-3xl bg-wdark text-center text-white">
        {/* subtle gradient glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-24 -top-40 size-[28rem] rounded-full opacity-30 blur-3xl"
            style={{ background: `radial-gradient(circle, ${palette.blue}, transparent 70%)` }}
          />
          <div
            className="absolute -bottom-48 right-0 size-[26rem] rounded-full opacity-25 blur-3xl"
            style={{ background: `radial-gradient(circle, ${palette.purple}, transparent 70%)` }}
          />
          <div
            className="absolute -right-16 top-16 size-64 rounded-full opacity-20 blur-3xl"
            style={{ background: `radial-gradient(circle, ${palette.orange}, transparent 70%)` }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 select-none whitespace-nowrap text-[clamp(4rem,12vw,9rem)] font-black uppercase leading-none tracking-tighter text-white/[0.03]"
          >
            Timewheel
          </div>
        </div>

        <div className="relative px-6 py-20 md:px-12 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/50">Let&apos;s talk</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight md:text-6xl">
            {wd.finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">{wd.finalCta.sub}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={wd.finalCta.cta.href}
              className="group btn btn-blue inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
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