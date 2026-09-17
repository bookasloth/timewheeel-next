import { Reveal } from "@/components/reveal";
import { wa } from "@/lib/web-app-development";

// Small bespoke UI illustrations for each "what we build" card — no stock media.
function ArtDashboard() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-muted-foreground">Overview</p>
        <span className="rounded-full bg-rating/10 px-1.5 py-0.5 text-[8px] font-bold text-rating">Live</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border bg-secondary/50 px-2.5 py-2">
          <p className="text-[8px] font-semibold text-muted-foreground">Revenue</p>
          <p className="text-[12px] font-extrabold text-navy">$48.2K</p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/50 px-2.5 py-2">
          <p className="text-[8px] font-semibold text-muted-foreground">Orders</p>
          <p className="text-[12px] font-extrabold text-navy">1,284</p>
        </div>
      </div>
      <div className="mt-2 flex h-14 items-end gap-1.5 rounded-lg border border-border bg-secondary/30 p-2">
        {[40, 62, 34, 78, 52, 88].map((h) => (
          <div key={h} className="flex-1 rounded-sm bg-brand/70" style={{ height: `${h}%` }} />
        ))}
        <div className="w-1 flex-1 rounded-sm bg-wairis/60" />
      </div>
    </div>
  );
}

function ArtPortal() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">SA</span>
        <div>
          <p className="text-[10px] font-bold text-foreground">Good morning, Sarah</p>
          <p className="text-[8px] text-muted-foreground">Your account</p>
        </div>
      </div>
      <div className="mt-3 rounded-lg border border-border bg-secondary/40 p-2.5">
        <p className="text-[8px] font-semibold text-muted-foreground">Current plan</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-[11px] font-extrabold text-navy">Professional</p>
          <span className="rounded-md bg-brand/10 px-1.5 py-0.5 text-[8px] font-bold text-brand">Active</span>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2 py-1.5">
          <span className="size-1.5 rounded-full bg-rating" />
          <span className="text-[8px] font-semibold">Invoices</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2 py-1.5">
          <span className="size-1.5 rounded-full bg-accent-blue" />
          <span className="text-[8px] font-semibold">Documents</span>
        </div>
      </div>
    </div>
  );
}

function ArtPlatform() {
  return (
    <div className="p-5">
      <div className="flex gap-2">
        {[
          { t: "New", c: "#fe5100", items: ["Brief", "Wireframes"], done: [0, 0] },
          { t: "In progress", c: "#269cef", items: ["Design", "Build"], done: [1, 0] },
          { t: "Done", c: "#4ab765", items: ["QA", "Ship"], done: [1, 1] },
        ].map((col) => (
          <div key={col.t} className="flex-1 rounded-lg border border-border bg-secondary/40 p-1.5">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[7px] font-bold uppercase tracking-wide text-muted-foreground">{col.t}</span>
              <span className="size-1.5 rounded-full" style={{ backgroundColor: col.c }} />
            </div>
            <div className="mt-1.5 space-y-1.5">
              {col.items.map((it, j) => (
                <div key={it} className="rounded-md bg-card px-1.5 py-1 text-[7.5px] font-semibold">
                  {col.done[j] ? "✓ " : ""}
                  {it}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtProduct() {
  return (
    <div className="p-5">
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-1.5 rounded-t-lg bg-secondary/70 px-2.5 py-1.5">
          <span className="size-1.5 rounded-full bg-accent-pink" />
          <span className="size-1.5 rounded-full bg-accent-yellow" />
          <span className="size-1.5 rounded-full bg-accent-blue" />
          <span className="ml-1 flex-1 rounded bg-background px-1.5 text-[7px] font-medium text-muted-foreground">
            app.you.co
          </span>
        </div>
        <div className="space-y-1.5 p-2.5">
          <div className="h-1.5 w-2/3 rounded-full bg-navy/15" />
          <div className="h-1.5 w-1/2 rounded-full bg-navy/10" />
          <div className="mt-2 flex gap-1.5">
            <div className="h-6 flex-1 rounded-md border border-brand/25 bg-brand/10" />
            <div className="h-6 flex-1 rounded-md border border-wairis/25 bg-wairis/10" />
            <div className="h-6 flex-1 rounded-md border border-border bg-secondary/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

const art = [ArtDashboard, ArtPortal, ArtPlatform, ArtProduct] as const;
const artTints = ["bg-brand/10", "bg-accent-blue/10", "bg-accent-pink/10", "bg-accent-yellow/20"] as const;

export function WaSolutions() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">{wa.solutions.label}</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {wa.solutions.heading} <span className="text-brand">{wa.solutions.headingAccent}</span>
          </h2>
          <p className="max-w-sm text-muted-foreground md:text-lg">{wa.solutions.body}</p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {wa.solutions.cards.map((c, i) => {
          const Art = art[i];
          return (
            <Reveal key={c.title} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-brand/25">
                <div className={`overflow-hidden rounded-t-2xl ${artTints[i]}`}>
                  <Art />
                </div>
                <div className="flex-1 p-6 md:p-7">
                  <h3 className="text-lg font-bold tracking-tight">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}