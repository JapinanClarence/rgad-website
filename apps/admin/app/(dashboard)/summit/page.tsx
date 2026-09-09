import React from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  MapPin,
  Calendar,
} from "lucide-react";
import type { Metadata } from "next";
import { PaginationNav } from "@/components/pagination-nav";
import { listSummits } from "@/services/summit";

export const metadata: Metadata = { title: "Summit" };

const PAGE_SIZE = 6;

type SummitListPageProps = {
  searchParams?: { page?: string };
};

export default async function SummitListPage({
  searchParams,
}: SummitListPageProps) {
  const requestedPage = Number(searchParams?.page);
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

  const result = await listSummits({ page: currentPage, pageSize: PAGE_SIZE });

  const summits = result.success ? result.data.items : [];
  const totalCount = result.success ? result.data.totalCount : 0;
  const totalPages = Math.max(Math.ceil(totalCount / PAGE_SIZE), 1);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Summit</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {totalCount} recorded summits
          </p>
        </div>
        <Link
          href="/summit/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gad-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          New Summit
        </Link>
      </div>

      {!result.success && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Failed to load summits: {result.error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search summits..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-input text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="divide-y divide-border">
          {summits.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              No summits found.
            </div>
          ) : (
            summits.map((summit) => (
              <div
                key={summit.id}
                className="flex items-start justify-between px-5 py-4 hover:bg-muted/20 transition-colors group"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-sm font-medium">{summit.theme}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {summit.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {summit.date ? formatDate(summit.date) : "-"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Hosted by {summit.host}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    href={`/summit/${summit.id}`}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-border">
            <PaginationNav
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/summit"
              searchParams={searchParams}
            />
          </div>
        )}
      </div>
    </div>
  );
}
