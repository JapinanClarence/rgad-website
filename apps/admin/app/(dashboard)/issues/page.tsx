import React from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { PlusCircle, Search, Edit, Trash2, BadgeCheck } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Issues' }

const SAMPLE_ISSUES = [
  { id: '1', volume_no: 3, issue_no: 1, issn: '2984-XXXX', doi: '10.5555/rgan.v3i1', published_at: '2024-06-01', is_current: true },
  { id: '2', volume_no: 2, issue_no: 2, issn: '2984-XXXX', doi: '10.5555/rgan.v2i2', published_at: '2023-12-01', is_current: false },
  { id: '3', volume_no: 2, issue_no: 1, issn: '2984-XXXX', doi: '10.5555/rgan.v2i1', published_at: '2023-06-01', is_current: false },
  { id: '4', volume_no: 1, issue_no: 1, issn: '2984-XXXX', doi: '10.5555/rgan.v1i1', published_at: '2022-12-01', is_current: false },
]

export default async function IssuesListPage() {
  const issues = SAMPLE_ISSUES

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Issues</h1>
          <p className="text-muted-foreground text-sm mt-1">{issues.length} total issues</p>
        </div>
        <Link
          href="/issues/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gad-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          New Issue
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search issues..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-input text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Volume / Issue</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">ISSN</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">DOI</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Published</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {issues.map((issue) => (
                <tr key={issue.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium">Vol. {issue.volume_no}, Issue {issue.issue_no}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs text-muted-foreground">{issue.issn}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-xs text-muted-foreground font-mono">{issue.doi}</span>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-xs text-muted-foreground">{formatDate(issue.published_at)}</span>
                  </td>
                  <td className="px-5 py-4">
                    {issue.is_current ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <BadgeCheck className="h-3 w-3" />
                        Current
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        Archived
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/issues/${issue.id}`}
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
