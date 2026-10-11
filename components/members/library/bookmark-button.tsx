"use client";

import { useOptimistic, useTransition } from "react";
import { Bookmark } from "lucide-react";
import { toggleBookmark } from "@/lib/members/library-actions";
import { cn } from "@/lib/utils";

export function BookmarkButton({ downloadId, saved, title }: { downloadId: string; saved: boolean; title: string }) {
  const [optimistic, setOptimistic] = useOptimistic(saved);
  const [, start] = useTransition();
  return (
    <button
      type="button"
      onClick={() =>
        start(async () => {
          setOptimistic(!optimistic);
          await toggleBookmark(downloadId, !optimistic);
        })
      }
      aria-pressed={optimistic}
      aria-label={optimistic ? `Remove ${title} from saved` : `Save ${title}`}
      title={optimistic ? "Saved" : "Save for later"}
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-md border transition-colors",
        optimistic ? "border-brand/40 bg-brand/10 text-brand-text" : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground",
      )}
    >
      <Bookmark className="size-4" fill={optimistic ? "currentColor" : "none"} strokeWidth={1.8} />
    </button>
  );
}
