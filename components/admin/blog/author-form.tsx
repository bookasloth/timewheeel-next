"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { Spinner } from "@/components/admin/feedback";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ImageSquare, Trash } from "@phosphor-icons/react";
import { btn, field } from "@/components/admin/ui";
import { uploadImage } from "@/components/admin/blog/upload-image";
import { deleteAuthor, saveAuthor, type AuthorState } from "@/lib/admin/blog-actions";
import type { BlogAuthor } from "@/lib/admin/blog-data";

// One author's byline (E-E-A-T): shown on posts and sent as Person schema.
export function AuthorForm({ author, onDone }: { author: BlogAuthor | null; onDone?: () => void }) {
  const router = useRouter();
  const [state, action, pending] = useActionState<AuthorState, FormData>(saveAuthor, {});
  const [photo, setPhoto] = useState(author?.photo ?? "");
  const [busy, setBusy] = useState(false);
  const [deleting, startDelete] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.ok) {
      toast.success(author ? "Author saved" : "Author added");
      router.refresh();
      onDone?.();
    } else if (state.error) toast.error(state.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const pick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      setPhoto(await uploadImage(file));
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const remove = () => {
    if (!author || !window.confirm(`Delete ${author.name}?`)) return;
    startDelete(async () => {
      const res = await deleteAuthor(author.id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Author deleted");
        router.refresh();
      }
    });
  };

  const id = author?.id ?? "new";
  return (
    <form action={action} className="space-y-4">
      {author && <input type="hidden" name="id" value={author.id} />}
      <input type="hidden" name="photo" value={photo} />
      <div className="flex items-center gap-4">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="" className="size-16 rounded-full border border-gray-200 object-cover" />
        ) : (
          <span className="flex size-16 items-center justify-center rounded-full bg-[#fe5100] text-lg font-black text-white">
            {(author?.name ?? "?").split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
          </span>
        )}
        <div className="flex gap-2">
          <button type="button" disabled={busy} onClick={() => fileRef.current?.click()} className={btn.smGhost}>
            <ImageSquare size={14} /> {busy ? "Uploading..." : photo ? "Change photo" : "Add photo"}
          </button>
          {photo && <button type="button" onClick={() => setPhoto("")} className={btn.smDanger}>Remove</button>}
        </div>
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={pick} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`name-${id}`} className={field.label}>Name</label>
          <input id={`name-${id}`} name="name" required maxLength={120} defaultValue={author?.name ?? ""} className={field.input} />
        </div>
        <div>
          <label htmlFor={`title-${id}`} className={field.label}>Role or title</label>
          <input id={`title-${id}`} name="title" maxLength={160} defaultValue={author?.title ?? ""} placeholder="e.g. Founder, Timewheel" className={field.input} />
        </div>
      </div>
      <div>
        <label htmlFor={`bio-${id}`} className={field.label}>Bio</label>
        <textarea id={`bio-${id}`} name="bio" rows={3} maxLength={1500} defaultValue={author?.bio ?? ""} placeholder="Two or three sentences on real experience: what they've built, run or measured." className={field.textarea} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`url-${id}`} className={field.label}>Profile page</label>
          <input id={`url-${id}`} name="url" defaultValue={author?.url ?? ""} placeholder="https://... or /about" className={field.input} />
        </div>
        <div>
          <label htmlFor={`same-${id}`} className={field.label}>Social profiles</label>
          <input id={`same-${id}`} name="same_as" defaultValue={(author?.same_as ?? []).join(", ")} placeholder="LinkedIn, X, Instagram URLs, comma separated" className={field.input} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <button type="submit" disabled={pending} aria-busy={pending} className={`${btn.primary} disabled:cursor-not-allowed disabled:opacity-70`}>{pending && <Spinner className="size-3.5" />}{pending ? "Saving author..." : author ? "Save author" : "Add author"}</button>
        {author && (
          <button type="button" disabled={deleting} onClick={remove} className={btn.smDanger}>
            <Trash size={14} /> Delete
          </button>
        )}
      </div>
    </form>
  );
}

export function NewAuthor() {
  const [open, setOpen] = useState(false);
  return open ? (
    <section className="rounded-[5px] border border-gray-200 bg-white p-4">
      <h2 className="mb-4 text-sm font-semibold text-gray-800">New author</h2>
      <AuthorForm author={null} onDone={() => setOpen(false)} />
    </section>
  ) : (
    <button type="button" onClick={() => setOpen(true)} className={btn.ghost}>
      Add an author
    </button>
  );
}
