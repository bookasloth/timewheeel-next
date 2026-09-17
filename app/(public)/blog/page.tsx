import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides on digital marketing, SEO, AI search and building without platform lock-in, from the Timewheel team.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Resources</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">The Timewheel blog</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Guides on digital marketing, SEO, AI search and building on systems you own.
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 text-muted-foreground">Posts coming soon.</p>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-brand/50"
              >
                <span className="inline-flex w-fit items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
                  {p.category}
                </span>
                <h2 className="mt-4 text-xl font-bold leading-snug text-foreground">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <span className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(p.date)} · {p.readingTime} min read</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-brand">
                    Read <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
