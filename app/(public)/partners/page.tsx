import type { Metadata } from "next";
import { ArrowRight, Handshake, Megaphone, Users } from "lucide-react";
import { social } from "@/lib/metadata";
import { site } from "@/lib/site";

const TITLE = "Partner with Timewheel, Referral and Agency Partnerships";
const DESC =
  "Refer clients, white-label our web and SEO work, or build together. Partnership options with Timewheel, a product studio and digital agency in Nagpur.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/partners" },
  ...social({ path: "/partners", title: TITLE, description: DESC }),
};

const types = [
  {
    icon: Users,
    title: "Referral partners",
    body: "Know a business that needs a website, SEO or ads? Introduce them and earn a referral fee when they sign. Good for consultants, CAs and freelancers.",
  },
  {
    icon: Handshake,
    title: "Agency and white-label",
    body: "Agencies and freelancers can hand us design, development or SEO delivery under their own brand, with clear timelines and pricing.",
  },
  {
    icon: Megaphone,
    title: "Product and community",
    body: "Integrations, co-hosted workshops, Academy collaborations and community events in Nagpur and online.",
  },
];

const steps = [
  "Email us with who you are and the kind of partnership you have in mind.",
  "We get on a short call to see if it is a fit for both sides.",
  "We agree terms in writing before any work or referral starts.",
];

export default function PartnersPage() {
  const mail = `mailto:${site.contact.email}?subject=${encodeURIComponent("Partnership with Timewheel")}`;

  return (
    <div className="overflow-x-clip">
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-24 text-center md:pt-32">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Partner with us</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Grow together with Timewheel</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          We work with consultants, agencies and builders who look out for the same clients we do.
          Here is how we can team up.
        </p>
        <a href={mail} className="btn btn-primary group mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-brand-foreground">
          Start a conversation
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </section>

      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 py-16 md:grid-cols-3 md:py-20">
          {types.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-7">
              <Icon className="size-6 text-brand" />
              <h2 className="mt-4 text-lg font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">How it works</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight">Three steps, no surprises</h2>
        <ol className="mt-8 space-y-4">
          {steps.map((s, i) => (
            <li key={s} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="text-2xl font-black text-brand">{i + 1}</span>
              <span className="pt-1 text-sm">{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-muted-foreground">
          Write to{" "}
          <a href={mail} className="text-brand hover:underline">{site.contact.email}</a>{" "}
          or call {site.contact.phone}.
        </p>
      </section>
    </div>
  );
}
