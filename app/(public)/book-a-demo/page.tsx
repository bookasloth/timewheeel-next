import type { Metadata } from "next";
import {
  CalendarCheck,
  Ticket,
  Users,
  Coffee,
  MonitorSmartphone,
  Megaphone,
  TrendingUp,
  Bot,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { LeadForm } from "@/components/shared/lead-form";
import { JsonLd } from "@/components/json-ld";
import { organizationLd, breadcrumbLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

const TITLE = "Book a Demo | Timewheel";
const DESC =
  "See it live. Pick the demo you want, from Book A Sloth and Ticket Dino to websites, digital marketing, SEO and AI automation. We reply with a time within one business day.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/book-a-demo" },
  openGraph: { type: "website", url: `${site.url}/book-a-demo`, siteName: site.name, title: TITLE, description: DESC },
};

// The demos a prospect can book. Products first, then services. The form's
// dropdown mirrors this list plus "Something else".
const demos = [
  { icon: CalendarCheck, name: "Book A Sloth", blurb: "Bookings, payments and reminders on autopilot." },
  { icon: Ticket, name: "Ticket Dino", blurb: "Events, ticketing and check-in in one flow." },
  { icon: Users, name: "Alluminaty", blurb: "An alumni network platform that runs itself." },
  { icon: Coffee, name: "Coffee and Toffee", blurb: "A connected ordering and loyalty experience." },
  { icon: MonitorSmartphone, name: "Website or web app", blurb: "A custom build you fully own, start to finish." },
  { icon: Megaphone, name: "Digital marketing", blurb: "Performance, social and creative under one roof." },
  { icon: TrendingUp, name: "SEO", blurb: "Rank in Google and in AI search, measurably." },
  { icon: Bot, name: "AI & automation", blurb: "Automate the busywork behind your operations." },
];

const serviceOptions = [...demos.map((d) => d.name), "Something else"];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd(),
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Book a Demo", path: "/book-a-demo" },
    ]),
  ],
};

export default function BookADemoPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Book a demo</p>
            <RevealHeading
              as="h1"
              className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-tight md:text-6xl"
            >
              See it live. Pick your demo.
            </RevealHeading>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              We run several demos, one per product and service. Choose what you want to see,
              tell us a little about your business, and we reply with a time within one business day.
            </p>
          </Reveal>

          {/* Demo options */}
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
            {demos.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.05}>
                <a
                  href="#contact"
                  className="group block h-full rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/50"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand">
                    <d.icon className="size-5" strokeWidth={1.9} />
                  </span>
                  <h2 className="mt-4 text-base font-bold tracking-tight">{d.name}</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">{d.blurb}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Request form (reuses the lead pipeline) */}
      <LeadForm
        eyebrow="Request a demo"
        heading="Tell us what to show you"
        blurb="Pick the demo, share your goals, and we'll line up a 30-minute live walkthrough at a time that suits you."
        infoRows={[
          { k: "Email", v: site.contact.email },
          { k: "Phone", v: site.contact.phone },
          { k: "Response", v: site.contact.responseTime },
          { k: "Hours", v: site.contact.hours },
        ]}
        serviceOptions={serviceOptions}
        serviceLabel="Which demo?"
        submitLabel="Request my demo"
        successHeading="Demo requested"
        successBody="Thanks. We'll email you a time within one business day."
        idPrefix="demo"
        source="Book a demo"
      />
    </>
  );
}
