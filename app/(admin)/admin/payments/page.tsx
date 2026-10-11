import type { Metadata } from "next";
import { EmptyState, PageHeader, Panel, StatCard, StatusBadge, Table, Td, Th } from "@/components/admin/ui";
import { CurrencyInr, Crown, Receipt } from "@phosphor-icons/react/dist/ssr";
import { listPayments } from "@/lib/members/admin-data";
import { formatDate } from "@/lib/members/config";
import { requireAdmin } from "@/lib/members/session";

export const metadata: Metadata = { title: "Payments" };

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default async function AdminPaymentsPage() {
  await requireAdmin();
  const payments = await listPayments();
  const paid = payments.filter((p) => p.status === "paid");
  const premium = paid.filter((p) => p.source === "premium-membership");

  return (
    <>
      <PageHeader title="Payments" description="Every checkout: Premium memberships and payments made on /pay." />
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Paid, all time" value={inr(paid.reduce((n, p) => n + p.amount, 0))} icon={<CurrencyInr size={18} weight="duotone" color="#8b5cf6" />} />
        <StatCard label="Premium purchases" value={String(premium.length)} hint={inr(premium.reduce((n, p) => n + p.amount, 0))} icon={<Crown size={18} weight="duotone" color="#F45B0A" />} />
        <StatCard label="Checkouts started" value={String(payments.length)} hint={`${payments.length - paid.length} not completed`} icon={<Receipt size={18} weight="duotone" color="#8b5cf6" />} />
      </div>
      <Panel flush>
        {payments.length ? (
          <Table minWidth={820}>
            <thead>
              <tr>
                <Th>Payer</Th>
                <Th>For</Th>
                <Th>Source</Th>
                <Th>Status</Th>
                <Th className="text-right">Amount</Th>
                <Th>Date</Th>
                <Th>Zoho ID</Th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <Td>
                    <p className="font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.email}</p>
                  </Td>
                  <Td>{p.purpose}</Td>
                  <Td className="text-gray-500">{p.source}</Td>
                  <Td>
                    <StatusBadge status={p.status} />
                  </Td>
                  <Td className="text-right tabular-nums">{inr(p.amount)}</Td>
                  <Td className="whitespace-nowrap text-gray-500">{formatDate(p.paid_at ?? p.created_at)}</Td>
                  <Td className="font-mono text-xs text-gray-500">{p.provider_payment_id ?? ""}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="p-4">
            <EmptyState title="No payments yet" />
          </div>
        )}
      </Panel>
    </>
  );
}
