-- Creates the "officers" table used to list RGAN XI's officers, including
-- founding and current board members, on the public website.
-- Run this against the Supabase project's Postgres database (SQL editor or
-- `supabase db push`, depending on how this project manages migrations).

create table if not exists public.officers (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  firstname text not null,
  middlename text null,
  lastname text not null,
  position text not null,
  school text not null,
  extension text null,
  profile text null,
  is_officer boolean not null default false,
  is_founding_officer boolean not null default false,
  is_current boolean not null default false,
  display_order smallint not null,
  constraint officers_pkey primary key (id)
) tablespace pg_default;

comment on table public.officers is
  'RGAN XI officers, including founding and current board members, featured on the public website.';

alter table public.officers enable row level security;

-- Public read access, matching the existing "experts" table policy.
create policy if not exists "Officers are viewable by everyone"
  on public.officers
  for select
  using (true);
