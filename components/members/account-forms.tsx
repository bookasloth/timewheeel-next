"use client";

import { useActionState } from "react";
import { deleteAccount, updateProfile, type DeleteState, type ProfileState } from "@/lib/members/account-actions";
import { Alert, Field, SubmitButton, inputClass } from "@/components/members/ui";

export function ProfileForm({ name }: { name: string }) {
  const [state, action] = useActionState(updateProfile, {} as ProfileState);
  return (
    <form action={action} className="space-y-4" noValidate>
      {state.error && <Alert tone="bad">{state.error}</Alert>}
      {state.saved && !state.error && <Alert tone="good">Saved. Other members will see this name.</Alert>}
      <Field id="acct-name" label="Display name" hint="Shown next to your posts in the community.">
        <input id="acct-name" name="name" required maxLength={120} defaultValue={name} autoComplete="name" className={inputClass(false)} />
      </Field>
      <SubmitButton variant="outline" pendingText="Saving...">
        Save name
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
