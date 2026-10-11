import type { Metadata } from "next";
import { Bell } from "lucide-react";
import { SubmitButton } from "@/components/members/ui";
import { listNotifications } from "@/lib/members/data";
import { clearRead, markAllRead } from "@/lib/members/notification-actions";
import { timeAgo } from "@/lib/members/config";
import { requireMember } from "@/lib/members/session";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Notifications" };

export default async function NotificationsPage() {
  await requireMember("/members/notifications");
  const items = await listNotifications();
  const unread = items.filter((n) => !n.read_at).length;
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Your account</p>
          <h1 className="mt-2 font-heading font-extrabold tracking-tight">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">{unread ? `${unread} unread` : "You're all caught up."}</p>
        </div>
        <div className="flex gap-2">
          {unread > 0 && (
            <form action={markAllRead}>
              <SubmitButton variant="outline" className="px-4 py-2">
                Mark all read
              </SubmitButton>
            </form>
          )}
          {items.some((n) => n.read_at) && (
            <form action={clearRead}>
              <SubmitButton variant="outline" className="px-4 py-2">
                Clear read
              </SubmitButton>
            </form>
          )}
        </div>
      </header>
      {items.length ? (
        <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
          {items.map((n) => (
            <li key={n.id}>
              {/* Plain <a>: no prefetch (it would mark the notification read) and a real navigation through the redirect. */}
              <a href={`/members/notifications/go/${n.id}`} className="flex gap-3 p-4 transition-colors hover:bg-secondary/40">
                <span className={cn("mt-1.5 size-2.5 shrink-0 rounded-full", n.read_at ? "bg-border" : "bg-brand")} />
                <span className="min-w-0">
                  <span className={cn("block text-sm", !n.read_at && "font-semibold")}>{n.title}</span>
                  {n.body && <span className="mt-0.5 block text-sm text-muted-foreground">{n.body}</span>}
                  <span className="mt-1 block text-xs text-muted-foreground">{timeAgo(n.created_at)}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-lg border border-dashed border-border px-6 py-14 text-center">
          <Bell className="mx-auto size-8 text-muted-foreground" strokeWidth={1.5} />
          <p className="mt-3 font-heading text-lg font-bold">No notifications yet</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            You&apos;ll hear here when someone replies to you or the team adds something new.
          </p>
        </div>
      )}
    </div>
  );
}
