import React from "react";
import Link from "next/link";
import { Button } from "@gad/ui/button";
import { ArrowRight, Calendar, Hash } from "lucide-react";
import { formatDateShort, formatYear } from "@/lib/utils";
import { IssueCover } from "@/components/journal/issue-cover";
import type { Issue } from "@gad/types/issue";
import { DoiLink } from "../journal/doi-link";

interface FeaturedArticlesSectionProps {
  issues?: Issue[];
  currentIssue?: Issue;
}

export function FeaturedArticlesSection({
  issues,
  currentIssue,
}: FeaturedArticlesSectionProps) {
  const otherIssues = issues
    .filter((issue) => issue.id !== currentIssue.id)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 2);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Gender Research and Policy Journal
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold">
              Featured Issues
            </h2>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/issue/archive">
              View All Issues <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* currentIssue featured issue */}
          <Link
            href={`/issue/${currentIssue.id}`}
            className="lg:col-span-3 group grid sm:grid-cols-[minmax(180px,220px)_minmax(0,1fr)] bg-white rounded-3xl border border-border hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <IssueCover
              volume={currentIssue.volume}
              issueNo={currentIssue.issueNo}
              coverImage={currentIssue.coverImage}
              priority
              className="rounded-none shadow-none ring-0 sm:aspect-auto sm:min-h-[300px] sm:h-full"
            />
            <div className="flex max-w-xl px-5 flex-col justify-center justify-self-center py-8 sm:py-10">
              {currentIssue.isCurrent && (
                <span className="inline-flex w-fit items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">
                  Current Issue
                </span>
              )}
              <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                Vol. {currentIssue.volume} No. {currentIssue.issueNo} (
                {formatYear(currentIssue.publishedAt)}) Gender Research and
                Policy Journal
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDateShort(currentIssue.publishedAt)}
                </span>
                {currentIssue.doi && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    DOI: <DoiLink doi={currentIssue.doi} />
                  </span>
                )}
              </div>
            </div>
          </Link>

          {/* Previous issues */}
          <div className="lg:col-span-2 space-y-6">
            {otherIssues.map((issue) => (
              <Link
                key={issue.id}
                href={`/issue/${issue.id}`}
                className="group grid  bg-white rounded-2xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="flex min-w-0 flex-col justify-center p-5">
                  <span className="text-xs text-muted-foreground mb-1">
                    {formatDateShort(issue.publishedAt)}
                  </span>
                  <h3 className="font-display font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors">
                    Vol. {issue.volume} No. {issue.issueNo} (
                    {formatYear(issue.publishedAt)}) Gender Research and Policy
                    Journal
                  </h3>

                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    DOI: <DoiLink doi={currentIssue.doi} />
                  </span>
                </div>
              </Link>
            ))}

            <Button variant="outline" asChild className="w-full">
              <Link href="/issue/archive">
                All Journal Issues <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
