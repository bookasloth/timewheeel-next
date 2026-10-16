import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";

export function SolFinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 w-[600px] rounded-full opacity-20 blur-[100px]"
          style={{
            background: "radial-gradient(circle, var(--brand) 0%, transparent 60%)",
          }}
        />
        <RevealHeading
          as="h2"
          className="relative mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl"
        >
          Not sure which stack fits? Tell us who you serve.
        </RevealHeading>
        <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
          A short call is enough: we map your workflow to the products that fit,
          show you what running them looks like, and you decide from there.
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/book-a-demo"
            className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
          >
            Book a demo
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="text-sm font-bold text-foreground underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"
          >
            Or contact us
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
