import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { featuredProducts, type Product } from "@/lib/products";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

function MockCard({ product }: { product: Product }) {
  const { icon: Icon, accent, name } = product;
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-3xl opacity-15 blur-3xl"
        style={{ background: accent }}
      />
      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <span
            className="grid size-12 place-items-center rounded-2xl"
            style={{ backgroundColor: `${accent}1f`, color: accent }}
          >
            <Icon className="size-6" />
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            Live
          </span>
        </div>
        <p className="mt-5 text-base font-semibold">{name}</p>
        {/* faux UI rows */}
        <div className="mt-4 space-y-2.5">
          {[90, 70, 82].map((w, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 px-3 py-3"
            >
              <span
                className="size-6 shrink-0 rounded-md"
                style={{ backgroundColor: `${accent}26` }}
              />
              <span
                className="h-2.5 rounded-full bg-border"
                style={{ width: `${w}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureBlock({ product, flip }: { product: Product; flip: boolean }) {
  const { icon: Icon, accent, name, blurb, href, bullets } = product;
  return (
    <Reveal className="grid items-center gap-10 md:grid-cols-2">
      <div className={cn(flip && "md:order-2")}>
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: `${accent}1a`, color: accent }}
        >
          <Icon className="size-4" />
          {product.tagline}
        </span>
        <h3 className="mt-4 text-3xl font-extrabold md:text-4xl">{name}</h3>
        <p className="mt-3 max-w-md text-muted-foreground">{blurb}</p>

        <div className="my-6 h-px w-full max-w-md bg-border" />

        <ul className="space-y-3">
          {bullets?.map((b) => (
            <li key={b} className="flex items-center gap-3">
              <BadgeCheck className="size-5 shrink-0 text-navy" />
              <span className="text-sm font-semibold">{b}</span>
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className="btn btn-primary mt-7 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
        >
          Learn more
        </Link>
      </div>
      <div className={cn(flip && "md:order-1")}>
        <MockCard product={product} />
      </div>
    </Reveal>
  );
}

export function FeaturedProducts() {
  return (
    <section id="ecosystem" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          The ecosystem
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold md:text-4xl">
          Focused systems for every part of your business
        </h2>
      </Reveal>
      <div className="mt-16 space-y-20 md:space-y-28">
        {featuredProducts.map((p, i) => (
          <FeatureBlock key={p.slug} product={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
