import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SdSectionHeading } from "@/components/shopify-development/section-heading";
import { sd } from "@/lib/shopify-development";

export function SdSpecialized() {
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <SdSectionHeading
          label={sd.specialized.label}
          heading={sd.specialized.heading}
          accent={sd.specialized.headingAccent}
          body={sd.specialized.body}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {sd.specialized.cards.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.06} className="h-full">
              <Link
                href={c.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-brand/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold">{c.title}</h3>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                <span className="mt-4 text-sm font-semibold text-brand-text">Learn More</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
