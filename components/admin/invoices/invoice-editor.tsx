"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash, FloppyDisk } from "@phosphor-icons/react";
import { btn, field } from "@/components/admin/ui";
import { Spinner } from "@/components/admin/feedback";
import { useSlowNotice } from "@/components/admin/feedback-client";
import { InvoiceDocument, type InvoiceDocData, type SellerExtras } from "@/components/admin/invoices/invoice-document";
import { saveInvoice } from "@/lib/admin/invoice-actions";
import { INDIAN_STATES, SERVICE_PRESETS, computeTotals, inr, type TaxMode } from "@/lib/admin/invoice-calc";

// Form on the left, the real invoice updating live on the right. Tax mode
// follows the client's state (Maharashtra: CGST+SGST, elsewhere: IGST) unless
// changed by hand.

const DEFAULT_TERMS = "Payment due within 7 days of the invoice date.\n50% advance, balance on delivery, unless agreed otherwise in writing.";

export function InvoiceEditor({ id, initial, extras }: { id: string | null; initial: InvoiceDocData; extras: SellerExtras }) {
  const router = useRouter();
  const [inv, setInv] = useState<InvoiceDocData>(initial.terms || id ? initial : { ...initial, terms: DEFAULT_TERMS });
  const [pending, start] = useTransition();
  const slow = useSlowNotice(pending);
  const set = <K extends keyof InvoiceDocData>(k: K, v: InvoiceDocData[K]) => setInv((p) => ({ ...p, [k]: v }));
  const setItem = (i: number, patch: Partial<InvoiceDocData["items"][number]>) => setInv((p) => ({ ...p, items: p.items.map((it, j) => (j === i ? { ...it, ...patch } : it)) }));
  const t = computeTotals(inv.items, inv.discount, inv.gst_rate, inv.tax_mode);

  const onState = (state: string) =>
    setInv((p) => ({ ...p, client_state: state, tax_mode: p.tax_mode === "none" ? "none" : state === "Maharashtra" ? "intra" : state === "Outside India" ? "none" : "inter" }));

  const save = () =>
    start(async () => {
      const res = await saveInvoice(id, { ...inv, due_date: inv.due_date ?? "" }).catch(() => ({ error: "Couldn't reach the server. Check your connection and try again.", id: undefined }));
      if (res.error) return void toast.error(res.error);
      toast.success(id ? "Invoice saved" : "Invoice created");
      if (!id && res.id) router.push(`/admin/invoices/${res.id}`);
      else router.refresh();
    });

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
      <div className="space-y-4">
        <Box title="Client">
          <L label="Client name *">
            <input className={field.input} value={inv.client_name} onChange={(e) => set("client_name", e.target.value)} placeholder="Rahul Sharma" />
          </L>
          <L label="Company">
            <input className={field.input} value={inv.client_company} onChange={(e) => set("client_company", e.target.value)} placeholder="Sharma Traders" />
          </L>
          <div className="grid grid-cols-2 gap-3">
            <L label="Email">
              <input className={field.input} type="email" value={inv.client_email} onChange={(e) => set("client_email", e.target.value)} />
            </L>
            <L label="Phone">
              <input className={field.input} value={inv.client_phone} onChange={(e) => set("client_phone", e.target.value)} />
            </L>
          </div>
          <L label="Address">
            <textarea className={field.textarea} rows={2} value={inv.client_address} onChange={(e) => set("client_address", e.target.value)} />
          </L>
          <div className="grid grid-cols-2 gap-3">
            <L label="GSTIN">
              <input className={`${field.input} uppercase`} maxLength={15} value={inv.client_gstin} onChange={(e) => set("client_gstin", e.target.value.toUpperCase())} placeholder="27ABCDE1234F1Z5" />
            </L>
            <L label="State (place of supply)">
              <select className={field.select} value={inv.client_state} onChange={(e) => onState(e.target.value)}>
                {INDIAN_STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </L>
          </div>
        </Box>

        <Box title="Line items">
          <select
            className={field.select}
            value=""
            onChange={(e) => {
              const p = SERVICE_PRESETS[Number(e.target.value)];
              if (p) set("items", [...inv.items, { description: p.label, sac: p.sac, qty: 1, rate: p.rate }]);
            }}
          >
            <option value="">+ Add a Timewheel service...</option>
            {SERVICE_PRESETS.map((p, i) => (
              <option key={p.label} value={i}>
                {p.label} ({inr(p.rate)})
              </option>
            ))}
          </select>
          {inv.items.map((it, i) => (
            <div key={i} className="rounded-[3px] border border-gray-200 bg-gray-50 p-2.5">
              <div className="flex gap-2">
                <textarea className={field.textarea} rows={1} value={it.description} onChange={(e) => setItem(i, { description: e.target.value })} placeholder="Description" />
                <button type="button" aria-label="Remove item" onClick={() => set("items", inv.items.filter((_, j) => j !== i))} className={btn.smDanger}>
                  <Trash size={14} />
                </button>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <input className={field.input} value={it.sac} onChange={(e) => setItem(i, { sac: e.target.value })} placeholder="SAC" aria-label="SAC code" />
                <input className={field.input} type="number" min={0} step="any" value={it.qty} onChange={(e) => setItem(i, { qty: Number(e.target.value) })} aria-label="Quantity" />
                <input className={field.input} type="number" min={0} step="any" value={it.rate} onChange={(e) => setItem(i, { rate: Number(e.target.value) })} aria-label="Rate" />
              </div>
            </div>
          ))}
          <button type="button" className={btn.smGhost} onClick={() => set("items", [...inv.items, { description: "", sac: "998314", qty: 1, rate: 0 }])}>
            <Plus size={14} /> Custom item
          </button>
        </Box>

        <Box title="Tax and dates">
          <div className="grid grid-cols-2 gap-3">
            <L label="Issue date">
              <input className={field.input} type="date" value={inv.issue_date} onChange={(e) => set("issue_date", e.target.value)} />
            </L>
            <L label="Due date">
              <input className={field.input} type="date" value={inv.due_date ?? ""} onChange={(e) => set("due_date", e.target.value || null)} />
            </L>
            <L label="GST">
              <select className={field.select} value={inv.tax_mode} onChange={(e) => set("tax_mode", e.target.value as TaxMode)}>
                <option value="intra">CGST + SGST</option>
                <option value="inter">IGST</option>
                <option value="none">No GST</option>
              </select>
            </L>
            <L label="GST rate %">
              <input className={field.input} type="number" min={0} max={28} value={inv.gst_rate} disabled={inv.tax_mode === "none"} onChange={(e) => set("gst_rate", Number(e.target.value))} />
            </L>
            <L label="Discount (₹)">
              <input className={field.input} type="number" min={0} value={inv.discount} onChange={(e) => set("discount", Number(e.target.value))} />
            </L>
            <L label="Status">
              <select className={field.select} value={inv.status} onChange={(e) => set("status", e.target.value as InvoiceDocData["status"])}>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </L>
          </div>
        </Box>

        <Box title="Notes and terms">
          <L label="Notes">
            <textarea className={field.textarea} rows={2} value={inv.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Thank you for your business." />
          </L>
          <L label="Terms">
            <textarea className={field.textarea} rows={3} value={inv.terms} onChange={(e) => set("terms", e.target.value)} />
          </L>
        </Box>

        <div className="sticky bottom-0 -mx-1 flex items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-1 py-3">
          <div aria-live="polite">
            <p className="text-sm">
              <span className="text-gray-500">Total </span>
              <span className="font-bold tabular-nums">{inr(t.total)}</span>
            </p>
            {slow && <p className="text-xs text-gray-500">Taking a bit longer than usual, still saving...</p>}
          </div>
          <button type="button" onClick={save} disabled={pending} aria-busy={pending} className={`${btn.primary} min-w-[150px] justify-center disabled:cursor-not-allowed disabled:opacity-70`}>
            {pending ? <Spinner className="size-3.5" /> : <FloppyDisk size={16} />} {pending ? (id ? "Saving invoice..." : "Creating invoice...") : id ? "Save invoice" : "Create invoice"}
          </button>
        </div>
      </div>

      <div className="min-w-0">
        <p className={field.label}>Live preview</p>
        <div className="overflow-x-auto rounded-[5px] border border-gray-200 bg-gray-200/60 p-3 sm:p-5">
          <div className="min-w-[640px] shadow-sm">
            <InvoiceDocument inv={inv} extras={extras} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3 rounded-[5px] border border-gray-200 bg-white p-4">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">{title}</h2>
      {children}
    </section>
  );
}

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={field.label}>{label}</span>
      {children}
    </label>
  );
}
