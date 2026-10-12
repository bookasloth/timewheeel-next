import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, X } from "lucide-react";
import { social } from "@/lib/metadata";
import { NewsletterForm } from "@/components/newsletter-form";
import { getAllPosts } from "@/lib/blog";

const TITLE = "The Timewheel Newsletter, Marketing and Web Notes for Builders";
const DESC =
  "One email every fortnight from the Timewheel team in Nagpur: SEO, websites, ads and product lessons from real client work. No hacks, no noise. Unsubscribe anytime.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/newsletter" },
  ...social({ path: "/newsletter", title: TITLE, description: DESC }),
};

export const revalidate = 3600;

const receive = [
  "SEO and local search playbooks we use for clients",
  "Website and landing page teardowns",
  "Ad and social campaigns broken down step by step",
  "Lessons from building our own products",
  "Tools and workflows the team actually uses",
  "Mistakes we made and how we fixed them",
];

const forWho = [
  "Business owners in India who run their own marketing",
  "Founders building without a big team",
  "Marketers who prefer systems over shortcuts",
  "Students learning digital marketing the practical way",
];

const notThis = ["Daily emails", "Motivational noise", "“10 hacks” lists", "Sales pitches in disguise"];

// Layout follows the shubhamdatarkar.com/newsletter page. Sample issues and
// reader quotes are left out until real ones exist; recent posts stand in.
export default async function NewsletterPage() {
  const recent = (await getAllPosts()).slice(0, 4);

  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-24 text-center md:pt-32">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">One email per fortnight</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">The Timewheel Newsletter</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Clear notes for people growing real businesses. Every second week we share what is working
          in SEO, websites, ads and products, straight from client work.
        </p>
        <p className="mt-3 text-sm font-medium">No trends. No noise. Just things you can apply.</p>
        <div className="flex justify-center">
          <NewsletterForm />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Unsubscribe anytime.</p>
      </section>

      {/* What you'll receive */}
      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_1.4fr] md:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">What you&apos;ll receive</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Working notes, not commentary.</h2>
            <ul className="mt-6 space-y-1 text-sm text-muted-foreground">
              <li>Short enough to finish.</li>
              <li>Deep enough to apply.</li>
              <li>Structured enough to reuse.</li>
            </ul>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {receive.map((r) => (
              <li key={r} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recent writing */}
      {recent.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Recent writing</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">A taste of what lands in your inbox</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {recent.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/60"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{p.category}</p>
                <h3 className="mt-2 flex items-start justify-between gap-3 text-lg font-bold leading-snug">
                  {p.title}
                  <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description || p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Who it's for / not */}
      <section className="border-t border-border/60">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-2 md:py-20">
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Who this is for</p>
            <ul className="mt-5 space-y-3 text-sm">
              {forWho.map((w) => (
                <li key={w} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">What it&apos;s not</p>
            <ul className="mt-5 space-y-3 text-sm">
              {notThis.map((w) => (
                <li key={w} className="flex items-start gap-3 text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0" strokeWidth={3} />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Why we write this</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Writing sharpens our thinking. Sharing it helps you.</h2>
          <p className="mt-4 text-muted-foreground">Every fortnight. One email. Built to respect your time.</p>
          <div className="flex justify-center">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
