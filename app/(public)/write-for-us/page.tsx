import type { Metadata } from "next";
import { ArrowRight, Check, X } from "lucide-react";
import { social } from "@/lib/metadata";
import { site } from "@/lib/site";

const TITLE = "Write for Us, Guest Posts on the Timewheel Blog";
const DESC =
  "Pitch a guest post to the Timewheel blog. We publish practical, original writing on SEO, websites, ads, social media and building products for Indian businesses.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/write-for-us" },
  ...social({ path: "/write-for-us", title: TITLE, description: DESC }),
};

const topics = [
  "SEO and local search",
  "Website design and development",
  "Paid ads and performance marketing",
  "Social media and content",
  "Shopify and e-commerce",
  "Building and running products",
];

const yes = [
  "Original work, not published anywhere else",
  "Based on something you did, with real examples",
  "Clear steps a reader can apply",
  "Your own screenshots or data where it helps",
];

const no = [
  "AI-generated filler or spun articles",
  "Paid links or link insertions",
  "Thin listicles and press releases",
  "Gambling, crypto schemes or adult content",
];

export default function WriteForUsPage() {
  const mail = `mailto:${site.contact.email}?subject=${encodeURIComponent("Guest post pitch")}`;

  return (
    <div className="overflow-x-clip">
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-24 text-center md:pt-32">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Write for us</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Share what you&apos;ve learned</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          The Timewheel blog publishes practical writing for business owners and marketers. If you
          have done the work and can explain it clearly, we want to hear from you.
        </p>
        <a href={mail} className="btn btn-primary group mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-brand-foreground">
          Pitch an idea
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </section>

      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Topics we cover</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-5 text-sm font-medium">{t}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-2 md:py-20">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-lg font-bold">What we look for</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {yes.map((w) => (
              <li key={w} className="flex items-start gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} />
                {w}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-lg font-bold">What we won&apos;t publish</h2>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {no.map((w) => (
              <li key={w} className="flex items-start gap-3">
                <X className="mt-0.5 size-4 shrink-0" strokeWidth={3} />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-black tracking-tight">How to pitch</h2>
          <ol className="ml-5 mt-6 list-decimal space-y-2 text-sm text-muted-foreground">
            <li>Send a working title and a three to five line outline.</li>
            <li>Add one or two links to things you have written before.</li>
            <li>We reply within a week. Accepted drafts are edited with you and published under your byline.</li>
          </ol>
          <p className="mt-6 text-sm text-muted-foreground">
            Email <a href={mail} className="text-brand hover:underline">{site.contact.email}</a> with
            the subject &quot;Guest post pitch&quot;.
          </p>
        </div>
      </section>
    </div>
  );
}
