import "server-only";
import { createAdminClient } from "@/lib/supabase/server";
import type { Invoice } from "@/lib/admin/invoice-calc";

// Reads for /admin/invoices. Callers check requireAdmin() first.

const num = (v: unknown) => Number(v ?? 0);

function shape(row: Record<string, unknown>): Invoice {
  return {
    ...(row as unknown as Invoice),
    items: Array.isArray(row.items) ? (row.items as Invoice["items"]) : [],
    discount: num(row.discount),
    gst_rate: num(row.gst_rate),
    subtotal: num(row.subtotal),
    tax_total: num(row.tax_total),
    total: num(row.total),
  };
}

export async function listInvoices(): Promise<{ invoices: Invoice[]; error?: string }> {
  try {
    const { data, error } = await createAdminClient().from("invoices").select("*").order("issue_date", { ascending: false }).order("number", { ascending: false }).limit(500);
    if (error) return { invoices: [], error: error.message };
    return { invoices: (data ?? []).map(shape) };
  } catch (e) {
    return { invoices: [], error: (e as Error).message };
  }
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data } = await createAdminClient().from("invoices").select("*").eq("id", id).maybeSingle();
  return data ? shape(data) : null;
}

/** Seller registration and bank details, from env (blank ones are hidden). */
export function sellerExtras() {
  return {
    gstin: process.env.INVOICE_GSTIN ?? "",
    pan: process.env.INVOICE_PAN ?? "",
    bank: (process.env.INVOICE_BANK_DETAILS ?? "").split("|").map((s) => s.trim()).filter(Boolean),
    upi: process.env.INVOICE_UPI_ID ?? "",
  };
}
