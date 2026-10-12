import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  GoogleLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { footerRows, type SiteLink } from "@/lib/site-links";
import { site } from "@/lib/site";

// Site-wide footer: two rows of four columns. Row 1 is company info plus three
// link columns, row 2 is four link columns. Links come from lib/site-links so
// the /sitemap page stays in step.

// Only real profiles render; placeholder "#" links are dropped.
const social = [
  { label: "LinkedIn", href: site.social.linkedin, icon: LinkedinLogo },
  { label: "Instagram", href: site.social.instagram, icon: InstagramLogo },
  { label: "X", href: site.social.twitter, icon: XLogo },
  { label: "YouTube", href: site.social.youtube, icon: YoutubeLogo },
  { label: "Google reviews", href: site.social.google, icon: GoogleLogo },
].filter((s) => s.href !== "#");

export function Footer() {
  const [row1, row2] = footerRows;

  return (
    <footer className="mt-auto">
      <div className="border-t border-border/60 bg-secondary/60">
        <div className="mx-auto max-w-6xl px-6 py-14">
          {/* Row 1: company info + Services, Products, Company */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" aria-label="Timewheel home" className="flex items-center gap-2">
                <Image src="/brand/svg/timewheel-icon.svg" alt="" width={28} height={28} />
                <span className="text-xl font-black tracking-tight">
                  TIME<span className="text-brand">WHEEL</span>
                </span>
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
              <div className="mt-6 flex gap-2">
                {social.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    <Icon className="size-[18px]" weight="fill" />
                  </a>
                ))}
              </div>
            </div>

            {row1.map((g) => (
              <FooterCol key={g.title} title={g.title} links={g.links} />
            ))}
          </div>

          {/* Row 2: Initiatives, Community, Others, Legals */}
          <div className="mt-12 grid gap-10 border-t border-border/60 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {row2.map((g) => (
              <FooterCol key={g.title} title={g.title} links={g.links} />
            ))}
          </div>

          {/* bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-border/60 pt-6 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
            <p>© {new Date().getFullYear()} Timewheel. All rights reserved.</p>
            <p>Handcrafted by humans of TIPL</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: SiteLink[] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
