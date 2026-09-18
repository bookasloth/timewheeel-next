import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { EstimateForm } from "@/components/estimate-form";

// Site-wide footer. The coloured band and accents read `--footer-accent`
// (falls back to --brand), so each page type can retint the footer.

const services = [
  { label: "SEO", href: "/seo-company-in-nagpur" },
  { label: "Digital Marketing", href: "/digital-marketing" },
  { label: "Web Development", href: "/web-development-company-in-nagpur" },
  { label: "Web App Development", href: "/web-app-development-company-in-nagpur" },
  { label: "Website Design", href: "/website-design-company-in-nagpur" },
  { label: "Restaurant Marketing", href: "/restaurant-marketing" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/case-studies" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const resources = [
  { label: "Free SEO Audit", href: "/seo-company-in-nagpur" },
  { label: "Book a Call", href: "/contact" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms & Conditions", href: "/legal/terms" },
  { label: "Refund & SLA", href: "/legal/refund" },
];

const social = [
  { label: "X", href: site.social.twitter },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "YouTube", href: site.social.youtube },
];


// `accent` retints the footer per page type. When omitted it falls back to the
// --footer-accent CSS var, then the global --brand (Timewheel orange).
export function Footer({ accent }: { accent?: string }) {
  const fa = accent ?? "var(--footer-accent, var(--brand))";
  return (
    <footer className="mt-auto">
      {/* Coloured CTA band — tint follows the current page type */}
      <section className="text-white" style={{ background: fa }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <EstimateForm accent={fa} />
        </div>
      </section>

      {/* Footer body */}
      <div className="border-t border-border/60 bg-secondary/60">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            {/* brand + address */}
            <div>
              <Link href="/" className="text-xl font-black tracking-tight">
                TIME<span className="text-brand">WHEEL</span>
              </Link>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>Eureka Coworking, Pratap Nagar Metro Square, Nagpur, Maharashtra</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="size-4 shrink-0 text-brand" />
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-foreground">{site.contact.phone}</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="size-4 shrink-0 text-brand" />
                  <a href={`mailto:${site.contact.email}`} className="hover:text-foreground">{site.contact.email}</a>
                </li>
              </ul>
            </div>

            <FooterCol title="Services" links={services} />
            <FooterCol title="Company" links={company} />

            <div className="grid gap-10">
              <FooterCol title="Resources" links={resources} />
              <FooterCol title="By Timewheel" links={products.slice(0, 5).map((p) => ({ label: p.name, href: p.href }))} />
            </div>
          </div>

          {/* bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} Timewheel. All rights reserved.</p>
            <div className="flex gap-5">
              {social.map((s) => (
                <Link key={s.label} href={s.href} className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={`${title}-${l.href}-${l.label}`}>
            <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
