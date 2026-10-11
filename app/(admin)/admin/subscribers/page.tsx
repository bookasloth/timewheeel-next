import type { Metadata } from "next";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { EmptyState, PageHeader, StatusBadge, Table, Td, Th, btn } from "@/components/admin/ui";
import { RemoveSubscriberButton } from "@/components/admin/inbox-client";
import { listNewsletterContacts } from "@/lib/resend-contacts";
import { requireAdmin } from "@/lib/members/session";

export const metadata: Metadata = { title: "Subscribers" };
export const dynamic = "force-dynamic";

const when = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

export default async function SubscribersPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const [, sp] = await Promise.all([requireAdmin(), searchParams]);
  const contacts = await listNewsletterContacts();
  const q = (sp.q ?? "").trim().toLowerCase();
  const shown = (contacts ?? []).filter((c) => !q || c.email.toLowerCase().includes(q));
  const active = (contacts ?? []).filter((c) => !c.unsubscribed).length;

  return (
    <>
      <PageHeader
        title="Subscribers"
        description={contacts ? `${active} subscribed to the newsletter${contacts.length > active ? `, ${contacts.length - active} unsubscribed` : ""}. Synced with your Resend audience.` : "Newsletter sign-ups from the footer, blog and register page."}
        actions={
          contacts?.length ? (
            <a href="/admin/subscribers/export" className={btn.ghost}>
              <DownloadSimple size={16} /> Export CSV
            </a>
          ) : undefined
        }
      />
      {contacts === null ? (
        <EmptyState title="Resend isn't connected" description="Set RESEND_API_KEY and RESEND_NEWSLETTER_AUDIENCE_ID to see newsletter subscribers here." />
      ) : contacts.length === 0 ? (
        <EmptyState title="No subscribers yet" description="People who join the newsletter appear here." />
      ) : (
        <>
          <form className="mb-3">
            <input type="search" name="q" defaultValue={sp.q ?? ""} placeholder="Search email" className="h-9 w-full rounded-[3px] border border-gray-300 bg-white px-3 text-sm outline-none focus:border-[#F45B0A] sm:w-72" aria-label="Search subscribers" />
          </form>
          <section className="rounded-[5px] border border-gray-200 bg-white">
            <Table minWidth={560}>
              <thead>
                <tr>
                  <Th>Email</Th>
                  <Th>Status</Th>
                  <Th>Joined</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {shown.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <Td>
                      <span className="text-gray-900">{c.email}</span>
                      {(c.first_name || c.last_name) && <span className="block text-xs text-gray-500">{[c.first_name, c.last_name].filter(Boolean).join(" ")}</span>}
                    </Td>
                    <Td>
                      <StatusBadge status={c.unsubscribed ? "hidden" : "published"}>{c.unsubscribed ? "Unsubscribed" : "Subscribed"}</StatusBadge>
                    </Td>
                    <Td className="text-xs">{when(c.created_at)}</Td>
                    <Td className="text-right">
                      <RemoveSubscriberButton id={c.id} email={c.email} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </section>
        </>
      )}
    </>
  );
}
