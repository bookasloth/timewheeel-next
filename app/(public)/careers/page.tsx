import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Mail, MapPin, Users } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { CareersHero } from "@/components/careers/hero";
import { CareersRoles } from "@/components/careers/roles";
import { breadcrumbLd, organizationLd } from "@/lib/jsonld";
import { jobs } from "@/lib/jobs";
import { site } from "@/lib/site";

const TITLE = "Careers, Sales Executive in Nagpur | Timewheel";
const DESC =
  "Open roles at Timewheel Internet (P) Ltd. Hire a Sales Executive in the Greater Nagpur Area. ₹10,000/month plus bonus and uncapped commission. Freshers welcome.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/careers" },
  ...social({ path: "/careers", title: TITLE, description: DESC }),
};

// No FAQPage here: the index renders no visible questions. The role detail
// pages own their own FAQPage, mirroring the list they actually show.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Careers", path: "/careers" },
    ]),
  ],
};

export default function CareersPage() {
  return (
    <div className="overflow-x-clip">
      <JsonLd data={jsonLd} />
      <CareersHero />
      <CareersRoles />

      {/* No match yet? Point at the mailbox, it's the fastest route in. */}
      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
                  Nothing that fits today
                </p>
                <h2 className="mt-5 font-black tracking-tight">
                  Send us a note anyway.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Tell us what you do well and where you want to grow. We keep
                  good conversations open and hire ahead when a role opens up.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Careers at Timewheel")}`}
                  className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-brand-foreground"
                >
                  <Mail className="size-4" />
                  {site.contact.email}
                </a>
                <Link
                  href="/contact"
                  className="btn btn-outline inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold"
                >
                  Visit our office
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-2">
              <BriefcaseBusiness className="size-4 text-brand" strokeWidth={1.9} />
              {jobs.length} open {jobs.length === 1 ? "role" : "roles"}
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-brand" strokeWidth={1.9} />
              {site.contact.city}, {site.contact.addressRegion}
            </li>
            <li className="inline-flex items-center gap-2">
              <Users className="size-4 text-brand" strokeWidth={1.9} />
              Freshers welcome
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}