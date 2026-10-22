-- Job application CV uploads (2026-10-22). Run once in the Supabase SQL Editor
-- after 0001_leads.sql. Idempotent: safe to re-run.
--
-- The columns point at a file in the private `job-applications` storage bucket.
-- /api/lead writes them; the admin console turns them into a 60-second signed
-- URL. Until this migration is applied the lead still saves (the API retries
-- without the columns) and the CV still reaches the team as an email
-- attachment, but the inbox won't have a download link.

alter table public.leads add column if not exists cv_path text;
alter table public.leads add column if not exists cv_name text;

-- Private bucket: no storage policies, so only the server (secret key) can read
-- or write objects. 5 MB per file, matching lib/cv-upload.ts.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('job-applications', 'job-applications', false, 5242880,
        array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif',
              'application/pdf', 'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
