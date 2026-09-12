import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/web-development";
import { products } from "@/lib/products";

const bySlug = new Map(products.map((p) => [p.slug, p]));

// Portfolio-first: web-dev buyers scroll for proof of real work before anything else.
export function WdPortfolio() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Proof</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          {wd.portfolio.title}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{wd.portfolio.body}</p>
      </Reveal>

      <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {wd.portfolio.items.map((item) => {
          const p = bySlug.get(item.slug);
          if (!p) return null;
          const Icon = p.icon;
          const isLive = Boolean(item.live);
          const href = item.live ?? `/products/${p.slug}`;
          return (
            <Link
              key={item.slug}
              href={href}
              {...(isLive ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/50"
            >
              <div className="flex items-center justify-between">
                <span
                  className="grid size-11 place-items-center rounded-xl"
                  style={{ backgroundColor: `${p.accent}1a`, color: p.accent }}
                >
                  <Icon size={22} weight="duotone" />
                </span>
                <span
                  className={
                    isLive
                      ? "inline-flex items-center gap-1 rounded-full bg-rating/10 px-2 py-0.5 text-[10px] font-bold text-rating"
                      : "rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-muted-foreground"
                  }
                >
                  {isLive ? "Live" : "In rollout"}
                </span>
              </div>
              <h3 className="mt-4 flex items-center gap-1.5 text-lg font-bold">
                {p.name}
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{p.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.result}</p>
            </Link>
          );
        })}
      </Reveal>
    </section>
  );
}
