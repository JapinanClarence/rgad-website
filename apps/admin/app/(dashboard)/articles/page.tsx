import React from "react";
import Link from "next/link";
import { createClient } from "@gad/supabase/server";
import {
  PlusCircle,
  Search,
  Edit,
  FileText,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import { PaginationNav } from "@/components/pagination-nav";
import { DeleteDialog } from "@/components/delete-dialog";
import { deleteArticleAction } from "./actions";

export const metadata: Metadata = { title: "Articles" };

const PAGE_SIZE = 6;

type ArticleAuthor = {
  firstname: string;
  middlename: string | null;
  lastname: string;
};

type ArticleRow = {
  id: string;
  title: string;
  abstract: string;
  pages: string;
  pdf_url: string | null;
  archive_id: string;
  archive: { volume_no: number; issue_no: number } | null;
  authors: ArticleAuthor[];
};

function formatAuthorName(author: ArticleAuthor) {
  const middle = author.middlename ? ` ${author.middlename}` : "";
  return `${author.firstname}${middle} ${author.lastname}`.trim();
}

type ArticlesListPageProps = {
  searchParams?: { page?: string };
};

export default async function ArticlesListPage({
  searchParams,
}: ArticlesListPageProps) {
  const supabase = createClient();

  const requestedPage = Number(searchParams?.page);
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

  let articles: ArticleRow[] = [];
  let totalCount = 0;

  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  try {
    const { data, count } = await supabase
      .from("articles")
      .select(
        "id, title, abstract, pages, pdf_url, archive_id, archive:archive_id(volume_no, issue_no), authors(firstname, middlename, lastname)",
        { count: "exact" },
      )
      .order("created_at", { ascending: false })
      .range(from, to);
    if (data && data.length > 0) {
      articles = data as unknown as ArticleRow[];
      totalCount = count ?? data.length;
    } else if (count === 0) {
      articles = [];
      totalCount = 0;
    }
  } catch {
    // articles = SAMPLE_ARTICLES.slice(from, to + 1)
  }

  const totalPages = Math.max(Math.ceil(totalCount / PAGE_SIZE), 1);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Articles</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {totalCount} total articles
          </p>
        </div>
        <Link
          href="/articles/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gad-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          New Article
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-input text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Issue
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                  Authors
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                  Pages
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="hover:bg-muted/20 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium line-clamp-1 max-w-xs">
                      {article.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs mt-0.5">
                      {article.abstract}
                    </p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    {article.archive ? (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        Vol. {article.archive.volume_no}, Issue{" "}
                        {article.archive.issue_no}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground max-w-[220px]">
                      <Users className="h-3.5 w-3.5 shrink-0" />
                      <span className="line-clamp-1">
                        {article.authors.length > 0
                          ? article.authors.map(formatAuthorName).join(", ")
                          : "No authors listed"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {article.pages || "-"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {article.pdf_url && (
                        <a
                          href={article.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          title="View PDF"
                        >
                          <FileText className="h-4 w-4" />
                        </a>
                      )}
                      <Link
                        href={`/articles/${article.id}`}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <DeleteDialog
                        title="Delete article"
                        description={
                          <>
                            Are you sure you want to delete{" "}
                            <span className="font-medium">
                              &ldquo;{article.title}&rdquo;
                            </span>
                            ? This article and its authors will be
                            permanently removed.
                          </>
                        }
                        onConfirm={async () => {
                          "use server";
                          const result = await deleteArticleAction(
                            article.id,
                          );
                          if (!result.success) {
                            throw new Error(
                              result.error ?? "Failed to delete article",
                            );
                          }
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-border">
            <PaginationNav
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/articles"
              searchParams={searchParams}
            />
          </div>
        )}
      </div>
    </div>
  );
}
