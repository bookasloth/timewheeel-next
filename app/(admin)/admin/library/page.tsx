import type { Metadata } from "next";
import { AdminUploadForm } from "@/components/members/admin-upload";
import { ConfirmSubmit, SubmitButton } from "@/components/members/ui";
import { EmptyState, PageHeader, Panel, StatusBadge, Table, Td, Th } from "@/components/admin/ui";
import { updateDownload } from "@/lib/members/admin-actions";
import { listAllDownloads } from "@/lib/members/admin-data";
import { formatBytes, formatDate } from "@/lib/members/config";
import { requireAdmin } from "@/lib/members/session";

export const metadata: Metadata = { title: "Downloads" };

function RowAction({ id, op, children }: { id: string; op: string; children: React.ReactNode }) {
  return (
    <form action={updateDownload}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="op" value={op} />
      <SubmitButton variant="outline" className="h-7 rounded-[3px] px-2.5 py-0 text-xs">
        {children}
      </SubmitButton>
    </form>
  );
}

export default async function AdminLibraryPage() {
  await requireAdmin();
  const items = await listAllDownloads();
  const categories = [...new Set(items.map((i) => i.category))].sort();

  return (
    <>
      <PageHeader title="Downloads" description="Upload files for members, choose who can get them, and see how often each is downloaded." />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Panel title={`All downloads (${items.length})`} flush>
          {items.length ? (
            <Table minWidth={680}>
              <thead>
                <tr>
                  <Th>File</Th>
                  <Th>Access</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Downloads</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {items.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <Td>
                      <a href={`/api/members/downloads/${d.id}`} className="font-medium text-gray-900 hover:underline">
                        {d.title}
                      </a>
                      <p className="text-xs text-gray-500">
                        {d.category} · {d.file_name} · {formatBytes(d.file_size)} · {formatDate(d.created_at)}
                      </p>
                    </Td>
                    <Td>
                      <StatusBadge status={d.tier === "premium" ? "premium" : "free"} />
                    </Td>
                    <Td>
                      <StatusBadge status={d.published ? "published" : "hidden"} />
                    </Td>
                    <Td className="text-right tabular-nums">{d.downloads}</Td>
                    <Td>
                      <div className="flex flex-wrap justify-end gap-1.5">
                        <RowAction id={d.id} op={d.tier === "premium" ? "free" : "premium"}>
                          Make {d.tier === "premium" ? "free" : "Premium"}
                        </RowAction>
                        <RowAction id={d.id} op={d.published ? "unpublish" : "publish"}>
                          {d.published ? "Hide" : "Show"}
                        </RowAction>
                        <form action={updateDownload}>
                          <input type="hidden" name="id" value={d.id} />
                          <input type="hidden" name="op" value="delete" />
                          <ConfirmSubmit message={`Delete "${d.title}" and its file for good?`} className="h-7 px-2 text-rose-600">
                            Delete
                          </ConfirmSubmit>
                        </form>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="p-4">
              <EmptyState title="No downloads yet" description="Add the first one with the form." />
            </div>
          )}
        </Panel>
        <Panel title="Add a download">
          <AdminUploadForm categories={categories} />
        </Panel>
      </div>
    </>
  );
}
