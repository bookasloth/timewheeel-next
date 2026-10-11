"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { CaretDown, Check, GearSix, ImageSquare, MagnifyingGlass, Minus, ShareNetwork, X } from "@phosphor-icons/react";
import { field } from "@/components/admin/ui";
import { CharCounter } from "@/components/admin/blog/fields";
import { uploadImage } from "@/components/admin/blog/upload-image";
import { analyzeSeo, scoreTone } from "@/lib/blog-seo";

// SEO / Social / Advanced tabs with a live Google snippet, a social card
// preview and a scored checklist (as in the adetc blog admin).

const DOMAIN = "timewheel.co.in";
const TONE = { good: "bg-emerald-500", fair: "bg-amber-500", poor: "bg-rose-500" } as const;

export type SeoValues = {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt: string;
  canonical: string;
  robots: string;
};

export function SeoPanel({
  values,
  set,
  title,
  slug,
  content,
  coverAlt,
  excerpt,
  cover,
}: {
  values: SeoValues;
  set: (patch: Partial<SeoValues>) => void;
  title: string;
  slug: string;
  content: string;
  coverAlt: string;
  excerpt: string;
  cover: string;
}) {
  const [tab, setTab] = useState<"seo" | "social" | "advanced">("seo");
  const [open, setOpen] = useState(true);
  const [busy, setBusy] = useState(false);
  const ogRef = useRef<HTMLInputElement>(null);
  const v = values;

  const checks = analyzeSeo({ title, slug, contentHtml: content, metaTitle: v.metaTitle, metaDescription: v.metaDescription, focusKeyword: v.focusKeyword, coverAlt });
  const score = Math.round((checks.filter((c) => c.ok).length / checks.length) * 100);
  const dot = <span className={`inline-block size-2.5 rounded-full ${TONE[scoreTone(score)]}`} />;

  const pickOg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      set({ ogImage: await uploadImage(file) });
      toast.success("Social image uploaded");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const tabs = [
    { key: "seo", label: "SEO", Icon: MagnifyingGlass },
    { key: "social", label: "Social", Icon: ShareNetwork },
    { key: "advanced", label: "Advanced", Icon: GearSix },
  ] as const;
  const socialImage = v.ogImage || cover;

  return (
    <section className="rounded-[5px] border border-gray-200 bg-white">
      {Object.entries({
        meta_title: v.metaTitle,
        meta_description: v.metaDescription,
        focus_keyword: v.focusKeyword,
        secondary_keywords: v.secondaryKeywords,
        og_title: v.ogTitle,
        og_description: v.ogDescription,
        og_image: v.ogImage,
        og_image_alt: v.ogImageAlt,
        canonical: v.canonical,
        robots: v.robots,
      }).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <div className="flex items-center justify-between border-b border-gray-200 px-2">
        <div className="flex" role="tablist">
          {tabs.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`relative flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors ${tab === key ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
            >
              <Icon size={16} /> {label}
              {tab === key && <span className="absolute inset-x-2 bottom-0 h-0.5 bg-[#F45B0A]" />}
            </button>
          ))}
        </div>
        <span className="flex items-center gap-1.5 pr-2 text-xs text-gray-600" title="On-page SEO score">
          {dot} <span className="tabular-nums">{score}/100</span>
        </span>
      </div>

      <div className="space-y-4 p-4">
        {/* Google result preview, always visible */}
        <div className="rounded-[4px] border border-gray-200 p-3">
          <p className="text-[11px] uppercase tracking-wider text-gray-400">Google preview</p>
          <p className="mt-1.5 truncate text-xs text-gray-600">{DOMAIN} › blog › {slug || "post-url"}</p>
          <p className="mt-0.5 truncate text-lg leading-snug text-[#1a0dab]">{v.metaTitle || title || "Untitled post"}</p>
          <p className="mt-0.5 line-clamp-2 text-sm text-gray-600">{v.metaDescription || excerpt || "Add a meta description to control the search snippet."}</p>
        </div>

        {/* All tabs stay mounted, so their values always submit */}
        <div className="space-y-4" hidden={tab !== "seo"}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="focus_keyword" className={field.label}>Focus keyphrase</label>
              <input id="focus_keyword" className={field.input} value={v.focusKeyword} onChange={(e) => set({ focusKeyword: e.target.value })} placeholder="what people search for" maxLength={120} />
            </div>
            <div>
              <label htmlFor="secondary_keywords" className={field.label}>Supporting keyphrases</label>
              <input id="secondary_keywords" className={field.input} value={v.secondaryKeywords} onChange={(e) => set({ secondaryKeywords: e.target.value })} placeholder="comma, separated" />
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="meta_title" className={field.label + " mb-0"}>SEO title</label>
              <CharCounter value={v.metaTitle || title} min={30} max={60} />
            </div>
            <input id="meta_title" className={field.input} value={v.metaTitle} onChange={(e) => set({ metaTitle: e.target.value })} placeholder={title || "Defaults to the post title"} maxLength={120} />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="meta_description" className={field.label + " mb-0"}>Meta description</label>
              <CharCounter value={v.metaDescription} min={120} max={160} />
            </div>
            <textarea id="meta_description" rows={3} className={field.textarea} value={v.metaDescription} onChange={(e) => set({ metaDescription: e.target.value })} placeholder="The snippet under your title in Google" maxLength={320} />
          </div>

          <div className="rounded-[4px] border border-gray-200">
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50">
              <span className="flex items-center gap-2">{dot} Analysis ({checks.filter((c) => c.ok).length} of {checks.length} passed)</span>
              <CaretDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <ul className="space-y-1.5 border-t border-gray-200 p-3">
                {checks.map((c) => (
                  <li key={c.label} className="flex items-start gap-2 text-xs">
                    <span className={`mt-px flex size-4 shrink-0 items-center justify-center rounded-full ${c.ok ? "bg-emerald-100 text-emerald-700" : c.warn ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}>
                      {c.ok ? <Check size={10} weight="bold" /> : c.warn ? <Minus size={10} weight="bold" /> : <X size={10} weight="bold" />}
                    </span>
                    <span className={c.ok ? "text-gray-500" : "text-gray-800"}>{c.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="space-y-4" hidden={tab !== "social"}>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="og_title" className={field.label + " mb-0"}>Social title</label>
              <CharCounter value={v.ogTitle} max={60} />
            </div>
            <input id="og_title" className={field.input} value={v.ogTitle} onChange={(e) => set({ ogTitle: e.target.value })} placeholder={v.metaTitle || title} maxLength={120} />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="og_description" className={field.label + " mb-0"}>Social description</label>
              <CharCounter value={v.ogDescription} max={110} />
            </div>
            <textarea id="og_description" rows={2} className={field.textarea} value={v.ogDescription} onChange={(e) => set({ ogDescription: e.target.value })} placeholder={v.metaDescription || excerpt} maxLength={320} />
          </div>
          <div>
            <p className={field.label}>Social image (1200 × 630)</p>
            <div className="overflow-hidden rounded-[4px] border border-gray-200">
              {socialImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={socialImage} alt="" className="aspect-[1200/630] w-full object-cover" />
              ) : (
                <div className="flex aspect-[1200/630] items-center justify-center bg-[#fe5100] px-6 text-center text-lg font-black text-[#141110]">{title || "Untitled"}</div>
              )}
              <div className="border-t border-gray-200 p-2.5">
                <p className="truncate text-[11px] uppercase text-gray-500">{DOMAIN}</p>
                <p className="truncate text-sm font-semibold text-gray-900">{v.ogTitle || v.metaTitle || title || "Untitled"}</p>
                <p className="line-clamp-1 text-xs text-gray-500">{v.ogDescription || v.metaDescription || excerpt}</p>
              </div>
            </div>
            <p className={field.hint}>{v.ogImage ? "Custom social image." : cover ? "Using the featured image." : "No image set: a branded card with the title is generated automatically."}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" disabled={busy} onClick={() => ogRef.current?.click()} className="inline-flex h-8 items-center gap-1.5 rounded-[3px] border border-gray-300 px-3 text-xs font-medium text-gray-800 hover:bg-gray-100 disabled:opacity-50">
                <ImageSquare size={14} /> {busy ? "Uploading..." : v.ogImage ? "Replace" : "Upload custom image"}
              </button>
              {v.ogImage && (
                <button type="button" onClick={() => set({ ogImage: "", ogImageAlt: "" })} className="h-8 rounded-[3px] px-3 text-xs font-medium text-rose-600 hover:bg-rose-50">
                  Remove
                </button>
              )}
            </div>
            <input ref={ogRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={pickOg} />
            {v.ogImage && <input className={field.input + " mt-2"} value={v.ogImageAlt} onChange={(e) => set({ ogImageAlt: e.target.value })} placeholder="Social image alt text" maxLength={300} />}
          </div>
        </div>

        <div className="space-y-4" hidden={tab !== "advanced"}>
          <div>
            <label htmlFor="canonical" className={field.label}>Canonical URL</label>
            <input id="canonical" className={field.input} value={v.canonical} onChange={(e) => set({ canonical: e.target.value })} placeholder="Leave blank to use this post's own URL" />
            <p className={field.hint}>Only point elsewhere when this post is republished from another URL.</p>
          </div>
          <div>
            <label htmlFor="robots" className={field.label}>Search engine visibility</label>
            <select id="robots" className={field.select} value={v.robots} onChange={(e) => set({ robots: e.target.value })}>
              <option value="index,follow">Show in search, follow links (default)</option>
              <option value="noindex,follow">Hide from search, follow links</option>
              <option value="index,nofollow">Show in search, don&apos;t follow links</option>
              <option value="noindex,nofollow">Hide from search, don&apos;t follow links</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
