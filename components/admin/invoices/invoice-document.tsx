import { SELLER, amountInWords, computeTotals, inr, type InvoiceItem, type InvoiceStatus, type TaxMode } from "@/lib/admin/invoice-calc";

// The invoice itself: A4 tax invoice in a clean Google / Zoho style. White page,
// grey hairlines, and four accent colours (Google's RGBY with Timewheel orange
// in place of red). Rendered by the editor's live preview and the print page.
// No hooks, so it works in both.

const C = {
  orange: "#F45B0A",
  blue: "#4285F4",
  yellow: "#FBBC04",
  green: "#34A853",
  ink: "#202124",
  muted: "#5F6368",
  line: "#E8EAED",
  wash: "#F8F9FA",
};

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

const STATUS: Record<InvoiceStatus, { label: string; color: string }> = {
  draft: { label: "Draft", color: C.muted },
  sent: { label: "Due", color: C.blue },
  paid: { label: "Paid", color: C.green },
  cancelled: { label: "Cancelled", color: C.orange },
};

function Stripe({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-1.5 ${className}`} aria-hidden>
      <span className="flex-1" style={{ background: C.orange }} />
      <span className="flex-1" style={{ background: C.blue }} />
      <span className="flex-1" style={{ background: C.yellow }} />
      <span className="flex-1" style={{ background: C.green }} />
    </div>
  );
}

function Label({ children, color = C.muted }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="text-[9.5px] font-semibold uppercase tracking-[0.12em]" style={{ color }}>
      {children}
    </p>
  );
}

export function InvoiceDocument({ inv, extras }: { inv: InvoiceDocData; extras: SellerExtras }) {
  const t = computeTotals(inv.items, inv.discount, inv.gst_rate, inv.tax_mode);
  const half = inv.gst_rate / 2;
  const status = STATUS[inv.status] ?? STATUS.draft;
  const paid = inv.status === "paid";

  return (
    <article className="invoice-doc relative mx-auto w-full max-w-[794px] overflow-hidden bg-white font-sans text-[12px] leading-relaxed" style={{ color: C.ink }}>
      <Stripe />

      {/* Header: seller left, title right */}
      <header className="flex items-start justify-between gap-6 px-10 pb-7 pt-8">
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/svg/timewheel-icon.svg" alt="" width={40} height={40} />
          <div>
            <p className="font-heading text-[17px] font-semibold leading-tight">{SELLER.name}</p>
            <p className="mt-1 max-w-[300px] text-[11px]" style={{ color: C.muted }}>{SELLER.address}</p>
            <p className="text-[11px]" style={{ color: C.muted }}>
              {SELLER.email} · {SELLER.phone}
            </p>
            <p className="text-[11px]" style={{ color: C.blue }}>{SELLER.website}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-heading text-[26px] font-light tracking-tight">{inv.tax_mode === "none" ? "Invoice" : "Tax Invoice"}</p>
          <p className="mt-0.5 text-[12px]" style={{ color: C.muted }}>
            # <span className="font-semibold" style={{ color: C.ink }}>{inv.number || "Draft"}</span>
          </p>
          <span
            className="mt-2 inline-block rounded px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: status.color, background: `${status.color}14`, border: `1px solid ${status.color}40` }}
          >
            {status.label}
          </span>
        </div>
      </header>

      {/* Summary strip: four facts, one accent each */}
      <section className="mx-10 grid grid-cols-2 overflow-hidden rounded-lg border sm:grid-cols-4" style={{ borderColor: C.line }}>
        {[
          { label: "Invoice date", value: fmtDate(inv.issue_date), color: C.orange },
          { label: "Due date", value: fmtDate(inv.due_date) || "On receipt", color: C.blue },
          { label: "Place of supply", value: inv.client_state, color: C.yellow },
          { label: paid ? "Amount paid" : "Amount due", value: inr(t.total), color: C.green, strong: true },
        ].map((f, i) => (
          <div key={f.label} className={`px-4 py-3 ${i ? "border-l" : ""}`} style={{ borderColor: C.line, boxShadow: `inset 0 3px 0 ${f.color}` }}>
            <Label>{f.label}</Label>
            <p className={`mt-1 tabular-nums ${f.strong ? "font-heading text-[16px] font-semibold" : "font-medium"}`}>{f.value}</p>
          </div>
        ))}
      </section>

      {/* Parties */}
      <section className="mx-10 mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <Label color={C.orange}>Billed to</Label>
          <p className="mt-1.5 font-heading text-[14px] font-semibold">{inv.client_company || inv.client_name || "Client name"}</p>
          {inv.client_company && inv.client_name && <p>{inv.client_name}</p>}
          {inv.client_address && <p className="whitespace-pre-line" style={{ color: C.muted }}>{inv.client_address}</p>}
          <p style={{ color: C.muted }}>{[inv.client_email, inv.client_phone].filter(Boolean).join(" · ")}</p>
          {inv.client_gstin && <p className="mt-1 text-[11px] font-semibold">GSTIN {inv.client_gstin}</p>}
        </div>
        <div className="sm:text-right">
          <Label color={C.blue}>From</Label>
          <p className="mt-1.5 font-heading text-[14px] font-semibold">{SELLER.name}</p>
          {extras.gstin && <p className="text-[11px] font-semibold">GSTIN {extras.gstin}</p>}
          {extras.pan && <p className="text-[11px]" style={{ color: C.muted }}>PAN {extras.pan}</p>}
        </div>
      </section>

      {/* Line items */}
      <table className="mx-10 mt-7 w-[calc(100%-5rem)] border-collapse">
        <thead>
          <tr className="text-left text-[9.5px] uppercase tracking-[0.12em]" style={{ background: C.wash, color: C.muted }}>
            <th className="w-8 rounded-l-md px-3 py-2.5 font-semibold">#</th>
            <th className="px-3 py-2.5 font-semibold">Item &amp; description</th>
            <th className="px-3 py-2.5 font-semibold">SAC</th>
            <th className="px-3 py-2.5 text-right font-semibold">Qty</th>
            <th className="px-3 py-2.5 text-right font-semibold">Rate</th>
            <th className="rounded-r-md px-3 py-2.5 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {inv.items.map((it, i) => (
            <tr key={i} className="border-b align-top" style={{ borderColor: C.line }}>
              <td className="px-3 py-3" style={{ color: C.muted }}>{i + 1}</td>
              <td className="whitespace-pre-line px-3 py-3 font-medium">{it.description}</td>
              <td className="px-3 py-3" style={{ color: C.muted }}>{it.sac}</td>
              <td className="px-3 py-3 text-right tabular-nums">{it.qty}</td>
              <td className="px-3 py-3 text-right tabular-nums">{inr(it.rate)}</td>
              <td className="px-3 py-3 text-right font-medium tabular-nums">{inr((Number(it.qty) || 0) * (Number(it.rate) || 0))}</td>
            </tr>
          ))}
          {!inv.items.length && (
            <tr>
              <td colSpan={6} className="px-3 py-6 text-center" style={{ color: C.muted }}>No line items yet</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Words + payment left, totals right */}
      <section className="mx-10 mt-5 flex flex-col-reverse gap-6 sm:flex-row sm:justify-between">
        <div className="max-w-[340px] text-[11px]">
          <Label>Amount in words</Label>
          <p className="mt-0.5 font-medium italic">{amountInWords(t.total)}</p>
          {(extras.bank.length > 0 || extras.upi) && (
            <div className="mt-4 rounded-lg px-4 py-3" style={{ background: C.wash, boxShadow: `inset 3px 0 0 ${C.green}` }}>
              <Label color={C.green}>Payment details</Label>
              <div className="mt-1" style={{ color: C.muted }}>
                {extras.bank.map((l) => (
                  <p key={l}>{l}</p>
                ))}
                {extras.upi && <p>UPI: <span className="font-medium" style={{ color: C.ink }}>{extras.upi}</span></p>}
              </div>
            </div>
          )}
        </div>
        <dl className="w-full max-w-[270px] space-y-1.5 tabular-nums sm:ml-auto">
          <Row label="Sub total" value={inr(t.subtotal)} />
          {inv.discount > 0 && <Row label="Discount" value={`- ${inr(inv.discount)}`} />}
          {inv.discount > 0 && <Row label="Taxable value" value={inr(t.taxable)} />}
          {inv.tax_mode === "intra" && (
            <>
              <Row label={`CGST (${half}%)`} value={inr(t.cgst)} />
              <Row label={`SGST (${half}%)`} value={inr(t.sgst)} />
            </>
          )}
          {inv.tax_mode === "inter" && <Row label={`IGST (${inv.gst_rate}%)`} value={inr(t.igst)} />}
          <div className="!mt-3 flex items-center justify-between border-t-2 px-3 pt-2.5" style={{ borderColor: C.ink }}>
            <dt className="font-heading text-[13px] font-semibold">Total</dt>
            <dd className="font-heading text-[15px] font-semibold">{inr(t.total)}</dd>
          </div>
          <div className="flex items-center justify-between rounded-md px-3 py-2" style={{ background: paid ? `${C.green}14` : `${C.blue}12` }}>
            <dt className="text-[11px] font-semibold" style={{ color: paid ? C.green : C.blue }}>{paid ? "Paid in full" : "Balance due"}</dt>
            <dd className="font-heading text-[14px] font-semibold" style={{ color: paid ? C.green : C.blue }}>{inr(paid ? 0 : t.total)}</dd>
          </div>
        </dl>
      </section>

      {(inv.notes || inv.terms) && (
        <section className="mx-10 mt-7 grid gap-4 border-t pt-4 text-[11px] sm:grid-cols-2" style={{ borderColor: C.line, color: C.muted }}>
          {inv.notes && (
            <div>
              <Label color={C.yellow}>Notes</Label>
              <p className="mt-0.5 whitespace-pre-line">{inv.notes}</p>
            </div>
          )}
          {inv.terms && (
            <div>
              <Label color={C.orange}>Terms &amp; conditions</Label>
              <p className="mt-0.5 whitespace-pre-line">{inv.terms}</p>
            </div>
          )}
        </section>
      )}

      <footer className="mx-10 mb-7 mt-9 flex items-end justify-between gap-6">
        <p className="text-[10px]" style={{ color: C.muted }}>Thank you for your business. This is a computer-generated invoice.</p>
        <div className="text-right">
          <div className="mb-1 h-10" />
          <p className="border-t pt-1 text-[11px] font-semibold" style={{ borderColor: C.line }}>For {SELLER.name}</p>
          <p className="text-[10px]" style={{ color: C.muted }}>Authorised signatory</p>
        </div>
      </footer>
      <Stripe />
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 px-3">
      <dt style={{ color: C.muted }}>{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
