import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";

const steps = [
  {
    n: "01",
    title: "Pick your stack",
    body: "Start from the segments above. Swap products in or out — every one of them runs on its own and gets better together.",
  },
  {
    n: "02",
    title: "We tailor and launch",
    body: "Set up under your brand, your data migrated, payments and workflows live. Built and run by the same team, end to end.",
  },
  {
    n: "03",
    title: "You own and grow",
    body: "Your code, your data, your rules — no platform rent, no commission on your sales, and a team that stays on support.",
  },
];

const ownership = [
  "Your code and data, exportable any time",
  "No platform commissions on your sales",
  "One team to design, build and run it",
  "No lock-in — the stack is yours to keep",
];

export function SolOwnership() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">
          How it works
        </p>
        <RevealHeading
          as="h2"
          className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl"
        >
          From pick to production, without the platform tax.
        </RevealHeading>
      </Reveal>

      <Reveal stagger className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-brand-text">
              {s.n}
            </span>
            <h3 className="mt-3 text-lg font-extrabold tracking-tight text-foreground">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-6">
        <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white md:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/20 blur-3xl"
          />
          <div className="relative flex flex-wrap items-start justify-between gap-8">
            <div className="max-w-md">
              <ShieldCheck className="size-7 text-white/80" aria-hidden />
              <h3 className="mt-5 text-2xl font-extrabold tracking-tight md:text-3xl">
                You own the whole stack.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                Every product here runs on systems you keep — no SaaS rent, no
                cut of your revenue, no lock-in if you ever move on.
              </p>
              <Link
                href="/book-a-demo"
                className="group mt-7 inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50"
              >
                Talk to the team
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ul className="grid gap-3">
              {ownership.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                >
                  <span
                    className="size-2 shrink-0 rounded-full bg-brand"
                    aria-hidden
                  />
                  <span className="text-sm font-medium text-white/85">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
