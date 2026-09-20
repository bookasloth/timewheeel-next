"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Rocket,
  ChartLineUp,
  ChatCircle,
  CalendarCheck,
  Ticket,
  Coffee,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

type Item = {
  id: string;
  name: string;
  tagline: string;
  result: string;
  accent: string;
  iconKey: string;
  live: boolean;
};

const ICONS: Record<string, Icon> = {
  rocket: Rocket,
  chart: ChartLineUp,
  chat: ChatCircle,
  calendar: CalendarCheck,
  ticket: Ticket,
  coffee: Coffee,
};

const LIMIT = 6;

// Load-more for the "Our Work" proof grid. Fetches the next batch on click, so
// these cards never ship in the initial page HTML. The first six cards are
// server-rendered separately by WdPortfolio.
export function LoadMoreProjects() {
  const [items, setItems] = useState<Item[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/wd-projects?offset=${items.length}&limit=${LIMIT}`);
      if (!res.ok) throw new Error("bad status");
      const data: { items: Item[]; hasMore: boolean } = await res.json();
      setItems((prev) => [...prev, ...data.items]);
      setHasMore(data.hasMore);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {items.length > 0 && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Ic = ICONS[item.iconKey] ?? Rocket;
            return (
              <div
                key={item.id}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/50"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="grid size-11 place-items-center rounded-xl"
                    style={{ backgroundColor: `${item.accent}1a`, color: item.accent }}
                  >
                    <Ic size={22} weight="duotone" />
                  </span>
                  <span
                    className={
                      item.live
                        ? "inline-flex items-center gap-1 rounded-full bg-rating/10 px-2 py-0.5 text-[10px] font-bold text-rating"
                        : "rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-muted-foreground"
                    }
                  >
                    {item.live ? "Live" : "In rollout"}
                  </span>
                </div>
                <h3 className="mt-4 flex items-center gap-1.5 text-lg font-bold">
                  {item.name}
                  <ArrowUpRight className="size-4 text-muted-foreground" />
                </h3>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{item.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.result}</p>
              </div>
            );
          })}
        </div>
      )}

      {error && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Couldn&apos;t load more. Try again.
        </p>
      )}

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="btn btn-outline rounded-lg px-6 py-2.5 text-sm font-semibold disabled:opacity-60"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}
