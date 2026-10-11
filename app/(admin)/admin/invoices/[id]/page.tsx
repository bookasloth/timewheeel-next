import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Copy, Printer, Trash } from "@phosphor-icons/react/dist/ssr";
import { PageHeader, btn } from "@/components/admin/ui";
import { InvoiceEditor } from "@/components/admin/invoices/invoice-editor";
import { getInvoice, sellerExtras } from "@/lib/admin/invoice-data";
import { deleteInvoice, duplicateInvoice } from "@/lib/admin/invoice-actions";
import { requireAdmin } from "@/lib/members/session";
import { SubmitButton } from "@/components/admin/feedback-client";

export const metadata: Metadata = { title: "Invoice" };

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const inv = await getInvoice((await params).id);
  if (!inv) notFound();
  return (
    <>
      <PageHeader
        title={inv.number}
        description={`${inv.client_company || inv.client_name} · ${inv.status}`}
        actions={
          <>
            <Link href={`/admin/invoices/${inv.id}/print`} target="_blank" className={btn.primary}>
              <Printer size={16} /> Print / PDF
            </Link>
            <form action={duplicateInvoice}>
              <input type="hidden" name="id" value={inv.id} />
              <SubmitButton variant="ghost" pendingLabel="Duplicating...">
                <Copy size={16} /> Duplicate
              </SubmitButton>
            </form>
            {inv.status === "draft" && (
              <form action={deleteInvoice}>
                <input type="hidden" name="id" value={inv.id} />
                <SubmitButton variant="ghost" pendingLabel="Deleting..." aria-label="Delete draft">
                  <Trash size={16} />
                </SubmitButton>
              </form>
            )}
          </>
        }
      />
      <InvoiceEditor key={inv.id} id={inv.id} initial={inv} extras={sellerExtras()} />
    </>
  );
}
