"use client";

import { useActionState, useEffect, useRef } from "react";
import { createPost, createReply, type PostState, type ReplyState } from "@/lib/members/community-actions";
import { communityCategories } from "@/lib/members/config";
import { Alert, Field, SubmitButton, inputClass } from "@/components/members/ui";

export function NewPostForm({ defaultCategory }: { defaultCategory?: string }) {
  const [state, action] = useActionState(createPost, {} as PostState);
  const err = (f: PostState["field"]) => (state.field === f ? state.error : undefined);
  return (
    <form action={action} className="space-y-5" noValidate>
      {state.error && !state.field && <Alert tone="bad">{state.error}</Alert>}
      <Field id="post-category" label="Topic" error={err("category")}>
        <select
          id="post-category"
          name="category"
          required
          defaultValue={state.category ?? defaultCategory ?? ""}
          className={inputClass(Boolean(err("category")))}
        >
          <option value="" disabled>
            Choose a topic
          </option>
          {communityCategories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="post-title" label="Title" error={err("title")}>
        <input
          id="post-title"
          name="title"
          required
          minLength={3}
          maxLength={160}
          defaultValue={state.title}
          placeholder="What's it about?"
          className={inputClass(Boolean(err("title")))}
        />
      </Field>
      <Field id="post-body" label="Your post" error={err("body")} hint="Plain text. Links are fine. Be kind and keep it useful.">
        <textarea
          id="post-body"
          name="body"
          required
          rows={9}
          maxLength={10000}
          defaultValue={state.body}
          placeholder="Share the details, what you've tried, or what you'd like feedback on."
          className={inputClass(Boolean(err("body"))) + " resize-y leading-relaxed"}
        />
      </Field>
      <SubmitButton pendingText="Publishing...">Publish post</SubmitButton>
    </form>
  );
}

export function ReplyForm({ postId }: { postId: string }) {
  const [state, action] = useActionState(createReply, {} as ReplyState);
  const ref = useRef<HTMLTextAreaElement>(null);
  // After a successful reply the form resets; keep focus for a follow-up.
  useEffect(() => {
    if (state.ok) ref.current?.focus();
  }, [state.ok]);
  return (
    <form action={action} className="space-y-3" noValidate>
      <input type="hidden" name="post_id" value={postId} />
      {state.error && <Alert tone="bad">{state.error}</Alert>}
      <label htmlFor="reply-body" className="sr-only">
        Your reply
      </label>
      <textarea
        ref={ref}
        id="reply-body"
        name="body"
        required
        rows={4}
        maxLength={5000}
        defaultValue={state.error ? state.body : ""}
        key={state.ok ?? 0}
        placeholder="Write a reply..."
        className={inputClass(false) + " resize-y leading-relaxed"}
      />
      <SubmitButton pendingText="Posting...">Post reply</SubmitButton>
    </form>
  );
}
