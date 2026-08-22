import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, formatDateShort, formatYear } from "@/lib/utils";
import { IssueCover } from "@/components/journal/issue-cover";
import { Calendar, Hash, ArrowRight, User } from "lucide-react";
import { getIssues } from "@/services/issue";

export const metadata: Metadata = {
  title: "Issues",
  description:
    "Browse the current issue and full archive of the Gender Research and Policy Journal (GRPJ), published by RGAN XI.",
};

const TABS = [
  { key: "current", label: "Current Issue" },
  { key: "all", label: "Archives" },
] as const;

export default async function IssuesPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const issues = await getIssues();
  const currentIssue = issues.find((i) => i.isCurrent) ?? issues[0];
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
                className="group grid md:grid-cols-[280px_1fr] gap-10 bg-white rounded-3xl border border-border  shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <IssueCover
                  volume={currentIssue.volume}
                  issueNo={currentIssue.issueNo}
                  theme={
                    currentIssue.editorial
                      ? currentIssue.editorial
                          .replace(/<[^>]+>/g, " ")
                          .replace(/\s+/g, " ")
                          .trim()
                      : null
                  }
                  coverImage={currentIssue.coverImage}
                  className="max-w-xs mx-auto md:mx-0 rounded-none"
                  priority
                />
                <div className="flex flex-col justify-center px-6 pb-6 md:px-0 md:pb-0 md:pr-6">
                  <span className="inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                    Current Issue
                  </span>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold mb-2 leading-snug">
                    Vol. {currentIssue.volume}, No. {currentIssue.issueNo} (
                    {formatYear(currentIssue.date)}) Gender Research and Policy
                    Journal
                  </h2>
                  {currentIssue.editorial && (
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {currentIssue.editorial
                        .replace(/<[^>]+>/g, " ")
                        .replace(/\s+/g, " ")
                        .trim()
                        .slice(0, 180)}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-8">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      Published {formatDate(currentIssue.publishedAt)}
                    </span>
                    {/* {currentIssue.doi && (
                      <span className="flex items-center gap-1.5">
                        <Hash className="h-4 w-4" />
                        DOI: {currentIssue.doi}
                      </span>
                    )} */}
                    <span className="flex items-center gap-1.5">
                      <Hash className="h-4 w-4" />
                      ISSN: {currentIssue.issn}
                    </span>
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
                  className="group bg-white rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div
                    className="h-3 w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, hsl(270,72%,40%), hsl(338,85%,50%))",
                      opacity: 0.7,
                    }}
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      {issue.isCurrent && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">
                          Current
                        </span>
                      )}

                      <span className="text-xs text-muted-foreground">
                        {formatDateShort(issue.publishedAt)}
                      </span>
                    </div>
                    <h2 className="font-display font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-3">
                      Vol. {issue.volume}, No. {issue.issueNo} (
                      {formatYear(issue.publishedAt)}) Gender Research and
                      Policy Journal
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {issue.editorial
                        ? issue.editorial
                            .replace(/<[^>]+>/g, " ")
                            .replace(/\s+/g, " ")
                            .trim()
                        : "Journal archive issue"}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <User className="h-3.5 w-3.5" />
                      <span>
                        {issue.editorialAuthor ?? "RGAN XI Editorial Team"} -
                        Editor-in-Chief
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
