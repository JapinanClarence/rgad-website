import React from "react";
import Link from "next/link";
import { PlusCircle, Search, Edit } from "lucide-react";
import type { Metadata } from "next";
import { PaginationNav } from "@/components/pagination-nav";
import { DeleteDialog } from "@/components/delete-dialog";
import { listReviewers } from "@/services/reviewer";
import { deleteExpertAction } from "./actions";
import { listExperts } from "@/services/expert";

export const metadata: Metadata = { title: "Experts" };

const PAGE_SIZE = 6;

function initials(firstname: string, lastname: string) {
  return `${firstname[0] ?? ""}${lastname[0] ?? ""}`.toUpperCase();
}

type ExpertsListPageProps = {
  searchParams?: { page?: string };
};

export default async function ExpertsListPage({
  searchParams,
}: ExpertsListPageProps) {
  const requestedPage = Number(searchParams?.page);
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

  const result = await listExperts({
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  const experts = result.success ? result.data.items : [];
  const totalCount = result.success ? result.data.totalCount : 0;
  const totalPages = Math.max(Math.ceil(totalCount / PAGE_SIZE), 1);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Experts</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {totalCount} registered experts
          </p>
        </div>
        <Link
          href="/experts/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gad-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          New Expert
        </Link>
      </div>

      {!result.success && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Failed to load reviewers: {result.error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search reviewers..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-input text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  School
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                  Email
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                  Expertise
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {experts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-sm text-muted-foreground"
                  >
                    No experts found.
                  </td>
                </tr>
              ) : (
                experts.map((reviewer) => (
                  <tr
                    key={reviewer.id}
                    className="hover:bg-muted/20 transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full gad-gradient flex items-center justify-center text-white text-xs font-medium shrink-0">
                          {initials(reviewer.firstname, reviewer.lastname)}
                        </div>
                        <p className="text-sm font-medium">
                          {reviewer.firstname}{" "}
                          {reviewer.middlename ? `${reviewer.middlename} ` : ""}
                          {reviewer.lastname}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs text-muted-foreground">
                        {reviewer.school}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-xs text-muted-foreground">
                        {reviewer.email || "-"}
                      </span>
                    </td>
					  <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-xs text-muted-foreground">
                        {reviewer.expertise}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/experts/${reviewer.id}`}
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <DeleteDialog
                          title="Delete expert"
                          description={
                            <>
                              Are you sure you want to delete{" "}
                              <span className="font-medium">
                                &ldquo;{reviewer.firstname} {reviewer.lastname}
                                &rdquo;
                              </span>
                              ? This reviewer will be permanently removed.
                            </>
                          }
                          onConfirm={async () => {
                            "use server";
                            const result = await deleteExpertAction(
                              reviewer.id,
                            );
                            if (!result.success) {
                              throw new Error(
                                result.error ?? "Failed to delete expert",
                              );
                            }
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-border">
            <PaginationNav
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/experts"
              searchParams={searchParams}
            />
          </div>
        )}
      </div>
    </div>
  );
}
