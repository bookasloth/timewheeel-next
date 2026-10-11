"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, ArrowSquareOut, ImageSquare } from "@phosphor-icons/react";
import { Panel, StatusBadge, btn, field } from "@/components/admin/ui";
import { BlogEditor } from "@/components/admin/blog/editor";
import { SeoPanel, type SeoValues } from "@/components/admin/blog/seo-panel";
import { CommentsEditor, FaqEditor, PublishDateInput, RevisionList } from "@/components/admin/blog/fields";
import { uploadImage } from "@/components/admin/blog/upload-image";
import { useUnsavedGuard } from "@/components/admin/blog/use-unsaved-guard";
import { savePost, type SavePostState } from "@/lib/admin/blog-actions";
import type { AdminPost, BlogAuthor, Revision } from "@/lib/admin/blog-data";

const slugify = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120);
const fmt = (iso: string) => new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });

export function PostForm({
  post,
  authors,
  categories,
  revisions,
  defaultAuthorId,
}: {
  post: AdminPost | null;
  authors: BlogAuthor[];
  categories: string[];
  revisions: Revision[];
  defaultAuthorId: string | null;
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState<SavePostState, FormData>(savePost, {});
  const formRef = useRef<HTMLFormElement>(null);
  const [markSaved, isDirty] = useUnsavedGuard(formRef);
  const coverRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [status, setStatus] = useState<"draft" | "published">(post?.status ?? "draft");
  const [publishedAt, setPublishedAt] = useState(post?.published_at ?? "");
  const [content, setContent] = useState(post?.content_html ?? "");
  const [cover, setCover] = useState(post?.cover ?? "");
  const [coverAlt, setCoverAlt] = useState(post?.cover_alt ?? "");
  const [coverBusy, setCoverBusy] = useState<number | null>(null);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [tags, setTags] = useState((post?.tags ?? []).join(", "));
  const [seo, setSeoState] = useState<SeoValues>({
    metaTitle: post?.meta_title ?? "",
    metaDescription: post?.meta_description ?? "",
    focusKeyword: post?.focus_keyword ?? "",
    secondaryKeywords: (post?.secondary_keywords ?? []).join(", "),
    ogTitle: post?.og_title ?? "",
    ogDescription: post?.og_description ?? "",
    ogImage: post?.og_image ?? "",
    ogImageAlt: post?.og_image_alt ?? "",
    canonical: post?.canonical ?? "",
    robots: post?.robots ?? "index,follow",
  });
  const setSeo = (patch: Partial<SeoValues>) => setSeoState((s) => ({ ...s, ...patch }));

  const effectiveSlug = slugTouched ? slug : slugify(title);
  const future = Boolean(publishedAt && new Date(publishedAt) > new Date());
  const scheduled = status === "published" && future;
  const savedLive = post?.status === "published" && post.published_at && new Date(post.published_at) <= new Date();

  // Submit by hand: a <form action> resets the form after it runs, which would
  // snap controlled fields back and lose unsaved text if a save failed.
  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    startTransition(() => action(fd));
  };

  // A message left by an action that reloaded the page (version restore).
  useEffect(() => {
    try {
      const msg = sessionStorage.getItem("tw_blog_toast");
      if (msg) {
        sessionStorage.removeItem("tw_blog_toast");
        toast.success(msg);
      }
    } catch {}
  }, []);

  // Ctrl/Cmd + S saves.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        submit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Adopt what the server saved (normalised slug, publish time) once per save.
  const [seenAt, setSeenAt] = useState<number | undefined>(undefined);
  if (state.ok && state.at !== seenAt) {
    setSeenAt(state.at);
    if (state.publishedAt) setPublishedAt(state.publishedAt);
    if (state.slug) {
      setSlug(state.slug);
      setSlugTouched(true);
    }
  }

  useEffect(() => {
    if (state.ok) {
      const when = state.publishedAt && new Date(state.publishedAt) > new Date();
      toast.success(state.status === "published" ? (when ? `Scheduled for ${fmt(state.publishedAt!)}` : "Published. The post is live.") : "Draft saved");
      setTimeout(markSaved, 0);
      if (!post && state.id) router.replace(`/admin/blog/${state.id}`);
      else router.refresh();
    } else if (state.error) toast.error(state.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const pickCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      setCoverBusy(0);
      setCover(await uploadImage(file, setCoverBusy));
      toast.success("Featured image uploaded");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setCoverBusy(null);
    }
  };

  const tagChips = tags.split(",").map((t) => t.trim()).filter(Boolean);
  const primaryLabel = pending ? "Saving..." : status === "draft" ? "Save draft" : scheduled ? "Schedule" : savedLive ? "Update" : "Publish";

  return (
    <form ref={formRef} onSubmit={submit} className="pb-16">
      {post?.id && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="content_html" value={content} />
      <input type="hidden" name="cover" value={cover} />
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="slug" value={effectiveSlug} />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Link href="/admin/blog" className="rounded-[3px] p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900" aria-label="Back to posts">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="truncate text-xl font-bold text-gray-900">{post ? "Edit post" : "New post"}</h1>
          {post && <StatusBadge status={post.status === "published" ? (post.published_at && new Date(post.published_at) > new Date() ? "scheduled" : "published") : "draft"} />}
        </div>
        <div className="flex items-center gap-2">
          {savedLive && (
            <a href={`/blog/${post!.slug}`} target="_blank" rel="noreferrer" className={btn.ghost}>
              <ArrowSquareOut size={16} /> View live
            </a>
          )}
          <button type="submit" disabled={pending} className={btn.primary} title="Ctrl + S">
            {primaryLabel}
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* main column */}
        <div className="min-w-0 space-y-5">
          <div>
            <label htmlFor="title" className="sr-only">Title</label>
            <textarea
              id="title"
              name="title"
              rows={1}
              value={title}
              onChange={(e) => setTitle(e.target.value.replace(/\n/g, " "))}
              placeholder="Post title"
              maxLength={200}
              required
              className="field-sizing-content w-full resize-none rounded-[4px] border border-transparent bg-transparent px-1 py-1 text-3xl font-black leading-tight tracking-tight text-gray-900 outline-none placeholder:text-gray-300 hover:border-gray-200 focus:border-gray-300 focus:bg-white"
            />
            <p className="mt-1 truncate px-1 text-xs text-gray-500">timewheel.co.in/blog/<span className="text-gray-800">{effectiveSlug || "post-url"}</span></p>
          </div>

          <div className="overflow-hidden rounded-[5px] border border-gray-200 bg-white">
            <BlogEditor value={post?.content_html ?? ""} onChange={setContent} />
          </div>

          <SeoPanel values={seo} set={setSeo} title={title} slug={effectiveSlug} content={content} coverAlt={coverAlt} excerpt={excerpt} cover={cover} />

          <Panel title="TL;DR and key takeaways">
            <div className="space-y-4">
              <div>
                <label htmlFor="tldr" className={field.label}>TL;DR (one-paragraph answer)</label>
                <textarea id="tldr" name="tldr" rows={3} defaultValue={post?.tldr ?? ""} maxLength={1200} className={field.textarea} placeholder="The short answer an AI assistant or a busy reader could quote." />
              </div>
              <div>
                <label htmlFor="takeaways" className={field.label}>Key takeaways (one per line)</label>
                <textarea id="takeaways" name="takeaways" rows={4} defaultValue={(post?.takeaways ?? []).join("\n")} className={field.textarea} placeholder={"Up to 8 short points\nShown in a box above the article"} />
              </div>
            </div>
          </Panel>

          <Panel title="FAQ">
            <FaqEditor initial={post?.faq ?? []} />
          </Panel>

          {post && (
            <Panel title={`Approved comments (${post.comments?.length ?? 0})`}>
              <CommentsEditor initial={post.comments ?? []} />
            </Panel>
          )}
        </div>

        {/* sidebar */}
        <div className="space-y-5">
          <Panel title="Publish">
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className={field.label}>Status</label>
                <select id="status" className={field.select} value={status} onChange={(e) => setStatus(e.target.value as "draft" | "published")}>
                  <option value="draft">Draft (not visible)</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label htmlFor="published_at" className={field.label}>Publish date</label>
                <PublishDateInput value={publishedAt} onChange={setPublishedAt} />
                <p className={field.hint}>
                  {scheduled ? `Goes live ${fmt(publishedAt)}.` : status === "published" ? "Pick a future time to schedule it." : "Blank publishes now. A future time schedules it."}
                </p>
              </div>
              <div>
                <label htmlFor="slug" className={field.label}>URL slug</label>
                <input
                  id="slug"
                  className={field.input}
                  value={effectiveSlug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setSlug(slugify(e.target.value));
                  }}
                  placeholder="post-url"
                />
                {savedLive && post && effectiveSlug !== post.slug && <p className="mt-1 text-xs text-amber-700">The old link will redirect to the new one.</p>}
              </div>
              <div>
                <label htmlFor="author_id" className={field.label}>Author</label>
                <select id="author_id" name="author_id" className={field.select} defaultValue={post ? (post.author_id ?? "") : (defaultAuthorId ?? "")}>
                  <option value="">No byline</option>
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
                <Link href="/admin/blog/authors" className="mt-1 inline-block text-xs text-[#C2410C] hover:underline">Manage authors</Link>
              </div>
              {post && <p className="border-t border-gray-100 pt-3 text-xs text-gray-500">Last saved {fmt(post.updated_at)}</p>}
            </div>
          </Panel>

          <Panel title="Featured image">
            <div className="space-y-2">
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cover} alt="" className="aspect-[16/10] w-full rounded-[4px] border border-gray-200 object-cover" />
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center rounded-[4px] border border-dashed border-gray-300 text-xs text-gray-400">No image (a branded panel shows instead)</div>
              )}
              <div className="flex gap-2">
                <button type="button" disabled={coverBusy !== null} onClick={() => coverRef.current?.click()} className={btn.smGhost}>
                  <ImageSquare size={14} /> {coverBusy !== null ? `Uploading ${coverBusy}%` : cover ? "Replace" : "Upload"}
                </button>
                {cover && (
                  <button type="button" onClick={() => setCover("")} className={btn.smDanger}>
                    Remove
                  </button>
                )}
              </div>
              <input ref={coverRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" hidden onChange={pickCover} />
              <input name="cover_alt" className={field.input} value={coverAlt} onChange={(e) => setCoverAlt(e.target.value)} placeholder="Alt text: describe the image" maxLength={300} />
            </div>
          </Panel>

          <Panel title="Organize">
            <div className="space-y-4">
              <div>
                <label htmlFor="category" className={field.label}>Category</label>
                <input id="category" name="category" list="blog-categories" className={field.input} defaultValue={post?.category ?? ""} placeholder="e.g. Digital Marketing" maxLength={60} />
                <datalist id="blog-categories">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
              <div>
                <label htmlFor="tags" className={field.label}>Tags</label>
                <input id="tags" name="tags" className={field.input} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="comma, separated" />
                {tagChips.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {tagChips.map((t) => (
                      <span key={t} className="rounded-[3px] border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[11px] text-gray-600">#{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="excerpt" className={field.label}>Excerpt</label>
                <textarea id="excerpt" name="excerpt" rows={4} className={field.textarea} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="One or two sentences for blog cards and the post header" maxLength={600} />
              </div>
            </div>
          </Panel>

          {post && (
            <Panel title="Version history">
              <RevisionList revisions={revisions} dirty={isDirty} />
            </Panel>
          )}
        </div>
      </div>
    </form>
  );
}
