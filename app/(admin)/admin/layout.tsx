import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminStats } from "@/lib/members/admin-data";
import { requireAdmin } from "@/lib/members/session";

// The admin console: its own Parliament-style shell, outside the member app.
// requireAdmin 404s for non-admins; every page and action checks again.
export const metadata: Metadata = { title: { default: "Admin console", template: "%s, Timewheel admin" }, robots: { index: false, follow: false } };

const ENV: Record<string, string> = { production: "Production", preview: "Preview" };

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const m = await requireAdmin();
  const { stats } = await getAdminStats();
  return (
    <AdminShell
      admin={{ name: m.name, email: m.email, avatarUrl: m.avatarUrl }}
      badges={{ newMembers: stats.new7 }}
      env={ENV[process.env.VERCEL_ENV ?? ""] ?? "Local"}
    >
      {children}
    </AdminShell>
  );
}
