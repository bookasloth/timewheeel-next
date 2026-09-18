import Link from "next/link";
import { ArrowRight, ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

// Site-wide footer. Structure + design only; the estimate form is presentational.
// The coloured band and accents read `--footer-accent` (falls back to --brand),
// so each page type can retint the footer by setting that var on its layout.

const services = [
  { label: "SEO", href: "/seo-company-in-nagpur" },
  { label: "Digital Marketing", href: "/digital-marketing" },
  { label: "Web Development", href: "/web-development-company-in-india" },
  { label: "Web App Development", href: "/web-app-development" },
  { label: "Website Design", href: "/website-design" },
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

// Inline mad-lib fields for the estimate sentence (design only, uncontrolled).
// Pill styling + ring so each blank clearly reads as a fillable field.
function Blank({ ph, type = "text", min = "9ch" }: { ph: string; type?: string; min?: string }) {
  return (
    <input
      type={type}
      placeholder={ph}
      aria-label={ph}
      style={{ minWidth: min }}
      className="mx-1.5 inline-block rounded-lg border border-white/40 bg-white/10 px-3 py-1 align-baseline font-semibold text-white outline-none transition placeholder:font-normal placeholder:text-white/70 hover:bg-white/20 focus:border-white focus:bg-white/25 [field-sizing:content]"
    />
  );
}

function Pick({ ph, options }: { ph: string; options: string[] }) {
  return (
    <span className="relative mx-1.5 inline-flex items-center rounded-lg border border-white/40 bg-white/10 align-baseline transition hover:bg-white/20 focus-within:border-white focus-within:bg-white/25">
      <select
        defaultValue=""
        aria-label={ph}
        className="w-full cursor-pointer appearance-none bg-transparent py-1 pl-3 pr-8 font-semibold text-white outline-none [field-sizing:content]"
      >
        <option value="" disabled className="text-neutral-900">{ph}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-neutral-900">{o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 size-4 text-white/80" aria-hidden />
    </span>
  );
}

// `accent` retints the footer per page type. When omitted it falls back to the
// --footer-accent CSS var, then the global --brand (Timewheel orange).
export function Footer({ accent }: { accent?: string }) {
  const fa = accent ?? "var(--footer-accent, var(--brand))";
  return (
    <footer className="mt-auto">
      {/* Coloured CTA band — tint follows the current page type */}
      <section className="text-white" style={{ background: fa }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">Get your project estimate — free</p>
          <p className="mt-2 text-sm text-white/60">Tap a highlighted field and fill in the blanks.</p>
          {/* design-only mad-lib form: free-text for personal bits, dropdowns for choices */}
          <form className="mt-8 text-2xl font-medium leading-[2.2] tracking-tight md:text-[2rem] md:leading-[2]" aria-label="Project estimate">
            Hey, I&apos;m <Blank ph="Your Name" min="9ch" /> — you can reach me at{" "}
            <Blank ph="Email Address" type="email" min="12ch" /> or <Blank ph="Phone Number" type="tel" min="11ch" />.
            I&apos;m building <Blank ph="Project / Business Name" min="14ch" /> and I need help with{" "}
            <Pick ph="Design / SEO / Development / Marketing…" options={["Design", "SEO", "Web Development", "Web App", "Digital Marketing", "Branding", "Something else"]} />.
            The idea is simple: turn <Blank ph="what it is today" min="12ch" /> into{" "}
            <Blank ph="what I want it to become" min="14ch" />.
            I&apos;m ready to invest around{" "}
            <Pick ph="₹ Budget" options={["Under ₹50k", "₹50k – ₹1L", "₹1L – ₹3L", "₹3L – ₹10L", "₹10L+"]} /> and would like to get moving{" "}
            <Pick ph="Timeline" options={["ASAP", "This month", "This quarter", "Just exploring"]} />.
            So… shall we make it happen?
            <span className="mt-8 block">
              <button
                type="button"
                style={{ color: fa }}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              >
                Let&apos;s Talk <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </span>
          </form>
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
