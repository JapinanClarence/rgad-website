import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Hash } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { IssueCover } from "@/components/journal/issue-cover";
import type { Database } from "@gad/supabase/types";

type Issue = Database["public"]["Tables"]["archive"]["Row"];

// Static placeholder issues for display; replace with real published issues.
const FEATURED_ISSUES: Issue[] = [
  {
    id: "v2i1",
    created_at: "2025-06-15T00:00:00.000Z",
    volume_no: 2,
    issue_no: 1,
    doi: "10.63346/RGANXI.2025.0201",
    issn: "3082-5431",
    cover_image: null,
    editorial: null,
    editorial_author: null,
    published_at: "2025-06-15",
    is_current: true,
  },
  {
    id: "v1i2",
    created_at: "2024-12-10T00:00:00.000Z",
    volume_no: 1,
    issue_no: 2,
    doi: "10.63346/RGANXI.2024.0102",
    issn: "3082-5431",
    cover_image: null,
    editorial: null,
    editorial_author: null,
    published_at: "2024-12-10",
    is_current: false,
  },
  {
    id: "v1i1",
    created_at: "2024-06-05T00:00:00.000Z",
    volume_no: 1,
    issue_no: 1,
    doi: "10.63346/RGANXI.2024.0101",
    issn: "3082-5431",
    cover_image: null,
    editorial: null,
    editorial_author: null,
    published_at: "2024-06-05",
    is_current: false,
  },
];

export function FeaturedArticlesSection() {
  const [main, ...rest] = FEATURED_ISSUES;

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
            <Link href="/issue?tab=all">
              View All Issues <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Main featured issue */}
          <Link
            href={`/issue/${main.id}`}
            className="lg:col-span-3 group grid sm:grid-cols-[minmax(180px,220px)_minmax(0,1fr)] bg-white rounded-3xl border border-border hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <IssueCover
              volume={main.volume_no}
              issueNo={main.issue_no}
              theme={
                main.editorial
                  ? main.editorial
                      .replace(/<[^>]+>/g, " ")
                      .replace(/\s+/g, " ")
                      .trim()
                  : null
              }
              coverImage={main.cover_image}
              priority
              className="rounded-none shadow-none ring-0 sm:aspect-auto sm:min-h-[300px] sm:h-full"
            />
            <div className="flex max-w-xl flex-col justify-center justify-self-center py-8 sm:py-10">
              {main.is_current && (
                <span className="inline-flex w-fit items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">
                  Current Issue
                </span>
              )}
              <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                Vol. {main.volume_no}, No. {main.issue_no}
              </h3>
              {main.editorial && (
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {main.editorial
                    .replace(/<[^>]+>/g, " ")
                    .replace(/\s+/g, " ")
                    .trim()
                    .slice(0, 180)}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(main.published_at)}
                </span>
                {main.doi && (
                  <span className="flex items-center gap-1.5 truncate">
                    <Hash className="h-3.5 w-3.5 shrink-0" />
                    {main.doi}
                  </span>
                )}
              </div>
            </div>
          </Link>

          {/* Previous issues */}
          <div className="lg:col-span-2 space-y-6">
            {rest.map((issue) => (
              <Link
                key={issue.id}
                href={`/issue/${issue.id}`}
                className="group grid  bg-white rounded-2xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* <IssueCover
                  volume={issue.volume}
                  issueNo={issue.issue_no}
                  theme={issue.theme}
                  coverImage={issue.cover_image}
                  className="aspect-auto h-full min-h-[138px] w-full rounded-none shadow-none ring-0"
                /> */}
                <div className="flex min-w-0 flex-col justify-center p-5">
                  <span className="text-xs text-muted-foreground mb-1">
                    {formatDate(issue.published_at)}
                  </span>
                  <h3 className="font-display font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors">
                    Vol. {issue.volume_no}, No. {issue.issue_no} Gender Research
                    and Policy Journal
                  </h3>
                  {issue.editorial && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {issue.editorial
                        .replace(/<[^>]+>/g, " ")
                        .replace(/\s+/g, " ")
                        .trim()
                        .slice(0, 120)}
                    </p>
                  )}
                </div>
              </Link>
            ))}

            <Button variant="outline" asChild className="w-full">
              <Link href="/issue?tab=all">
                All Journal Issues <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
