import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Megaphone, Pin } from "lucide-react";
import { Badge } from "@gad/ui/badge";
import { formatDate } from "@/lib/utils";
import { getAnnouncements } from "@/services/announcement";
import type { AnnouncementCategory } from "@gad/types/announcement";
import { cn } from "@gad/ui/lib/utils";

export const metadata: Metadata = {
  title: "Announcements",
  description:
    "Calls for papers, events, membership news, and updates from the Region XI Gender and Development Advocates Network (RGAN XI).",
};

const CATEGORY_STYLES: Record<AnnouncementCategory, string> = {
  "Call for Papers": "bg-primary/10 text-primary",
  Event: "bg-secondary/10 text-secondary",
  Membership: "bg-emerald-500/10 text-emerald-600",
  Publication: "bg-blue-500/10 text-blue-600",
  General: "bg-muted text-muted-foreground",
};

export default async function Announcements({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const announcements = await getAnnouncements();

  const categories = Array.from(new Set(announcements.map((a) => a.category)));

  const activeCategory = categories.includes(
    searchParams.category as AnnouncementCategory,
  )
    ? (searchParams.category as AnnouncementCategory)
    : undefined;

  const filtered = activeCategory
    ? announcements.filter((a) => a.category === activeCategory)
    : announcements;

  const pinned = filtered.filter((a) => a.isPinned);
  const rest = filtered.filter((a) => !a.isPinned);

  return (
    <div className="pt-20">
      <section className="py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Latest
            </p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Announcements
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The Region XI Gender and Development Advocates Network (RGAN XI
              Inc.) is a non-stock, non-profit, non-sectarian, and apolitical
              organization dedicated to advancing gender equality, diversity,
              equity, and social inclusion through research, education, policy
              engagement, and community partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/announcements"
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0",
                activeCategory
                  ? "gad-gradient text-white shadow-sm"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted",
              )}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/announcements?category=${encodeURIComponent(category)}`}
                className={cn(
                  "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0",
                  activeCategory === category
                    ? "gad-gradient text-white shadow-sm"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted",
                )}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground">
              No announcements in this category yet.
            </p>
          ) : (
            <>
              {pinned.length > 0 && (
                <div className="mb-14">
                  <div className="flex items-center gap-2 mb-6">
                    <Pin className="h-4 w-4 text-primary" />
                    <p className="text-primary font-medium text-sm uppercase tracking-widest">
                      Pinned
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {pinned.map((announcement) => (
                      <article
                        key={announcement.id}
                        className="bg-white rounded-2xl border border-border p-7 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${CATEGORY_STYLES[announcement.category]}`}
                          >
                            {announcement.category}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatDate(announcement.publishedAt)}
                          </span>
                        </div>
                        <h2 className="font-display text-xl font-bold leading-snug mb-3">
                          {announcement.title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {announcement.excerpt}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 mb-6">
                <Megaphone className="h-4 w-4 text-primary" />
                <p className="text-primary font-medium text-sm uppercase tracking-widest">
                  {activeCategory ?? "All Announcements"}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((announcement) => (
                  <article
                    key={announcement.id}
                    className="bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-shadow flex flex-col"
                  >
                    <Badge variant="category" className="w-fit mb-4">
                      {announcement.category}
                    </Badge>
                    <h2 className="font-display text-base font-bold leading-snug mb-2.5">
                      {announcement.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {announcement.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground mt-5 pt-4 border-t border-border">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(announcement.publishedAt)}
                    </span>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
