"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { MagnifyingGlass, Trash } from "@phosphor-icons/react";
import { btn, field } from "@/components/admin/ui";
import { deleteLead, removeSubscriber, setLeadStatus } from "@/lib/admin/inbox-actions";

const LABELS: Record<string, string> = { new: "New", contacted: "Contacted", delivered: "Delivered", upsell: "Upsell", won: "Won", lost: "Lost" };

export function InboxFilters({ sources, counts }: { sources: string[]; counts: Record<string, number> }) {
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
    <div className="mb-3 space-y-2">
      <div className="flex gap-1 overflow-x-auto" role="tablist" aria-label="Filter by status">
        {["all", ...Object.keys(LABELS)].map((s) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={status === s}
            onClick={() => push({ status: s })}
            className={`h-8 shrink-0 rounded-[3px] px-2.5 text-xs font-medium transition-colors ${status === s ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"}`}
          >
            {s === "all" ? "All" : LABELS[s]} <span className="tabular-nums opacity-60">{counts[s] ?? 0}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative sm:w-72">
          <MagnifyingGlass size={15} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="search" defaultValue={params.get("q") ?? ""} onChange={(e) => push({ q: e.target.value })} placeholder="Search name, email, phone, message" className={field.input + " pl-8"} aria-label="Search enquiries" />
        </div>
        <select value={params.get("source") ?? ""} onChange={(e) => push({ source: e.target.value })} className={field.select + " sm:w-56"} aria-label="Filter by form">
          <option value="">Every form</option>
          {sources.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function LeadStatusControl({ id, status, deliveredUrl }: { id: string; status: string; deliveredUrl: string | null }) {
  const router = useRouter();
  const [next, setNext] = useState(status);
  const [url, setUrl] = useState(deliveredUrl ?? "");
  const [pending, start] = useTransition();
  const emails = next !== status && (next === "delivered" || next === "upsell");
  const save = () =>
    start(async () => {
      if (emails && !window.confirm(next === "delivered" ? "This emails the customer that their website is live. Continue?" : "This sends the customer the upsell email. Continue?")) return;
      const res = await setLeadStatus(id, next, url);
      if (res.error) toast.error(res.error);
      else {
        toast.success(`Marked ${LABELS[next].toLowerCase()}`);
        router.refresh();
      }
    });
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="lead-status" className={field.label}>Status</label>
        <select id="lead-status" value={next} onChange={(e) => setNext(e.target.value)} className={field.select}>
          {Object.entries(LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </div>
      {next === "delivered" && (
        <div>
          <label htmlFor="lead-url" className={field.label}>Live website address</label>
          <input id="lead-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className={field.input} />
        </div>
      )}
      {emails && <p className="rounded-[3px] border border-amber-200 bg-amber-50 px-2.5 py-2 text-xs text-amber-800">Saving this sends the customer an automatic email.</p>}
      <button type="button" disabled={pending || (next === status && (next !== "delivered" || url === (deliveredUrl ?? "")))} onClick={save} className={btn.primary + " w-full justify-center"}>
        {pending ? "Saving..." : "Update status"}
      </button>
    </div>
  );
}

export function DeleteLeadButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      className={btn.smDanger}
      onClick={() =>
        window.confirm("Delete this enquiry permanently? This can't be undone.") &&
        start(async () => {
          const res = await deleteLead(id);
          if (res.error) toast.error(res.error);
          else {
            toast.success("Enquiry deleted");
            router.push("/admin/inbox");
          }
        })
      }
    >
      <Trash size={14} /> Delete enquiry
    </button>
  );
}

export function RemoveSubscriberButton({ id, email }: { id: string; email: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      className={btn.smDanger}
      onClick={() =>
        window.confirm(`Remove ${email} from the newsletter?`) &&
        start(async () => {
          const res = await removeSubscriber(id);
          if (res.error) toast.error(res.error);
          else {
            toast.success("Removed from the newsletter");
            router.refresh();
          }
        })
      }
    >
      <Trash size={14} /> Remove
    </button>
  );
}
