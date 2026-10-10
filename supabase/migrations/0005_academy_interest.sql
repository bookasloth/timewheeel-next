-- Timewheel Digital Marketing Academy: student interest registrations.
-- Run once in the Supabase SQL Editor for project nefmwittrybufjqhpxip
-- (Dashboard -> SQL Editor -> paste -> Run). Idempotent: safe to re-run.
-- Additive only: creates one new table, touches nothing that exists.
--
-- Written by POST /api/academy/interest with the SECRET (service-role) key.
-- Same lock-down as leads: RLS on with NO policies, so the browser (anon or
-- authenticated) can neither read nor write a student's details.
--
-- Until this is applied the API falls back to emailing the team over SMTP, so
-- no registration is lost, but duplicates can't be detected in that mode.

create table if not exists public.academy_interest (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  name          text not null check (char_length(name) between 1 and 120),
  -- Stored lower-cased by the API, so the unique key below catches
  -- "Asha@x.com" and "asha@x.com" as the same person.
  email         text not null check (char_length(email) between 3 and 200 and email = lower(email) and email like '%_@_%._%'),
  institution   text check (institution is null or char_length(institution) <= 160),
  stage         text check (stage is null or stage in (
                  'In college',
                  'Recent graduate',
                  'Working, moving into marketing',
                  'Freelancer or self-taught',
                  'Other'
                )),
  -- Program slug from lib/academy.ts. Not a foreign key: programs live in code.
  program_slug  text not null check (program_slug ~ '^[a-z0-9-]{1,80}$'),

  -- Pipeline: new -> contacted -> enrolled, or withdrawn.
  status        text not null default 'new' check (status in ('new', 'contacted', 'enrolled', 'withdrawn')),

  -- First-touch attribution (lib/attribution), for knowing which channels reach students.
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  referrer      text,
  landing_path  text,

  -- One registration per person per program.
  constraint academy_interest_email_program_key unique (email, program_slug)
);

create index if not exists academy_interest_created_at_idx on public.academy_interest (created_at desc);
create index if not exists academy_interest_program_idx    on public.academy_interest (program_slug);
create index if not exists academy_interest_status_idx     on public.academy_interest (status);

alter table public.academy_interest enable row level security;
-- No policies on purpose: the service-role key bypasses RLS; everyone else is denied.
