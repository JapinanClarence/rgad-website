export type DashboardStatTrend = "up" | "down" | "neutral";

export type DashboardStat = {
  value: number;
  change: number;
  changeType: "count" | "percentage";
  trend: DashboardStatTrend;
};

export type DashboardStats = {
  totalIssues: DashboardStat;
  totalArticles: DashboardStat;
  totalViews: DashboardStat;
  totalDownloads: DashboardStat;
};
