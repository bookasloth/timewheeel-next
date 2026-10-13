import { getConsoleMember } from "@/lib/members/session";
import { listNewsletterContacts } from "@/lib/resend-contacts";

// Newsletter subscribers as CSV (admins only).
const cell = (v: unknown) => {
  const s = String(v ?? "");
  // Neutralise spreadsheet formulas, then quote.
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
};

export async function GET() {
  const member = await getConsoleMember();
  if (!member?.isAdmin) return new Response("Not found", { status: 404 });
  const contacts = (await listNewsletterContacts()) ?? [];
  const rows = [["email", "first_name", "last_name", "status", "joined"], ...contacts.map((c) => [c.email, c.first_name, c.last_name, c.unsubscribed ? "unsubscribed" : "subscribed", c.created_at])];
  const csv = rows.map((r) => r.map(cell).join(",")).join("\r\n");
  return new Response(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="timewheel-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
