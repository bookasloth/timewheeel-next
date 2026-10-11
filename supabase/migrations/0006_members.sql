-- Timewheel member accounts: profiles, memberships, downloads, community.
-- Run once in the Supabase SQL Editor for project nefmwittrybufjqhpxip
-- (Dashboard -> SQL Editor -> paste -> Run). Idempotent: safe to re-run.
--
-- Sign-up and login are Supabase Auth (auth.users). Everything below hangs off
-- auth.users and is protected by RLS:
--   profiles          name + avatar. Every signed-in member can read them (the
--                     community shows who posted); each member edits only their own name.
--   memberships       role + premium. A member reads only their own row; only
--                     server code (secret key) writes it, so nobody can make
--                     themselves premium or admin from the browser.
--   downloads         the catalog. Members can list published items (premium ones
--                     show as locked). Files sit in the PRIVATE storage bucket
--                     "member-downloads"; the site hands out short-lived signed
--                     links after checking the member's tier.
--   download_events   who downloaded what. Server-only.
--   community_posts / community_replies
--                     members read everything, write and delete their own.
--                     Pin, lock and reply counts are not writable by members.
--
-- After running: sign up on the site with the team account, then make it an admin
-- (or list the address in MEMBERS_ADMIN_EMAILS on Vercel instead):
--   update public.memberships set role = 'admin'
--   where user_id = (select id from auth.users where email = 'team@timewheel.co.in');

-- ---------------------------------------------------------------- profiles
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now(),
  full_name   text check (char_length(full_name) <= 120),
  avatar_url  text
);

alter table public.profiles enable row level security;
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (full_name) on public.profiles to authenticated;

drop policy if exists "Members can read profiles" on public.profiles;
create policy "Members can read profiles" on public.profiles
  for select to authenticated using (true);

drop policy if exists "Members can update their own profile" on public.profiles;
create policy "Members can update their own profile" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- ------------------------------------------------------------- memberships
create table if not exists public.memberships (
  user_id         uuid primary key references auth.users (id) on delete cascade,
  role            text not null default 'member' check (role in ('member', 'admin')),
  premium_until   timestamptz,          -- null = free; 9999-12-31 = lifetime
  premium_source  text,                 -- 'payment' | 'admin'
  updated_at      timestamptz not null default now()
);

alter table public.memberships enable row level security;
revoke all on public.memberships from anon, authenticated;
grant select on public.memberships to authenticated;

drop policy if exists "Members can read their own membership" on public.memberships;
create policy "Members can read their own membership" on public.memberships
  for select to authenticated using (user_id = auth.uid());

