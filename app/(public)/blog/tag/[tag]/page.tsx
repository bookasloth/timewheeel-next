import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";
import { getAllTags, getPostsByTag, slugify, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: slugify(tag) }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const label = getAllTags().find((t) => slugify(t) === tag) ?? tag;
  return {
    title: `${label} — Blog`,
    description: `Timewheel blog posts tagged ${label}.`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const label = getAllTags().find((t) => slugify(t) === tag);
  if (!label) notFound();
  const posts = getPostsByTag(tag);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: label, path: `/blog/tag/${tag}` },
        ])}
      />
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <ChevronRight className="size-3" aria-hidden />
            <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
          </ol>
        </nav>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-brand">Tag</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{label}</h1>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
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
      </div>
    </>
  );
}
