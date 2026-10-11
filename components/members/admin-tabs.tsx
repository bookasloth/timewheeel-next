import Link from "next/link";
import { cn } from "@/lib/utils";

export function AdminTabs({ active }: { active: "downloads" | "members" }) {
  const tabs = [
    { key: "downloads", href: "/members/admin", label: "Downloads" },
    { key: "members", href: "/members/admin/members", label: "Members" },
  ];
  return (
    <nav className="flex gap-1 border-b border-border">
      {tabs.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          aria-current={active === t.key ? "page" : undefined}
          className={cn(
            "-mb-px border-b-2 px-3 py-2.5 text-sm font-medium",
            active === t.key ? "border-brand text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
