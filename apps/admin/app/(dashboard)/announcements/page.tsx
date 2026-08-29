import React from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { PlusCircle, Search, Edit, Trash2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Announcements' }

const SAMPLE_ANNOUNCEMENTS = [
  { id: '1', title: 'Call for Papers: Volume 3, Issue 2', excerpt: 'RGAN XI is now accepting submissions for the next issue of the Gender Research and Policy Journal.', published_at: '2024-06-10', is_active: true },
  { id: '2', title: '2024 Regional Gender and Development Summit', excerpt: 'Save the date for this year\'s summit, details on venue and registration to follow.', published_at: '2024-05-20', is_active: true },
  { id: '3', title: 'New Reviewer Applications Open', excerpt: 'GAD practitioners and researchers may now apply to join the reviewer pool.', published_at: '2024-03-01', is_active: false },
]

export default async function AnnouncementsListPage() {
  const announcements = SAMPLE_ANNOUNCEMENTS

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground text-sm mt-1">{announcements.length} total announcements</p>
        </div>
        <Link
          href="/announcements/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gad-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          New Announcement
        </Link>
      </div>

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
          {announcements.map((announcement) => (
            <div key={announcement.id} className="flex items-start justify-between px-5 py-4 hover:bg-muted/20 transition-colors group">
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{announcement.title}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${announcement.is_active ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
                    {announcement.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{announcement.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatDate(announcement.published_at)}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href={`/announcements/${announcement.id}`}
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
          ))}
        </div>
      </div>
    </div>
  )
}
