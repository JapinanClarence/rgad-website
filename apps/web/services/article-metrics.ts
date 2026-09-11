import { createClient } from "@gad/supabase/server";
import type { Database } from "@gad/supabase/types";
import type { ArticleMetrics } from "@gad/types/article-metrics";

/**
 * Reads the current view/download counters for an article. Returns null if
 * no metrics row exists yet for the given article id (it should exist for
 * every article via the `on_article_created` trigger, but callers should
 * still handle the empty case, e.g. an article created before this feature
 * shipped and not yet backfilled).
 */
export async function getArticleMetrics(
  articleId: string,
): Promise<ArticleMetrics | null> {
  const { data, error } = await createClient()
    .from("article_metrics")
    .select("*")
    .eq("article_id", articleId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const row =
    data as Database["public"]["Tables"]["article_metrics"]["Row"];

  return {
    articleId: row.article_id,
    totalViews: row.total_views,
    totalDownloads: row.total_downloads,
    updatedAt: row.updated_at,
  };
}

/**
 * Records a view event for an article via the `record_article_view` RPC,
 * which handles the dedup window and counter increment on the database
 * side. `visitorHash` is optional; pass a hashed identifier (e.g. IP +
 * user agent) to dedupe repeat views from the same visitor.
 */
export async function recordArticleView(
  articleId: string,
  visitorHash?: string,
): Promise<void> {
  const { error } = await createClient().rpc("record_article_view", {
    p_article_id: articleId,
    p_visitor_hash: visitorHash ?? null,
  });

  if (error) throw error;
}

/**
 * Records a download event for an article via the `record_article_download`
 * RPC. Intended to be called from a Server Action triggered by the
 * "View PDF" action on the client, since download intent happens on a
 * client interaction rather than page render.
 */
export async function recordArticleDownload(
  articleId: string,
  visitorHash?: string,
): Promise<void> {
  const { error } = await createClient().rpc("record_article_download", {
    p_article_id: articleId,
    p_visitor_hash: visitorHash ?? null,
  });

  if (error) throw error;
}
