import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null;
  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-extrabold tracking-tight">Read next</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/50"
          >
            <span className="inline-flex w-fit items-center rounded-full bg-brand/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-text">
              {p.category}
            </span>
            <h3 className="mt-3 font-bold leading-snug text-foreground group-hover:text-brand">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
            <span className="mt-4 text-xs text-muted-foreground">
              {formatDate(p.date)} · {p.readingTime} min read
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
