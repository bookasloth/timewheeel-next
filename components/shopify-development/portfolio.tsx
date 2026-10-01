import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SdSectionHeading } from "@/components/shopify-development/section-heading";
import { sd } from "@/lib/shopify-development";

/** Card links to its case study, falling back to the live store so a card can
    never point at a page that does not exist. */
function sdCaseStudyHref(slug: string | undefined, fallback: string) {
  return slug ? `/case-studies/${slug}` : fallback;
}

export function SdPortfolio() {
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <SdSectionHeading
          label={sd.portfolio.label}
          heading={sd.portfolio.heading}
          accent={sd.portfolio.headingAccent}
          body={sd.portfolio.body}
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2">
          {sd.portfolio.cards.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06} className="h-full">
              {/* The whole card is the case study via a stretched link on the
                  title: an <a> cannot wrap the card because the live-store
                  link below is a real anchor, and nested anchors are invalid.
                  `sdCaseStudyHref` falls back to the live store if a future
                  card has no study, so it can never be a dead link. */}
              <div
                style={{ "--sd-accent": c.accent } as CSSProperties}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-[color:var(--sd-accent)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
                  <Image
                    src={c.image}
                    alt={`${c.name} store built by Timewheel`}
                    fill
                    sizes="(min-width: 640px) 450px, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent"
                  />

                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm">
                    <span className="relative flex size-1.5">
                      <span
                        className="absolute inline-flex size-full animate-ping rounded-full opacity-70"
                        style={{ backgroundColor: c.accent }}
                      />
                      <span
                        className="relative inline-flex size-1.5 rounded-full"
                        style={{ backgroundColor: c.accent }}
                      />
                    </span>
                    Live store
                  </span>

                  <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full border border-border bg-card/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="size-3.5" style={{ color: c.accent }} />
                  </span>

                  <span
                    className="absolute bottom-3 left-3 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                    style={{ backgroundColor: c.accent }}
                  >
                    {c.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold leading-snug tracking-tight">
                    <Link
                      href={sdCaseStudyHref(c.caseStudy, c.href)}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {c.name}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {c.problem}
                  </p>
                  <p
                    className="mt-2.5 line-clamp-2 flex items-start gap-1.5 text-sm font-semibold"
                    style={{ color: c.accent }}
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                    {c.result}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <span className="flex items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
                      Read case study
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                    {/* relative z-10 keeps this clickable: it sits above the
                        stretched ::after that covers the rest of the card. */}
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      Visit live store
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
