import React from 'react'
import Link from 'next/link'
import { createClient } from '@gad/supabase/server'
import { formatDate } from '@/lib/utils'
import { PlusCircle, Search, Edit, Trash2, Eye } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Articles' }

const SAMPLE_ARTICLES = [
  { id: '1', title: 'Intersectionality in Philippine Gender Policy', category: 'Gender Policy', published: true, published_at: '2024-05-15', view_count: 342 },
  { id: '2', title: 'GAD Budget Utilization and LGU Compliance', category: 'Governance', published: true, published_at: '2024-04-02', view_count: 218 },
  { id: '3', title: 'Indigenous Women and Ancestral Domain Rights', category: 'Social Inclusion', published: false, published_at: '2024-03-18', view_count: 0 },
  { id: '4', title: 'Magna Carta of Women: A Decade Review', category: 'Legal Framework', published: true, published_at: '2024-02-10', view_count: 487 },
  { id: '5', title: 'VAWC Reporting Barriers in Rural Communities', category: 'VAWC', published: true, published_at: '2024-01-25', view_count: 156 },
  { id: '6', title: 'Gender-Responsive Pedagogy in Davao Schools', category: 'Education', published: false, published_at: '2023-12-05', view_count: 0 },
]

export default async function ArticlesListPage() {
  const supabase = createClient()
  let articles = SAMPLE_ARTICLES as any[]

  try {
    const { data } = await supabase
      .from('articles')
      .select('id, title, category, published, published_at, view_count')
      .order('created_at', { ascending: false })
    if (data && data.length > 0) articles = data
  } catch {}

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Articles</h1>
          <p className="text-muted-foreground text-sm mt-1">{articles.length} total articles</p>
        </div>
        <Link
          href="/articles/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gad-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          New Article
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-input text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Views</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium line-clamp-1 max-w-xs">{article.title}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs text-muted-foreground">{article.category}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Eye className="h-3.5 w-3.5" />
                      {(article.view_count ?? 0).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-xs text-muted-foreground">{formatDate(article.published_at)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${article.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/articles/${article.id}`}
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
