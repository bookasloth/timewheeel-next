import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function AimFinalCta() {
  return (
    <section className="mx-auto max-w-full px-6 py-20 md:py-28">
      <Reveal className="relative overflow-hidden rounded-3xl text-center text-white aim-panel">
        <div aria-hidden className="pointer-events-none absolute inset-0 aim-dot-grid opacity-50" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full aim-bloom dm-drift opacity-50"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full aim-bloom dm-drift opacity-40"
        />
        <div className="relative px-8 pb-16 pt-20 md:pb-20 md:pt-24">
          <h2 className="mx-auto max-w-3xl text-4xl font-black leading-[1.06] tracking-tight md:text-6xl">
            Ready to Put{" "}
            <span
              className="dm-gradient-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #8b5cf6, #269cef, #25D366, #8b5cf6)",
              }}
            >
              AI
            </span>{" "}
            to Work?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Let&apos;s build an AI marketing system around your business,
            automating the busywork, sharpening your targeting, and capturing
            every enquiry, all in one direction.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#contact"
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
            >
              Book a Meeting
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#services"
              className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
              style={{ color: "#fff", borderColor: "rgba(255,255,255,0.35)" }}
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
