# sync-citations

Fetches each article's citation count from CrossRef and caches it in
`article_metrics.citation_count`. Meant to run on a schedule, not to be
called by the website.

## One-time setup

Run these from the repo root, authenticated as yourself (not shared here,
run them on your own machine):

```bash
supabase login
supabase link --project-ref <your-project-ref>

supabase db push
# applies supabase/migrations/20260923105122_add_article_citation_count.sql

supabase secrets set CROSSREF_MAILTO=journal.grp@gmail.com
supabase secrets set SITE_URL=https://www.rganxi.org

supabase functions deploy sync-citations
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically
into every Edge Function by Supabase, no need to set them.

## Manual test before scheduling

```bash
curl -i --location --request POST \
  'https://<your-project-ref>.supabase.co/functions/v1/sync-citations' \
  --header "Authorization: Bearer <your-service-role-key>"
```

Check the JSON response's `synced` / `notFound` / `failed` counts, then
confirm `article_metrics.citation_count` updated in the Table Editor for
an article you know has a valid DOI.

## Schedule it with Supabase Cron

Run once in the SQL Editor (Database > SQL Editor):

```sql
create extension if not exists pg_cron;
create extension if not exists pg_net;

select vault.create_secret('https://<your-project-ref>.supabase.co', 'project_url');
select vault.create_secret('<your-service-role-key>', 'service_role_key');

select cron.schedule(
  'sync-crossref-citations',
  '0 3 * * *', -- daily at 3am UTC
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'project_url') || '/functions/v1/sync-citations',
    headers := jsonb_build_object(
      'Content-type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key')
    )
  ) as request_id;
  $$
);
```

## Monitoring

```sql
select * from cron.job_run_details
where jobid = (select jobid from cron.job where jobname = 'sync-crossref-citations')
order by start_time desc
limit 20;
```

Edge Function invocation logs (including console output and errors) are
under Edge Functions > sync-citations > Logs in the dashboard.
