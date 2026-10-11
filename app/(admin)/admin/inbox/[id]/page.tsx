import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, EnvelopeSimple, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Panel, StatusBadge, btn } from "@/components/admin/ui";
import { DeleteLeadButton, LeadStatusControl } from "@/components/admin/inbox-client";
import { getLead } from "@/lib/admin/inbox-data";
import { requireAdmin } from "@/lib/members/session";

export const metadata: Metadata = { title: "Enquiry" };

const when = (iso: string) => new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  if (children === null || children === undefined || children === "") return null;
  return (
    <div className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-3 border-t border-gray-100 py-2 text-sm first:border-t-0">
      <dt className="text-[11px] uppercase tracking-wider text-gray-500">{label}</dt>
      <dd className="break-words text-gray-800">{children}</dd>
    </div>
  );
}

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const [, { id }] = await Promise.all([requireAdmin(), params]);
  const l = await getLead(id);
  if (!l) notFound();
  const digits = l.phone.replace(/\D/g, "");
  const wa = digits.length === 10 ? `91${digits}` : digits;
  const subject = encodeURIComponent(`Re: your enquiry about ${l.service}`);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Link href="/admin/inbox" className="rounded-[3px] p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900" aria-label="Back to messages">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="truncate text-xl font-bold text-gray-900">{l.name}</h1>
          <StatusBadge status={l.status} />
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={`mailto:${l.email}?subject=${subject}`} className={btn.ghost}>
            <EnvelopeSimple size={16} /> Email
          </a>
          {digits && (
            <>
              <a href={`tel:+${wa}`} className={btn.ghost}>
                <Phone size={16} /> Call
              </a>
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className={btn.ghost}>
                <WhatsappLogo size={16} /> WhatsApp
              </a>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-5">
          <Panel title={l.service}>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">{l.message}</p>
          </Panel>
          <Panel title="Details">
            <dl>
              <Row label="Business">{l.business}</Row>
              <Row label="Email">{l.email}</Row>
              <Row label="Phone">{l.phone}</Row>
              <Row label="Website">{l.website && <a href={/^https?:/.test(l.website) ? l.website : `https://${l.website}`} target="_blank" rel="noreferrer" className="text-[#C2410C] hover:underline">{l.website}</a>}</Row>
              <Row label="Budget">{l.budget}</Row>
              <Row label="Category">{l.category}</Row>
              <Row label="Location">{l.location}</Row>
              <Row label="Marketing OK">{l.marketing_consent === null ? null : l.marketing_consent ? "Yes, opted in" : "No"}</Row>
              <Row label="Received">{when(l.created_at)}</Row>
              <Row label="Form">{l.source}</Row>
              <Row label="Live site">{l.delivered_url}</Row>
            </dl>
          </Panel>
          {(l.utm_source || l.referrer || l.landing_path || l.gclid || l.fbclid) && (
            <Panel title="Where they came from">
              <dl>
                <Row label="Landing page">{l.landing_path}</Row>
                <Row label="Referrer">{l.referrer}</Row>
                <Row label="Source">{l.utm_source}</Row>
                <Row label="Medium">{l.utm_medium}</Row>
                <Row label="Campaign">{l.utm_campaign}</Row>
                <Row label="Content">{l.utm_content}</Row>
                <Row label="Term">{l.utm_term}</Row>
                <Row label="Google click">{l.gclid ? "Yes (gclid)" : null}</Row>
                <Row label="Meta click">{l.fbclid ? "Yes (fbclid)" : null}</Row>
              </dl>
            </Panel>
          )}
        </div>
        <div className="space-y-5">
          <Panel title="Follow-up">
            <LeadStatusControl id={l.id} status={l.status} deliveredUrl={l.delivered_url} />
          </Panel>
          <DeleteLeadButton id={l.id} />
        </div>
      </div>
    </>
  );
}
