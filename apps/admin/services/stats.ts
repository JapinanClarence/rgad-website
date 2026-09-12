import { createClient } from "@gad/supabase/server";
import type { DashboardStat, DashboardStats } from "@gad/types";

function startOfMonth(date: Date): string {
  return new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
}

function startOfPreviousMonth(date: Date): string {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1).toISOString();
}

function buildCountStat(total: number, addedThisMonth: number): DashboardStat {
  return {
    value: total,
    change: addedThisMonth,
    changeType: "count",
    trend: addedThisMonth > 0 ? "up" : addedThisMonth < 0 ? "down" : "neutral",
  };
}

function buildPercentageStat(
  total: number,
  currentPeriodCount: number,
  previousPeriodCount: number,
): DashboardStat {
  let change = 0;

  if (previousPeriodCount > 0) {
    change =
      ((currentPeriodCount - previousPeriodCount) / previousPeriodCount) *
      100;
  } else if (currentPeriodCount > 0) {
    change = 100;
  }

  change = Math.round(change);

  return {
    value: total,
    change,
    changeType: "percentage",
    trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
  };
}

/**
 * Aggregates the counters shown on the admin dashboard: total issues and
 * articles (with the whole-number count added this calendar month), and
 * total article views/downloads (with the percentage change between this
 * calendar month and the previous one, based on recorded metric events).
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = createClient();
  const now = new Date();
  const monthStart = startOfMonth(now);
  const previousMonthStart = startOfPreviousMonth(now);

  const [
    issuesTotal,
    issuesThisMonth,
    articlesTotal,
    articlesThisMonth,
    metrics,
    viewsThisMonth,
    viewsPreviousMonth,
    downloadsThisMonth,
    downloadsPreviousMonth,
  ] = await Promise.all([
    supabase.from("archive").select("id", { count: "exact", head: true }),
    supabase
      .from("archive")
      .select("id", { count: "exact", head: true })
      .gte("created_at", monthStart),
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .gte("created_at", monthStart),
    supabase.from("article_metrics").select("total_views, total_downloads"),
    supabase
      .from("article_metric_events")
      .select("id", { count: "exact", head: true })
      .eq("event_type", "view")
      .gte("created_at", monthStart),
    supabase
      .from("article_metric_events")
      .select("id", { count: "exact", head: true })
      .eq("event_type", "view")
      .gte("created_at", previousMonthStart)
      .lt("created_at", monthStart),
    supabase
      .from("article_metric_events")
      .select("id", { count: "exact", head: true })
      .eq("event_type", "download")
      .gte("created_at", monthStart),
    supabase
      .from("article_metric_events")
      .select("id", { count: "exact", head: true })
      .eq("event_type", "download")
      .gte("created_at", previousMonthStart)
      .lt("created_at", monthStart),
  ]);

  const totalViews = (metrics.data ?? []).reduce(
    (sum, row) => sum + (row.total_views ?? 0),
    0,
  );
  const totalDownloads = (metrics.data ?? []).reduce(
    (sum, row) => sum + (row.total_downloads ?? 0),
    0,
  );

  return {
    totalIssues: buildCountStat(
      issuesTotal.count ?? 0,
      issuesThisMonth.count ?? 0,
    ),
    totalArticles: buildCountStat(
      articlesTotal.count ?? 0,
      articlesThisMonth.count ?? 0,
    ),
    totalViews: buildPercentageStat(
      totalViews,
      viewsThisMonth.count ?? 0,
      viewsPreviousMonth.count ?? 0,
    ),
    totalDownloads: buildPercentageStat(
      totalDownloads,
      downloadsThisMonth.count ?? 0,
      downloadsPreviousMonth.count ?? 0,
    ),
  };
}
