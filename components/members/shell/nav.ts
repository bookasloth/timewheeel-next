import {
  Bell,
  BookOpen,
  Briefcase,
  CircleHelp,
  Crown,
  CreditCard,
  Download,
  GraduationCap,
  House,
  Library,
  MessagesSquare,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

// One place for the member app's navigation (sidebar, phone drawer, tab bar).
// Grouping follows the member dashboard mockup (2026-10-11).

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  badge?: "notifications";
  /** Shown but not clickable yet. */
  soon?: boolean;
  /** Leaves the member app (public site page). */
  external?: boolean;
};
export type NavGroup = { label: string; items: NavItem[] };

export const memberNav: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      { href: "/members", label: "Overview", icon: House, exact: true },
      { href: "/members/community", label: "Community", icon: MessagesSquare },
      { href: "/members/people", label: "People", icon: Users },
    ],
  },
  {
    label: "Learn & grow",
    items: [
      { href: "/members/learn", label: "Courses", icon: GraduationCap, soon: true },
      { href: "/members/library", label: "Resource library", icon: Library },
      { href: "/members/free-downloads", label: "Free downloads", icon: Download },
      { href: "/members/premium-downloads", label: "Premium downloads", icon: Crown },
      { href: "/case-studies", label: "Case studies", icon: Briefcase, external: true },
    ],
  },
  {
    label: "Your account",
    items: [
      { href: "/members/account", label: "Profile & account", icon: UserRound },
      { href: "/members/premium", label: "Membership & billing", icon: CreditCard },
      { href: "/members/notifications", label: "Notifications", icon: Bell, badge: "notifications" },
      { href: "/members/help", label: "Help & support", icon: CircleHelp },
    ],
  },
];

export const tabBar: NavItem[] = [
  { href: "/members", label: "Home", icon: House, exact: true },
  { href: "/members/library", label: "Library", icon: BookOpen },
  { href: "/members/community", label: "Community", icon: MessagesSquare },
  { href: "/members/notifications", label: "Alerts", icon: Bell, badge: "notifications" },
];

export function isActive(pathname: string, item: Pick<NavItem, "href" | "exact">) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
