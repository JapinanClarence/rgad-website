import React from 'react'
import Link from 'next/link'
import { createClient } from '@gad/supabase/server'
import { PlusCircle, Search, Edit, Trash2, FileText, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Articles' }

type ArticleAuthor = {
  firstname: string
  middlename: string | null
  lastname: string
}

type ArticleRow = {
  id: string
  title: string
  abstract: string
  pages: string
  pdf_url: string | null
  archive_id: string
  archive: { volume_no: number; issue_no: number } | null
  authors: ArticleAuthor[]
}

const SAMPLE_ARTICLES: ArticleRow[] = [
  {
    id: '1',
    title: 'Intersectionality in Philippine Gender Policy',
    abstract: 'An examination of how overlapping social identities shape gender policy outcomes across Region XI.',
    pages: '1-18',
    pdf_url: null,
    archive_id: '1',
    archive: { volume_no: 3, issue_no: 1 },
    authors: [
      { firstname: 'Maria', middlename: 'L.', lastname: 'Santos' },
      { firstname: 'Ramon', middlename: null, lastname: 'Cruz' },
    ],
  },
  {
    id: '2',
    title: 'GAD Budget Utilization and LGU Compliance',
    abstract: 'A review of gender and development budget utilization among local government units in Region XI.',
    pages: '19-34',
    pdf_url: null,
    archive_id: '1',
    archive: { volume_no: 3, issue_no: 1 },
    authors: [
      { firstname: 'Aisha', middlename: 'D.', lastname: 'Ingilan' },
    ],
  },
  {
    id: '3',
    title: 'Indigenous Women and Ancestral Domain Rights',
    abstract: 'A qualitative study on the intersection of indigenous rights and gender equity in Davao Oriental.',
    pages: '35-52',
    pdf_url: null,
    archive_id: '2',
    archive: { volume_no: 2, issue_no: 2 },
    authors: [
      { firstname: 'Jerd', middlename: 'M.', lastname: 'Dela Gente' },
      { firstname: 'Diether', middlename: 'C.', lastname: 'Montejo' },
      { firstname: 'Sheruel', middlename: 'G.', lastname: 'Matalandang' },
    ],
  },
]

function formatAuthorName(author: ArticleAuthor) {
  const middle = author.middlename ? ` ${author.middlename}` : ''
  return `${author.firstname}${middle} ${author.lastname}`.trim()
}

export default async function ArticlesListPage() {
  const supabase = createClient()
  let articles = SAMPLE_ARTICLES

  try {
    const { data } = await supabase
      .from('articles')
      .select('id, title, abstract, pages, pdf_url, archive_id, archive:archive_id(volume_no, issue_no), authors(firstname, middlename, lastname)')
      .order('created_at', { ascending: false })
    if (data && data.length > 0) articles = data as unknown as ArticleRow[]
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
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Issue</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Authors</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Pages</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium line-clamp-1 max-w-xs">{article.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs mt-0.5">{article.abstract}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    {article.archive ? (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        Vol. {article.archive.volume_no}, Issue {article.archive.issue_no}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Unassigned</span>
                    )}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground max-w-[220px]">
                      <Users className="h-3.5 w-3.5 shrink-0" />
                      <span className="line-clamp-1">
                        {article.authors.length > 0
                          ? article.authors.map(formatAuthorName).join(', ')
                          : 'No authors listed'}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-xs text-muted-foreground">{article.pages || '-'}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {article.pdf_url && (
                        <a
                          href={article.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          title="View PDF"
                        >
                          <FileText className="h-4 w-4" />
                        </a>
                      )}
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
