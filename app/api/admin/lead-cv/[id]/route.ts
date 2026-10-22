import { NextResponse, type NextRequest } from "next/server";
import { getConsoleMember } from "@/lib/members/session";
import { getLead } from "@/lib/admin/inbox-data";
import { signedCvUrl } from "@/lib/job-applications";

// GET /api/admin/lead-cv/<lead id>: mints a 60-second signed link to the CV a
// candidate uploaded with their application and redirects to it. The bucket is
// private, so this route is the only way to the file. Admin-only.
export const runtime = "nodejs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const member = await getConsoleMember();
  if (!member?.isAdmin) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await params;
  const lead = await getLead(id);
  if (!lead?.cv_path) {
    return NextResponse.json({ error: "No CV on this lead." }, { status: 404 });
  }

  const url = await signedCvUrl(lead.cv_path, lead.cv_name || undefined);
  if (!url) {
    return NextResponse.json({ error: "This file isn't available right now." }, { status: 503 });
  }

  const res = NextResponse.redirect(url, 303);
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}
