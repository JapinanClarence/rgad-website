import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { formatDateShort, formatYear } from "@/lib/utils";
import { Search, User } from "lucide-react";
import { getIssues } from "@/services/issue";
import { IssueQuickLinks } from "@/components/journal/issue-quick-links";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Search the full archive of the Gender Research and Policy Journal (GRPJ), published by RGAN XI.",
};

function plainText(html?: string) {
  return html
    ? html
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";
}

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const issues = await getIssues();
  const query = (searchParams.q ?? "").trim();

  const filteredIssues = query
    ? issues.filter((issue) => {
        const haystack = [
          `vol. ${issue.volume}`,
          `no. ${issue.issueNo}`,
          `volume ${issue.volume}`,
          `issue ${issue.issueNo}`,
          issue.title,
          formatYear(issue.publishedAt),
          plainText(issue.editorial),
          issue.editorialAuthor ?? "",
          issue.issn,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(query.toLowerCase());
      })
    : issues;

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
            Search the full archive of the Gender Research and Policy Journal
            — peer-reviewed studies, policy analyses, and field research
            published by RGAN XI.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 border-b border-border sticky top-16 bg-background/95 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            action="/issue/archive"
            method="get"
            className="relative max-w-xl"
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search issues by title, volume, or year..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </form>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-4 gap-10 lg:gap-14">
          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-primary font-medium text-sm uppercase tracking-widest">
                {query ? `Results for "${query}"` : "All Issues"}
              </p>
              <span className="text-sm text-muted-foreground">
                {filteredIssues.length}{" "}
                {filteredIssues.length === 1 ? "issue" : "issues"}
              </span>
            </div>

            {filteredIssues.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-8">
                {filteredIssues.map((issue) => (
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
                        {plainText(issue.editorial) || "Journal archive issue"}
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
            ) : (
              <p className="text-muted-foreground">
                No issues matched your search. Try a different volume, issue
                number, or year.
              </p>
            )}
          </div>

          {/* Quick links */}
          <aside className="lg:col-span-1">
            <IssueQuickLinks />
          </aside>
        </div>
      </section>
    </div>
  );
}
