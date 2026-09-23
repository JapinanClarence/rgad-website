-- Add CrossRef citation tracking to article_metrics.
-- citation_count holds the cached "is-referenced-by-count" value from
-- CrossRef. citation_synced_at records when it was last refreshed so the
-- sync-citations Edge Function can skip recently-synced rows if needed.

alter table public.article_metrics
  add column if not exists citation_count integer not null default 0,
  add column if not exists citation_synced_at timestamptz;
