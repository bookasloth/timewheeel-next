"use client";

import { useActionState, useState } from "react";
import { CircleCheck, LoaderCircle, Upload } from "lucide-react";
import { saveDownload, startUpload, type DownloadFormState } from "@/lib/members/admin-actions";
import { formatBytes } from "@/lib/members/config";
import { Alert, Field, SubmitButton, inputClass } from "@/components/members/ui";

type Uploaded = { path: string; name: string; size: number; type: string };

// Two steps: the file goes straight from the browser to the private bucket via
// a one-time signed URL, then the form saves the catalog entry.
export function AdminUploadForm({ categories }: { categories: string[] }) {
  const [state, action] = useActionState(saveDownload, {} as DownloadFormState);
  const [file, setFile] = useState<Uploaded | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState("");
  // After a save, clear the uploaded file (React resets the other fields itself).
  const [seen, setSeen] = useState(0);
  if (state.saved && state.saved !== seen) {
    setSeen(state.saved);
    setFile(null);
    setProgress(null);
  }

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    setUploadError("");
    setFile(null);
    if (!f) return;
    if (f.size > 50 * 1024 * 1024) {
      setUploadError("Files must be under 50 MB.");
      return;
    }
    const started = await startUpload({ name: f.name, size: f.size });
    if ("error" in started) {
      setUploadError(started.error);
      return;
    }
    setProgress(0);
    const ok = await new Promise<boolean>((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", started.url);
      xhr.setRequestHeader("content-type", f.type || "application/octet-stream");
      xhr.setRequestHeader("cache-control", "max-age=3600");
      xhr.setRequestHeader("x-upsert", "false");
      xhr.upload.onprogress = (ev) => ev.lengthComputable && setProgress(Math.round((ev.loaded / ev.total) * 100));
      xhr.onload = () => resolve(xhr.status >= 200 && xhr.status < 300);
      xhr.onerror = () => resolve(false);
      xhr.send(f);
    });
    if (!ok) {
      setProgress(null);
      setUploadError("The upload failed. Check your connection and try again.");
      return;
    }
    setFile({ path: started.path, name: f.name, size: f.size, type: f.type });
  }

  const uploading = progress !== null && !file;

  return (
    <form action={action} className="space-y-4" noValidate>
      {state.error && <Alert tone="bad">{state.error}</Alert>}
      {state.saved && !state.error && <Alert tone="good">Added. Members can see it now.</Alert>}

      <Field id="dl-file" label="File" error={uploadError || undefined} hint="Up to 50 MB. PDF, ZIP, images, spreadsheets, anything.">
        <label
          htmlFor="dl-file"
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border bg-background/60 px-4 py-4 text-sm hover:border-brand/50"
        >
          {file ? (
            <CircleCheck className="size-5 shrink-0 text-rating" />
          ) : uploading ? (
            <LoaderCircle className="size-5 shrink-0 animate-spin text-brand" />
          ) : (
            <Upload className="size-5 shrink-0 text-muted-foreground" />
          )}
          <span className="min-w-0 truncate">
            {file ? `${file.name} (${formatBytes(file.size)}) uploaded` : uploading ? `Uploading... ${progress}%` : "Choose a file"}
          </span>
        </label>
        <input id="dl-file" type="file" className="sr-only" onChange={onPick} disabled={uploading} />
      </Field>
      <input type="hidden" name="file_path" value={file?.path ?? ""} />
      <input type="hidden" name="file_name" value={file?.name ?? ""} />
      <input type="hidden" name="file_size" value={file?.size ?? ""} />
      <input type="hidden" name="content_type" value={file?.type ?? ""} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="dl-title" label="Title">
          <input id="dl-title" name="title" required maxLength={160} placeholder="e.g. Local SEO checklist" className={inputClass(false)} />
        </Field>
        <Field id="dl-category" label="Category" hint="Groups files on the downloads pages.">
          <input id="dl-category" name="category" list="dl-categories" maxLength={60} placeholder="General" className={inputClass(false)} />
          <datalist id="dl-categories">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
      </div>
      <Field id="dl-description" label="Description" optional>
        <textarea id="dl-description" name="description" rows={3} maxLength={2000} className={inputClass(false) + " resize-y"} />
      </Field>
      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold">Who can download it</legend>
        <div className="flex flex-wrap gap-5 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="tier" value="free" defaultChecked className="accent-[var(--brand)]" /> Every member (free)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="tier" value="premium" className="accent-[var(--brand)]" /> Premium members only
          </label>
        </div>
      </fieldset>
      <SubmitButton pendingText="Saving..." disabled={!file}>
        Add download
      </SubmitButton>
    </form>
  );
}
