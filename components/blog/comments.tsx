"use client";

import { useState, type FormEvent } from "react";
import { CornerDownRight, CheckCircle2 } from "lucide-react";
import type { Comment } from "@/lib/blog";

function Avatar({ name }: { name: string }) {
  const initials = name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-sm font-bold text-muted-foreground" aria-hidden>
      {initials}
    </span>
  );
}

const inputBase =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";

export function Comments({
  postSlug,
  postTitle,
  comments,
}: {
  postSlug: string;
  postTitle: string;
  comments: Comment[];
}) {
  const [form, setForm] = useState({ name: "", email: "", comment: "", company_website: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || form.comment.trim().length < 5) {
      setStatus("error");
      setError("Please add your name, a valid email and a comment.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, postSlug, postTitle }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(data?.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error, please try again.");
    }
  }

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-extrabold tracking-tight">
        {comments.length > 0 ? `${comments.length} Comment${comments.length > 1 ? "s" : ""}` : "Comments"}
      </h2>

      {/* thread */}
      <div className="mt-8 space-y-8">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground">Be the first to comment.</p>
        )}
        {comments.map((c, i) => (
          <div key={i} className={c.isAuthor ? "ml-6 sm:ml-12" : ""}>
            <div className="flex items-center gap-3">
              <Avatar name={c.author} />
              <div>
                <p className="flex items-center gap-2 font-bold text-foreground">
                  {c.author}
                  {c.isAuthor && (
                    <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-bold text-background">Author</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{c.date}</p>
              </div>
            </div>
            <p className="mt-3 leading-relaxed text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </div>

      {/* reply form */}
      <div id="reply" className="mt-12 flex items-center gap-2 text-lg font-bold text-foreground">
        <CornerDownRight className="size-5 text-brand" /> Leave a reply
      </div>

      {status === "success" ? (
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-secondary/40 p-6">
          <CheckCircle2 className="size-6 shrink-0 text-rating" />
          <p className="text-sm text-muted-foreground">
            Thanks, your comment was submitted and will appear after moderation.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="mt-5 space-y-4">
          <textarea
            rows={4}
            placeholder="Your comment"
            value={form.comment}
            onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
            className={inputBase}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Name *"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputBase}
            />
            <input
              type="email"
              placeholder="Email *"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={inputBase}
            />
          </div>
          {/* honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={form.company_website}
            onChange={(e) => setForm((f) => ({ ...f, company_website: e.target.value }))}
            className="absolute -left-[9999px] h-0 w-0"
          />
          {status === "error" && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-brand-foreground disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Submit comment"}
          </button>
        </form>
      )}
    </section>
  );
}
