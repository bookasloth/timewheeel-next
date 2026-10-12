import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvoiceDocument } from "@/components/admin/invoices/invoice-document";
import { getInvoice, sellerExtras } from "@/lib/admin/invoice-data";
import { requireAdmin } from "@/lib/members/session";
import { PrintBar } from "./print-bar";

// Bare A4 page for printing or "Save as PDF", outside the console shell.
export const metadata: Metadata = { title: "Invoice", robots: { index: false, follow: false } };

export default async function PrintInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const inv = await getInvoice((await params).id);
  if (!inv) notFound();
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
