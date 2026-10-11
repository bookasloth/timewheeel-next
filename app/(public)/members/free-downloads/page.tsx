import type { Metadata } from "next";
import { DownloadList, EmptyState } from "@/components/members/download-list";
import { MemberPageHeader } from "@/components/members/page-header";
import { listDownloads } from "@/lib/members/data";
import { requireMember } from "@/lib/members/session";

export const metadata: Metadata = { title: "Free downloads" };

export default async function FreeDownloadsPage() {
  const m = await requireMember("/members/free-downloads");
  const items = await listDownloads("free");
  return (
    <div className="space-y-8">
      <MemberPageHeader eyebrow="Downloads" title="Free downloads" intro="Free for every member. Download as often as you like." />
      {items.length ? (
        <DownloadList items={items} />
      ) : (
        <EmptyState title="Nothing here yet" admin={m.isAdmin}>
          The team is preparing the first free downloads. They&apos;ll appear here as soon as they&apos;re ready.
        </EmptyState>
      )}
    </div>
  );
}
