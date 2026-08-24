import React from "react";
import Link from "next/link";
import { Button } from "@gad/ui/button";
import { IssueCover } from "@/components/journal/issue-cover";
import { formatDateShort, formatYear } from "@/lib/utils";
import { Calendar, Hash, FileText, Users } from "lucide-react";
import type { Issue, IssueArticle } from "@gad/types/issue";

function plainText(html?: string) {
  return html
    ? html
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";
}

interface IssueContentProps {
  issue: Issue;
  articles: IssueArticle[];
}

export function IssueContent({ issue, articles }: IssueContentProps) {
  return (
    <div>
      {/* Issue header */}
      <div className="grid md:grid-cols-[220px_1fr] gap-10 mb-16">
        <IssueCover
          volume={issue.volume}
          issueNo={issue.issueNo}
          coverImage={issue.coverImage}
          className="max-w-[220px] mx-auto md:mx-0"
          priority
        />
        <div className="flex flex-col justify-center">
          {issue.isCurrent && (
            <span className="inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
              Current Issue
            </span>
          )}
          <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">
            Vol. {issue.volume} No. {issue.issueNo} (
            {formatYear(issue.publishedAt)}) Gender Research and Policy Journal
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Published {formatDateShort(issue.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              DOI:{" "}
              <a
                href={`https://doi.org/${issue.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                https://doi.org/{issue.doi}
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Table of contents */}
      <div>
        <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
          In This Issue
        </p>
        <h2 className="font-display text-2xl font-bold mb-8">Articles</h2>

        {articles.length > 0 ? (
          <div className="divide-y divide-border border-y border-border">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6"
              >
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-lg leading-snug mb-1.5">
                    <Link
                      href={`/issue/${issue.id}/${article.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 shrink-0" />
                      {article.authors.join(", ")}
                    </span>
                    {article.pages && <span>pp. {article.pages}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {/* <Button variant="outline" size="sm" asChild className="w-fit">
                    <Link href={`/issue/${issue.id}/${article.id}`}>
                      View Article
                    </Link>
                  </Button> */}
                  {article.pdfUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-fit"
                    >
                      <a
                        href={article.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View PDF
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Articles for this issue will be posted as they clear production.
          </p>
        )}
      </div>
    </div>
  );
}
