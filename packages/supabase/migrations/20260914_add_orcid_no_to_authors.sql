-- Adds an ORCID iD column to the authors table so article authors created
-- from the admin dashboard can be linked to their ORCID profile.
-- Run this against the Supabase project's Postgres database (SQL editor or
-- `supabase db push`, depending on how this project manages migrations).

alter table public.authors
  add column if not exists orcid_no text;

comment on column public.authors.orcid_no is
  'ORCID iD of the author, formatted as 0000-0000-0000-000X.';
