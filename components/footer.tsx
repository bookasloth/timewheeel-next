import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { NewsletterForm } from "@/components/newsletter-form";
import { WheelHalftone } from "@/components/brand/wheel-halftone";

// Site-wide footer. Top padding leaves room for the PreFooterCta form card,
// which overlaps down into this section on desktop.

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

// Only real profiles render; placeholder "#" links are dropped.
const social = [
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Instagram", href: site.social.instagram },
  { label: "X", href: site.social.twitter },
  { label: "YouTube", href: site.social.youtube },
].filter((s) => s.href !== "#");

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border/60 bg-secondary/60">
      {/* Faint wheel motif, echoing the pre-footer band. */}
      <WheelHalftone className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 text-brand opacity-[0.06]" />

      <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-14 lg:pt-44">
        {/* Centred brand + primary CTA */}
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/svg/timewheel-mark.svg" alt="" width={40} height={40} className="size-10" />
            <span className="text-xl font-black tracking-tight">
              TIME<span className="text-brand">WHEEL</span>
            </span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{site.tagline}</p>
          <Link
            href="/contact"
            className="group btn btn-primary mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground"
          >
            Book a call
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-16 grid gap-10 border-t border-border/60 pt-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* brand + address + newsletter */}
          <div>
            <ul className="space-y-3 text-sm text-muted-foreground">
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
            <p className="mt-6 text-sm font-semibold">Stay in the loop</p>
            <NewsletterForm variant="stacked" consent />
          </div>

          <FooterCol title="Services" links={services} />
          <FooterCol title="Company" links={company} />
          <FooterCol title="Resources" links={resources} />
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
