import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { aiAuto } from "@/lib/ai-automation-nagpur";
import { RevealHeading } from "@/components/anim/reveal-heading";

export function AiFinalCta() {
  const { finalCta } = aiAuto;
  return (
    <section className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <Reveal>
          <RevealHeading as="h2" className="text-3xl font-black tracking-tight text-navy md:text-5xl">{finalCta.heading}</RevealHeading>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {finalCta.sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={finalCta.primaryCta.href}
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-brand-foreground"
            >
              {finalCta.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={finalCta.secondaryCta.href}
              className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold"
            >
              {finalCta.secondaryCta.label}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
