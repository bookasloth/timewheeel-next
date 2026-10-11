import { SELLER, amountInWords, computeTotals, inr, type InvoiceItem, type InvoiceStatus, type TaxMode } from "@/lib/admin/invoice-calc";

// The invoice itself: A4 tax invoice in Timewheel colours (orange #F45B0A on
// navy #1A1A2E, Poppins headings, Plus Jakarta Sans body). Rendered by the
// editor's live preview and the print page. No hooks, so it works in both.

export type InvoiceDocData = {
  number: string;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string | null;
  client_name: string;
  client_company: string;
  client_email: string;
  client_phone: string;
  client_address: string;
  client_gstin: string;
  client_state: string;
  items: InvoiceItem[];
  discount: number;
  gst_rate: number;
  tax_mode: TaxMode;
  notes: string;
  terms: string;
};

export type SellerExtras = { gstin: string; pan: string; bank: string[]; upi: string };

const fmtDate = (d: string | null) => (d ? new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "");

export function InvoiceDocument({ inv, extras }: { inv: InvoiceDocData; extras: SellerExtras }) {
  const t = computeTotals(inv.items, inv.discount, inv.gst_rate, inv.tax_mode);
  const half = inv.gst_rate / 2;
  return (
    <article className="invoice-doc relative mx-auto w-full max-w-[794px] overflow-hidden bg-white font-sans text-[12px] leading-relaxed text-[#1A1A2E]">
      {inv.status === "paid" && (
        <span className="pointer-events-none absolute right-10 top-40 rotate-[-14deg] rounded-[4px] border-4 border-emerald-500/60 px-4 py-1 font-heading text-3xl font-bold uppercase tracking-widest text-emerald-500/60">Paid</span>
      )}
      {inv.status === "cancelled" && (
        <span className="pointer-events-none absolute right-10 top-40 rotate-[-14deg] rounded-[4px] border-4 border-rose-500/60 px-4 py-1 font-heading text-3xl font-bold uppercase tracking-widest text-rose-500/60">Cancelled</span>
      )}
      <div className="h-2 bg-[#F45B0A]" />
      <header className="flex items-start justify-between gap-6 px-10 pb-6 pt-8">
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/svg/timewheel-icon.svg" alt="" width={44} height={44} />
          <div>
            <p className="font-heading text-lg font-bold leading-tight">{SELLER.name}</p>
            <p className="mt-1 max-w-[300px] text-[11px] text-gray-600">{SELLER.address}</p>
            <p className="text-[11px] text-gray-600">
              {SELLER.email} · {SELLER.phone} · {SELLER.website}
            </p>
            {(extras.gstin || extras.pan) && (
              <p className="mt-1 text-[11px] font-semibold">
                {extras.gstin && <>GSTIN {extras.gstin}</>}
                {extras.gstin && extras.pan && " · "}
                {extras.pan && <>PAN {extras.pan}</>}
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="font-heading text-2xl font-bold uppercase tracking-wide text-[#F45B0A]">{inv.tax_mode === "none" ? "Invoice" : "Tax Invoice"}</p>
          <p className="mt-1 font-semibold">{inv.number || "Draft"}</p>
          <dl className="mt-2 grid grid-cols-[auto_auto] justify-end gap-x-3 text-[11px] text-gray-600">
            <dt>Issued</dt>
            <dd className="font-medium text-[#1A1A2E]">{fmtDate(inv.issue_date)}</dd>
            {inv.due_date && (
              <>
                <dt>Due</dt>
                <dd className="font-medium text-[#1A1A2E]">{fmtDate(inv.due_date)}</dd>
              </>
            )}
            <dt>Place of supply</dt>
            <dd className="font-medium text-[#1A1A2E]">{inv.client_state}</dd>
          </dl>
        </div>
      </header>

      <section className="mx-10 rounded-[4px] bg-[#FFF4ED] px-5 py-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#C2410C]">Billed to</p>
        <p className="mt-1 font-heading text-[15px] font-bold">{inv.client_company || inv.client_name || "Client name"}</p>
        {inv.client_company && inv.client_name && <p>{inv.client_name}</p>}
        {inv.client_address && <p className="whitespace-pre-line text-gray-700">{inv.client_address}</p>}
        <p className="text-gray-700">{[inv.client_email, inv.client_phone].filter(Boolean).join(" · ")}</p>
        {inv.client_gstin && <p className="mt-1 font-semibold">GSTIN {inv.client_gstin}</p>}
      </section>

      <table className="mx-10 mt-6 w-[calc(100%-5rem)] border-collapse">
        <thead>
          <tr className="bg-[#1A1A2E] text-left text-[10px] uppercase tracking-wider text-white">
            <th className="w-8 px-3 py-2 font-semibold">#</th>
            <th className="px-3 py-2 font-semibold">Service</th>
            <th className="px-3 py-2 font-semibold">SAC</th>
            <th className="px-3 py-2 text-right font-semibold">Qty</th>
            <th className="px-3 py-2 text-right font-semibold">Rate</th>
            <th className="px-3 py-2 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {inv.items.map((it, i) => (
            <tr key={i} className="border-b border-gray-200 align-top">
              <td className="px-3 py-2.5 text-gray-500">{i + 1}</td>
              <td className="whitespace-pre-line px-3 py-2.5 font-medium">{it.description}</td>
              <td className="px-3 py-2.5 text-gray-600">{it.sac}</td>
              <td className="px-3 py-2.5 text-right tabular-nums">{it.qty}</td>
              <td className="px-3 py-2.5 text-right tabular-nums">{inr(it.rate)}</td>
              <td className="px-3 py-2.5 text-right font-medium tabular-nums">{inr((Number(it.qty) || 0) * (Number(it.rate) || 0))}</td>
            </tr>
          ))}
          {!inv.items.length && (
            <tr>
              <td colSpan={6} className="px-3 py-6 text-center text-gray-400">No line items yet</td>
            </tr>
          )}
        </tbody>
      </table>

      <section className="mx-10 mt-5 flex flex-col-reverse gap-6 sm:flex-row sm:justify-between">
        <div className="max-w-[340px] text-[11px] text-gray-600">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Amount in words</p>
          <p className="mt-0.5 font-medium text-[#1A1A2E]">{amountInWords(t.total)}</p>
          {(extras.bank.length > 0 || extras.upi) && (
            <>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Pay to</p>
              {extras.bank.map((l) => (
                <p key={l}>{l}</p>
              ))}
              {extras.upi && <p>UPI: {extras.upi}</p>}
            </>
          )}
        </div>
        <dl className="w-full max-w-[260px] space-y-1 tabular-nums sm:ml-auto">
          <Row label="Subtotal" value={inr(t.subtotal)} />
          {inv.discount > 0 && <Row label="Discount" value={`- ${inr(inv.discount)}`} />}
          {inv.discount > 0 && <Row label="Taxable value" value={inr(t.taxable)} />}
          {inv.tax_mode === "intra" && (
            <>
              <Row label={`CGST @ ${half}%`} value={inr(t.cgst)} />
              <Row label={`SGST @ ${half}%`} value={inr(t.sgst)} />
            </>
          )}
          {inv.tax_mode === "inter" && <Row label={`IGST @ ${inv.gst_rate}%`} value={inr(t.igst)} />}
          <div className="mt-2 flex items-center justify-between rounded-[4px] bg-[#F45B0A] px-3 py-2 text-white">
            <dt className="font-heading text-[13px] font-bold">Total</dt>
            <dd className="font-heading text-[15px] font-bold">{inr(t.total)}</dd>
          </div>
        </dl>
      </section>

      {(inv.notes || inv.terms) && (
        <section className="mx-10 mt-6 grid gap-4 border-t border-gray-200 pt-4 text-[11px] text-gray-600 sm:grid-cols-2">
          {inv.notes && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Notes</p>
              <p className="mt-0.5 whitespace-pre-line">{inv.notes}</p>
            </div>
          )}
          {inv.terms && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Terms</p>
              <p className="mt-0.5 whitespace-pre-line">{inv.terms}</p>
            </div>
          )}
        </section>
      )}

      <footer className="mx-10 mb-8 mt-8 flex items-end justify-between gap-6">
        <p className="text-[10px] text-gray-400">This is a computer-generated invoice.</p>
        <div className="text-right">
          <div className="mb-1 h-10" />
          <p className="border-t border-gray-300 pt-1 text-[11px] font-semibold">For {SELLER.name}</p>
          <p className="text-[10px] text-gray-500">Authorised signatory</p>
        </div>
      </footer>
      <div className="flex h-1.5">
        <span className="flex-1 bg-[#1A1A2E]" />
        <span className="w-24 bg-[#F45B0A]" />
      </div>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 px-3">
      <dt className="text-gray-600">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
