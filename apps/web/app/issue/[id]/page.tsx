import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIssueById } from "@/services/issue";
import { IssueContent } from "@/components/journal/issue-content";
import { IssueQuickLinks } from "@/components/journal/issue-quick-links";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getIssueById(params.id);
  if (!result) return { title: "Issue" };
  const { issue } = result;
  return {
    title: `Vol. ${issue.volume}, Issue ${issue.issueNo}`,
  };
}

export default async function IssueDetailPage({ params }: Props) {
  const result = await getIssueById(params.id);
  if (!result) notFound();
  const { issue, articles } = result;

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/issue/archive"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Archive
        </Link>

        <div className="grid lg:grid-cols-4 gap-10 lg:gap-14">
          <div className="lg:col-span-3">
            <IssueContent issue={issue} articles={articles} />
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-40">
              <IssueQuickLinks />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
