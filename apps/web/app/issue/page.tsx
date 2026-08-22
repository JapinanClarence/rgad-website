import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getIssues, getIssueById } from "@/services/issue";
import { IssueContent } from "@/components/journal/issue-content";
import { IssueQuickLinks } from "@/components/journal/issue-quick-links";

export const metadata: Metadata = {
  title: "Current Issue",
  description:
    "Read the current issue of the Gender Research and Policy Journal (GRPJ), published by RGAN XI.",
};

export default async function CurrentIssuePage() {
  const issues = await getIssues();
  const currentIssueSummary = issues.find((i) => i.isCurrent) ?? issues[0];

  if (!currentIssueSummary) {
    return (
      <div className="pt-20">
        <section className="py-16 hero-pattern">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Knowledge Base
            </p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4">
              Current Issue
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              No current issue has been published yet. Please check back
              soon.
            </p>
          </div>
        </section>
      </div>
    );
  }

  const result = await getIssueById(currentIssueSummary.id);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
            Knowledge Base
          </p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4">
            Current Issue
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            The latest issue of the Gender Research and Policy Journal —
            peer-reviewed studies, policy analyses, and field research
            published by RGAN XI.
          </p>
          <Link
            href="/issue/archive"
            className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary hover:gap-3 transition-all"
          >
            Browse past issues in the Archive
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-4 gap-10 lg:gap-14">
          <div className="lg:col-span-3">
            {result ? (
              <IssueContent issue={result.issue} articles={result.articles} />
            ) : (
              <p className="text-muted-foreground">
                We couldn&apos;t load the current issue right now. Please try
                again shortly.
              </p>
            )}
          </div>

          <aside className="lg:col-span-1">
            <IssueQuickLinks />
          </aside>
        </div>
      </section>
    </div>
  );
}
