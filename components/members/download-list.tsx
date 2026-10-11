import Link from "next/link";
import { Download, FileArchive, FileImage, FileSpreadsheet, FileText, FileVideo, Lock } from "lucide-react";
import type { DownloadRow } from "@/lib/members/data";
import { formatBytes, formatDate } from "@/lib/members/config";

function iconFor(row: DownloadRow) {
  const t = `${row.content_type ?? ""} ${row.file_name}`.toLowerCase();
  if (/image|\.(png|jpe?g|svg|webp|gif)\b/.test(t)) return FileImage;
  if (/video|\.(mp4|mov|webm)\b/.test(t)) return FileVideo;
  if (/sheet|csv|excel|\.(xlsx?|csv)\b/.test(t)) return FileSpreadsheet;
  if (/zip|compressed|\.(zip|rar|7z)\b/.test(t)) return FileArchive;
  return FileText;
}

function ext(name: string) {
  const m = name.match(/\.([a-z0-9]{1,5})$/i);
  return m ? m[1].toUpperCase() : "";
}

export function DownloadList({ items, locked = false }: { items: DownloadRow[]; locked?: boolean }) {
  const groups = new Map<string, DownloadRow[]>();
  for (const it of items) groups.set(it.category, [...(groups.get(it.category) ?? []), it]);

  return (
    <div className="space-y-10">
      {[...groups.entries()].map(([category, rows]) => (
        <section key={category}>
          {groups.size > 1 && <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{category}</p>}
          <ul className="grid gap-3 sm:grid-cols-2">
            {rows.map((row) => {
              const Icon = iconFor(row);
              const meta = [ext(row.file_name), formatBytes(row.file_size), `Added ${formatDate(row.created_at)}`].filter(Boolean).join(" · ");
              return (
                <li key={row.id} className="flex flex-col rounded-lg border border-border bg-card p-5">
                  <div className="flex items-start gap-3.5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-secondary text-foreground/80">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-heading text-base font-bold leading-snug">{row.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{meta}</p>
                    </div>
                  </div>
                  {row.description && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{row.description}</p>}
                  <div className="mt-auto pt-4">
                    {locked ? (
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                        <Lock className="size-4" />
                        Premium members only
                      </span>
                    ) : (
                      <a
                        href={`/api/members/downloads/${row.id}`}
                        className="btn btn-outline inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
                        rel="nofollow"
                      >
                        <Download className="size-4" />
                        Download
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function EmptyState({ title, children, admin }: { title: string; children?: React.ReactNode; admin?: boolean }) {
  return (
    <div className="rounded-lg border border-dashed border-border px-6 py-14 text-center">
      <p className="font-heading text-lg font-bold">{title}</p>
      {children && <div className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{children}</div>}
      {admin && (
        <Link href="/members/admin" className="btn btn-outline mt-5 inline-flex rounded-lg px-4 py-2 text-sm font-semibold">
          Add a download
        </Link>
      )}
    </div>
  );
}
