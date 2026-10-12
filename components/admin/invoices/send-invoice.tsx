"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, PaperPlaneTilt, X } from "@phosphor-icons/react";
import { btn, field } from "@/components/admin/ui";
import { sendInvoice } from "@/lib/admin/invoice-actions";

// "Send to client" button + small panel: recipient(s), optional note, send.
export function SendInvoice({
  id,
  email,
  status,
  sentAt,
  sentTo,
}: {
  id: string;
  email: string;
  status: string;
  sentAt?: string | null;
  sentTo?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState(email);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const [pending, start] = useTransition();

  function send() {
    setError("");
    start(async () => {
      const res = await sendInvoice(id, to, note);
      if (res.error) return setError(res.error);
      setDone(res.sentTo ?? to);
      setNote("");
      router.refresh();
    });
  }

  const resend = Boolean(sentAt) || status === "sent" || status === "paid";

  return (
    <div className="relative">
      <button type="button" onClick={() => { setOpen((o) => !o); setDone(""); setError(""); }} className={btn.primary} disabled={status === "cancelled"}>
        <PaperPlaneTilt size={16} /> {resend ? "Resend" : "Send to client"}
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-2 w-[min(92vw,380px)] rounded-[4px] border border-gray-200 bg-white p-4 text-left shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">Email this invoice</p>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>
          {done ? (
            <div className="flex items-start gap-2 rounded-[3px] bg-emerald-50 p-3 text-sm text-emerald-800">
              <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0" />
              <span>Sent to {done}. They get a summary and a link to view or download the invoice.</span>
            </div>
          ) : (
            <>
              <label className={field.label} htmlFor="send-to">To</label>
              <input id="send-to" value={to} onChange={(e) => setTo(e.target.value)} placeholder="client@company.com" className={field.input} />
              <p className={field.hint}>Separate extra addresses with commas.</p>
              <label className={`${field.label} mt-3`} htmlFor="send-note">Note (optional)</label>
              <textarea id="send-note" value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Thanks for working with us this month." className={field.textarea} />
              {sentAt && (
                <p className="mt-2 text-xs text-gray-500">
                  Last sent {new Date(sentAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  {sentTo ? ` to ${sentTo}` : ""}.
                </p>
              )}
              {error && <p role="alert" className="mt-2 text-xs text-rose-600">{error}</p>}
              <button type="button" onClick={send} disabled={pending} aria-busy={pending} className={`${btn.primary} mt-3 w-full justify-center`}>
                {pending ? "Sending..." : resend ? "Send again" : "Send invoice"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
