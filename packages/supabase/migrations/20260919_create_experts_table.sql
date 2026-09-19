-- Creates the "experts" table used by the public website's About page to
-- list RGAN XI's gender and development experts and resource persons.
-- Run this against the Supabase project's Postgres database (SQL editor or
-- `supabase db push`, depending on how this project manages migrations).

create table if not exists public.experts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  firstname text not null,
  middlename text,
  lastname text not null,
  email text not null,
  school text not null,
  expertise text not null
);

comment on table public.experts is
  'GAD experts and resource persons featured on the public About page.';

alter table public.experts enable row level security;

-- Public read access, matching the existing "reviewers" table policy.
-- Review against the project's actual reviewers policy before applying,
-- since this repository does not contain the reviewers table's own
-- creation migration.
create policy if not exists "Experts are viewable by everyone"
  on public.experts
  for select
  using (true);
