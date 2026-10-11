"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ArrowSquareOut, Copy, DotsThree, Eye, EyeSlash, MagnifyingGlass, PencilSimple, Trash } from "@phosphor-icons/react";
import { field } from "@/components/admin/ui";
import { deletePost, duplicatePost, setPostStatus } from "@/lib/admin/blog-actions";
import { STAGE_COLORS, STAGE_LABELS, type Stage } from "@/lib/blog-seo";

const STATUSES = [
  { value: "all", label: "All posts" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
  { value: "draft", label: "Drafts" },
];

export function PostsFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const push = (next: Record<string, string>) => {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (!v || v === "all") sp.delete(k);
      else sp.set(k, v);
    }
    router.replace(`${pathname}${sp.size ? `?${sp}` : ""}`);
  };
  const status = params.get("status") ?? "all";
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative sm:w-72">
        <MagnifyingGlass size={15} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          defaultValue={params.get("q") ?? ""}
          onChange={(e) => push({ q: e.target.value })}
          placeholder="Search title, slug, category"
          className={field.input + " pl-8"}
          aria-label="Search posts"
        />
      </div>
      <div className="flex gap-1 overflow-x-auto" role="tablist" aria-label="Filter by status">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            type="button"
            role="tab"
            aria-selected={status === s.value}
            onClick={() => push({ status: s.value })}
            className={`h-8 shrink-0 rounded-[3px] px-2.5 text-xs font-medium transition-colors ${status === s.value ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const SEGMENTS = { s: "SEO", g: "GEO", e: "AEO" } as const;

export function SegChip({ which, seg }: { which: keyof typeof SEGMENTS; seg: Stage }) {
  const color = STAGE_COLORS[seg.stage];
  return (
    <span
      title={`${SEGMENTS[which]}: ${STAGE_LABELS[seg.stage]} (${seg.passed} of ${seg.total})`}
      style={{ backgroundColor: `${color}1f`, color }}
      className="inline-flex size-5 items-center justify-center rounded-[3px] text-[11px] font-bold"
    >
      {which.toUpperCase()}
    </span>
  );
}

export function SegLegend() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
      <span>S = SEO · G = GEO (AI search) · E = AEO (answer engines)</span>
      <span className="flex items-center gap-1">
        {STAGE_COLORS.map((c, i) => (
          <span key={c} title={STAGE_LABELS[i]} className="size-2.5 rounded-full" style={{ backgroundColor: c }} />
        ))}
        <span className="ml-1">not started to complete</span>
      </span>
    </div>
  );
}

export function PostRowActions({ id, slug, live, status }: { id: string; slug: string; live: boolean; status: "draft" | "published" }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const run = (fn: () => Promise<{ error?: string; id?: string }>, ok: string, after?: (r: { id?: string }) => void) =>
    start(async () => {
      setOpen(false);
      const res = await fn();
      if (res.error) toast.error(res.error);
      else {
        toast.success(ok);
        after?.(res);
        router.refresh();
      }
    });
  const item = "flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] text-gray-700 hover:bg-gray-100";
  return (
    <div className="flex items-center justify-end gap-0.5">
      <Link href={`/admin/blog/${id}`} className="rounded-[3px] p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900" title="Edit" aria-label="Edit">
        <PencilSimple size={16} />
      </Link>
      {live && (
        <a href={`/blog/${slug}`} target="_blank" rel="noreferrer" className="rounded-[3px] p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900" title="View live" aria-label="View live">
          <ArrowSquareOut size={16} />
        </a>
      )}
      <div className="relative">
        <button type="button" disabled={pending} onClick={() => setOpen((o) => !o)} className="rounded-[3px] p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50" aria-label="More actions" aria-expanded={open}>
          <DotsThree size={18} weight="bold" />
        </button>
        {open && (
          <>
            <div role="presentation" className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-full z-40 mt-1 w-44 rounded-[3px] border border-gray-200 bg-white py-1">
              {status === "published" ? (
                <button type="button" className={item} onClick={() => run(() => setPostStatus(id, "draft"), "Moved back to drafts")}>
                  <EyeSlash size={15} /> Unpublish
                </button>
              ) : (
                <button type="button" className={item} onClick={() => run(() => setPostStatus(id, "published"), "Published")}>
                  <Eye size={15} /> Publish now
                </button>
              )}
              <button type="button" className={item} onClick={() => run(() => duplicatePost(id), "Copied to a new draft", (r) => r.id && router.push(`/admin/blog/${r.id}`))}>
                <Copy size={15} /> Duplicate
              </button>
              <div className="my-1 border-t border-gray-100" />
              <button
                type="button"
                className={item + " text-rose-600 hover:bg-rose-50"}
                onClick={() => {
                  if (window.confirm("Delete this post permanently? Its version history goes too. This can't be undone.")) run(() => deletePost(id), "Post deleted");
                  else setOpen(false);
                }}
              >
                <Trash size={15} /> Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
