import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/blog";

// Shared blog card, used by the blog index and the related-posts strip so both
// render identical cards. No hooks or fs imports, so it works in server and
// client trees alike.

export function Thumb({ post, className = "", eager = false }: { post: PostMeta; className?: string; eager?: boolean }) {
  return post.cover ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={post.cover}
      alt={post.title}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`w-full object-cover ${className}`}
    />
  ) : (
    <div className={`flex w-full items-center justify-center bg-gradient-to-br from-brand/25 to-brand/5 ${className}`}>
      <span className="text-lg font-black tracking-tight text-brand/80">
        TIME<span className="text-foreground/50">WHEEL</span>
      </span>
    </div>
  );
}

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-colors hover:border-brand/50"
    >
      <Thumb post={post} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-bold uppercase tracking-wide text-brand-text">{post.category}</span>
        <h3 className="mt-2 text-lg font-bold leading-snug text-foreground">{post.title}</h3>
      </div>

      {/* hover reveal: a panel slides up from the bottom and covers the card,
          so the card never changes size */}
      <div
        aria-hidden
        className="absolute inset-0 flex translate-y-full flex-col bg-card p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none"
      >
        <span className="text-[11px] font-bold uppercase tracking-wide text-brand-text">{post.category}</span>
        <p className="mt-2 text-lg font-bold leading-snug text-foreground">{post.title}</p>
        <p className="mt-3 line-clamp-6 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand">
          Read <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