-- New auth user -> profile + membership. Google sign-ups carry full_name/name and
-- avatar_url in their metadata; email sign-ups send full_name from the form.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    left(nullif(trim(coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')), ''), 120),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;

  insert into public.memberships (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Anyone who signed up before this migration ran.
insert into public.profiles (id, full_name, avatar_url)
select
  u.id,
  left(nullif(trim(coalesce(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name')), ''), 120),
  u.raw_user_meta_data ->> 'avatar_url'
from auth.users u
on conflict (id) do nothing;

insert into public.memberships (user_id)
select id from auth.users
on conflict (user_id) do nothing;

-- Extends premium by p_days from whichever is later: now or the current expiry.
-- Called by the server after a premium payment settles, and by the admin page.
create or replace function public.grant_premium(p_user uuid, p_days integer, p_source text)
returns timestamptz
language plpgsql
security definer
set search_path = ''
as $$
declare
  until timestamptz;
begin
  insert into public.memberships (user_id) values (p_user) on conflict (user_id) do nothing;
  update public.memberships
     set premium_until = greatest(coalesce(premium_until, now()), now()) + make_interval(days => p_days),
         premium_source = p_source,
         updated_at = now()
   where user_id = p_user
  returning premium_until into until;
  return until;
end;
$$;

revoke all on function public.grant_premium(uuid, integer, text) from public, anon, authenticated;
grant execute on function public.grant_premium(uuid, integer, text) to service_role;

-- --------------------------------------------------------------- downloads
create table if not exists public.downloads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  title         text not null check (char_length(title) between 2 and 160),
  description   text check (char_length(description) <= 2000),
  category      text not null default 'General' check (char_length(category) <= 60),
  tier          text not null default 'free' check (tier in ('free', 'premium')),
  file_path     text not null unique,   -- object key inside the member-downloads bucket
  file_name     text not null,          -- name the browser saves it as
  file_size     bigint,
  content_type  text,
  published     boolean not null default true
);

create index if not exists downloads_tier_idx on public.downloads (tier, created_at desc);

alter table public.downloads enable row level security;
revoke all on public.downloads from anon, authenticated;
grant select on public.downloads to authenticated;

drop policy if exists "Members can list published downloads" on public.downloads;
create policy "Members can list published downloads" on public.downloads
  for select to authenticated using (published);

create table if not exists public.download_events (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  download_id  uuid not null references public.downloads (id) on delete cascade,
  user_id      uuid references auth.users (id) on delete set null
);

create index if not exists download_events_download_idx on public.download_events (download_id);

alter table public.download_events enable row level security;
revoke all on public.download_events from anon, authenticated;

-- Private bucket: no storage policies, so only the server (secret key) can read
-- or write objects. 50 MB per file, the Supabase free-plan ceiling.
insert into storage.buckets (id, name, public, file_size_limit)
values ('member-downloads', 'member-downloads', false, 52428800)
on conflict (id) do nothing;

-- --------------------------------------------------------------- community
create table if not exists public.community_posts (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  edited_at         timestamptz,
  author_id         uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  category          text not null check (char_length(category) <= 40),
  title             text not null check (char_length(title) between 3 and 160),
  body              text not null check (char_length(body) between 1 and 10000),
  pinned            boolean not null default false,
  locked            boolean not null default false,
  reply_count       integer not null default 0,
  last_activity_at  timestamptz not null default now()
);

create index if not exists community_posts_feed_idx on public.community_posts (pinned desc, last_activity_at desc);
create index if not exists community_posts_category_idx on public.community_posts (category, last_activity_at desc);
create index if not exists community_posts_author_idx on public.community_posts (author_id);

create table if not exists public.community_replies (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  edited_at   timestamptz,
  post_id     uuid not null references public.community_posts (id) on delete cascade,
  author_id   uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  body        text not null check (char_length(body) between 1 and 5000)
);

create index if not exists community_replies_post_idx on public.community_replies (post_id, created_at);
create index if not exists community_replies_author_idx on public.community_replies (author_id);

alter table public.community_posts enable row level security;
alter table public.community_replies enable row level security;
revoke all on public.community_posts from anon, authenticated;
revoke all on public.community_replies from anon, authenticated;
-- Column grants: members can only ever set these fields. author_id comes from
-- its auth.uid() default; pinned/locked/reply_count stay server-only.
grant select, delete on public.community_posts to authenticated;
grant insert (category, title, body), update (category, title, body) on public.community_posts to authenticated;
grant select, delete on public.community_replies to authenticated;
grant insert (post_id, body), update (body) on public.community_replies to authenticated;

drop policy if exists "Members can read posts" on public.community_posts;
create policy "Members can read posts" on public.community_posts
  for select to authenticated using (true);
drop policy if exists "Members can create posts" on public.community_posts;
create policy "Members can create posts" on public.community_posts
  for insert to authenticated with check (author_id = auth.uid());
drop policy if exists "Members can edit their own posts" on public.community_posts;
create policy "Members can edit their own posts" on public.community_posts
  for update to authenticated using (author_id = auth.uid()) with check (author_id = auth.uid());
drop policy if exists "Members can delete their own posts" on public.community_posts;
create policy "Members can delete their own posts" on public.community_posts
  for delete to authenticated using (author_id = auth.uid());

drop policy if exists "Members can read replies" on public.community_replies;
create policy "Members can read replies" on public.community_replies
  for select to authenticated using (true);
drop policy if exists "Members can reply to open posts" on public.community_replies;
create policy "Members can reply to open posts" on public.community_replies
  for insert to authenticated with check (
    author_id = auth.uid()
    and exists (select 1 from public.community_posts p where p.id = post_id and not p.locked)
  );
drop policy if exists "Members can edit their own replies" on public.community_replies;
create policy "Members can edit their own replies" on public.community_replies
  for update to authenticated using (author_id = auth.uid()) with check (author_id = auth.uid());
drop policy if exists "Members can delete their own replies" on public.community_replies;
create policy "Members can delete their own replies" on public.community_replies
  for delete to authenticated using (author_id = auth.uid());

-- Stamp edits (only real content changes, not reply-count bumps).
create or replace function public.community_stamp_edit()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if to_jsonb(new) - array['edited_at', 'reply_count', 'last_activity_at', 'pinned', 'locked']
     is distinct from to_jsonb(old) - array['edited_at', 'reply_count', 'last_activity_at', 'pinned', 'locked'] then
    new.edited_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists community_posts_stamp_edit on public.community_posts;
create trigger community_posts_stamp_edit
  before update on public.community_posts
  for each row execute function public.community_stamp_edit();

drop trigger if exists community_replies_stamp_edit on public.community_replies;
create trigger community_replies_stamp_edit
  before update on public.community_replies
  for each row execute function public.community_stamp_edit();

-- Keep reply_count and last_activity_at in step with replies. Security definer
-- because members cannot write those columns themselves.
create or replace function public.community_reply_counter()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    update public.community_posts
       set reply_count = reply_count + 1, last_activity_at = new.created_at
     where id = new.post_id;
  elsif tg_op = 'DELETE' then
    update public.community_posts
       set reply_count = greatest(reply_count - 1, 0)
     where id = old.post_id;
  end if;
  return null;
end;
$$;

drop trigger if exists community_replies_count on public.community_replies;
create trigger community_replies_count
  after insert or delete on public.community_replies
  for each row execute function public.community_reply_counter();

-- ------------------------------------------------------------ service role
-- Server code (secret key) does admin work on these tables. Newer Supabase
-- projects no longer grant table privileges to service_role by default, so be explicit.
grant all on public.profiles, public.memberships, public.downloads, public.download_events,
  public.community_posts, public.community_replies to service_role;

-- ---------------------------------------------------------------- payments
-- Premium checkouts record which member paid and how many days they bought.
-- When the row flips to paid (verify route or Zoho webhook), this trigger grants
-- Premium in the same transaction, so it happens exactly once and can't be lost
-- between "payment saved" and "member upgraded".
alter table public.payments add column if not exists user_id uuid references auth.users (id) on delete set null;
alter table public.payments add column if not exists premium_days integer check (premium_days > 0);
create index if not exists payments_user_idx on public.payments (user_id) where user_id is not null;

create or replace function public.payments_grant_premium()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status = 'paid' and old.status is distinct from 'paid'
     and new.source = 'premium-membership' and new.user_id is not null then
    perform public.grant_premium(new.user_id, coalesce(new.premium_days, 365), 'payment');
  end if;
  return new;
end;
$$;

drop trigger if exists payments_grant_premium on public.payments;
create trigger payments_grant_premium
  after update of status on public.payments
  for each row execute function public.payments_grant_premium();
