// Member-area constants shared by server and client code. Nothing secret here.

/** Readable (non-httpOnly) "is signed in" hint so static pages, like the navbar,
 * can show "My account" instead of "Log in". Holds no token: the real session
 * cookies are httpOnly. Set by proxy.ts, cleared on sign-out. */
export const MEMBER_HINT_COOKIE = "tw_member";

export const MEMBERS_HOME = "/members";

export const memberNav = [
  { href: "/members", label: "Dashboard" },
  { href: "/members/community", label: "Community" },
  { href: "/members/free-downloads", label: "Free downloads" },
  { href: "/members/premium-downloads", label: "Premium downloads" },
  { href: "/members/account", label: "Account" },
] as const;

export const communityCategories = [
  { slug: "general", label: "General" },
  { slug: "introductions", label: "Introductions" },
  { slug: "marketing", label: "Marketing and SEO" },
  { slug: "websites", label: "Websites and tech" },
  { slug: "showcase", label: "Show your work" },
  { slug: "questions", label: "Questions" },
] as const;

export type CommunityCategory = (typeof communityCategories)[number]["slug"];

export function categoryLabel(slug: string) {
  return communityCategories.find((c) => c.slug === slug)?.label ?? "General";
}

/** Only same-site paths survive, so ?next= can never bounce a member off-site. */
export function safeNext(next: unknown, fallback: string = MEMBERS_HOME): string {
  if (typeof next !== "string") return fallback;
  if (!next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return fallback;
  return next.slice(0, 500);
}

/** "9999-12-31" style far-future expiry used for lifetime premium. */
export const LIFETIME_YEAR = 9999;

export function isLifetime(until: string | null | undefined) {
  return Boolean(until && new Date(until).getUTCFullYear() >= LIFETIME_YEAR);
}

export function formatBytes(n: number | null | undefined) {
  if (!n) return "";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v < 10 && i > 0 ? v.toFixed(1) : Math.round(v)} ${units[i]}`;
}

export function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
}

export function timeAgo(iso: string) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = s / 60;
  if (m < 60) return `${Math.floor(m)} min ago`;
  const h = m / 60;
  if (h < 24) return `${Math.floor(h)} h ago`;
  const d = h / 24;
  if (d < 30) return `${Math.floor(d)} d ago`;
  return formatDate(iso);
}
