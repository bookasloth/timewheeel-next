import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

// ponytail: no WhatsApp deep link yet — needs a real number. Add a wa.me
// secondary CTA here once one exists (blueprint MUST-HAVE); until then both
// paths route to the on-page form rather than shipping a dead link.
export function WdFinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-navy px-8 py-16 text-center md:py-20">
        <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
          Ready to Build Something That Loads Fast and Ranks?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/70 md:text-lg">
          Send us your project. Get a fixed scope, a fixed price and a written timeline within
          one business day — and keep full ownership of everything we build.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#contact"
            className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-brand-foreground"
          >
            Get a Fixed Quote in 24 Hours
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#work"
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            See our work
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
