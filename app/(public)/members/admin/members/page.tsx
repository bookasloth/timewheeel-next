import type { Metadata } from "next";
import { AdminTabs } from "@/components/members/admin-tabs";
import { Avatar } from "@/components/members/avatar";
import { MemberPageHeader } from "@/components/members/page-header";
import { inputClass } from "@/components/members/input-class";
import { ConfirmSubmit, SubmitButton } from "@/components/members/ui";
import { setPremium, setRole } from "@/lib/members/admin-actions";
import { listMembers } from "@/lib/members/admin-data";
import { formatDate, isLifetime } from "@/lib/members/config";
import { requireAdmin } from "@/lib/members/session";

export const metadata: Metadata = { title: "Members, Admin" };

const premiumActive = (until: string | null) => Boolean(until && new Date(until) > new Date());

function PremiumButton({ userId, op, children }: { userId: string; op: string; children: React.ReactNode }) {
  return (
    <form action={setPremium}>
      <input type="hidden" name="user_id" value={userId} />
      <input type="hidden" name="op" value={op} />
      <SubmitButton variant="outline" className="px-2.5 py-1 text-xs">
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
    <div className="space-y-8">
      <MemberPageHeader eyebrow="Admin" title="Members" intro={`${total} ${total === 1 ? "member" : "members"}, ${premium} with Premium.`} />
      <AdminTabs active="members" />

      <form className="flex max-w-md gap-2" role="search">
        <label htmlFor="member-q" className="sr-only">
          Search members
        </label>
        <input id="member-q" name="q" defaultValue={q} placeholder="Search by name or email" className={inputClass(false)} />
        <button type="submit" className="btn btn-outline shrink-0 rounded-lg px-4 text-sm font-semibold">
          Search
        </button>
      </form>

      {members.length ? (
        <ul className="divide-y divide-border rounded-lg border border-border bg-card">
          {members.map((u) => {
            const active = premiumActive(u.premium_until);
            return (
              <li key={u.id} className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Avatar name={u.name || u.email} size={36} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {u.name || "No name"}
                      {u.role === "admin" && <span className="ml-2 text-xs font-bold uppercase tracking-wide text-brand-text">Admin</span>}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {u.email}
                      {!u.confirmed && " · email not confirmed"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Joined {formatDate(u.created_at)} · {u.providers.join(", ") || "email"}
                      {u.last_sign_in_at && ` · last seen ${formatDate(u.last_sign_in_at)}`}
                    </p>
                    <p className="mt-1 text-xs font-semibold">
                      {active ? (isLifetime(u.premium_until) ? "Premium, lifetime" : `Premium until ${formatDate(u.premium_until)}`) : "Free"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
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
                      <ConfirmSubmit message={`Remove Premium from ${u.email}?`}>Remove Premium</ConfirmSubmit>
                    </form>
                  )}
                  {u.id !== me.id && (
                    <form action={setRole}>
                      <input type="hidden" name="user_id" value={u.id} />
                      <input type="hidden" name="role" value={u.role === "admin" ? "member" : "admin"} />
                      <ConfirmSubmit message={u.role === "admin" ? `Remove admin from ${u.email}?` : `Make ${u.email} an admin? Admins can manage downloads, members and posts.`}>
                        {u.role === "admin" ? "Remove admin" : "Make admin"}
                      </ConfirmSubmit>
                    </form>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">{q ? "No members match that search." : "No members yet."}</p>
      )}
    </div>
  );
}
