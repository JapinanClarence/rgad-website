import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Megaphone, Pin } from "lucide-react";
import { formatDate, truncateWords } from "@/lib/utils";
import { getAnnouncements } from "@/services/announcement";

export const metadata: Metadata = {
  title: "Announcements",
  description:
    "Calls for papers, events, membership news, and updates from the Region XI Gender and Development Advocates Network (RGAN XI).",
};

const DESCRIPTION_WORD_LIMIT = 30;

export default async function Announcements() {
  const announcements = await getAnnouncements();

  const pinned = announcements.filter((a) => a.isPinned);
  const rest = announcements.filter((a) => !a.isPinned);

  return (
    <div className="pt-20">
      <section className="py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Latest from RGAN XI
            </p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
              Stay ahead with{" "}
              <span className="text-gradient">announcements</span> that move the
              network forward
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The latest calls for papers, events, and network milestones from
              RGAN XI, updated regularly, open to all.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {announcements.length === 0 ? (
            <p className="text-muted-foreground">
              No announcements yet. Check back soon.
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
                      <Link
                        key={announcement.id}
                        href={`/announcements/${announcement.slug}`}
                        className="bg-white rounded-2xl border border-border p-7 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatDate(announcement.publishedAt)}
                          </span>
                        </div>
                        <h2 className="font-display text-xl font-bold leading-snug mb-3">
                          {announcement.title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {truncateWords(
                            announcement.description,
                            DESCRIPTION_WORD_LIMIT,
                          )}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 mb-6">
                <Megaphone className="h-4 w-4 text-primary" />
                <p className="text-primary font-medium text-sm uppercase tracking-widest">
                  All Announcements
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((announcement) => (
                  <Link
                    key={announcement.id}
                    href={`/announcements/${announcement.slug}`}
                    className="bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-shadow flex flex-col"
                  >
                    <h2 className="font-display text-base font-bold leading-snug mb-2.5">
                      {announcement.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {truncateWords(
                        announcement.description,
                        DESCRIPTION_WORD_LIMIT,
                      )}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground mt-5 pt-4 border-t border-border">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(announcement.publishedAt)}
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
