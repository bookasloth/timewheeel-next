import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MemberAppShell } from "@/components/members/shell/app-shell";
import { getNotificationSummary } from "@/lib/members/data";
import { requireMember } from "@/lib/members/session";

// The member app: its own top bar, menu and phone tab bar (no marketing
// navbar or footer). Every page still calls requireMember itself.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function MembersAppLayout({ children }: { children: ReactNode }) {
  const m = await requireMember();
  const { unread, latest } = await getNotificationSummary();
  return (
    <MemberAppShell
      member={{ name: m.name, email: m.email, avatarUrl: m.avatarUrl, isPremium: m.isPremium, hasPaidPremium: m.hasPaidPremium, isAdmin: m.isAdmin }}
      unread={unread}
      latest={latest}
    >
      {children}
    </MemberAppShell>
  );
}
