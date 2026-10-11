"use client";

import { useState, useSyncExternalStore, useTransition } from "react";
import { toast } from "sonner";
import { ClockCounterClockwise, Plus, Trash } from "@phosphor-icons/react";
import { field } from "@/components/admin/ui";
import { restoreRevision } from "@/lib/admin/blog-actions";
import type { Revision } from "@/lib/admin/blog-data";

// Small editor pieces: character counter, publish-date input, FAQ and
// comments repeaters, version history.

export function CharCounter({ value, min = 0, max }: { value: string; min?: number; max: number }) {
  const n = value.length;
  const tone =
    n > max ? "bg-rose-50 text-rose-700" : n >= min && n <= max && n > 0 ? "bg-emerald-50 text-emerald-700" : n > 0 ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-500";
  return <span className={`rounded-[3px] px-1.5 py-0.5 text-[11px] font-medium tabular-nums ${tone}`}>{n}/{max}</span>;
}

/** datetime-local speaks the browser's time zone; submit UTC ISO so the server's never matters. */
export function PublishDateInput({ value, onChange }: { value: string; onChange: (iso: string) => void }) {
  // Local time is only known in the browser: render empty on the server.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const local = (iso: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };
  return (
    <>
      <input type="hidden" name="published_at" value={value} />
      <input
        id="published_at"
        type="datetime-local"
        className={field.input}
        value={mounted ? local(value) : ""}
        onChange={(e) => onChange(e.target.value ? new Date(e.target.value).toISOString() : "")}
      />
    </>
  );
}

export function FaqEditor({ initial }: { initial: { q: string; a: string }[] }) {
  const [items, setItems] = useState(initial.length ? initial : []);
  const update = (i: number, k: "q" | "a", v: string) => setItems((arr) => arr.map((it, j) => (j === i ? { ...it, [k]: v } : it)));
  return (
    <div className="space-y-3">
      <input type="hidden" name="faq" value={JSON.stringify(items.filter((it) => it.q.trim() && it.a.trim()))} />
      {items.map((it, i) => (
        <div key={i} className="space-y-2 rounded-[4px] border border-gray-200 bg-gray-50/60 p-3">
          <div className="flex items-center gap-2">
            <span className="w-6 shrink-0 text-xs font-semibold text-gray-400">Q{i + 1}</span>
            <input className={field.input} placeholder="Question people actually ask" value={it.q} onChange={(e) => update(i, "q", e.target.value)} maxLength={300} />
            <button type="button" onClick={() => setItems((arr) => arr.filter((_, j) => j !== i))} className="rounded-[3px] p-2 text-rose-600 hover:bg-rose-50" aria-label={`Remove question ${i + 1}`}>
              <Trash size={16} />
            </button>
          </div>
          <textarea className={field.textarea} rows={3} placeholder="A direct answer in 2 to 4 sentences" value={it.a} onChange={(e) => update(i, "a", e.target.value)} maxLength={2000} />
        </div>
      ))}
      <button type="button" onClick={() => setItems((arr) => [...arr, { q: "", a: "" }])} className="inline-flex h-8 items-center gap-1.5 rounded-[3px] border border-gray-300 px-3 text-xs font-medium text-gray-800 hover:bg-gray-100">
        <Plus size={14} /> Add question
      </button>
      <p className={field.hint}>Shown at the end of the post and sent to Google as FAQ structured data.</p>
    </div>
  );
}

type Comment = { author: string; date: string; body: string; isAuthor?: boolean };

export function CommentsEditor({ initial }: { initial: Comment[] }) {
  const [items, setItems] = useState<Comment[]>(initial);
  const update = (i: number, patch: Partial<Comment>) => setItems((arr) => arr.map((it, j) => (j === i ? { ...it, ...patch } : it)));
  return (
    <div className="space-y-3">
      <input type="hidden" name="comments" value={JSON.stringify(items.filter((c) => c.author.trim() && c.body.trim()))} />
      <p className="text-xs text-gray-500">
        New comments arrive by email for approval. Paste the ones you approve here to show them under the post. Tick &quot;Our reply&quot; for answers from the team.
      </p>
      {items.map((c, i) => (
        <div key={i} className="space-y-2 rounded-[4px] border border-gray-200 bg-gray-50/60 p-3">
          <div className="grid gap-2 sm:grid-cols-[1fr_9rem_auto_auto] sm:items-center">
            <input className={field.input} placeholder="Name" value={c.author} onChange={(e) => update(i, { author: e.target.value })} maxLength={80} />
            <input className={field.input} type="date" value={c.date} onChange={(e) => update(i, { date: e.target.value })} aria-label="Date" />
            <label className="flex items-center gap-1.5 text-xs text-gray-700">
              <input type="checkbox" checked={!!c.isAuthor} onChange={(e) => update(i, { isAuthor: e.target.checked })} className="accent-[#F45B0A]" /> Our reply
            </label>
            <button type="button" onClick={() => setItems((arr) => arr.filter((_, j) => j !== i))} className="justify-self-end rounded-[3px] p-2 text-rose-600 hover:bg-rose-50" aria-label="Remove comment">
              <Trash size={16} />
            </button>
          </div>
          <textarea className={field.textarea} rows={2} placeholder="Comment" value={c.body} onChange={(e) => update(i, { body: e.target.value })} maxLength={3000} />
        </div>
      ))}
      <button
        type="button"
        onClick={() => setItems((arr) => [...arr, { author: "", date: new Date().toISOString().slice(0, 10), body: "" }])}
        className="inline-flex h-8 items-center gap-1.5 rounded-[3px] border border-gray-300 px-3 text-xs font-medium text-gray-800 hover:bg-gray-100"
      >
        <Plus size={14} /> Add approved comment
      </button>
    </div>
  );
}

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });

export function RevisionList({ revisions, dirty }: { revisions: Revision[]; dirty: () => boolean }) {
  const [pending, start] = useTransition();
  const [busy, setBusy] = useState<string | null>(null);
  if (!revisions.length) return <p className="text-xs text-gray-500">No earlier versions yet. One is saved each time you change a published post.</p>;
  const restore = (id: string) => {
    if (dirty() && !window.confirm("Restoring replaces your unsaved changes. Continue?")) return;
    if (!window.confirm("Restore this version? The current version is kept in history, so you can undo this.")) return;
    start(async () => {
      setBusy(id);
      const res = await restoreRevision(id);
      setBusy(null);
      if (res.error) toast.error(res.error);
      else {
        // Reload so the editor picks up the restored content; the toast shows after.
        try {
          sessionStorage.setItem("tw_blog_toast", "Version restored");
        } catch {}
        window.location.reload();
      }
    });
  };
  return (
    <ul className="max-h-72 space-y-1 overflow-y-auto">
      {revisions.map((r) => (
        <li key={r.id} className="flex items-center gap-2 rounded-[3px] px-1 py-1 text-xs hover:bg-gray-50">
          <ClockCounterClockwise size={14} className="shrink-0 text-gray-400" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-gray-800">{when(r.created_at)}{r.note ? ` · ${r.note}` : ""}</span>
            <span className="block truncate text-gray-500">{[r.status, r.by].filter(Boolean).join(" · ")}</span>
          </span>
          <button type="button" disabled={pending} onClick={() => restore(r.id)} className="h-7 shrink-0 rounded-[3px] border border-gray-300 px-2 text-xs font-medium text-gray-800 hover:bg-gray-100 disabled:opacity-50">
            {busy === r.id ? "..." : "Restore"}
          </button>
        </li>
      ))}
    </ul>
  );
}
