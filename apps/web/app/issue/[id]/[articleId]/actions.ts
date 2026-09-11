"use server";

import { recordArticleDownload } from "@/services/article-metrics";

/**
 * Records a download event for an article. Called from the client-side
 * "Download PDF" button on click. Swallows errors so a metrics hiccup
 * never blocks or surfaces to a visitor trying to download the PDF.
 */
export async function recordArticleDownloadAction(
  articleId: string,
): Promise<void> {
  try {
    await recordArticleDownload(articleId);
  } catch {
    // Best-effort only; ignore failures.
  }
}
