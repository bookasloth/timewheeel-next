import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Clock, FileText, Plus } from "@phosphor-icons/react/dist/ssr";
import { EmptyState, PageHeader, Panel, StatCard, StatusBadge, Table, Td, Th, btn } from "@/components/admin/ui";
import { listInvoices } from "@/lib/admin/invoice-data";
import { inr } from "@/lib/admin/invoice-calc";
import { formatDate } from "@/lib/members/config";
import { requireAdmin } from "@/lib/members/session";

export const metadata: Metadata = { title: "Invoices" };

const BADGE: Record<string, string> = { draft: "new", sent: "contacted", paid: "won", cancelled: "lost" };

export default async function InvoicesPage() {
  await requireAdmin();
  const { invoices, error } = await listInvoices();
  const live = invoices.filter((i) => i.status === "sent" || i.status === "paid");
  const paid = live.filter((i) => i.status === "paid");
  const due = live.filter((i) => i.status === "sent");

  return (
    <>
      <PageHeader
        title="Invoices"
        description="GST tax invoices for client work. Numbers run per financial year."
        actions={
          <Link href="/admin/invoices/new" className={btn.primary}>
            <Plus size={16} /> New invoice
          </Link>
        }
      />
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Invoiced" value={inr(live.reduce((n, i) => n + i.total, 0))} hint={`${live.length} issued`} icon={<FileText size={18} weight="duotone" color="#8b5cf6" />} />
        <StatCard label="Collected" value={inr(paid.reduce((n, i) => n + i.total, 0))} hint={`${paid.length} paid`} icon={<CheckCircle size={18} weight="duotone" color="#10b981" />} />
        <StatCard label="Outstanding" value={inr(due.reduce((n, i) => n + i.total, 0))} hint={`${due.length} awaiting payment`} icon={<Clock size={18} weight="duotone" color="#F45B0A" />} />
      </div>
      {error && (
        <p className="mb-4 rounded-[3px] border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Couldn&apos;t load invoices: {error}. Run supabase/migrations/0009_invoices.sql if you haven&apos;t yet.
        </p>
      )}
      <Panel flush>
        {invoices.length ? (
          <Table minWidth={760}>
            <thead>
              <tr>
                <Th>Number</Th>
                <Th>Client</Th>
                <Th>Issued</Th>
                <Th>Due</Th>
                <Th>Status</Th>
                <Th className="text-right">Total</Th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id} className="hover:bg-gray-50">
                  <Td>
                    <Link href={`/admin/invoices/${i.id}`} className="font-mono text-xs font-semibold text-[#C2410C] hover:underline">
                      {i.number}
                    </Link>
                  </Td>
                  <Td>
                    <p className="font-medium text-gray-900">{i.client_company || i.client_name}</p>
                    {i.client_company && <p className="text-xs text-gray-500">{i.client_name}</p>}
                  </Td>
                  <Td className="whitespace-nowrap text-gray-500">{formatDate(i.issue_date)}</Td>
                  <Td className="whitespace-nowrap text-gray-500">{i.due_date ? formatDate(i.due_date) : ""}</Td>
                  <Td>
                    <StatusBadge status={BADGE[i.status]}>{i.status}</StatusBadge>
                  </Td>
                  <Td className="text-right font-medium tabular-nums">{inr(i.total)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="p-4">
            <EmptyState
              title="No invoices yet"
              description="Start from a Timewheel service. GST splits and numbering are handled for you."
              action={
                <Link href="/admin/invoices/new" className={btn.primary}>
                  <Plus size={16} /> New invoice
                </Link>
              }
            />
          </div>
        )}
      </Panel>
    </>
  );
}
