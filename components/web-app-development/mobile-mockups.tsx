import {
  ArrowLeft,
  Bell,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronRight,
  Heart,
  Home,
  MessageCircle,
  MoreHorizontal,
  Package,
  Search,
  User,
  Wifi,
} from "lucide-react";

// Illustrative mobile UI for the same fictional TIMEWHEEL app shown in the
// desktop mockup. Fixed-width frames so the three screens read as a phone stack.

const avatars = [
  { name: "AR", bg: "#fe5100" },
  { name: "SK", bg: "#269cef" },
  { name: "JM", bg: "#4ab765" },
];

function Avatar({ name, bg, size = "size-6 text-[8px]" }: { name: string; bg: string; size?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-bold text-white ring-2 ring-white ${size}`}
      style={{ backgroundColor: bg }}
    >
      {name}
    </span>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[158px] shrink-0 rounded-[1.8rem] border-[5px] border-navy bg-white shadow-[0_20px_50px_-20px_rgba(26,29,36,0.45)]">
      <div className="absolute left-1/2 top-1.5 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-navy" />
      <div className="flex items-center justify-between rounded-b-none px-4 pb-1 pt-2.5 text-[9px] font-bold text-foreground">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <Wifi className="size-2.5" />
          <span className="inline-flex h-2 w-4 items-end gap-[1.5px]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-[3px] rounded-[1px] bg-foreground" style={{ height: `${50 + i * 25}%` }} />
            ))}
          </span>
        </span>
      </div>
      <div className="px-2.5 pb-2.5">{children}</div>
    </div>
  );
}

function Stat({ k, v, c }: { k: string; v: string; c?: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 px-2 py-1.5">
      <p className="text-[8px] font-semibold uppercase tracking-wide text-muted-foreground">{k}</p>
      <p className="mt-0.5 text-[11px] font-extrabold" style={{ color: c ?? "#1a1d24" }}>
        {v}
      </p>
    </div>
  );
}

export function ScreenDashboard() {
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-extrabold tracking-tight text-navy">
          Good morning<span className="text-brand">.</span>
        </p>
        <div className="flex items-center gap-1.5">
          <span className="relative grid size-6 place-items-center rounded-full bg-secondary">
            <Bell className="size-3 text-muted-foreground" />
            <span className="absolute right-1 top-1 size-1 rounded-full bg-brand" />
          </span>
          <Avatar name="KM" bg="#fe5100" size="size-6 text-[8px]" />
        </div>
      </div>

      <div className="mt-2 rounded-xl border border-border bg-secondary/30 p-2">
        <div className="flex items-center justify-between text-[8px] font-semibold text-muted-foreground">
          <span>Performance</span>
          <span className="text-rating">+32.8%</span>
        </div>
        <svg viewBox="0 0 130 36" className="mt-1 h-10 w-full" fill="none" aria-hidden>
          <defs>
            <linearGradient id="wa-mob-line" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fe5100" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#fe5100" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 30 C12 28 20 30 30 22 S48 18 58 14 S78 16 88 9 S110 6 130 3 L130 36 L0 36 Z" fill="url(#wa-mob-line)" />
          <path d="M0 30 C12 28 20 30 30 22 S48 18 58 14 S78 16 88 9 S110 6 130 3" stroke="#fe5100" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-1.5">
        <Stat k="Projects" v="8" />
        <Stat k="Tasks" v="24" />
        <Stat k="Deadline" v="Fri" c="#fe5100" />
      </div>

      <p className="mt-2.5 text-[9px] font-bold uppercase tracking-wide text-muted-foreground">Today</p>
      <div className="mt-1 space-y-1.5">
        {[
          { t: "API Integration", done: true },
          { t: "Design review", done: true },
          { t: "Weekly sync", done: false },
        ].map((x) => (
          <div key={x.t} className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2 py-1.5">
            <span
              className={`grid size-3.5 place-items-center rounded-full ${x.done ? "bg-rating/15 text-rating" : "border border-border bg-secondary"}`}
            >
              {x.done && <Check className="size-2.5" />}
            </span>
            <span className={`flex-1 text-[10px] font-medium ${x.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {x.t}
            </span>
            <ChevronRight className="size-3 text-muted-foreground/50" />
          </div>
        ))}
      </div>

      <div className="mt-2.5 flex items-center justify-between rounded-xl bg-navy px-3 py-2 text-white">
        <div>
          <p className="text-[9px] text-white/60">Active projects</p>
          <p className="text-[11px] font-extrabold">8 in motion</p>
        </div>
        <span className="btn btn-primary inline-flex items-center gap-0.5 rounded-md px-2 py-1 text-[8px] font-bold text-brand-foreground">
          Open <ChevronRight className="size-2.5" />
        </span>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}

function BottomNav() {
  const items = [
    { icon: Home, active: true },
    { icon: Package, active: false },
    { icon: Search, active: false },
    { icon: User, active: false },
  ];
  return (
    <div className="mt-2.5 flex items-center justify-around rounded-xl border border-border bg-card px-1 py-1.5">
      {items.map((x, i) => (
        <span
          key={i}
          className={`grid size-6 place-items-center rounded-md ${x.active ? "bg-brand/10 text-brand" : "text-muted-foreground/60"}`}
        >
          <x.icon className="size-3.5" />
        </span>
      ))}
    </div>
  );
}

