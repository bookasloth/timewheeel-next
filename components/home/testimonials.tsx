import Link from "next/link";
import { Star } from "lucide-react";
import { Reveal } from "@/components/reveal";

const quotes = [
  "We stopped depending on disconnected tools for bookings and payments. Everything now runs through one stable workflow built for ownership.",
  "Timewheel gave our business direct control over customers, revenue, and operations without relying on third-party platforms to keep everything running.",
  "Instead of paying for multiple subscriptions every month, we consolidated our workflows into systems we actually control and fully own.",
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < 4
              ? "size-4 fill-rating text-rating"
              : "size-4 fill-rating/40 text-rating/40"
          }
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="border-y border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-extrabold md:text-4xl">
            Built for modern businesses replacing platform dependency
          </h2>
        </Reveal>
        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {quotes.map((q) => (
            <figure
              key={q}
              className="flex flex-col rounded-2xl border border-border bg-card p-7"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{q}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-xs text-muted-foreground">
                Rated 4.5/5 — from over 100 reviews
              </figcaption>
            </figure>
          ))}
        </Reveal>
        <Reveal className="mt-10 flex justify-center">
          <Link
            href="#"
            className="btn btn-green inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white"
          >
            Read all testimonials on Trustpilot
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
