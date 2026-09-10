import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Pin } from "lucide-react";
import { formatDate, truncateWords } from "@/lib/utils";
import { getAnnouncementBySlug } from "@/services/announcement";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const announcement = await getAnnouncementBySlug(params.slug);
  if (!announcement) return { title: "Announcement" };

  return {
    title: announcement.title,
    description: truncateWords(announcement.description, 30),
  };
}

export default async function AnnouncementDetailPage({ params }: Props) {
  const announcement = await getAnnouncementBySlug(params.slug);
  if (!announcement) notFound();

  return (
    <div className="pt-20">
      <section className="py-16 hero-pattern">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/announcements"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Announcements
          </Link>

          <div className="flex items-center gap-3 mb-4">
            {announcement.isPinned && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                <Pin className="h-3.5 w-3.5" />
                Pinned
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(announcement.publishedAt)}
            </span>
          </div>

          <h1 className="font-display text-3xl lg:text-4xl font-bold leading-[1.1] tracking-tight">
            {announcement.title}
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-border p-8">
            <p className="text-foreground/85 leading-relaxed whitespace-pre-line">
              {announcement.description}
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/announcements"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              View all announcements
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
