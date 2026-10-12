// Invoice maths and seller details, shared by the editor (client), the server
// actions and the printable invoice. No server-only imports here.

export type InvoiceItem = { description: string; sac: string; qty: number; rate: number };
export type TaxMode = "intra" | "inter" | "none";
export type InvoiceStatus = "draft" | "sent" | "paid" | "cancelled";

export type Invoice = {
  id: string;
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
  subtotal: number;
  tax_total: number;
  total: number;
  notes: string;
  terms: string;
  paid_at: string | null;
  created_at: string;
  /** Set by migration 0011 when the invoice is emailed. */
  sent_at?: string | null;
  sent_to?: string;
};

/** Seller block on every invoice. GSTIN/PAN/bank come from env so they can be
 * filled in on Vercel without a code change; blank ones are simply hidden. */
export const SELLER = {
  name: "Timewheel Internet Pvt. Ltd.",
  address: "2nd & 4th floor, 11, Friends Colony, Mate Square, Pratap Nagar Road, Kotwal Nagar, Nagpur, Maharashtra 440022",
  state: "Maharashtra",
  stateCode: "27",
  email: "team@timewheel.co.in",
  phone: "+91 79041 09359",
  website: "timewheel.co.in",
};

/** SAC 998314: IT design and development services. 998361: advertising services. */
export const SERVICE_PRESETS: { label: string; sac: string; rate: number }[] = [
  { label: "Website Design", sac: "998314", rate: 7000 },
  { label: "Website Development", sac: "998314", rate: 12000 },
  { label: "Shopify Development", sac: "998314", rate: 18000 },
  { label: "Web App Development", sac: "998314", rate: 45000 },
  { label: "SEO (monthly retainer)", sac: "998365", rate: 15000 },
  { label: "Social Media Marketing (monthly)", sac: "998361", rate: 12000 },
  { label: "Performance Marketing (monthly management)", sac: "998361", rate: 15000 },
  { label: "Hosting & maintenance (annual)", sac: "998315", rate: 6000 },
  { label: "Domain registration (1 year)", sac: "998319", rate: 1200 },
];

export const INDIAN_STATES = [
  "Maharashtra", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Madhya Pradesh", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Chandigarh", "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Outside India",
];

const r2 = (n: number) => Math.round(n * 100) / 100;

export function computeTotals(items: InvoiceItem[], discount: number, gstRate: number, taxMode: TaxMode) {
  const subtotal = r2(items.reduce((n, i) => n + (Number(i.qty) || 0) * (Number(i.rate) || 0), 0));
  const taxable = Math.max(0, r2(subtotal - (Number(discount) || 0)));
  const tax = taxMode === "none" ? 0 : r2((taxable * gstRate) / 100);
  const half = r2(tax / 2);
  return {
    subtotal,
    taxable,
    cgst: taxMode === "intra" ? half : 0,
    sgst: taxMode === "intra" ? r2(tax - half) : 0,
    igst: taxMode === "inter" ? tax : 0,
    tax,
    total: r2(taxable + tax),
  };
}

export const inr = (n: number) => `₹${Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** "Rupees Twelve Thousand Five Hundred Only" in the Indian numbering system. */
export function amountInWords(amount: number) {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const two = (n: number) => (n < 20 ? ones[n] : `${tens[Math.floor(n / 10)]}${n % 10 ? ` ${ones[n % 10]}` : ""}`);
  const three = (n: number) => `${n >= 100 ? `${ones[Math.floor(n / 100)]} Hundred${n % 100 ? " " : ""}` : ""}${n % 100 ? two(n % 100) : ""}`;
  const words = (n: number): string => {
    if (n === 0) return "Zero";
    const parts: string[] = [];
    const crore = Math.floor(n / 1e7);
    const lakh = Math.floor((n % 1e7) / 1e5);
    const thousand = Math.floor((n % 1e5) / 1e3);
    const rest = n % 1e3;
    if (crore) parts.push(`${words(crore)} Crore`);
    if (lakh) parts.push(`${two(lakh)} Lakh`);
    if (thousand) parts.push(`${two(thousand)} Thousand`);
    if (rest) parts.push(three(rest));
    return parts.join(" ");
  };
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  return `Rupees ${words(rupees)}${paise ? ` and ${two(paise)} Paise` : ""} Only`;
}

/** Indian financial year label for a date, e.g. 2026-10-11 → "2026-27". */
export function financialYear(date: string) {
  const d = new Date(`${date}T00:00:00`);
  const y = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1;
  return `${y}-${String((y + 1) % 100).padStart(2, "0")}`;
}
