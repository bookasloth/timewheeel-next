import type { Metadata } from "next";
import { LibraryView } from "@/components/members/library/library-view";
import { Alert } from "@/components/members/ui";
import { requireMember } from "@/lib/members/session";

export const metadata: Metadata = { title: "Premium downloads" };

export default async function PremiumDownloadsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const [m, sp] = await Promise.all([requireMember("/members/premium-downloads"), searchParams]);
  return (
    <>
      {sp.locked && !m.isPremium && (
        <div className="mb-5">
          <Alert tone="info">That file is part of Premium. Upgrade to download it.</Alert>
        </div>
      )}
      <LibraryView
        member={m}
        tier="premium"
        basePath="/members/premium-downloads"
        eyebrow="Member library"
        title="Premium downloads"
        intro="In-depth guides, templates and tools to help you market smarter."
        searchParams={sp}
      />
    </>
  );
}
