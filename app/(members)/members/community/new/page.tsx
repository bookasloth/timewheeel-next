import type { Metadata } from "next";
import Link from "next/link";
import { NewPostForm } from "@/components/members/community-forms";
import { MemberPageHeader } from "@/components/members/page-header";
import { requireMember } from "@/lib/members/session";

export const metadata: Metadata = { title: "New post" };

export default async function NewPostPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const [, sp] = await Promise.all([requireMember("/members/community/new"), searchParams]);
  return (
    <div className="space-y-8">
      <MemberPageHeader
        eyebrow="Community"
        title="Start a conversation"
        intro="Everyone here is a signed-in member. Keep it friendly, no spam or selling, and don't share anything private."
        action={
          <Link href="/members/community" className="text-sm font-semibold text-brand-text hover:underline">
            Back to community
          </Link>
        }
      />
      <div className="max-w-2xl rounded-lg border border-border bg-card p-5 sm:p-7">
        <NewPostForm defaultCategory={sp.topic} />
      </div>
    </div>
  );
}
