import Link from "next/link";
import { ArrowRight, CalendarClock, MapPin, Timer } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function ContactHero() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <Reveal>

          <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
            Say hello.{" "}
            <span className="text-brand">We read every message.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            A product idea, a project brief, or just a question about how we
            work — tell us what you&apos;re building and we&apos;ll get back to
            you within one business day.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-brand" />
              Based in {site.contact.city}, {site.contact.region}
            </span>
            <span className="inline-flex items-center gap-2">
              <Timer className="size-4 text-brand" />
              {site.contact.responseTime}
            </span>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Link
              href="#contact"
              className="group btn btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-brand-foreground"
            >
              Start a conversation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={site.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold"
            >
              <CalendarClock className="size-4" />
              Book a meeting
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}