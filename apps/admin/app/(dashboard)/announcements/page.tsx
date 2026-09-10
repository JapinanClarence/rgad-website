import React from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { PlusCircle, Search, Edit, Pin, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import { PaginationNav } from '@/components/pagination-nav'
import { listAnnouncements } from '@/services/announcement'
import { DeleteAnnouncementButton } from './delete-announcement-button'

export const metadata: Metadata = { title: 'Announcements' }

const PAGE_SIZE = 6

type AnnouncementsListPageProps = {
  searchParams?: { page?: string }
}

export default async function AnnouncementsListPage({
  searchParams,
}: AnnouncementsListPageProps) {
  const requestedPage = Number(searchParams?.page)
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1

  const result = await listAnnouncements({
    page: currentPage,
    pageSize: PAGE_SIZE,
  })

  const announcements = result.success ? result.data.items : []
  const totalCount = result.success ? result.data.totalCount : 0
  const totalPages = Math.max(Math.ceil(totalCount / PAGE_SIZE), 1)

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {totalCount} total announcements
          </p>
        </div>
        <Link
          href="/announcements/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gad-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          New Announcement
        </Link>
      </div>

      {!result.success && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Failed to load announcements: {result.error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search announcements..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-input text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="divide-y divide-border">
          {announcements.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              No announcements found.
            </div>
          ) : (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="flex items-start justify-between px-5 py-4 hover:bg-muted/20 transition-colors group"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{announcement.title}</p>
                    {announcement.isPinned && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <Pin className="h-3 w-3" />
                        Pinned
                      </span>
                    )}
                    {announcement.externalUrl && (
                      <a
                        href={announcement.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                        title="External link"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {announcement.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(announcement.publishedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    href={`/announcements/${announcement.id}`}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <DeleteAnnouncementButton
                    id={announcement.id}
                    title={announcement.title}
                  />
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
              basePath="/announcements"
              searchParams={searchParams}
            />
          </div>
        )}
      </div>
    </div>
  )
}
