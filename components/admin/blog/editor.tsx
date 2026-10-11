"use client";

import { useRef, useState, type ReactNode } from "react";
import { EditorContent, useEditor, type Editor as TiptapEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import { Placeholder } from "@tiptap/extensions";
import { toast } from "sonner";
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  Code,
  CodeBlock,
  ImageSquare,
  LinkSimple,
  LinkBreak,
  ListBullets,
  ListNumbers,
  Minus,
  Paragraph,
  Quotes,
  Rows,
  Columns,
  Table,
  TextB,
  TextHThree,
  TextHTwo,
  TextItalic,
  TextStrikethrough,
  TextUnderline,
  Trash,
  TextAa,
} from "@phosphor-icons/react";
import { uploadImage } from "@/components/admin/blog/upload-image";

// Rich-text editor for blog posts (Tiptap, as in the adetc blog admin). The
// content area uses the live site's .blog-body styles, so what you write here
// looks like the published post. H1 is reserved for the post title.

function Tb({ onClick, active, disabled, title, children }: { onClick: () => void; active?: boolean; disabled?: boolean; title: string; children: ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`inline-flex size-8 items-center justify-center rounded-[3px] transition-colors disabled:opacity-35 ${
        active ? "bg-orange-50 text-[#C2410C]" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {children}
    </button>
  );
}

const Sep = () => <span className="mx-1 h-5 w-px bg-gray-200" aria-hidden />;

function Toolbar({ editor, onImage, uploading }: { editor: TiptapEditor; onImage: () => void; uploading: number | null }) {
  // Lazy: focus() runs as soon as it's chained, so build the chain per click.
  const c = () => editor.chain().focus();
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const href = window.prompt("Link URL (https://... or /page on this site)", prev || "https://");
    if (href === null) return;
    if (href === "" || href === "https://") return void c().extendMarkRange("link").unsetLink().run();
    c().extendMarkRange("link").setLink({ href: href.trim() }).run();
  };
  const editAlt = () => {
    const prev = (editor.getAttributes("image").alt as string) || "";
    const alt = window.prompt("Image alt text (describe the image for search and screen readers):", prev);
    if (alt !== null) c().updateAttributes("image", { alt: alt.trim() }).run();
  };
  const s = 17;
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-white p-1.5">
      <Tb title="Paragraph" active={editor.isActive("paragraph")} onClick={() => c().setParagraph().run()}><Paragraph size={s} /></Tb>
      <Tb title="Heading 2 (section)" active={editor.isActive("heading", { level: 2 })} onClick={() => c().toggleHeading({ level: 2 }).run()}><TextHTwo size={s} /></Tb>
      <Tb title="Heading 3 (sub-section)" active={editor.isActive("heading", { level: 3 })} onClick={() => c().toggleHeading({ level: 3 }).run()}><TextHThree size={s} /></Tb>
      <Tb title="Heading 4" active={editor.isActive("heading", { level: 4 })} onClick={() => c().toggleHeading({ level: 4 }).run()}><TextAa size={s} /></Tb>
      <Sep />
      <Tb title="Bold" active={editor.isActive("bold")} onClick={() => c().toggleBold().run()}><TextB size={s} weight="bold" /></Tb>
      <Tb title="Italic" active={editor.isActive("italic")} onClick={() => c().toggleItalic().run()}><TextItalic size={s} /></Tb>
      <Tb title="Underline" active={editor.isActive("underline")} onClick={() => c().toggleUnderline().run()}><TextUnderline size={s} /></Tb>
      <Tb title="Strikethrough" active={editor.isActive("strike")} onClick={() => c().toggleStrike().run()}><TextStrikethrough size={s} /></Tb>
      <Tb title="Inline code" active={editor.isActive("code")} onClick={() => c().toggleCode().run()}><Code size={s} /></Tb>
      <Sep />
      <Tb title="Bullet list" active={editor.isActive("bulletList")} onClick={() => c().toggleBulletList().run()}><ListBullets size={s} /></Tb>
      <Tb title="Numbered list" active={editor.isActive("orderedList")} onClick={() => c().toggleOrderedList().run()}><ListNumbers size={s} /></Tb>
      <Tb title="Quote" active={editor.isActive("blockquote")} onClick={() => c().toggleBlockquote().run()}><Quotes size={s} /></Tb>
      <Tb title="Code block" active={editor.isActive("codeBlock")} onClick={() => c().toggleCodeBlock().run()}><CodeBlock size={s} /></Tb>
      <Tb title="Divider" onClick={() => c().setHorizontalRule().run()}><Minus size={s} /></Tb>
      <Sep />
      <Tb title="Link" active={editor.isActive("link")} onClick={setLink}><LinkSimple size={s} /></Tb>
      {editor.isActive("link") && <Tb title="Remove link" onClick={() => c().extendMarkRange("link").unsetLink().run()}><LinkBreak size={s} /></Tb>}
      <Tb title={uploading !== null ? `Uploading ${uploading}%` : "Insert image"} disabled={uploading !== null} onClick={onImage}><ImageSquare size={s} /></Tb>
      {editor.isActive("image") && (
        <button type="button" onClick={editAlt} className="ml-0.5 h-7 rounded-[3px] border border-gray-300 px-2 text-xs font-medium text-gray-700 hover:bg-gray-100">
          Alt text
        </button>
      )}
      <Tb title="Insert table" active={editor.isActive("table")} onClick={() => c().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><Table size={s} /></Tb>
      {editor.isActive("table") && (
        <>
          <Tb title="Add row below" onClick={() => c().addRowAfter().run()}><Rows size={s} /></Tb>
          <Tb title="Add column right" onClick={() => c().addColumnAfter().run()}><Columns size={s} /></Tb>
          <Tb title="Delete row" onClick={() => c().deleteRow().run()}><Rows size={s} className="text-rose-600" /></Tb>
          <Tb title="Delete column" onClick={() => c().deleteColumn().run()}><Columns size={s} className="text-rose-600" /></Tb>
          <Tb title="Delete table" onClick={() => c().deleteTable().run()}><Trash size={s} className="text-rose-600" /></Tb>
        </>
      )}
      <Sep />
      <Tb title="Undo" disabled={!editor.can().undo()} onClick={() => c().undo().run()}><ArrowCounterClockwise size={s} /></Tb>
      <Tb title="Redo" disabled={!editor.can().redo()} onClick={() => c().redo().run()}><ArrowClockwise size={s} /></Tb>
    </div>
  );
}

export function BlogEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<number | null>(null);
  const [words, setWords] = useState(0);

  const editor = useEditor({
    immediatelyRender: false,
    // Toolbar active states and the table buttons follow the selection.
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        // Link targets are decided on save (external links open in a new tab).
        link: { openOnClick: false, autolink: true, HTMLAttributes: { target: null, rel: null } },
      }),
      Image,
      TableKit.configure({ table: { resizable: false } }),
      Placeholder.configure({ placeholder: "Start writing. Use Heading 2 for each main section; they become the table of contents." }),
    ],
    content: value || "",
    editorProps: { attributes: { class: "blog-body tw-prose-editor", spellcheck: "true" } },
    onCreate: ({ editor }) => setWords(editor.getText().trim().split(/\s+/).filter(Boolean).length),
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      setWords(editor.getText().trim().split(/\s+/).filter(Boolean).length);
    },
  });

  const insertImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;
    try {
      setUploading(0);
      const src = await uploadImage(file, setUploading);
      const alt = window.prompt("Image alt text (describe the image for search and screen readers):") || "";
      editor.chain().focus().setImage({ src, alt: alt.trim() }).run();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(null);
    }
  };

  if (!editor) return <div className="min-h-[480px] px-5 py-4 text-sm text-gray-400">Loading editor...</div>;

  return (
    <div>
      <Toolbar editor={editor} uploading={uploading} onImage={() => fileRef.current?.click()} />
      <EditorContent editor={editor} />
      <div className="flex items-center justify-between border-t border-gray-200 px-3 py-1.5 text-[11px] text-gray-500">
        <span>
          {words.toLocaleString("en-IN")} words · about {Math.max(1, Math.round(words / 200))} min read
        </span>
        <span className="hidden sm:inline">Tip: paste from Google Docs keeps headings, lists and links.</span>
      </div>
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" hidden onChange={insertImage} />
    </div>
  );
}
