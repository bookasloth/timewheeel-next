import type { Metadata } from "next";
import { AdminTabs } from "@/components/members/admin-tabs";
import { AdminUploadForm } from "@/components/members/admin-upload";
import { MemberPageHeader } from "@/components/members/page-header";
import { ConfirmSubmit, SubmitButton } from "@/components/members/ui";
import { updateDownload } from "@/lib/members/admin-actions";
import { listAllDownloads } from "@/lib/members/admin-data";
import { formatBytes, formatDate } from "@/lib/members/config";
import { requireAdmin } from "@/lib/members/session";

export const metadata: Metadata = { title: "Admin" };

function RowAction({ id, op, children }: { id: string; op: string; children: React.ReactNode }) {
  return (
    <form action={updateDownload}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="op" value={op} />
      <SubmitButton variant="outline" className="px-2.5 py-1 text-xs">
        {children}
      </SubmitButton>
    </form>
  );
}

export default async function AdminDownloadsPage() {
  await requireAdmin();
  const items = await listAllDownloads();
  const categories = [...new Set(items.map((i) => i.category))].sort();

  return (
    <div className="space-y-8">
      <MemberPageHeader eyebrow="Admin" title="Manage downloads" intro="Upload files for members, choose who can get them, and see how often each is downloaded." />
      <AdminTabs active="downloads" />

      <section className="rounded-lg border border-border bg-card p-5 sm:p-6">
        <p className="mb-5 font-heading text-lg font-bold">Add a download</p>
        <AdminUploadForm categories={categories} />
      </section>

      <section>
        <p className="mb-3 font-heading text-lg font-bold">All downloads ({items.length})</p>
        {items.length ? (
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">File</th>
                  <th className="px-4 py-3 font-semibold">Access</th>
                  <th className="px-4 py-3 font-semibold">Downloads</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((d) => (
                  <tr key={d.id} className={d.published ? "" : "opacity-60"}>
                    <td className="px-4 py-3">
                      <a href={`/api/members/downloads/${d.id}`} className="font-semibold hover:underline">
                        {d.title}
                      </a>
                      <p className="text-xs text-muted-foreground">
                        {d.category} · {d.file_name} · {formatBytes(d.file_size)} · {formatDate(d.created_at)}
                        {!d.published && " · hidden"}
                      </p>
                    </td>
                    <td className="px-4 py-3">{d.tier === "premium" ? "Premium" : "Free"}</td>
                    <td className="px-4 py-3 tabular-nums">{d.downloads}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <RowAction id={d.id} op={d.tier === "premium" ? "free" : "premium"}>
                          Make {d.tier === "premium" ? "free" : "Premium"}
                        </RowAction>
                        <RowAction id={d.id} op={d.published ? "unpublish" : "publish"}>
                          {d.published ? "Hide" : "Show"}
                        </RowAction>
                        <form action={updateDownload}>
                          <input type="hidden" name="id" value={d.id} />
                          <input type="hidden" name="op" value="delete" />
                          <ConfirmSubmit message={`Delete "${d.title}" and its file for good?`}>Delete</ConfirmSubmit>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">No downloads yet. Add the first one above.</p>
        )}
      </section>
    </div>
  );
}
