"use client";

import { ErrorState } from "@/components/admin/feedback-client";

export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorState title="Couldn't load this page" message="The server didn't answer in time or hit an error. Try again, and if it keeps happening check the Vercel logs." onRetry={reset} />;
}
