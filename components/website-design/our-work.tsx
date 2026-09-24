"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/website-design";
import { products } from "@/lib/products";
import { LoadMoreProjects } from "@/components/web-development/load-more-projects";

const bySlug = new Map(products.map((p) => [p.slug, p]));

export function WdOurWork() {
  return (
    <div className="mt-16">
      <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {wd.ourWork.items.map((item) => {
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

      <LoadMoreProjects />

      <Reveal className="mt-12">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-white px-6 py-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-base font-bold tracking-tight">Want to see your business here?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Every project above started with a conversation about a goal.
            </p>
          </div>
          <Link
            href={wd.hero.primaryCta.href}
            className="group btn btn-primary inline-flex shrink-0 items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
          >
            Start a Project
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}