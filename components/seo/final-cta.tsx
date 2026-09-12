import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function SeoFinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-navy px-8 py-16 text-center md:py-20">
        <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
          See exactly where your site stands — free
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/70 md:text-lg">
          Run the instant AI + SEO audit, then get a clear, honest plan to fix what&apos;s
          holding your Nagpur rankings back. No sign-up, no obligation.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#top"
            className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-brand-foreground"
          >
            Run my free audit
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Talk to us
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
