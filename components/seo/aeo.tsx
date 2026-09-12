import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { seo } from "@/lib/seo";

// The differentiator section — AI-search visibility, tied to what the audit measures.
export function SeoAeo() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-brand">
            <Sparkles className="size-4" /> AEO · AI search
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{seo.aeo.title}</h2>
          <p className="mt-4 max-w-lg text-muted-foreground md:text-lg">{seo.aeo.body}</p>
        </Reveal>
        <Reveal delay={0.1} className="rounded-3xl border border-border bg-card p-7 md:p-9">
          <ul className="space-y-4">
            {seo.aeo.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm font-medium md:text-base">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-rating/10 text-rating">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
