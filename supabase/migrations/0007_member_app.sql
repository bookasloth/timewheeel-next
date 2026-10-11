-- Member app (stage 2): richer profiles, download covers and ordering,
-- notifications, email preferences.
-- Run once in the Supabase SQL Editor for project nefmwittrybufjqhpxip,
-- after 0006_members.sql. Idempotent: safe to re-run.

-- ---------------------------------------------------------------- profiles
alter table public.profiles add column if not exists headline      text check (char_length(headline) <= 120);
alter table public.profiles add column if not exists business_name text check (char_length(business_name) <= 120);
alter table public.profiles add column if not exists website       text check (char_length(website) <= 200);
alter table public.profiles add column if not exists city          text check (char_length(city) <= 80);
alter table public.profiles add column if not exists bio           text check (char_length(bio) <= 1000);

-- Members may edit these on their own row (the update policy from 0006 limits rows).
grant update (full_name, headline, business_name, website, city, bio) on public.profiles to authenticated;

-- --------------------------------------------------------------- downloads
alter table public.downloads add column if not exists cover_path text;           -- object key in member-downloads (image)
alter table public.downloads add column if not exists sort_order integer not null default 0;
create index if not exists downloads_sort_idx on public.downloads (tier, sort_order, created_at desc);

-- ------------------------------------------------------------- memberships
-- Email preferences. replies: someone replied to you in the community.
-- announcements: announcements and new content from the team.
alter table public.memberships add column if not exists email_prefs jsonb not null
  default '{"replies": true, "announcements": false}'::jsonb;

-- Members choose their own preferences (only this column).
grant update (email_prefs) on public.memberships to authenticated;
drop policy if exists "Members can update their own email preferences" on public.memberships;
create policy "Members can update their own email preferences" on public.memberships
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ----------------------------------------------------------- notifications
create table if not exists public.notifications (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  type        text not null check (type in ('reply', 'announcement', 'download', 'course', 'event', 'premium', 'system')),
  title       text not null check (char_length(title) <= 200),
  body        text check (char_length(body) <= 500),
  link        text check (char_length(link) <= 300),
  actor_id    uuid references auth.users (id) on delete set null,
  read_at     timestamptz
);

create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);
create index if not exists notifications_unread_idx on public.notifications (user_id) where read_at is null;

alter table public.notifications enable row level security;
revoke all on public.notifications from anon, authenticated;
grant select, delete on public.notifications to authenticated;
grant update (read_at) on public.notifications to authenticated;
grant all on public.notifications to service_role;

drop policy if exists "Members read their own notifications" on public.notifications;
create policy "Members read their own notifications" on public.notifications
  for select to authenticated using (user_id = auth.uid());
drop policy if exists "Members mark their own notifications read" on public.notifications;
create policy "Members mark their own notifications read" on public.notifications
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "Members delete their own notifications" on public.notifications;
create policy "Members delete their own notifications" on public.notifications
  for delete to authenticated using (user_id = auth.uid());

-- A new reply notifies the post's author and everyone who replied before,
-- except the person replying.
create or replace function public.community_notify_reply()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  post record;
  who  text;
begin
  select id, title, author_id into post from public.community_posts where id = new.post_id;
  if post.id is null then return null; end if;
  select coalesce(nullif(full_name, ''), 'A member') into who from public.profiles where id = new.author_id;

  insert into public.notifications (user_id, type, title, body, link, actor_id)
  select distinct t.uid, 'reply',
         case when t.uid = post.author_id then who || ' replied to your post'
              else who || ' also replied in a thread you joined' end,
         left(post.title, 200),
         '/members/community/' || post.id || '#reply-' || new.id,
         new.author_id
  from (
    select post.author_id as uid
    union
    select r.author_id from public.community_replies r where r.post_id = new.post_id and r.id <> new.id
  ) t
  where t.uid is not null and t.uid <> new.author_id;

  return null;
end;
$$;

drop trigger if exists community_replies_notify on public.community_replies;
create trigger community_replies_notify
  after insert on public.community_replies
  for each row execute function public.community_notify_reply();

-- -------------------------------------------------------------- bookmarks
-- "Saved resources": a member's own bookmarked downloads.
create table if not exists public.download_bookmarks (
  user_id      uuid not null default auth.uid() references auth.users (id) on delete cascade,
  download_id  uuid not null references public.downloads (id) on delete cascade,
  created_at   timestamptz not null default now(),
  primary key (user_id, download_id)
);

alter table public.download_bookmarks enable row level security;
revoke all on public.download_bookmarks from anon, authenticated;
grant select, delete on public.download_bookmarks to authenticated;
grant insert (download_id) on public.download_bookmarks to authenticated;
grant all on public.download_bookmarks to service_role;

drop policy if exists "Members manage their own bookmarks" on public.download_bookmarks;
create policy "Members manage their own bookmarks" on public.download_bookmarks
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
