"use client";

import { useActionState } from "react";
import {
  deleteAccount,
  updateEmailPrefs,
  updateProfile,
  type DeleteState,
  type PrefsState,
  type ProfileState,
} from "@/lib/members/account-actions";
import { Alert, Field, SubmitButton, inputClass } from "@/components/members/ui";

export type ProfileValues = { name: string; headline: string; business_name: string; website: string; city: string; bio: string };

export function ProfileForm({ values }: { values: ProfileValues }) {
  const [state, action] = useActionState(updateProfile, {} as ProfileState);
  return (
    <form action={action} className="space-y-4" noValidate>
      {state.error && <Alert tone="bad">{state.error}</Alert>}
      {state.saved && !state.error && <Alert tone="good">Saved. Other members see this on your profile and posts.</Alert>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="acct-name" label="Display name">
          <input id="acct-name" name="name" required maxLength={120} defaultValue={values.name} autoComplete="name" className={inputClass(false)} />
        </Field>
        <Field id="acct-headline" label="Headline" optional>
          <input
            id="acct-headline"
            name="headline"
            maxLength={120}
            defaultValue={values.headline}
            placeholder="e.g. Founder, Kaveri Home Bakers"
            className={inputClass(false)}
          />
        </Field>
        <Field id="acct-business" label="Business" optional>
          <input id="acct-business" name="business_name" maxLength={120} defaultValue={values.business_name} autoComplete="organization" className={inputClass(false)} />
        </Field>
        <Field id="acct-city" label="City" optional>
          <input id="acct-city" name="city" maxLength={80} defaultValue={values.city} autoComplete="address-level2" className={inputClass(false)} />
        </Field>
      </div>
      <Field id="acct-website" label="Website" optional>
        <input id="acct-website" name="website" maxLength={200} defaultValue={values.website} placeholder="yourbusiness.com" className={inputClass(false)} />
      </Field>
      <Field id="acct-bio" label="About you" optional hint="A few lines on what you do and what you're working on. Up to 1,000 characters.">
        <textarea id="acct-bio" name="bio" rows={4} maxLength={1000} defaultValue={values.bio} className={inputClass(false) + " resize-y leading-relaxed"} />
      </Field>
      <SubmitButton pendingText="Saving...">Save profile</SubmitButton>
    </form>
  );
}

export function EmailPrefsForm({ replies, announcements }: { replies: boolean; announcements: boolean }) {
  const [state, action] = useActionState(updateEmailPrefs, {} as PrefsState);
  const row = "flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3.5 transition-colors hover:border-brand/40";
  return (
    <form action={action} className="space-y-3">
      {state.error && <Alert tone="bad">{state.error}</Alert>}
      {state.saved && !state.error && <Alert tone="good">Email preferences saved.</Alert>}
      <label className={row}>
        <input type="checkbox" name="replies" defaultChecked={replies} className="mt-0.5 size-4 accent-[var(--brand)]" />
        <span>
          <span className="block text-sm font-semibold">Replies to my posts</span>
          <span className="block text-xs text-muted-foreground">An email when someone replies to your post or in a thread you joined.</span>
        </span>
      </label>
      <label className={row}>
        <input type="checkbox" name="announcements" defaultChecked={announcements} className="mt-0.5 size-4 accent-[var(--brand)]" />
        <span>
          <span className="block text-sm font-semibold">Announcements and new resources</span>
          <span className="block text-xs text-muted-foreground">Occasional emails from the Timewheel team about new downloads, courses and events.</span>
        </span>
      </label>
      <SubmitButton variant="outline" pendingText="Saving...">
        Save preferences
      </SubmitButton>
    </form>
  );
}

export function DeleteAccountForm() {
  const [state, action] = useActionState(deleteAccount, {} as DeleteState);
  return (
    <form action={action} className="space-y-4" noValidate>
      {state.error && <Alert tone="bad">{state.error}</Alert>}
      <Field id="acct-delete" label="Type DELETE to confirm">
        <input id="acct-delete" name="confirm" autoComplete="off" placeholder="DELETE" className={inputClass(false) + " max-w-xs"} />
      </Field>
      <SubmitButton variant="danger" pendingText="Deleting...">
        Delete my account
      </SubmitButton>
    </form>
  );
}
