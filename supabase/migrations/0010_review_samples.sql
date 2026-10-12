-- Review samples (2026-10-12): which /review sample reviews have been copied.
-- Each sample is copied once, then never offered again, so two customers never
-- post the same text. Run once in the Supabase SQL Editor. Idempotent.
--
-- Security: RLS on with no policies. Only /api/review/samples (service key)
-- reads or writes this table.

create table if not exists public.review_samples_used (
  service  text not null check (char_length(service) between 1 and 40),
  idx      int  not null check (idx between 0 and 999),
  used_at  timestamptz not null default now(),
  primary key (service, idx)
);

alter table public.review_samples_used enable row level security;
