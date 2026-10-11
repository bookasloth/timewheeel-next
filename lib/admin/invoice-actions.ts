"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/members/session";
import { computeTotals, financialYear, type InvoiceItem, type InvoiceStatus, type TaxMode } from "@/lib/admin/invoice-calc";

export type InvoiceInput = {
  issue_date: string;
  due_date: string;
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
  status: InvoiceStatus;
};

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const STATUSES: InvoiceStatus[] = ["draft", "sent", "paid", "cancelled"];
const s = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

function clean(input: InvoiceInput) {
  const items = (Array.isArray(input.items) ? input.items : [])
    .slice(0, 50)
    .map((i) => ({ description: s(i.description, 300), sac: s(i.sac, 8), qty: Math.max(0, Number(i.qty) || 0), rate: Math.max(0, Number(i.rate) || 0) }))
    .filter((i) => i.description);
  const tax_mode: TaxMode = ["intra", "inter", "none"].includes(input.tax_mode) ? input.tax_mode : "intra";
  const gst_rate = Math.min(28, Math.max(0, Number(input.gst_rate) || 0));
  const discount = Math.max(0, Number(input.discount) || 0);
  const t = computeTotals(items, discount, gst_rate, tax_mode);
  return {
    issue_date: DATE.test(input.issue_date) ? input.issue_date : new Date().toISOString().slice(0, 10),
    due_date: DATE.test(input.due_date) ? input.due_date : null,
    client_name: s(input.client_name, 160),
    client_company: s(input.client_company, 160),
    client_email: s(input.client_email, 200),
    client_phone: s(input.client_phone, 40),
    client_address: s(input.client_address, 600),
    client_gstin: s(input.client_gstin, 15).toUpperCase(),
    client_state: s(input.client_state, 60) || "Maharashtra",
    items,
    discount,
    gst_rate,
    tax_mode,
    subtotal: t.subtotal,
    tax_total: t.tax,
    total: t.total,
    notes: s(input.notes, 2000),
    terms: s(input.terms, 2000),
    status: STATUSES.includes(input.status) ? input.status : "draft",
  };
}

/** Next number in the invoice's financial year: TW/2026-27/0001. */
async function nextNumber(db: ReturnType<typeof createAdminClient>, issueDate: string) {
  const prefix = `TW/${financialYear(issueDate)}/`;
  const { data } = await db.from("invoices").select("number").like("number", `${prefix}%`).order("number", { ascending: false }).limit(1);
  const last = Number(data?.[0]?.number?.slice(prefix.length)) || 0;
  return `${prefix}${String(last + 1).padStart(4, "0")}`;
}

export async function saveInvoice(id: string | null, input: InvoiceInput): Promise<{ error?: string; id?: string }> {
  await requireAdmin();
  const row = clean(input);
  if (!row.client_name) return { error: "Add the client's name." };
  if (!row.items.length) return { error: "Add at least one line item." };
  if (row.client_gstin && !/^[0-9]{2}[A-Z0-9]{13}$/.test(row.client_gstin)) return { error: "That GSTIN doesn't look right (15 characters, starting with the state code)." };
  const db = createAdminClient();
  const paid_at = row.status === "paid" ? new Date().toISOString() : null;

  if (id) {
    const { data: existing } = await db.from("invoices").select("status, paid_at").eq("id", id).maybeSingle();
    if (!existing) return { error: "That invoice no longer exists." };
    const { error } = await db
      .from("invoices")
      .update({ ...row, paid_at: row.status === "paid" ? (existing.paid_at ?? paid_at) : null })
      .eq("id", id);
    if (error) return { error: error.message };
    revalidatePath("/admin/invoices");
    return { id };
  }

  // Retry on the rare clash when two invoices are created at the same moment.
  for (let attempt = 0; attempt < 3; attempt++) {
    const number = await nextNumber(db, row.issue_date);
    const { data, error } = await db.from("invoices").insert({ ...row, number, paid_at }).select("id").single();
    if (!error) {
      revalidatePath("/admin/invoices");
      return { id: data.id };
    }
    if (error.code !== "23505") return { error: error.code === "42P01" ? "Run supabase/migrations/0009_invoices.sql first." : error.message };
  }
  return { error: "Couldn't pick an invoice number. Try again." };
}

export async function setInvoiceStatus(fd: FormData) {
  await requireAdmin();
  const id = String(fd.get("id") ?? "");
  const status = String(fd.get("status") ?? "") as InvoiceStatus;
  if (!STATUSES.includes(status)) return;
  await createAdminClient()
    .from("invoices")
    .update({ status, paid_at: status === "paid" ? new Date().toISOString() : null })
    .eq("id", id);
  revalidatePath("/admin/invoices");
  revalidatePath(`/admin/invoices/${id}`);
}

export async function duplicateInvoice(fd: FormData) {
  await requireAdmin();
  const id = String(fd.get("id") ?? "");
  const db = createAdminClient();
  const { data: src } = await db.from("invoices").select("*").eq("id", id).maybeSingle();
  if (!src) return;
  const today = new Date().toISOString().slice(0, 10);
  const res = await saveInvoice(null, { ...src, issue_date: today, due_date: "", status: "draft" } as InvoiceInput);
  if (res.id) redirect(`/admin/invoices/${res.id}`);
}

export async function deleteInvoice(fd: FormData) {
  await requireAdmin();
  const id = String(fd.get("id") ?? "");
  // Only drafts can be deleted; issued invoices are cancelled instead so the
  // numbering stays continuous for GST.
  await createAdminClient().from("invoices").delete().eq("id", id).eq("status", "draft");
  revalidatePath("/admin/invoices");
  redirect("/admin/invoices");
}
