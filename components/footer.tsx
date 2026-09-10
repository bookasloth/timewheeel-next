import Link from "next/link";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { NewsletterForm } from "@/components/newsletter-form";

const company = [
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

const legal = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
  { label: "Refund & SLA", href: "/legal/refund" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-black tracking-tight">
              TIME<span className="text-brand">WHEEL</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Build on systems you control forever. Bookings, payments, events,
              and communities — owned, not rented.
            </p>
            <NewsletterForm />
          </div>

          <div>
            <p className="text-sm font-semibold">Products</p>
            <ul className="mt-4 space-y-2.5">
              {products.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={p.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Company</p>
            <ul className="mt-4 space-y-2.5">
              {company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Legal</p>
            <ul className="mt-4 space-y-2.5">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden border-t border-border/60 pt-6">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 select-none whitespace-nowrap text-center text-[clamp(3.5rem,11vw,8rem)] font-black uppercase leading-none tracking-widest text-foreground/[0.04]"
          >
            Timewheel
          </span>
          <div className="relative flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} Timewheel. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href={site.social.twitter} className="hover:text-foreground">
                X
              </Link>
              <Link href={site.social.linkedin} className="hover:text-foreground">
                LinkedIn
              </Link>
              <Link href={site.social.youtube} className="hover:text-foreground">
                YouTube
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
