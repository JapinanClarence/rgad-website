import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { IssueCover } from "@/components/journal/issue-cover";
import { Calendar, Hash, ArrowRight } from "lucide-react";
import type { Database } from "@gad/supabase/types";

export const metadata: Metadata = {
  title: "Issues",
  description:
    "Browse the current issue and full archive of the Gender Research and Policy Journal (GRPJ), published by RGAN XI.",
};

type Issue = Database["public"]["Tables"]["issues"]["Row"];

const TABS = [
  { key: "current", label: "Current Issue" },
  { key: "all", label: "All Articles/Issues" },
] as const;

// Fallback sample issues if Supabase returns empty — mirrors the structure
// used elsewhere on the site (see /articles, /summit) for local/dev preview.
const SAMPLE_ISSUES: Issue[] = [
  {
    id: "v2i1",
    volume: 2,
    issue_no: 1,
    title: "Volume 2, Issue 1",
    theme: "Beyond Gender Mainstreaming: New Frontiers in Policy and Practice",
    doi: "10.63346/RGANXI.2025.0201",
    cover_image: null,
    editorial: null,
    editorial_author: null,
    pdf_url: null,
    is_current: true,
    published_at: "2025-06-15",
    created_at: "2025-06-15",
  },
  {
    id: "v1i2",
    volume: 1,
    issue_no: 2,
    title: "Volume 1, Issue 2",
    theme: "Institutionalizing GAD: Governance, Research, and Practice",
    doi: "10.63346/RGANXI.2024.0102",
    cover_image: null,
    editorial: null,
    editorial_author: null,
    pdf_url: null,
    is_current: false,
    published_at: "2024-12-10",
    created_at: "2024-12-10",
  },
  {
    id: "v1i1",
    volume: 1,
    issue_no: 1,
    title: "Volume 1, Issue 1",
    theme: "Foundations of Gender and Development Scholarship in Region XI",
    doi: "10.63346/RGANXI.2024.0101",
    cover_image: null,
    editorial: null,
    editorial_author: null,
    pdf_url: null,
    is_current: false,
    published_at: "2024-06-05",
    created_at: "2024-06-05",
  },
];

async function getIssues(): Promise<Issue[]> {
  const supabase = createClient();
  try {
    const { data } = await supabase
      .from("issues")
      .select("*")
      .order("volume", { ascending: false })
      .order("issue_no", { ascending: false });

    if (data && data.length > 0) return data as Issue[];
  } catch {}
  return SAMPLE_ISSUES;
}

export default async function IssuesPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const issues = await getIssues();
  const currentIssue = issues.find((i) => i.is_current) ?? issues[0];
  const activeTab = searchParams.tab === "all" ? "all" : "current";

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
            Knowledge Base
          </p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4">
            Archive
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Browse the current issue or explore the full archive of the Gender
            Research and Policy Journal — peer-reviewed studies, policy
            analyses, and field research published by RGAN XI.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-10 border-b border-border sticky top-16 bg-background/95 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <Link
              key={tab.key}
              href={tab.key === "current" ? "/issue" : `/issue?tab=${tab.key}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </section>

      {activeTab === "current" ? (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {currentIssue ? (
              <Link
                href={`/issue/${currentIssue.id}`}
                className="group grid md:grid-cols-[280px_1fr] gap-10 bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <IssueCover
                  volume={currentIssue.volume}
                  issueNo={currentIssue.issue_no}
                  theme={currentIssue.theme}
                  coverImage={currentIssue.cover_image}
                  className="max-w-xs mx-auto md:mx-0"
                  priority
                />
                <div className="flex flex-col justify-center">
                  <span className="inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                    Current Issue
                  </span>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold mb-2">
                    Vol. {currentIssue.volume}, Issue {currentIssue.issue_no}
                  </h2>
                  {currentIssue.theme && (
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {currentIssue.theme}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-8">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      Published{" "}
                      {formatDate(
                        currentIssue.published_at ?? currentIssue.created_at,
                      )}
                    </span>
                    {currentIssue.doi && (
                      <span className="flex items-center gap-1.5">
                        <Hash className="h-4 w-4" />
                        DOI: {currentIssue.doi}
                      </span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all w-fit">
                    Read this issue
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ) : (
              <p className="text-muted-foreground">
                No current issue has been published yet.
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {issues.map((issue) => (
                <Link
                  key={issue.id}
                  href={`/issue/${issue.id}`}
                  className="group bg-white rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden p-5"
                >
                  <IssueCover
                    volume={issue.volume}
                    issueNo={issue.issue_no}
                    theme={issue.theme}
                    coverImage={issue.cover_image}
                    className="mb-5"
                  />
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-display font-bold text-base group-hover:text-primary transition-colors">
                      Vol. {issue.volume}, Issue {issue.issue_no}
                    </h3>
                    {issue.is_current && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(issue.published_at ?? issue.created_at)}
                  </p>
                  {issue.doi && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Hash className="h-3.5 w-3.5" />
                      DOI: {issue.doi}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
