-- Invoices (2026-10-11): GST tax invoices generated in the admin console at
-- /admin/invoices. Run once in the Supabase SQL Editor, BEFORE merging the PR
-- that ships the invoice pages. Idempotent.
--
-- Numbers run per Indian financial year: TW/2026-27/0001. Line items are a
-- JSON array of { description, sac, qty, rate }. Totals are stored so lists
-- and reports don't recompute; the server recalculates them on every save.
--
-- Security: RLS on with no policies. Only server actions that check the caller
-- is an admin (service key) read or write this table.

create table if not exists public.invoices (
  id              uuid primary key default gen_random_uuid(),
  number          text not null unique check (char_length(number) between 1 and 40),
  status          text not null default 'draft' check (status in ('draft', 'sent', 'paid', 'cancelled')),
  issue_date      date not null default current_date,
  due_date        date,
  client_name     text not null check (char_length(client_name) between 1 and 160),
  client_company  text not null default '' check (char_length(client_company) <= 160),
  client_email    text not null default '' check (char_length(client_email) <= 200),
  client_phone    text not null default '' check (char_length(client_phone) <= 40),
  client_address  text not null default '' check (char_length(client_address) <= 600),
  client_gstin    text not null default '' check (char_length(client_gstin) <= 15),
  client_state    text not null default 'Maharashtra' check (char_length(client_state) <= 60),
  items           jsonb not null default '[]'::jsonb,
  discount        numeric(12, 2) not null default 0 check (discount >= 0),
  gst_rate        numeric(5, 2) not null default 18 check (gst_rate between 0 and 28),
  tax_mode        text not null default 'intra' check (tax_mode in ('intra', 'inter', 'none')),
  subtotal        numeric(12, 2) not null default 0,
  tax_total       numeric(12, 2) not null default 0,
  total           numeric(12, 2) not null default 0,
  notes           text not null default '' check (char_length(notes) <= 2000),
  terms           text not null default '' check (char_length(terms) <= 2000),
  paid_at         timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists invoices_issue_date_idx on public.invoices (issue_date desc);
create index if not exists invoices_status_idx on public.invoices (status);

create or replace function public.invoices_touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists invoices_touch on public.invoices;
create trigger invoices_touch before update on public.invoices
  for each row execute function public.invoices_touch_updated_at();

alter table public.invoices enable row level security;
