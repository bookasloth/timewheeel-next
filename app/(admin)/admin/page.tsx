import type { Metadata } from "next";
import Link from "next/link";
import { ChatsCircle, Crown, CurrencyInr, DownloadSimple, UserPlus, Users } from "@phosphor-icons/react/dist/ssr";
import { EmptyState, PageHeader, Panel, StatCard, StatusBadge, Table, Td, Th, btn } from "@/components/admin/ui";
import { getAdminStats, listAllDownloads, listPayments } from "@/lib/members/admin-data";
import { formatDate } from "@/lib/members/config";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/members/session";

export const metadata: Metadata = { title: "Dashboard" };

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const premiumActive = (until: string | null) => Boolean(until && new Date(until) > new Date());

export default async function AdminDashboard() {
  // Writers only have the blog editor.
  if (!(await requireStaff()).isAdmin) redirect("/admin/blog");
  const [{ stats, newest }, downloads, payments] = await Promise.all([getAdminStats(), listAllDownloads(), listPayments(5)]);
  const top = [...downloads].sort((a, b) => b.downloads - a.downloads).slice(0, 5);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Members, Premium and library at a glance."
        actions={
          <Link href="/admin/library" className={btn.primary}>
            <DownloadSimple size={16} weight="bold" /> Add a download
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Members" value={stats.members.toLocaleString("en-IN")} icon={<Users size={18} weight="duotone" color="#0ea5e9" />} />
        <StatCard label="New this week" value={String(stats.new7)} hint={`${stats.new30} in 30 days`} icon={<UserPlus size={18} weight="duotone" color="#0ea5e9" />} />
        <StatCard label="Premium members" value={String(stats.premium)} icon={<Crown size={18} weight="duotone" color="#F45B0A" />} />
        <StatCard label="Premium revenue" value={inr(stats.premiumRevenue)} hint="All time, paid" icon={<CurrencyInr size={18} weight="duotone" color="#8b5cf6" />} />
        <StatCard label="Downloads, 7 days" value={String(stats.downloads7)} icon={<DownloadSimple size={18} weight="duotone" color="#F45B0A" />} />
        <StatCard label="Community posts" value={String(stats.posts)} icon={<ChatsCircle size={18} weight="duotone" color="#0ea5e9" />} />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Panel
          title="Newest members"
          flush
          action={
            <Link href="/admin/members" className="text-xs font-medium text-[#C2410C] hover:underline">
              All members
            </Link>
          }
        >
          {newest.length ? (
            <Table minWidth={420}>
              <thead>
                <tr>
                  <Th>Member</Th>
                  <Th>Status</Th>
                  <Th>Joined</Th>
                </tr>
              </thead>
              <tbody>
                {newest.map((u) => {
                  const premium = premiumActive(u.premium_until);
                  return (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <Td>
                        <Link href={`/admin/members?q=${encodeURIComponent(u.email)}`} className="font-medium text-gray-900 hover:underline">
                          {u.name || u.email}
                        </Link>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </Td>
                      <Td>
                        <StatusBadge status={u.role === "admin" ? "admin" : premium ? "premium" : "free"} />
                      </Td>
                      <Td className="text-gray-500">{formatDate(u.created_at)}</Td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <p className="p-4 text-sm text-gray-500">No members yet.</p>
          )}
        </Panel>

        <Panel
          title="Top downloads"
          flush
          action={
            <Link href="/admin/library" className="text-xs font-medium text-[#C2410C] hover:underline">
              Manage library
            </Link>
          }
        >
          {top.length ? (
            <Table minWidth={420}>
              <thead>
                <tr>
                  <Th>Resource</Th>
                  <Th>Access</Th>
                  <Th className="text-right">Downloads</Th>
                </tr>
              </thead>
              <tbody>
                {top.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <Td className="font-medium text-gray-900">{d.title}</Td>
                    <Td>
                      <StatusBadge status={d.tier === "premium" ? "premium" : "free"} />
                    </Td>
                    <Td className="text-right tabular-nums">{d.downloads}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="p-4 text-sm text-gray-500">No downloads yet.</p>
          )}
        </Panel>
      </div>

      <div className="mt-5">
        <Panel
          title="Recent payments"
          flush
          action={
            <Link href="/admin/payments" className="text-xs font-medium text-[#C2410C] hover:underline">
              All payments
            </Link>
          }
        >
          {payments.length ? (
            <Table>
              <thead>
                <tr>
                  <Th>Payer</Th>
                  <Th>For</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Amount</Th>
                  <Th>Date</Th>
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
                    <Td>
                      <StatusBadge status={p.status} />
                    </Td>
                    <Td className="text-right tabular-nums">{inr(p.amount)}</Td>
                    <Td className="text-gray-500">{formatDate(p.paid_at ?? p.created_at)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="p-4">
              <EmptyState title="No payments yet" description="Premium purchases and /pay payments will show here." />
            </div>
          )}
        </Panel>
      </div>
    </>
  );
}
