// Supabase Edge Function: sync-citations
//
// Loops through every article with a DOI, asks CrossRef for its current
// citation count ("is-referenced-by-count"), and writes the result into
// article_metrics.citation_count / citation_synced_at.
//
// Intended to be triggered on a schedule via Supabase Cron (pg_cron +
// pg_net), not called from the website. See supabase/functions/
// sync-citations/README.md for deployment and scheduling steps.

import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CROSSREF_MAILTO =
  Deno.env.get("CROSSREF_MAILTO") ?? "journal.grp@gmail.com";
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://www.rganxi.org";

// Be a polite CrossRef API citizen: identify the app and give them a
// contact email. This puts requests in CrossRef's "polite pool", which
// gets better rate limits and more reliable responses.
const USER_AGENT = `RGAN-XI-Journal/1.0 (${SITE_URL}; mailto:${CROSSREF_MAILTO})`;

// Small delay between requests so a large article batch does not hammer
// CrossRef in a tight loop.
const REQUEST_DELAY_MS = 150;

type ArticleRow = { id: string; doi: string | null };

type SyncResult = {
  articleId: string;
  doi: string;
  status: "synced" | "not_found" | "error";
  citationCount?: number;
  message?: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchCitationCount(doi: string): Promise<number | null> {
  const response = await fetch(
    `https://api.crossref.org/works/${doi}`,
    { headers: { "User-Agent": USER_AGENT } },
  );

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`CrossRef responded ${response.status}`);
  }

  const body = await response.json();
  const count = body?.message?.["is-referenced-by-count"];
  return typeof count === "number" ? count : 0;
}

Deno.serve(async (req) => {
  // Only accept POST, matching how pg_net / the manual curl test call it.
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const { data: articles, error: articlesError } = await supabase
    .from("articles")
    .select("id, doi")
    .not("doi", "is", null)
    .neq("doi", "");

  if (articlesError) {
    return new Response(
      JSON.stringify({ error: articlesError.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const results: SyncResult[] = [];

  for (const article of (articles ?? []) as ArticleRow[]) {
    const doi = article.doi?.trim();
    if (!doi) continue;

    try {
      const citationCount = await fetchCitationCount(doi);

      if (citationCount === null) {
        results.push({
          articleId: article.id,
          doi,
          status: "not_found",
          message: "DOI not found in CrossRef",
        });
      } else {
        const { error: updateError } = await supabase
          .from("article_metrics")
          .update({
            citation_count: citationCount,
            citation_synced_at: new Date().toISOString(),
          })
          .eq("article_id", article.id);

        if (updateError) throw updateError;

        results.push({
          articleId: article.id,
          doi,
          status: "synced",
          citationCount,
        });
      }
    } catch (err) {
      results.push({
        articleId: article.id,
        doi,
        status: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    }

    await sleep(REQUEST_DELAY_MS);
  }

  const summary = {
    total: results.length,
    synced: results.filter((r) => r.status === "synced").length,
    notFound: results.filter((r) => r.status === "not_found").length,
    failed: results.filter((r) => r.status === "error").length,
    results,
  };

  return new Response(JSON.stringify(summary), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
