import type { Metadata } from "next";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { ConfirmSubmit, SubmitButton } from "@/components/members/ui";
import { EmptyState, PageHeader, Panel, StatusBadge, Table, Td, Th, btn } from "@/components/admin/ui";
import { setPremium, setRole } from "@/lib/members/admin-actions";
import { listMembers } from "@/lib/members/admin-data";
import { formatDate, isLifetime } from "@/lib/members/config";
import { requireAdmin } from "@/lib/members/session";

export const metadata: Metadata = { title: "Members" };

const premiumActive = (until: string | null) => Boolean(until && new Date(until) > new Date());

function PremiumButton({ userId, op, children }: { userId: string; op: string; children: React.ReactNode }) {
  return (
    <form action={setPremium}>
      <input type="hidden" name="user_id" value={userId} />
      <input type="hidden" name="op" value={op} />
      <SubmitButton variant="outline" className="h-7 rounded-[3px] px-2.5 py-0 text-xs">
        {children}
      </SubmitButton>
    </form>
  );
}

export default async function AdminMembersPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const [me, sp] = await Promise.all([requireAdmin(), searchParams]);
  const q = (sp.q ?? "").slice(0, 100);
  const { members, total, premium } = await listMembers(q);

  return (
    <>
      <PageHeader title="Members" description={`${total} ${total === 1 ? "member" : "members"}, ${premium} with Premium.`} />
      <form className="mb-4 flex max-w-md gap-2" role="search">
        <label className="relative flex-1">
          <span className="sr-only">Search members</span>
          <MagnifyingGlass size={16} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search by name or email"
            className="h-9 w-full rounded-[3px] border border-gray-200 bg-white pl-8 pr-3 text-sm outline-none focus:border-[#F45B0A] focus:ring-2 focus:ring-[#F45B0A]/20"
          />
        </label>
        <button type="submit" className={btn.ghost}>
          Search
        </button>
      </form>

      <Panel flush>
        {members.length ? (
          <Table minWidth={900}>
            <thead>
              <tr>
                <Th>Member</Th>
                <Th>Status</Th>
                <Th>Joined</Th>
                <Th>Sign-in</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {members.map((u) => {
                const active = premiumActive(u.premium_until);
                return (
                  <tr key={u.id} className="align-top hover:bg-gray-50">
                    <Td>
                      <p className="font-medium text-gray-900">{u.name || "No name"}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </Td>
                    <Td>
                      <div className="flex flex-wrap gap-1">
                        {u.role === "admin" && <StatusBadge status="admin" />}
                        <StatusBadge status={active ? (isLifetime(u.premium_until) ? "lifetime" : "premium") : "free"}>
                          {active ? (isLifetime(u.premium_until) ? "Lifetime" : `Premium to ${formatDate(u.premium_until)}`) : "Free"}
                        </StatusBadge>
                        {!u.confirmed && <StatusBadge status="unconfirmed" />}
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap text-gray-500">
                      {formatDate(u.created_at)}
                      {u.last_sign_in_at && <p className="text-xs">Seen {formatDate(u.last_sign_in_at)}</p>}
                    </Td>
                    <Td className="text-gray-500">{u.providers.join(", ") || "email"}</Td>
                    <Td>
                      <div className="flex flex-wrap justify-end gap-1.5">
                        <PremiumButton userId={u.id} op="30">
                          +30 days
                        </PremiumButton>
                        <PremiumButton userId={u.id} op="365">
                          +1 year
                        </PremiumButton>
                        <PremiumButton userId={u.id} op="lifetime">
                          Lifetime
                        </PremiumButton>
                        {active && (
                          <form action={setPremium}>
                            <input type="hidden" name="user_id" value={u.id} />
                            <input type="hidden" name="op" value="revoke" />
                            <ConfirmSubmit message={`Remove Premium from ${u.email}?`} className="h-7 px-2 text-rose-600">
                              Remove Premium
                            </ConfirmSubmit>
                          </form>
                        )}
                        {u.id !== me.id && (
                          <form action={setRole}>
                            <input type="hidden" name="user_id" value={u.id} />
                            <input type="hidden" name="role" value={u.role === "admin" ? "member" : "admin"} />
                            <ConfirmSubmit
                              message={u.role === "admin" ? `Remove admin from ${u.email}?` : `Make ${u.email} an admin? Admins can manage downloads, members and posts.`}
                              className="h-7 px-2"
                            >
                              {u.role === "admin" ? "Remove admin" : "Make admin"}
                            </ConfirmSubmit>
                          </form>
                        )}
                      </div>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <div className="p-4">
            <EmptyState title={q ? "No members match that search" : "No members yet"} />
          </div>
        )}
      </Panel>
    </>
  );
}
