import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/blog";

export function PostNav({ prev, next }: { prev: PostMeta | null; next: PostMeta | null }) {
  if (!prev && !next) return null;
  return (
    <nav className="mt-12 grid gap-4 sm:grid-cols-2" aria-label="More posts">
      {prev ? (
        <Link href={`/blog/${prev.slug}`} className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/50">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <ArrowLeft className="size-3.5" /> Previous
          </span>
          <p className="mt-1.5 font-semibold leading-snug text-foreground group-hover:text-brand">{prev.title}</p>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={`/blog/${next.slug}`} className="group rounded-2xl border border-border bg-card p-5 text-right transition-colors hover:border-brand/50">
          <span className="flex items-center justify-end gap-1.5 text-xs font-semibold text-muted-foreground">
            Next <ArrowRight className="size-3.5" />
          </span>
          <p className="mt-1.5 font-semibold leading-snug text-foreground group-hover:text-brand">{next.title}</p>
        </Link>
      )}
    </nav>
  );
}
