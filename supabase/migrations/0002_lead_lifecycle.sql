-- Phase 2b: lifecycle emails (delivered / upsell).
-- Run once in the Supabase SQL Editor for project nefmwittrybufjqhpxip.
--
-- Uses a pg_net trigger (NOT a dashboard Database Webhook: this project's
-- supabase_functions schema isn't initialized, which makes the dashboard webhook
-- fail. pg_net is self-contained and does the same job).
--
-- Before running: replace <LIFECYCLE_SECRET> below with the same value set as
-- LIFECYCLE_SECRET on Vercel. Keep this value out of git (do not commit it here).

-- 1) Column for the live site URL, used in the "Your website is live" email.
alter table public.leads add column if not exists delivered_url text;

-- 2) pg_net (HTTP from Postgres).
create extension if not exists pg_net with schema extensions;

-- 3) On status change to delivered/upsell, POST the lead to /api/lifecycle.
create or replace function public.notify_lead_lifecycle()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if new.status is distinct from old.status
     and new.status in ('delivered', 'upsell') then
    perform net.http_post(
      url     := 'https://timewheel.co.in/api/lifecycle',
      body    := jsonb_build_object(
                   'stage',    new.status,
                   'email',    new.email,
                   'name',     new.name,
                   'site_url', new.delivered_url
                 ),
      headers := jsonb_build_object(
                   'Content-Type',       'application/json',
                   'x-lifecycle-secret', '<LIFECYCLE_SECRET>'
                 )
    );
  end if;
  return new;
end;
$$;

drop trigger if exists lead_lifecycle_webhook on public.leads;
create trigger lead_lifecycle_webhook
after update on public.leads
for each row
execute function public.notify_lead_lifecycle();

-- Team workflow: edit a lead in the Table Editor ->
--   set status = 'delivered' (and paste the live URL into delivered_url) -> "live" email
--   set status = 'upsell'                                                -> upsell email
