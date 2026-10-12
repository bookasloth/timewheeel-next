import { COMPANY, renderEmail, type Block, type Rendered, type Row } from "@/lib/email/layout";
import { inr } from "@/lib/admin/invoice-calc";
import { sellerExtras } from "@/lib/admin/invoice-data";

// Invoice email sent from /admin/invoices: summary box, an optional personal
// note, a "View invoice" button (private link, printable as PDF) and payment
// details when they are configured.

type InvoiceRow = {
  number: string;
  issue_date: string;
  due_date: string | null;
  client_name: string;
  client_company: string;
  total: number | string;
  status: string;
};

const fmt = (d: string | null) =>
  d ? new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "";

export function invoiceEmail(inv: InvoiceRow, link: string, message: string): Rendered {
  const total = inr(Number(inv.total));
  const paid = inv.status === "paid";
  const first = (inv.client_name || "").split(" ")[0] || "there";
  const extras = sellerExtras();

  const rows: Row[] = [
    ["Invoice number", inv.number],
    ["Invoice date", fmt(inv.issue_date)],
    ...(inv.due_date && !paid ? ([["Due date", fmt(inv.due_date)]] as Row[]) : []),
  ];

  const pay: Row[] = [
    ...extras.bank.map((line): Row => {
      const [k, ...v] = line.split(":");
      return v.length ? [k.trim(), v.join(":").trim()] : ["Bank", line];
    }),
    ...(extras.upi ? ([["UPI", extras.upi]] as Row[]) : []),
  ];

  const blocks: Block[] = [
    { type: "p", text: `Hi ${first},` },
    {
      type: "p",
      text: paid
        ? `Thank you for your payment. Here is your paid invoice ${inv.number} from ${COMPANY} for your records.`
        : `Please find your invoice ${inv.number} from ${COMPANY} below. You can view it, print it or save it as a PDF from the link.`,
    },
    ...(message ? ([{ type: "quote", label: "Note", text: message }] as Block[]) : []),
    { type: "box", title: inv.client_company || inv.client_name, rows, total: [paid ? "Amount paid" : "Amount due", total] },
    { type: "button", href: link, label: "View invoice" },
    ...(!paid && pay.length ? ([{ type: "box", title: "Payment details", rows: pay }] as Block[]) : []),
  ];

  return renderEmail({
    subject: `${paid ? "Paid invoice" : "Invoice"} ${inv.number} from Timewheel (${total})`,
    preheader: paid ? `Your paid invoice ${inv.number} for ${total}.` : `Invoice ${inv.number} for ${total}${inv.due_date ? `, due ${fmt(inv.due_date)}` : ""}.`,
    kicker: "Invoice",
    title: paid ? `Invoice ${inv.number} is paid` : `Invoice ${inv.number}`,
    blocks,
    footnote: `You received this because ${COMPANY} issued you an invoice.`,
  });
}
