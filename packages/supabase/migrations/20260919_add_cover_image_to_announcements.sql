-- Adds a cover image column to the announcements table so announcements
-- can display a hero/cover photo on the public web app, matching the
-- existing archive.cover_image pattern used for journal issue covers.
-- Run this against the Supabase project's Postgres database (SQL editor or
-- `supabase db push`, depending on how this project manages migrations).

alter table public.announcements
  add column if not exists cover_image text;

comment on column public.announcements.cover_image is
  'Public URL of the announcement cover image, stored in the "images" storage bucket.';
