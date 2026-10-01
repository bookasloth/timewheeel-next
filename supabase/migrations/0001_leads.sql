-- Timewheel campaign leads store.
-- Run once in the Supabase SQL Editor for project nefmwittrybufjqhpxip
-- (Dashboard -> SQL Editor -> paste -> Run). Idempotent: safe to re-run.
--
-- The lead API writes here with the SECRET (service-role) key, which bypasses
-- RLS. We enable RLS with NO policies so anon/authenticated clients can neither
-- read nor write leads from the browser. Only server code with the secret key
-- (or the dashboard) can touch this table.

create table if not exists public.leads (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),

  -- contact + qualification
  name              text not null,
  business          text not null,
  email             text not null,
  phone             text not null,
  website           text,
  service           text not null,
  message           text not null,
  budget            text,
  category          text,
  location          text,
  marketing_consent boolean,

  -- funnel + tracking
  source            text not null default 'website',
  event_id          text,
  status            text not null default 'new',  -- new | contacted | delivered | upsell | won | lost

  -- first-touch attribution
  utm_source        text,
  utm_medium        text,
  utm_campaign      text,
  utm_content       text,
  utm_term          text,
  gclid             text,
  fbclid            text,
  referrer          text,
  landing_path      text,

  -- request context
  ip                text,
  user_agent        text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_source_idx     on public.leads (source);
create index if not exists leads_status_idx     on public.leads (status);
create index if not exists leads_campaign_idx   on public.leads (utm_campaign);
create index if not exists leads_email_idx      on public.leads (lower(email));

alter table public.leads enable row level security;
-- No policies on purpose: the service-role key bypasses RLS; everyone else is denied.
