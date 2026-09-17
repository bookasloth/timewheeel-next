import {
  ArrowUpRight,
  Bell,
  CheckCircle2,
  FolderKanban,
  LayoutDashboard,
  Lock,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

// Illustrative UI sample inside the TIMEWHEEL web app mockup. Not real data.
const nav = [
  { label: "Dashboard", active: true },
  { label: "Projects", active: false },
  { label: "Analytics", active: false },
  { label: "Team", active: false },
  { label: "Settings", active: false },
];

const avatars = [
  { name: "AR", bg: "#fe5100" },
  { name: "SK", bg: "#269cef" },
  { name: "JM", bg: "#4ab765" },
  { name: "PL", bg: "#ff4d93" },
];

function Avatar({ name, bg, size = "size-7 text-[10px]" }: { name: string; bg: string; size?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-bold text-white ring-2 ring-white ${size}`}
      style={{ backgroundColor: bg }}
    >
      {name}
    </span>
  );
}

function Kpi({ k, v, meta, tone }: { k: string; v: string; meta?: string; tone: "up" | "plain" }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{k}</p>
        {tone === "up" && meta ? (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-rating/10 px-1.5 py-0.5 text-[10px] font-bold text-rating">
            <ArrowUpRight className="size-3" />
            {meta}
          </span>
        ) : null}
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="font-heading text-xl font-extrabold tracking-tight text-navy">{v}</span>
        {meta && tone === "plain" && (
          <span className="text-[11px] font-semibold text-muted-foreground">{meta}</span>
        )}
      </div>
    </div>
  );
}

// Smooth area chart — same drawing style as the rest of the site's mockups.
function RevenueChart() {
  const line = "M0 78 C36 70 58 72 92 54 C126 36 158 48 196 32 C234 16 266 24 300 10";
  return (
    <div>
      <svg viewBox="0 0 300 88" className="h-24 w-full" fill="none" aria-hidden>
        <defs>
          <linearGradient id="wa-rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fe5100" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#fe5100" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[28, 56].map((y) => (
          <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#ececef" strokeWidth="1" />
        ))}
        <path d={`${line} L300 88 L0 88 Z`} fill="url(#wa-rev)" />
        <path d={line} stroke="#fe5100" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="300" cy="10" r="3.5" fill="#fe5100" />
        <circle cx="300" cy="10" r="6.5" fill="#fe5100" fillOpacity="0.18" />
      </svg>
      <div className="mt-2 flex items-center justify-between px-0.5 text-[10px] font-medium text-muted-foreground">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  );
}

function TaskBars() {
  const bars = [
    { d: "Mon", v: 46, c: "#269cef" },
    { d: "Tue", v: 64, c: "#269cef" },
    { d: "Wed", v: 42, c: "#fe5100" },
    { d: "Thu", v: 78, c: "#fe5100" },
    { d: "Fri", v: 58, c: "#4ab765" },
    { d: "Sat", v: 30, c: "#4ab765" },
  ];
  return (
    <div>
      <div className="flex h-16 items-end gap-2">
        {bars.map((b) => (
          <div key={b.d} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="h-full w-full overflow-hidden rounded-md bg-secondary/70">
              <div
                className="w-full rounded-md"
                style={{ height: `${b.v}%`, backgroundColor: b.c }}
              />
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-muted-foreground">
        {bars.map((b) => (
          <span key={b.d} className="flex-1 text-center">
            {b.d}
          </span>
        ))}
      </div>
    </div>
  );
}

const projects = [
  { name: "Client Portal", pct: 84, c: "#fe5100" },
  { name: "HR Platform", pct: 62, c: "#269cef" },
  { name: "Mobile App", pct: 38, c: "#ff4d93" },
];

const activity = [
  { who: "KM", name: "Kiran Mehta", text: "deployed API Integration", time: "2m", tone: "#4ab765" },
  { who: "AS", name: "Aisha Shaikh", text: "closed task #129 · Stripe webhook", time: "18m", tone: "#fe5100" },
  { who: "PL", name: "Priya Lal", text: "commented on Project Timeline", time: "1h", tone: "#269cef" },
];

export function DashboardMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_-28px_rgba(26,29,36,0.28)]">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
        <span className="size-2.5 rounded-full bg-accent-pink" />
        <span className="size-2.5 rounded-full bg-accent-yellow" />
        <span className="size-2.5 rounded-full bg-accent-blue" />
        <span className="ml-2 flex flex-1 items-center gap-1.5 rounded-lg bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
          <Lock className="size-3 text-rating" />
          app.timewheel.co.in/dashboard
        </span>
        <span className="hidden items-center gap-1.5 rounded-full bg-background px-2 py-0.5 text-[10px] font-bold text-brand sm:inline-flex">
          <span className="size-1.5 animate-pulse rounded-full bg-brand" />
          Live
        </span>
      </div>

      {/* app top bar */}
      <div className="flex items-center justify-between gap-4 border-b border-border bg-card px-4 py-2.5">
        <p className="font-heading text-sm font-black tracking-tight">
          TIME<span className="text-brand">WHEEL</span>
        </p>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <span
              key={n.label}
              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${
                n.active
                  ? "bg-brand/10 text-brand"
                  : "text-muted-foreground"
              }`}
            >
              {n.label}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden size-8 place-items-center rounded-lg bg-secondary sm:grid">
            <Search className="size-3.5 text-muted-foreground" />
          </span>
          <span className="relative grid size-8 place-items-center rounded-lg bg-secondary">
            <Bell className="size-3.5 text-muted-foreground" />
            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-brand" />
          </span>
          <Avatar name="KM" bg="#fe5100" />
        </div>
      </div>

      {/* main */}
      <div className="p-4 sm:p-5">
        {/* greeting */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-heading text-lg font-extrabold leading-tight tracking-tight text-navy sm:text-xl">
              Your business,<br />all in one place.
            </p>
            <p className="mt-1.5 max-w-sm text-[12px] leading-relaxed text-muted-foreground">
              Manage projects, customers, workflows and insights from one powerful platform.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {avatars.map((a) => (
                <Avatar key={a.name} name={a.name} bg={a.bg} size="size-6 text-[9px]" />
              ))}
            </div>
            <span className="btn btn-primary inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-semibold text-brand-foreground">
              <Plus className="size-3.5" />
              New Project
            </span>
          </div>
        </div>

        {/* KPI row */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          <Kpi k="Revenue" v="$48,240" meta="+18.4%" tone="up" />
          <Kpi k="Projects" v="24" meta="Active" tone="plain" />
          <Kpi k="Tasks" v="128" meta="Completed" tone="plain" />
          <Kpi k="Team" v="18" meta="Members" tone="plain" />
        </div>

        {/* charts */}
        <div className="mt-2.5 grid gap-2.5 lg:grid-cols-5">
          <div className="rounded-xl border border-border bg-secondary/30 p-3.5 lg:col-span-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-navy">Revenue</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-rating/10 px-2 py-0.5 text-[10px] font-bold text-rating">
                <TrendingUp className="size-3" />
                +18.4% vs prev
              </span>
            </div>
            <div className="mt-3">
              <RevenueChart />
            </div>
          </div>
          <div className="rounded-xl border border-border bg-secondary/30 p-3.5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-navy">Tasks completed</p>
              <span className="text-[10px] font-semibold text-muted-foreground">This week</span>
            </div>
            <div className="mt-3">
              <TaskBars />
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="mt-2.5 grid gap-2.5 lg:grid-cols-5">
          <div className="rounded-xl border border-border bg-card p-3.5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs font-bold text-navy">
                <FolderKanban className="size-3.5 text-brand" />
                Project progress
              </p>
              <button type="button" className="text-muted-foreground" aria-label="Project options">
                <MoreHorizontal className="size-4" />
              </button>
            </div>
            <div className="mt-3 space-y-3">
              {projects.map((p) => (
                <div key={p.name}>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-foreground">{p.name}</span>
                    <span className="font-bold text-muted-foreground">{p.pct}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${p.pct}%`, backgroundColor: p.c }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-3.5 lg:col-span-3">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs font-bold text-navy">
                <LayoutDashboard className="size-3.5 text-brand" />
                Recent activity
              </p>
              <span className="text-[10px] font-semibold text-muted-foreground">Today</span>
            </div>
            <div className="mt-3 space-y-2.5">
              {activity.map((a) => (
                <div key={a.text} className="flex items-center gap-2.5 rounded-lg bg-secondary/40 px-2.5 py-2">
                  <Avatar name={a.who} bg={a.tone} size="size-6 text-[9px]" />
                  <div className="min-w-0 flex-1 truncate text-[11px]">
                    <span className="font-bold text-foreground">{a.name}</span>{" "}
                    <span className="text-muted-foreground">{a.text}</span>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-rating/10 px-1.5 py-0.5 text-[10px] font-bold text-rating">
                    <CheckCircle2 className="size-3" />
                    {a.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* team strip */}
        <div className="mt-2.5 flex items-center justify-between rounded-xl border border-border bg-card px-3.5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-brand/10 text-brand">
              <Users className="size-4" />
            </span>
            <div>
              <p className="text-xs font-bold text-navy">Team members</p>
              <p className="text-[10px] text-muted-foreground">18 members · 6 online now</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {avatars.slice(0, 3).map((a) => (
                <Avatar key={a.name} name={a.name} bg={a.bg} size="size-6 text-[9px]" />
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand">
              <Settings className="size-3" />
              Manage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}