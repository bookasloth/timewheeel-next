import Link from "next/link";
import { FileArchive, FileImage, FileSpreadsheet, FileText, FileVideo, Lock, type LucideIcon } from "lucide-react";
import { BookmarkButton } from "@/components/members/library/bookmark-button";
import type { DownloadRow } from "@/lib/members/data";
import { formatBytes, formatDate } from "@/lib/members/config";
import { cn } from "@/lib/utils";

// Library card from the member dashboard mockup: type tile, label, bookmark,
// title, description, meta, full-width action.

type Kind = { label: string; icon: LucideIcon; tile: string; ink: string };

export function kindOf(row: Pick<DownloadRow, "file_name" | "content_type">): Kind {
  const t = `${row.content_type ?? ""} ${row.file_name}`.toLowerCase();
  if (/sheet|csv|excel|\.(xlsx?|csv|ods)\b/.test(t)) return { label: "Sheet", icon: FileSpreadsheet, tile: "bg-[#29A66F]/12", ink: "text-[#1E7D53]" };
  if (/zip|compressed|\.(zip|rar|7z)\b/.test(t)) return { label: "ZIP", icon: FileArchive, tile: "bg-[#8B5CF6]/12", ink: "text-[#6D3FD9]" };
  if (/image|\.(png|jpe?g|svg|webp|gif)\b/.test(t)) return { label: "Image", icon: FileImage, tile: "bg-[#FF4D93]/12", ink: "text-[#C72A6A]" };
  if (/video|\.(mp4|mov|webm)\b/.test(t)) return { label: "Video", icon: FileVideo, tile: "bg-[#E11D48]/10", ink: "text-[#BE123C]" };
  if (/word|\.(docx?|odt)\b/.test(t)) return { label: "Doc", icon: FileText, tile: "bg-[#3987C9]/12", ink: "text-[#2A6AA3]" };
  if (/pdf|\.pdf\b/.test(t)) return { label: "PDF", icon: FileText, tile: "bg-secondary", ink: "text-foreground/70" };
  return { label: "File", icon: FileText, tile: "bg-secondary", ink: "text-foreground/70" };
}

export function ResourceCard({ row, locked, saved }: { row: DownloadRow; locked: boolean; saved: boolean }) {
  const kind = kindOf(row);
  const Icon = kind.icon;
  const premium = row.tier === "premium";
  const meta = [kind.label === "File" ? null : kind.label, formatBytes(row.file_size), `Added ${formatDate(row.created_at)}`].filter(Boolean).join(" · ");

  return (
    <article className="flex flex-col rounded-lg border border-border bg-surface p-4">
      <div className="flex gap-3.5">
        {row.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={row.cover_url} alt="" className="size-16 shrink-0 rounded-lg border border-border object-cover" />
        ) : (
          <span
            className={cn(
              "grid size-16 shrink-0 place-items-center rounded-lg",
              premium ? "bg-brand text-white" : cn(kind.tile, kind.ink),
            )}
          >
            <Icon className="size-7" strokeWidth={1.6} />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                premium ? "bg-brand/10 text-brand-text" : "bg-secondary text-foreground/70",
              )}
            >
              {premium && <Lock className="size-3" strokeWidth={2.4} />}
              {premium ? "Premium" : kind.label === "File" ? row.category : kind.label}
            </span>
            <BookmarkButton downloadId={row.id} saved={saved} title={row.title} />
          </div>
          <h3 className="mt-1.5 font-heading text-[15px] font-bold leading-snug">{row.title}</h3>
        </div>
      </div>
      {row.description && <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">{row.description}</p>}
      <p className="mt-3 text-xs text-muted-foreground">{meta}</p>
      <div className="mt-auto pt-4">
        {locked ? (
          <Link
            href="/members/premium"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand/10 text-sm font-semibold text-brand-text transition-colors hover:bg-brand/15"
          >
            Unlock with Premium
          </Link>
        ) : (
          <a
            href={`/api/members/downloads/${row.id}`}
            rel="nofollow"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-ink text-sm font-semibold text-white transition-colors hover:bg-ink/90"
          >
            {premium ? "Download" : "Download free"}
          </a>
        )}
      </div>
    </article>
  );
}