export function ScreenProject() {
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between">
        <span className="grid size-6 place-items-center rounded-md bg-secondary">
          <ArrowLeft className="size-3 text-muted-foreground" />
        </span>
        <p className="text-[11px] font-bold text-muted-foreground">Project</p>
        <span className="grid size-6 place-items-center rounded-md bg-secondary">
          <MoreHorizontal className="size-3.5 text-muted-foreground" />
        </span>
      </div>

      <p className="mt-2.5 text-[13px] font-extrabold leading-tight tracking-tight text-navy">Website Redesign</p>
      <p className="text-[9px] text-muted-foreground">Phase 2 · Due Mar 28</p>

      <div className="mt-2.5 rounded-xl border border-border bg-secondary/30 p-2.5">
        <div className="flex items-center justify-between text-[9px] font-semibold">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-brand">76%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-[76%] rounded-full bg-brand" />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex -space-x-1.5">
            {avatars.map((a) => (
              <Avatar key={a.name} name={a.name} bg={a.bg} size="size-5 text-[7px]" />
            ))}
            <span className="grid size-5 place-items-center rounded-full bg-secondary text-[7px] font-bold text-muted-foreground ring-2 ring-white">
              +5
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-rating/10 px-1.5 py-0.5 text-[8px] font-bold text-rating">
            <CalendarClock className="size-2.5" /> On track
          </span>
        </div>
      </div>

      <p className="mt-2.5 text-[9px] font-bold uppercase tracking-wide text-muted-foreground">Checklist</p>
      <div className="mt-1 space-y-1.5">
        {[
          { t: "Homepage design", done: true },
          { t: "Template development", done: true },
          { t: "Content migration", done: false },
          { t: "QA & launch", done: false },
        ].map((x) => (
          <div key={x.t} className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2 py-1.5">
            <span
              className={`grid size-3.5 place-items-center rounded-full ${x.done ? "bg-rating/15 text-rating" : "border border-border bg-secondary"}`}
            >
              {x.done && <Check className="size-2.5" />}
            </span>
            <span className={`flex-1 text-[10px] font-medium ${x.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {x.t}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-2.5 text-[9px] font-bold uppercase tracking-wide text-muted-foreground">Activity</p>
      <div className="mt-1 space-y-0">
        {[
          { t: "Design launched", m: "2h ago" },
          { t: "Sprint planning", m: "Yesterday" },
        ].map((x, i) => (
          <div key={x.t} className="relative flex items-start gap-2 pb-2.5">
            {i === 0 && <span className="absolute bottom-0 left-[3px] top-4 w-px bg-border" />}
            <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-brand" />
            <div className="flex-1 text-[9.5px]">
              <span className="font-semibold text-foreground">{x.t}</span>
              <span className="text-muted-foreground"> · {x.m}</span>
            </div>
          </div>
        ))}
      </div>

      <span className="btn btn-primary mt-0.5 inline-flex w-full items-center justify-center gap-1 rounded-lg px-2 py-2 text-[9px] font-bold text-brand-foreground">
        View full timeline
      </span>
    </PhoneFrame>
  );
}

export function ScreenNotifications() {
  const items = [
    { icon: MessageCircle, tint: "#269cef", bg: "rgba(38,156,239,0.12)", title: "New message", sub: "Rohan: meeting moved to 3pm", time: "2m" },
    { icon: Package, tint: "#fe5100", bg: "rgba(254,81,0,0.12)", title: "Project update", sub: "Dashboard v2 published", time: "38m" },
    { icon: CheckCircle2, tint: "#4ab765", bg: "rgba(74,183,101,0.12)", title: "Task completed", sub: "API Integration", time: "1h" },
    { icon: Heart, tint: "#ff4d93", bg: "rgba(255,77,147,0.12)", title: "Team activity", sub: "Aisha joined Project Atlas", time: "3h" },
  ];
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-extrabold tracking-tight text-navy">Notifications</p>
        <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[8px] font-bold text-brand">3 new</span>
      </div>

      <div className="mt-2 flex gap-1.5">
        {["All", "Mentions", "Tasks"].map((t, i) => (
          <span
            key={t}
            className={`rounded-full px-2 py-1 text-[8px] font-bold ${i === 0 ? "bg-navy text-white" : "bg-secondary text-muted-foreground"}`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-2 space-y-1.5">
        {items.map((n) => (
          <div key={n.title + n.sub} className="flex items-start gap-2 rounded-lg border border-border bg-card px-2 py-2">
            <span className="grid size-6 shrink-0 place-items-center rounded-full" style={{ backgroundColor: n.bg, color: n.tint }}>
              <n.icon className="size-3" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-foreground">{n.title}</p>
                <span className="text-[8px] font-semibold text-muted-foreground">{n.time}</span>
              </div>
              <p className="truncate text-[9px] text-muted-foreground">{n.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-2.5 py-2">
        <Avatar name="SK" bg="#269cef" size="size-6 text-[8px]" />
        <div className="flex-1 text-[9px] text-muted-foreground">
          <span className="font-bold text-foreground">Sarah</span> joined your workspace
        </div>
        <span className="rounded-md bg-brand px-1.5 py-0.5 text-[8px] font-bold text-white">Hello</span>
      </div>
    </PhoneFrame>
  );
}

// Overlapping phone stack used on large screens (right of the desktop app).
export function MobileStack() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="z-10 w-40 -rotate-3">
        <ScreenDashboard />
      </div>
      <div className="-mt-24 z-20 w-40 rotate-1">
        <ScreenProject />
      </div>
      <div className="-mt-24 ml-12 z-30 w-40 -rotate-2">
        <ScreenNotifications />
      </div>
    </div>
  );
}