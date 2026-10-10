import { Award, BadgeCheck, Briefcase, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { CAREER_SUPPORT, CERT_PLATFORMS } from "@/lib/academy";

const ICONS: Record<(typeof CAREER_SUPPORT)[number]["key"], LucideIcon> = {
  certificate: Award,
  online: BadgeCheck,
  internships: Briefcase,
};

/** Certificate, online certification help and internships: three columns, hairline-separated. */
export function CareerSupport() {
  return (
    <section id="certificates-internships" className="scroll-mt-32 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Beyond the program</p>
          <RevealHeading as="h2" className="mt-5 font-black tracking-tight">
            Certificates and internships
          </RevealHeading>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The portfolio shows what you can do. These help you take it further.
          </p>
        </Reveal>

        <div className="mt-12 grid border-t border-border md:grid-cols-3">
          {CAREER_SUPPORT.map((c, i) => {
            const Icon = ICONS[c.key];
            return (
              <Reveal
                key={c.key}
                delay={i * 0.05}
                className="border-b border-border py-8 md:border-b-0 md:px-8 md:first:pl-0 md:[&:not(:first-child)]:border-l"
              >
                <Icon aria-hidden className="size-6 text-brand" strokeWidth={1.8} />
                <h3 className="mt-5 text-lg font-extrabold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                {c.key === "online" && (
                  <p className="mt-4 text-sm font-semibold">{CERT_PLATFORMS.join(" · ")}</p>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
