import type { Metadata } from "next";
import { LibraryView } from "@/components/members/library/library-view";
import { requireMember } from "@/lib/members/session";

export const metadata: Metadata = { title: "Resource library" };

export default async function LibraryPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const [m, sp] = await Promise.all([requireMember("/members/library"), searchParams]);
  return (
    <LibraryView
      member={m}
      basePath="/members/library"
      eyebrow="Member library"
      title="Resource library"
      intro="Practical guides, templates and tools to help you market smarter. Free resources for every member, Premium ones for Premium members."
      searchParams={sp}
    />
  );
}
