export type ArticleMetrics = {
  articleId: string;
  totalViews: number;
  totalDownloads: number;
  citationCount: number;
  citationSyncedAt: string | null;
  updatedAt: string;
};
