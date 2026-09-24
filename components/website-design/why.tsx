import type { CSSProperties } from "react";
import { MessageCircle, Sparkle, Target, Users } from "lucide-react";
import { palette, wd } from "@/lib/website-design";

const reasonIcons = {
  message: MessageCircle,
  users: Users,
  target: Target,
  sparkle: Sparkle,
} as const;

export function WdWhy() {
  return (
    <section className="border-y border-border/60 bg-wsoft/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* copy + reasons */}
          <div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">{wd.why.label}</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-[1.12] tracking-tight md:text-[2.75rem]">
                {wd.why.title}
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">{wd.why.body}</p>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {wd.why.reasons.map((r) => {
                const Icon = reasonIcons[r.icon as keyof typeof reasonIcons];
                return (
                  <div key={r.number} className="h-full">
                    <div className="group flex h-full flex-col bg-white p-6 transition-colors duration-300 hover:bg-white">
                      <div className="flex items-center justify-between">
                        <span
                          className="grid size-10 place-items-center rounded-xl text-white transition-transform duration-300"
                          style={{ backgroundColor: r.accent }}
                        >
                          <Icon className="size-5" />
                        </span>
                        <span className="text-2xl font-black tracking-tight text-foreground/10">{r.number}</span>
                      </div>
                      <h3 className="mt-4 text-base font-bold tracking-tight">{r.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* device mockup */}
          <div>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div aria-hidden className="absolute inset-0 rounded-full bg-gradient-to-tr from-wblue/25 via-wpurple/20 to-worange/15 blur-3xl" />
              <div className="wd-float relative mx-auto -rotate-2 rounded-2xl border border-border bg-background p-3 pl-5 shadow-[0_40px_80px_-40px_rgba(17,24,39,0.5)] transition-transform duration-300 hover:rotate-0">
                <div className="overflow-hidden rounded-xl bg-white">
                  <div className="flex items-center gap-3 border-b border-border/70 bg-soft px-4 py-2">
                    <span className="flex gap-1.5">
                      <span className="size-2 rounded-full bg-foreground/15" />
                      <span className="size-2 rounded-full bg-foreground/15" />
                      <span className="size-2 rounded-full bg-foreground/15" />
                    </span>
                    <span className="mx-auto text-[10px] font-semibold text-muted-foreground">yourbusiness.com</span>
                  </div>
                  <div className="px-5 pb-5 pt-5">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="size-4 rounded-md" style={{ backgroundColor: palette.blue }} />
                        <span className="text-[10px] font-black tracking-tight">Your Brand</span>
                      </span>
                      <span className="rounded-md px-2 py-1 text-[8px] font-bold text-white" style={{ backgroundColor: palette.blue }}>
                        Get Started
                      </span>
                    </div>
                    <div className="mt-5 text-left">
                      <span className="block text-xl font-black leading-[1.05] tracking-tight text-foreground">
                        Not another template.
                        <br />
                        Not another website.
                      </span>
                      <span className="mt-3 block text-[11px] leading-relaxed text-muted-foreground">
                        Built for your business, your message, your growth.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <span
                className="wd-float absolute -right-3 top-6 grid size-14 place-items-center rounded-2xl border border-border bg-white text-white shadow-lg"
                style={{ backgroundColor: palette.purple, "--float-delay": "1s" } as CSSProperties}
              >
                <Sparkle className="size-6" />
              </span>
              <span
                className="wd-float absolute -bottom-5 -left-2 grid size-12 place-items-center rounded-2xl border border-border bg-white text-white shadow-lg"
                style={{ backgroundColor: palette.orange, "--float-delay": "0.4s" } as CSSProperties}
              >
                <Target className="size-5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}