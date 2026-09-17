import { Quote } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/website-design";

function Avatar({ name, accent }: { name: string; accent: string }) {
  const initials = name
    .split(" ")
    .map((n) => n.charAt(0))
    .slice(0, 2)
    .join("");
  return (
    <span
      className="grid size-10 shrink-0 place-items-center rounded-full text-xs font-black text-white"
      style={{ backgroundColor: accent }}
    >
      {initials}
    </span>
  );
}

export function WdTestimonials() {
  const [featured, ...rest] = wd.testimonials.quotes;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-worange">{wd.testimonials.label}</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-[2.75rem]">
          {wd.testimonials.title}
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <Reveal className="lg:row-span-2">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-soft/70 p-8 md:p-10">
            <Quote
              className="absolute -right-4 -top-4 size-28 text-foreground/[0.05]"
              strokeWidth={0.8}
              aria-hidden
            />
            <div>
              <blockquote className="text-xl font-bold leading-[1.4] tracking-tight md:text-[1.7rem] md:leading-[1.35]">
                {featured.quote}
              </blockquote>
              <footer className="mt-8 flex items-center gap-3">
                <Avatar name={featured.name} accent={featured.accent} />
                <div>
                  <p className="text-sm font-bold">{featured.name}</p>
                  <p className="text-sm text-muted-foreground">{featured.role}</p>
                </div>
              </footer>
            </div>
          </div>
        </Reveal>

        {rest.map((t, i) => (
          <Reveal key={t.name} delay={0.1 + i * 0.08}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-shadow duration-300">
              <Quote className="size-7" strokeWidth={1.6} style={{ color: t.accent, opacity: 0.4 }} aria-hidden />
              <blockquote className="mt-3 flex-1 text-[15px] font-medium leading-relaxed text-foreground/85">
                {t.quote}
              </blockquote>
              <footer className="mt-6 flex items-center gap-3">
                <Avatar name={t.name} accent={t.accent} />
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </footer>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 border-t border-border/70 pt-8">
          <span className="mr-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Built for</span>
          {wd.testimonials.audiences.map((a) => (
            <span
              key={a}
              className="rounded-full border border-border bg-wsoft px-3.5 py-1.5 text-xs font-semibold text-foreground/75 transition-colors duration-200 hover:border-wblue/50 hover:text-foreground"
            >
              {a}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}