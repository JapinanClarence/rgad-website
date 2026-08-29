import React from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { PlusCircle, Search, Edit, Trash2, MapPin, Calendar } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Summit' }

const SAMPLE_SUMMITS = [
  { id: '1', theme: 'Beyond Gender Mainstreaming', location: 'Adelina Hotel and Suites, City of Mati, Davao Oriental', host: 'DOrSU & CHEDRO XI', start_date: '2023-12-12', end_date: '2023-12-12' },
]

export default async function SummitListPage() {
  const summits = SAMPLE_SUMMITS

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Summit</h1>
          <p className="text-muted-foreground text-sm mt-1">{summits.length} recorded summits</p>
        </div>
        <Link
          href="/summit/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gad-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          New Summit
        </Link>
      </div>

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
          {summits.map((summit) => (
            <div key={summit.id} className="flex items-start justify-between px-5 py-4 hover:bg-muted/20 transition-colors group">
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm font-medium">{summit.theme}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {summit.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(summit.start_date)}
                    {summit.end_date !== summit.start_date ? ` - ${formatDate(summit.end_date)}` : ''}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Hosted by {summit.host}</p>
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
          ))}
        </div>
      </div>
    </div>
  )
}
