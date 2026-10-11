import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MemberSidebar } from "@/components/members/sidebar";
import { requireMember } from "@/lib/members/session";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function MembersLayout({ children }: { children: ReactNode }) {
  const m = await requireMember();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-[230px_minmax(0,1fr)] md:gap-10">
        <MemberSidebar name={m.name} email={m.email} avatarUrl={m.avatarUrl} isPremium={m.isPremium} isAdmin={m.isAdmin} />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
