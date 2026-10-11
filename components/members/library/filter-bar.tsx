"use client";

import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function FilterBar({
  basePath,
  q,
  category,
  categories,
  saved,
}: {
  basePath: string;
  q: string;
  category: string;
  categories: string[];
  saved: boolean;
}) {
  const href = (c?: string) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (c) p.set("category", c);
    const s = p.toString();
    return s ? `${basePath}?${s}` : basePath;
  };
  const chip = (active: boolean) =>
    cn(
      "inline-flex h-9 shrink-0 items-center rounded-lg border px-3.5 text-[13px] font-medium transition-colors",
      active ? "border-ink bg-ink text-white" : "border-border bg-surface text-foreground/80 hover:border-foreground/30 hover:text-foreground",
    );

  return (
    <div className="space-y-3">
      <form action={basePath} className="flex flex-col gap-2 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search the library</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search guides, checklists, templates..."
            className="h-11 w-full rounded-lg border border-border bg-surface pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/80 hover:border-brand/40 focus:border-brand focus:ring-4 focus:ring-brand/15"
          />
        </label>
        <label className="relative sm:w-52">
          <span className="sr-only">Category</span>
          <select
            name="category"
            defaultValue={category}
            onChange={(e) => e.currentTarget.form?.requestSubmit()}
            className="h-11 w-full appearance-none rounded-lg border border-border bg-surface pl-3.5 pr-9 text-sm outline-none transition-colors hover:border-brand/40 focus:border-brand focus:ring-4 focus:ring-brand/15"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </label>
        {saved && <input type="hidden" name="saved" value="1" />}
      </form>
      <nav aria-label="Filter by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <Link href={href()} className={chip(!category && !saved)}>
          All resources
        </Link>
        {categories.map((c) => (
          <Link key={c} href={href(c)} className={chip(category === c)}>
            {c}
          </Link>
        ))}
        <Link href={`${basePath}?saved=1`} className={chip(saved)}>
          Saved
        </Link>
      </nav>
    </div>
  );
}
