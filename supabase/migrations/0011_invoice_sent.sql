-- Invoice sending (2026-10-12): record when and to whom an invoice was
-- emailed from /admin/invoices. Run once in the Supabase SQL Editor after
-- 0009_invoices.sql. Idempotent.

alter table public.invoices add column if not exists sent_at timestamptz;
alter table public.invoices add column if not exists sent_to text not null default '' check (char_length(sent_to) <= 400);
