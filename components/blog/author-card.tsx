import type { Author } from "@/lib/blog";

export function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="mt-12 flex items-start gap-4 rounded-2xl border border-border bg-secondary/40 p-6">
      <span
        className="grid size-14 shrink-0 place-items-center rounded-full text-lg font-black text-white"
        style={{ backgroundColor: author.accent }}
        aria-hidden
      >
        {author.initials}
      </span>
      <div>
        <p className="font-bold text-foreground">{author.name}</p>
        <p className="text-sm font-medium text-brand">{author.role}</p>
        {author.bio && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{author.bio}</p>}
      </div>
    </div>
  );
}
