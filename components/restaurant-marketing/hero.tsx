import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function RmHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-16 text-center md:pb-20 md:pt-20">

        <Reveal>
          <h1 className="mt-6 text-5xl font-black leading-[1.04] tracking-tight md:text-6xl lg:text-7xl">
            Digital Marketing Agency{" "}
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: "2.5px #fe5100",
                fontFamily: "var(--font-sans), sans-serif",
              }}
            >
              for Restaurants
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Boost your restaurant&apos;s brand engagement and bring more customers
            with our top-rated digital marketing agency for restaurants.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#contact"
              className="group btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
            >
              Work With Us
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#services"
              className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
            >
              Restaurant Marketing Services
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}