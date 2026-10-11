// Single source of truth for the admin console navigation, modelled on The
// Parliament console (bookasloth/the-parliament, src/app/admin/nav). Drives the
// primary rail (one icon per section), the secondary sidebar (items of the
// active section), the breadcrumb and the ⌘K palette.
//
// `icon` is a Phosphor component name resolved by icon-map.ts.
// `color` is the section colour for the rail glyph and active accents.

export type BadgeKey = "newMembers" | "newMessages";
export type Badges = Partial<Record<BadgeKey, number>>;

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: BadgeKey;
  external?: boolean;
}

export interface NavSection {
  key: string;
  label: string;
  icon: string;
  color: string;
  items: NavItem[];
  /** Also shown to writers (who only get the blog editor). */
  writer?: boolean;
}

export const NAV: NavSection[] = [
  {
    key: "overview",
    label: "Overview",
    icon: "Gauge",
    color: "#3b82f6",
    items: [{ label: "Dashboard", href: "/admin", icon: "House" }],
  },
  {
    key: "blog",
    label: "Blog",
    icon: "Article",
    color: "#10b981",
    writer: true,
    items: [
      { label: "Posts", href: "/admin/blog", icon: "Notepad" },
      { label: "New post", href: "/admin/blog/new", icon: "PencilSimpleLine" },
      { label: "Authors", href: "/admin/blog/authors", icon: "IdentificationCard" },
      { label: "View blog", href: "/blog", icon: "ArrowSquareOut", external: true },
    ],
  },
  {
    key: "inbox",
    label: "Inbox",
    icon: "Tray",
    color: "#f59e0b",
    items: [
      { label: "Messages", href: "/admin/inbox", icon: "EnvelopeSimple", badge: "newMessages" },
      { label: "Subscribers", href: "/admin/subscribers", icon: "UsersFour" },
    ],
  },
  {
    key: "library",
    label: "Library",
    icon: "Books",
    color: "#F45B0A",
    items: [{ label: "Downloads", href: "/admin/library", icon: "FileArrowDown" }],
  },
  {
    key: "community",
    label: "Community",
    icon: "UsersThree",
    color: "#0ea5e9",
    items: [{ label: "Members", href: "/admin/members", icon: "Users", badge: "newMembers" }],
  },
  {
    key: "revenue",
    label: "Revenue",
    icon: "CreditCard",
    color: "#8b5cf6",
    items: [
      { label: "Invoices", href: "/admin/invoices", icon: "FileText" },
      { label: "New invoice", href: "/admin/invoices/new", icon: "FilePlus" },
      { label: "Payments", href: "/admin/payments", icon: "Receipt" },
    ],
  },
  {
    key: "system",
    label: "System",
    icon: "Gear",
    color: "#71717a",
    items: [
      { label: "Member area", href: "/members", icon: "ArrowSquareOut", external: true },
      { label: "Website", href: "/", icon: "Globe", external: true },
    ],
  },
];

export function itemActive(href: string, pathname: string) {
  return href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);
}

/** The section owning the current path (longest-prefix match), else the first. */
export function activeSection(sections: NavSection[], pathname: string): NavSection {
  let best: NavSection | undefined;
  let len = -1;
  for (const s of sections) {
    for (const i of s.items) {
      if (!i.external && itemActive(i.href, pathname) && i.href.length > len) {
        best = s;
        len = i.href.length;
      }
    }
  }
  return best ?? sections[0];
}

export function activeItem(sections: NavSection[], pathname: string): NavItem | undefined {
  let best: NavItem | undefined;
  for (const s of sections) for (const i of s.items) if (!i.external && itemActive(i.href, pathname) && (!best || i.href.length > best.href.length)) best = i;
  return best;
}

export function sectionBadgeCount(section: NavSection, badges: Badges) {
  return section.items.reduce((n, i) => n + (i.badge ? (badges[i.badge] ?? 0) : 0), 0);
}
