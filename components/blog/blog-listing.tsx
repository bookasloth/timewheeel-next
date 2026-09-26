"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { RevealHeading } from "@/components/anim/reveal-heading";

// Client-side blog index: featured post, category tabs, load-more, hover cards.
// Takes plain PostMeta[] from the server (no lib/blog import here — that pulls fs).

const PAGE = 6;

function fmt(date: string): string {
  const d = new Date(date);
  return Number.isNaN(+d)
    ? date
    : d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function Thumb({ post, className = "" }: { post: PostMeta; className?: string }) {
  return post.cover ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={post.cover} alt={post.title} className={`w-full object-cover ${className}`} />
  ) : (
    <div className={`flex w-full items-center justify-center bg-gradient-to-br from-brand/25 to-brand/5 ${className}`}>
      <span className="text-lg font-black tracking-tight text-brand/80">
        TIME<span className="text-foreground/50">WHEEL</span>
      </span>
    </div>
  );
}

function Card({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-colors hover:border-brand/50"
    >
      <Thumb post={post} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-bold uppercase tracking-wide text-brand-text">{post.category}</span>
        <h3 className="mt-2 text-lg font-bold leading-snug text-foreground">{post.title}</h3>

        {/* hover reveal: excerpt + read, height animates 0fr -> 1fr */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div className="overflow-hidden">
            <p className="text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
              Read <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Featured({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-brand/50 md:grid-cols-2"
    >
      <Thumb post={post} className="h-full min-h-[220px]" />
      <div className="flex flex-col justify-center p-7 md:p-10">
        <span className="text-xs font-bold uppercase tracking-wide text-brand-text">Featured · {post.category}</span>
        <RevealHeading as="h2" className="mt-3 text-2xl font-black leading-tight tracking-tight md:text-3xl">{post.title}</RevealHeading>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">{post.excerpt}</p>
        <span className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
          {fmt(post.date)} · {post.readingTime} min read
          <span className="inline-flex items-center gap-1 font-semibold text-brand">
            Read <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </span>
      </div>
    </Link>
  );
}

export function BlogListing({ posts }: { posts: PostMeta[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts],
  );
  const [cat, setCat] = useState("All");
  const [count, setCount] = useState(PAGE);

  const filtered = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  const [featured, ...rest] = filtered;
  const shown = rest.slice(0, count);

  return (
    <div className="mt-14">
      {/* category tabs */}
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setCat(c); setCount(PAGE); }}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                cat === c ? "border-brand bg-brand/10 text-brand" : "border-border text-muted-foreground hover:border-brand/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="mt-16 text-muted-foreground">No posts in this category yet.</p>
      ) : (
        <>
          {featured && <div className="mt-8"><Featured post={featured} /></div>}

          {shown.length > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((p) => <Card key={p.slug} post={p} />)}
            </div>
          )}

          {rest.length > count && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setCount((c) => c + PAGE)}
                className="inline-flex items-center rounded-lg border border-border px-6 py-2.5 text-sm font-semibold transition-colors hover:border-brand hover:text-brand"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
