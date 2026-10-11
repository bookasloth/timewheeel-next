import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { EmptyState, PageHeader, StatusBadge, Table, Td, Th } from "@/components/admin/ui";
import { InboxFilters } from "@/components/admin/inbox-client";
import { listLeads } from "@/lib/admin/inbox-data";
import { requireAdmin } from "@/lib/members/session";

export const metadata: Metadata = { title: "Messages" };

const when = (iso: string) => new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });

export default async function InboxPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; source?: string }> }) {
  const [, sp] = await Promise.all([requireAdmin(), searchParams]);
  const { leads, sources, counts } = await listLeads({ q: sp.q ?? "", status: sp.status ?? "all", source: sp.source ?? "" });
  const filtered = Boolean(sp.q || sp.source || (sp.status && sp.status !== "all"));

  return (
    <>
      <PageHeader title="Messages" description="Every enquiry from the website's forms: contact, free website, demo bookings and more." />
      <Suspense>
        <InboxFilters sources={sources} counts={counts} />
      </Suspense>
      {leads.length === 0 ? (
        <EmptyState title={filtered ? "Nothing matches" : "No enquiries yet"} description={filtered ? "Try another filter." : "Form submissions from the website land here."} />
      ) : (
        <section className="rounded-[5px] border border-gray-200 bg-white">
          <Table minWidth={760}>
            <thead>
              <tr>
                <Th>From</Th>
                <Th>Message</Th>
                <Th>Form</Th>
                <Th>Status</Th>
                <Th className="text-right">Received</Th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className={`hover:bg-gray-50 ${l.status === "new" ? "font-medium" : ""}`}>
                  <Td>
                    <Link href={`/admin/inbox/${l.id}`} className="block text-gray-900 hover:underline">
                      {l.name}
                    </Link>
                    <span className="block max-w-[14rem] truncate text-xs font-normal text-gray-500">{l.business || l.email}</span>
                  </Td>
                  <Td>
                    <Link href={`/admin/inbox/${l.id}`} className="block max-w-[22rem]">
                      <span className="block truncate text-gray-800">{l.service}</span>
                      <span className="block truncate text-xs font-normal text-gray-500">{l.message}</span>
                    </Link>
                  </Td>
                  <Td className="text-xs font-normal">{l.source}</Td>
                  <Td>
                    <StatusBadge status={l.status} />
                  </Td>
                  <Td className="whitespace-nowrap text-right text-xs font-normal">{when(l.created_at)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
          {leads.length === 300 && <p className="border-t border-gray-200 px-3 py-2 text-xs text-gray-500">Showing the latest 300. Search to find older ones.</p>}
        </section>
      )}
    </>
  );
}
