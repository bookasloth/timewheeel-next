import { Reveal } from "@/components/reveal";
import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { smm } from "@/lib/social-media-marketing";

// PLACEHOLDER founder note — replace smm.founder with a real, permissioned
// person (name, role, photo) before publishing.
export function SmmFounder() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[0_24px_60px_-34px_rgba(26,29,36,0.4)] md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand/10 blur-3xl"
          />
          <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
            <span className="size-1.5 rounded-full bg-brand" />
            {smm.founder.eyebrow}
          </p>
          <Quotes className="mt-6 size-10 text-brand" weight="fill" />
          <blockquote className="mt-4 text-xl font-semibold leading-relaxed tracking-tight md:text-2xl">
            {smm.founder.quote}
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-full bg-brand/15 text-xl font-black text-brand">
              {smm.founder.initial}
            </span>
            <span>
              <span className="block font-bold leading-tight">{smm.founder.name}</span>
              <span className="block text-sm text-muted-foreground">{smm.founder.role}</span>
            </span>
          </figcaption>
        </div>
      </Reveal>
    </section>
  );
}
