-- Shared rate limiting for the public API routes (lib/rate-limit.ts).
-- Run once in the Supabase SQL Editor for project nefmwittrybufjqhpxip
-- (Dashboard -> SQL Editor -> paste -> Run). Idempotent: safe to re-run.
--
-- Each Vercel instance used to keep its own in-memory count, so the real limit
-- per visitor scaled with however many instances were running. Counting here
-- gives every instance the same number. Until this is applied the app falls
-- back to the old per-instance count, so nothing breaks in the meantime.
--
-- Fixed windows: one row per (key, window). Same lock-down as leads: RLS on
-- with NO policies, and only the service role may call the function.

create table if not exists public.rate_limits (
  key          text        not null,  -- e.g. "lead:203.0.113.7", "seo-audit:all"
  window_start timestamptz not null,
  hits         integer     not null default 0,
  primary key (key, window_start)
);

alter table public.rate_limits enable row level security;

-- Counts one hit for p_key in the current p_window_seconds window and returns
-- true when that pushes it over p_max (i.e. the caller should be refused).
create or replace function public.rate_limit_hit(p_key text, p_window_seconds integer, p_max integer)
returns boolean
language plpgsql
set search_path = public
as $$
declare
  w timestamptz := to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);
  n integer;
begin
  insert into public.rate_limits as r (key, window_start, hits)
  values (p_key, w, 1)
  on conflict (key, window_start) do update set hits = r.hits + 1
  returning hits into n;

  -- Occasional sweep so old windows never pile up.
  if random() < 0.01 then
    delete from public.rate_limits where window_start < now() - interval '1 day';
  end if;

  return n > p_max;
end;
$$;

revoke all on function public.rate_limit_hit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.rate_limit_hit(text, integer, integer) to service_role;
