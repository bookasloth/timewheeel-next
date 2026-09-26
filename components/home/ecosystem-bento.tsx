import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { products, type Product } from "@/lib/products";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";

// Homepage "ecosystem" bento, real Timewheel products as mixed-size tiles.
// Cream/ink (Tactile Editorial) tokens; per-product accent only as an icon dab.

const flagship = products.find((p) => p.slug === "book-a-sloth")!;
const smalls = products
  .filter((p) => p.featured && p.slug !== "book-a-sloth")
  .slice(0, 3); // Alluminaty, Coffee & Toffee, Ticket Dino

function ProductTile({ product, className = "" }: { product: Product; className?: string }) {
  const { icon: Icon, accent, name, tagline, href } = product;
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-ink/40 ${className}`}
    >
      <span
        className="grid size-11 place-items-center rounded-xl"
        style={{ backgroundColor: `${accent}1f`, color: accent }}
      >
        <Icon className="size-5" />
      </span>
      <div className="mt-6">
        <p className="flex items-center gap-1 font-bold text-foreground">
          {name}
          <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">{tagline}</p>
      </div>
    </Link>
  );
}

export function EcosystemBento() {
  const { icon: Icon, accent, href } = flagship;
  const flagshipExternal = href.startsWith("http");

  return (
    <section id="ecosystem" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">The ecosystem</p>
        <RevealHeading as="h2" className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
          One connected system. Products you actually own.
        </RevealHeading>
      </Reveal>

      <Reveal stagger className="mt-12 grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-4 md:grid-cols-4">
        {/* flagship, 2x2 */}
        <Link
          href={href}
          {...(flagshipExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group col-span-2 row-span-2 flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-colors hover:border-ink/40"
        >
          <div className="flex items-center justify-between">
            <span className="grid size-12 place-items-center rounded-2xl" style={{ backgroundColor: `${accent}1f`, color: accent }}>
              <Icon className="size-6" />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rating/10 px-3 py-1 text-xs font-bold text-rating">
              <span className="size-1.5 rounded-full bg-rating" /> Live
            </span>
          </div>
          {/* faux product rows */}
          <div className="mt-6 space-y-2.5">
            {[92, 68, 80].map((w, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 px-3 py-2.5">
                <span className="size-5 shrink-0 rounded-md" style={{ backgroundColor: `${accent}26` }} />
                <span className="h-2 rounded-full bg-border" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="flex items-center gap-1 text-xl font-extrabold text-foreground">
              {flagship.name}
              <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">{flagship.blurb ?? flagship.tagline}</p>
          </div>
        </Link>

        {/* stat, bold orange tile */}
        <div className="flex flex-col justify-between rounded-2xl bg-brand p-5 text-brand-foreground">
          <p className="text-4xl font-black tracking-tight">10+</p>
          <p className="text-sm font-semibold">Products designed, built &amp; shipped</p>
        </div>

        {smalls[0] && <ProductTile product={smalls[0]} />}
        {smalls[1] && <ProductTile product={smalls[1]} />}
        {smalls[2] && <ProductTile product={smalls[2]} />}

        {/* ownership, ink tile, wide */}
        <div className="col-span-2 flex flex-col justify-between rounded-2xl bg-navy p-7 text-white">
          <ShieldCheck className="size-6 text-white/80" />
          <div className="mt-6">
            <p className="text-xl font-extrabold">You own the whole stack.</p>
            <p className="mt-1.5 max-w-md text-sm text-white/70">
              Your code, your data, your infrastructure, no platform commissions, no SaaS rent, no lock-in.
            </p>
          </div>
        </div>

        {/* CTA, see the work */}
        <Link
          href="/case-studies"
          className="group col-span-2 flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-colors hover:border-ink/40"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">Proof</p>
          <p className="mt-6 flex items-center gap-1.5 text-xl font-extrabold text-foreground">
            See what we&apos;ve built
            <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </p>
        </Link>
      </Reveal>
    </section>
  );
}
