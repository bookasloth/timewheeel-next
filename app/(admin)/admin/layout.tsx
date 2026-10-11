import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminStats } from "@/lib/members/admin-data";
import { countNewMessages } from "@/lib/admin/inbox-data";
import { requireStaff } from "@/lib/members/session";

// The admin console: its own Parliament-style shell, outside the member app.
// Admins see every section; writers see only the blog editor. requireStaff
// 404s for everyone else, and every page and action checks again.
export const metadata: Metadata = { title: { default: "Admin console", template: "%s, Timewheel admin" }, robots: { index: false, follow: false } };

const ENV: Record<string, string> = { production: "Production", preview: "Preview" };

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const m = await requireStaff();
  const [stats, newMessages] = m.isAdmin ? await Promise.all([getAdminStats().then((r) => r.stats), countNewMessages()]) : [null, 0];
  return (
    <AdminShell
      admin={{ name: m.name, email: m.email, avatarUrl: m.avatarUrl }}
      badges={{ newMembers: stats?.new7 ?? 0, newMessages }}
      env={ENV[process.env.VERCEL_ENV ?? ""] ?? "Local"}
      scope={m.isAdmin ? "admin" : "writer"}
    >
      {children}
    </AdminShell>
  );
}
