import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IssueCover } from "@/components/journal/issue-cover";
import { getIssueById } from "@/services/issue";
import { ArrowLeft, Calendar, Hash, FileText, Users } from "lucide-react";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getIssueById(params.id);
  if (!result) return { title: "Issue" };
  const { issue } = result;
  return {
    title: `Vol. ${issue.volume}, Issue ${issue.issueNo}`,
    description: issue.editorial
      ? issue.editorial
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
      : "An issue of the Gender Research and Policy Journal.",
  };
}

export default async function IssueDetailPage({ params }: Props) {
  const result = await getIssueById(params.id);
  if (!result) notFound();
  const { issue, articles } = result;

  return (
    <div className="pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/issue"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Issues
        </Link>

        {/* Issue header */}
        <div className="grid md:grid-cols-[220px_1fr] gap-10 mb-16">
          <IssueCover
            volume={issue.volume}
            issueNo={issue.issueNo}
            theme={
              issue.editorial
                ? issue.editorial
                    .replace(/<[^>]+>/g, " ")
                    .replace(/\s+/g, " ")
                    .trim()
                : null
            }
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
              Vol. {issue.volume}, Issue {issue.issueNo}
            </h1>
            {issue.editorial && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {issue.editorial
                  .replace(/<[^>]+>/g, " ")
                  .replace(/\s+/g, " ")
                  .trim()
                  .slice(0, 180)}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Published {formatDate(issue.publishedAt)}
              </span>
              {/* {issue.doi && (
                <span className="flex items-center gap-1.5">
                  <Hash className="h-4 w-4" />
                  DOI: {issue.doi}
                </span>
              )} */}
              <span className="flex items-center gap-1.5">
                <Hash className="h-4 w-4" />
                ISSN: {issue.issn}
              </span>
            </div>
          </div>
        </div>

        {/* Editorial */}
        {issue.editorial && (
          <div className="mb-16 pb-16 border-b border-border">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Editorial
            </p>
            <div
              className="article-prose text-foreground/85 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: issue.editorial }}
            />
            {issue.editorialAuthor && (
              <p className="mt-6 text-sm font-medium text-foreground/70">
                — {issue.editorialAuthor} - Editor-in-Chief
              </p>
            )}
          </div>
        )}

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
                      {article.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 shrink-0" />
                        {article.authors}
                      </span>
                      {article.pages && <span>pp. {article.pages}</span>}
                    </div>
                  </div>
                  {article.pdfUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-fit shrink-0"
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
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Articles for this issue will be posted as they clear production.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
