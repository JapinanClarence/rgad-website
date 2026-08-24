import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIssueById } from "@/services/issue";
import { type Issue, IssueArticle, ArticleAuthor } from "@gad/types/issue";
import { IssueCover } from "@/components/journal/issue-cover";
import { IssueQuickLinks } from "@/components/journal/issue-quick-links";
import { CiteButton } from "@/components/journal/cite-button";
import { Button } from "@gad/ui/button";
import { Badge } from "@gad/ui/badge";
import { formatDateShort } from "@/lib/utils";
import { ArrowLeft, Calendar, Users, FileText, Hash } from "lucide-react";

interface Props {
  params: { id: string; articleId: string };
}

function plainText(html?: string) {
  return html
    ? html
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";
}

async function getArticle(issueId: string, articleId: string) {
  const result = await getIssueById(issueId);
  if (!result) return null;
  const article = result.articles.find((a) => a.id === articleId);
  if (!article) return null;
  return { issue: result.issue, article };
}

function buildCitation(issue: Issue, article: IssueArticle) {
  const year = new Date(issue.publishedAt).getFullYear();

  const authorList =
    article.authors.length > 0
      ? article.authors.map(toApaAuthorName).join(", ")
      : "RGAN XI Editorial Team";

  const pages = article.pages ? `, ${article.pages}` : "";
  const doi = article.doi ? ` https://doi.org/${article.doi}` : "";

  const citationText =
    `${authorList} (${year}). ${article.title}. ` +
    `Gender Research and Policy Journal, ${issue.volume}(${issue.issueNo})` +
    `${pages}.${doi}`;

  const citation = (
    <>
      {authorList} ({year}). {article.title}.{" "}
      <em>Gender Research and Policy Journal, {issue.volume}</em>(
      {issue.issueNo}){pages}.{doi}
    </>
  );

  return {
    citation,
    citationText,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getArticle(params.id, params.articleId);
  if (!result) return { title: "Article" };
  return {
    title: result.article.title,
    description:
      plainText(result.article.abstract) ||
      "An article from the Gender Research and Policy Journal.",
  };
}

function toApaAuthorName(author: ArticleAuthor): string {
  const initials = [author.firstname, author.middlename]
    .filter(Boolean)
    .map((name) => `${name!.charAt(0).toUpperCase()}.`)
    .join(" ");

  return `${author.lastname}, ${initials}`;
}

function toAuthorName(author: {
  firstname?: string | null;
  middlename?: string | null;
  lastname?: string | null;
}): string {
  const first = author.firstname ?? "";
  const middle = author.middlename ? ` ${author.middlename}` : "";
  const last = author.lastname ?? "";
  return `${first}${middle} ${last}`.trim();
}

export default async function ArticleDetailPage({ params }: Props) {
  const result = await getArticle(params.id, params.articleId);
  if (!result) notFound();
  const { issue, article } = result;
  const citation = buildCitation(issue, article);

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={`/issue/${issue.id}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Issue
        </Link>

        <div className="grid lg:grid-cols-4 gap-10 lg:gap-14">
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-[220px_1fr] gap-10">
              {/* Cover + actions */}
              <div className="max-w-[220px] mx-auto md:mx-0 w-full">
                <IssueCover
                  volume={issue.volume}
                  issueNo={issue.issueNo}
                  coverImage={issue.coverImage}
                  className="mb-4"
                  priority
                />
                <div className="space-y-2">
                  {article.pdfUrl && (
                    <Button variant="gad" size="sm" asChild className="w-full">
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
                  <CiteButton
                    citation={citation.citation}
                    citationText={citation.citationText}
                  />
                </div>
              </div>

              {/* Title / metadata */}
              <div className="flex flex-col justify-center">
                <h1 className="font-display text-2xl lg:text-3xl font-bold mb-4 leading-snug">
                  {article.title}
                </h1>

                {article.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {article.keywords.map((keyword) => (
                      <Badge key={keyword} variant="category">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {article.authors.length > 0
                      ? article.authors.map(toAuthorName).join(", ")
                      : "RGAN XI Editorial Team"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Published {formatDateShort(issue.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    DOI:{" "}
                    <a
                      href={`https://doi.org/${article.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-primary transition-colors"
                    >
                      https://doi.org/{article.doi}
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Abstract */}
            <div className="mt-14 pt-12 border-t border-border">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
                Abstract
              </p>
              {article.abstract ? (
                <p className="text-foreground/85 leading-relaxed">
                  {article.abstract}
                </p>
              ) : (
                <p className="text-muted-foreground">
                  No abstract has been provided for this article.
                </p>
              )}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <IssueQuickLinks />
          </aside>
        </div>
      </div>
    </div>
  );
}
