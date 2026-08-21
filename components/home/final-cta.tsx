import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function FinalCta() {
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
        <h2 className="relative mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
          One connected ecosystem for modern business operations
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
          Replace fragmented subscriptions with focused systems for bookings,
          payments, events, communities, and customer workflows — all working
          together so your business runs with more control, clarity, and
          ownership.
        </p>
        <Link
          href="#ecosystem"
          className="group btn btn-primary mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Explore the Ecosystem
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </section>
  );
}
