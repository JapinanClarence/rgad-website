import React from "react";
import { createClient } from "@gad/supabase/server";
import { formatDate, formatCompactNumber } from "@/lib/utils";
import {
  BookMarked,
  FileText,
  Eye,
  Download,
  PlusCircle,
  ArrowRight,
  Users,
  BadgeCheck,
  FilePlus,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getDashboardStats } from "@/services/stats";
import { listIssues } from "@/services/issue";
import type { DashboardStats } from "@gad/types";

export const metadata: Metadata = { title: "Dashboard" };

const SAMPLE_DASHBOARD_STATS: DashboardStats = {
  totalIssues: { value: 12, change: 1, changeType: "count", trend: "up" },
  totalArticles: { value: 47, change: 3, changeType: "count", trend: "up" },
  totalViews: {
    value: 8400,
    change: 22,
    changeType: "percentage",
    trend: "up",
  },
  totalDownloads: {
    value: 3150,
    change: -5,
    changeType: "percentage",
    trend: "down",
  },
};

function formatChange(stat: DashboardStats[keyof DashboardStats]) {
  const sign = stat.change > 0 ? "+" : "";
  const suffix = stat.changeType === "percentage" ? "%" : "";
  return `${sign}${stat.change}${suffix} this month`;
}

function buildStatCards(stats: DashboardStats) {
  return [
    {
      label: "Total Issues",
      value: formatCompactNumber(stats.totalIssues.value),
      icon: BookMarked,
      change: formatChange(stats.totalIssues),
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Total Articles",
      value: formatCompactNumber(stats.totalArticles.value),
      icon: FileText,
      change: formatChange(stats.totalArticles),
      color: "text-purple-600 bg-purple-100",
    },
    {
      label: "Total Article Views",
      value: formatCompactNumber(stats.totalViews.value),
      icon: Eye,
      change: formatChange(stats.totalViews),
      color: "text-rose-600 bg-rose-100",
    },
    {
      label: "Total Article Downloads",
      value: formatCompactNumber(stats.totalDownloads.value),
      icon: Download,
      change: formatChange(stats.totalDownloads),
      color: "text-green-600 bg-green-100",
    },
  ];
}

const SAMPLE_LATEST_ISSUES = [
  {
    id: "1",
    volume: 4,
    issueNo: 1,
    issn: "2782-9316",
    publishedAt: "2024-05-15",
    isCurrent: true,
  },
  {
    id: "2",
    volume: 3,
    issueNo: 2,
    issn: "2782-9316",
    publishedAt: "2024-01-20",
    isCurrent: false,
  },
  {
    id: "3",
    volume: 3,
    issueNo: 1,
    issn: "2782-9316",
    publishedAt: "2023-07-10",
    isCurrent: false,
  },
  {
    id: "4",
    volume: 2,
    issueNo: 2,
    issn: "2782-9316",
    publishedAt: "2023-01-18",
    isCurrent: false,
  },
  {
    id: "5",
    volume: 2,
    issueNo: 1,
    issn: "2782-9316",
    publishedAt: "2022-07-05",
    isCurrent: false,
  },
];

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let issues = SAMPLE_LATEST_ISSUES as Array<{
    id: string;
    volume: number;
    issueNo: number;
    issn: string;
    publishedAt: string;
    isCurrent: boolean;
  }>;
  try {
    const result = await listIssues({ page: 1, pageSize: 5 });
    if (result.success && result.data.items.length > 0)
      issues = result.data.items;
  } catch {}

  let dashboardStats = SAMPLE_DASHBOARD_STATS;
  try {
    dashboardStats = await getDashboardStats();
  } catch {}

  const statCards = buildStatCards(dashboardStats);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome back, {user?.email?.split("@")[0] ?? "Admin"}
          </p>
        </div>
        <Link
          href="/issues/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gad-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          New Issue
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="font-display text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm font-medium text-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Latest Issues */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display font-bold text-lg">Latest Issues</h2>
            <Link
              href="/issues"
              className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-sm font-medium truncate">
                    Vol. {issue.volume}, Issue {issue.issueNo}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      ISSN {issue.issn}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(issue.publishedAt)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {issue.isCurrent ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <BadgeCheck className="h-3 w-3" />
                      Current
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      Archived
                    </span>
                  )}
                  <Link
                    href={`/issues/${issue.id}`}
                    className="text-xs text-primary hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <h2 className="font-display font-bold text-lg mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {[
                {
                  label: "Write New Article",
                  href: "/articles/new",
                  icon: FilePlus,
                  color: "text-purple-600",
                },
                {
                  label: "Create Announcement",
                  href: "/announcements/new",
                  icon: PlusCircle,
                  color: "text-blue-600",
                },
                {
                  label: "View All Articles",
                  href: "/articles",
                  icon: FileText,
                  color: "text-green-600",
                },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors group"
                >
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                  <span className="text-sm font-medium">{action.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden gad-gradient p-6 text-white">
            <h3 className="font-display font-bold text-lg mb-2">
              Tip of the Day
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Use descriptive slugs and well-structured excerpts to improve SEO
              and reader engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
