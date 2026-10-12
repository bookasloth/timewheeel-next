import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvoiceDocument } from "@/components/admin/invoices/invoice-document";
import { PrintBar } from "@/components/admin/invoices/print-bar";
import { getInvoice, sellerExtras } from "@/lib/admin/invoice-data";
import { checkInvoiceToken } from "@/lib/admin/invoice-link";

// Client view of an invoice, opened from the "View invoice" email link. Only
// reachable with the signed token, and never for drafts.
export const metadata: Metadata = { title: "Invoice", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ClientInvoicePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ t?: string }>;
}) {
  const [{ id }, { t = "" }] = await Promise.all([params, searchParams]);
  if (!checkInvoiceToken(id, t)) notFound();
  const inv = await getInvoice(id);
  if (!inv || inv.status === "draft") notFound();
  return (
    <main className="min-h-[100dvh] bg-gray-200 py-6 print:bg-white print:py-0">
      <style>{"@page { size: A4; margin: 0 } @media print { .invoice-doc { max-width: none; -webkit-print-color-adjust: exact; print-color-adjust: exact } }"}</style>
      <PrintBar title={inv.number} />
      <div className="mx-auto max-w-[794px] shadow-lg print:shadow-none">
        <InvoiceDocument inv={inv} extras={sellerExtras()} />
      </div>
    </main>
  );
}
