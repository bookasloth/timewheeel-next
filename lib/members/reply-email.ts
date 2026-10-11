import "server-only";
import { createAdminClient } from "@/lib/supabase/server";
import { renderNote } from "@/lib/email/layout";
import { sendEmail } from "@/lib/resend-email";
import { site } from "@/lib/site";

// Email the same people the in-app notification goes to (post author and
// earlier repliers, never the person replying), but only those who keep
// "Replies to my posts" switched on. Best-effort: runs after the response.
export async function emailReplyRecipients(postId: string, replierId: string, replierName: string) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    const db = createAdminClient();
    const [{ data: post }, { data: replies }] = await Promise.all([
      db.from("community_posts").select("id, title, author_id").eq("id", postId).maybeSingle(),
      db.from("community_replies").select("author_id").eq("post_id", postId),
    ]);
    if (!post) return;
    const ids = [...new Set([post.author_id, ...(replies ?? []).map((r) => r.author_id)])].filter((id) => id && id !== replierId);
    if (!ids.length) return;

    const { data: prefs } = await db.from("memberships").select("user_id, email_prefs").in("user_id", ids);
    const wanted = (prefs ?? []).filter((p) => (p.email_prefs as { replies?: boolean } | null)?.replies !== false).map((p) => p.user_id);
    const link = `${site.url}/members/community/${post.id}`;

    await Promise.all(
      wanted.slice(0, 50).map(async (uid) => {
        const { data } = await db.auth.admin.getUserById(uid);
        const email = data.user?.email;
        if (!email) return;
        const first = String(data.user?.user_metadata?.full_name ?? data.user?.user_metadata?.name ?? "").split(/\s+/)[0] || "there";
        const own = uid === post.author_id;
        await sendEmail(
          email,
          renderNote({
            subject: own ? `${replierName} replied to your post` : `New reply in "${post.title.slice(0, 60)}"`,
            greeting: `Hi ${first},`,
            lines: [
              own
                ? `${replierName} replied to your post "${post.title}" in the Timewheel member community.`
                : `${replierName} replied in "${post.title}", a thread you joined in the Timewheel member community.`,
              `Read it and reply here: ${link}`,
            ],
            signature: ["Timewheel"],
            footnote: `You get these because you're a Timewheel member. Turn them off any time in Account, Email preferences: ${site.url}/members/account#emails`,
          }),
        );
      }),
    );
  } catch (e) {
    console.error("emailReplyRecipients:", e);
  }
}
