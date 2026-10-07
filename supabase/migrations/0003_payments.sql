-- Timewheel payments (Zoho Payments). One row per checkout attempt.
-- Run once in the Supabase SQL Editor for project nefmwittrybufjqhpxip
-- (Dashboard -> SQL Editor -> paste -> Run). Idempotent: safe to re-run.
--
-- Same lock-down as leads: RLS on with NO policies, so only server code holding
-- the SECRET (service-role) key can read or write. The browser never touches it.
--
-- id is sent to Zoho as reference_number, so a Zoho payment always maps back to
-- exactly one row. amount is fixed when the row is created and is what the paid
-- amount is checked against; the browser never sets what Zoho charges.

create table if not exists public.payments (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),

  -- what is being paid for
  purpose             text not null,               -- e.g. "Invoice TW-1042", "Website deposit"
  amount              numeric(12, 2) not null check (amount > 0),
  currency            text not null default 'INR',

  -- payer
  name                text not null,
  email               text not null,
  phone               text,

  -- state
  status              text not null default 'pending',  -- pending | paid
  provider            text not null default 'zoho',
  provider_payment_id text,
  paid_at             timestamptz,

  -- request context
  source              text not null default 'pay-page',
  ip                  text,
  user_agent          text
);

create index if not exists payments_created_at_idx on public.payments (created_at desc);
create index if not exists payments_status_idx     on public.payments (status);
create unique index if not exists payments_provider_payment_id_idx
  on public.payments (provider_payment_id) where provider_payment_id is not null;

alter table public.payments enable row level security;
