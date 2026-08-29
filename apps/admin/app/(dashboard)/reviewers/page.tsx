import React from 'react'
import Link from 'next/link'
import { PlusCircle, Search, Edit, Trash2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Reviewers' }

const SAMPLE_REVIEWERS = [
  { id: '1', firstname: 'Maria', middlename: 'L.', lastname: 'Santos', school: 'Davao Oriental State University', country: 'Philippines' },
  { id: '2', firstname: 'Ramon', middlename: null, lastname: 'Cruz', school: 'University of Southeastern Philippines', country: 'Philippines' },
  { id: '3', firstname: 'Aisha', middlename: 'D.', lastname: 'Ingilan', school: 'Davao del Sur State College', country: 'Philippines' },
]

function initials(firstname: string, lastname: string) {
  return `${firstname[0] ?? ''}${lastname[0] ?? ''}`.toUpperCase()
}

export default async function ReviewersListPage() {
  const reviewers = SAMPLE_REVIEWERS

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Reviewers</h1>
          <p className="text-muted-foreground text-sm mt-1">{reviewers.length} registered reviewers</p>
        </div>
        <Link
          href="/reviewers/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gad-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          New Reviewer
        </Link>
      </div>

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
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">School</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Country</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reviewers.map((reviewer) => (
                <tr key={reviewer.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gad-gradient flex items-center justify-center text-white text-xs font-medium shrink-0">
                        {initials(reviewer.firstname, reviewer.lastname)}
                      </div>
                      <p className="text-sm font-medium">
                        {reviewer.firstname} {reviewer.middlename ? `${reviewer.middlename} ` : ''}{reviewer.lastname}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs text-muted-foreground">{reviewer.school}</span>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-xs text-muted-foreground">{reviewer.country}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/reviewers/${reviewer.id}`}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
