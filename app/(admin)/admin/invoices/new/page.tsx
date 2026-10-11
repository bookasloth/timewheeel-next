import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/ui";
import { InvoiceEditor } from "@/components/admin/invoices/invoice-editor";
import { sellerExtras } from "@/lib/admin/invoice-data";
import { requireAdmin } from "@/lib/members/session";

export const metadata: Metadata = { title: "New invoice" };

export default async function NewInvoicePage() {
  await requireAdmin();
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  now.setDate(now.getDate() + 7);
  const due = now.toISOString().slice(0, 10);
  return (
    <>
      <PageHeader title="New invoice" description="The number is assigned when you create it." />
      <InvoiceEditor
        id={null}
        extras={sellerExtras()}
        initial={{
          number: "",
          status: "draft",
          issue_date: today,
          due_date: due,
          client_name: "",
          client_company: "",
          client_email: "",
          client_phone: "",
          client_address: "",
          client_gstin: "",
          client_state: "Maharashtra",
          items: [],
          discount: 0,
          gst_rate: 18,
          tax_mode: "intra",
          notes: "Thank you for choosing Timewheel.",
          terms: "",
        }}
      />
    </>
  );
}
