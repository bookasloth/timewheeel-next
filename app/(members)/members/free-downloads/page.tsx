import type { Metadata } from "next";
import { LibraryView } from "@/components/members/library/library-view";
import { requireMember } from "@/lib/members/session";

export const metadata: Metadata = { title: "Free downloads" };

export default async function FreeDownloadsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const [m, sp] = await Promise.all([requireMember("/members/free-downloads"), searchParams]);
  return (
    <LibraryView
      member={m}
      tier="free"
      basePath="/members/free-downloads"
      eyebrow="Member library"
      title="Free downloads"
      intro="Free for every member. Download as often as you like."
      searchParams={sp}
    />
  );
}
