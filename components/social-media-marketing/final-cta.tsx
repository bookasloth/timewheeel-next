import Link from "next/link";
import { ArrowRight, CalendarCheck, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";
import { site } from "@/lib/site";
import { RevealHeading } from "@/components/anim/reveal-heading";

export function SmmFinalCta() {
  return (
    <section className="w-full">
      <Reveal className="relative overflow-hidden bg-black px-6 py-16 text-center text-white md:px-8 md:py-20">
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white/85">
            <span className="size-1.5 rounded-full bg-accent-yellow" />
            Start the conversation
          </p>
          <RevealHeading as="h2" className="mx-auto mt-5 max-w-2xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
            {smm.finalCta.heading}
          </RevealHeading>
          <p className="mx-auto mt-5 max-w-xl text-white/75 md:text-lg">{smm.finalCta.body}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={smm.finalCta.primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-[#1d4ed8] transition-colors hover:bg-white/90"
            >
              <MessageCircle className="size-4" />
              {smm.finalCta.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={site.demoUrl}
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <CalendarCheck className="size-4" />
              {smm.finalCta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}