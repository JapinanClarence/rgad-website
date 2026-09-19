-- Existing officer records are retained; only the obsolete manual ordering
-- column is removed. Officer ordering is now derived from position in code.
alter table public.officers
  drop column if exists display_order;
