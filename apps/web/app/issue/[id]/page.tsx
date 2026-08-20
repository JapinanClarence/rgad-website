import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IssueCover } from '@/components/journal/issue-cover'
import { ArrowLeft, Calendar, Hash, Download, FileText, Users } from 'lucide-react'
import type { Database } from '@gad/supabase/types'

interface Props {
  params: { id: string }
}

type Issue = Database['public']['Tables']['issues']['Row']

interface IssueArticle {
  id: string
  title: string
  authors: string
  page_number: string | null
  pdf_url: string | null
}

// Fallback sample data — mirrors the issues shown on /issue when Supabase
// isn't reachable or hasn't been seeded yet.
const SAMPLE_ISSUES: Record<string, Issue> = {
  v2i1: {
    id: 'v2i1',
    volume: 2,
    issue_no: 1,
    title: 'Volume 2, Issue 1',
    theme: 'Beyond Gender Mainstreaming: New Frontiers in Policy and Practice',
    doi: '10.63346/RGANXI.2025.0201',
    cover_image: null,
    editorial_author: 'Dr. Mary Fil M. Bauyot, Editor-in-Chief',
    editorial: `
<p>This issue arrives at a moment when Gender and Development practice across Region XI is being asked to move past compliance and toward genuine institutional transformation. The five studies gathered here take up that challenge from different vantage points — budget governance, indigenous land rights, education, legal implementation, and community-based reporting systems.</p>
<p>Taken together, they argue for the same conclusion: mainstreaming is a starting point, not an endpoint. We are grateful to our reviewers, authors, and the RGAN XI Secretariat for bringing this issue to print.</p>
    `,
    pdf_url: null,
    is_current: true,
    published_at: '2025-06-15',
    created_at: '2025-06-15',
  },
  v1i2: {
    id: 'v1i2',
    volume: 1,
    issue_no: 2,
    title: 'Volume 1, Issue 2',
    theme: 'Institutionalizing GAD: Governance, Research, and Practice',
    doi: '10.63346/RGANXI.2024.0102',
    cover_image: null,
    editorial_author: 'Dr. Mary Fil M. Bauyot, Editor-in-Chief',
    editorial: `
<p>Our second issue focuses on the institutional side of Gender and Development work — how policy commitments are translated, or fail to be translated, into everyday governance. We hope these contributions support practitioners working through the same questions in their own institutions.</p>
    `,
    pdf_url: null,
    is_current: false,
    published_at: '2024-12-10',
    created_at: '2024-12-10',
  },
  v1i1: {
    id: 'v1i1',
    volume: 1,
    issue_no: 1,
    title: 'Volume 1, Issue 1',
    theme: 'Foundations of Gender and Development Scholarship in Region XI',
    doi: '10.63346/RGANXI.2024.0101',
    cover_image: null,
    editorial_author: 'Dr. Evelyn S. Ecle, Founding Adviser',
    editorial: `
<p>It is with great pride that we introduce the inaugural issue of the Gender Research and Policy Journal. This launch marks the culmination of years of collaborative groundwork among higher education institutions, government agencies, and civil society partners across Region XI.</p>
    `,
    pdf_url: null,
    is_current: false,
    published_at: '2024-06-05',
    created_at: '2024-06-05',
  },
}

const SAMPLE_ARTICLES: Record<string, IssueArticle[]> = {
  v2i1: [
    {
      id: '1',
      title: 'Intersectionality in Philippine Gender Policy: A Systematic Review',
      authors: 'Dr. Maria Santos',
      page_number: '1–15',
      pdf_url: '#',
    },
    {
      id: '2',
      title: 'GAD Budget Utilization and LGU Compliance: A National Assessment',
      authors: 'Atty. Rosa Dela Cruz',
      page_number: '16–34',
      pdf_url: '#',
    },
    {
      id: '3',
      title: 'Indigenous Women and Ancestral Domain Rights in Mindanao',
      authors: 'Dr. Elena Matubang',
      page_number: '35–52',
      pdf_url: '#',
    },
    {
      id: '4',
      title: 'Implementation Gaps in the Magna Carta of Women: A Decade Review',
      authors: 'Atty. Rosa Dela Cruz & Prof. Jose Reyes',
      page_number: '53–70',
      pdf_url: '#',
    },
  ],
  v1i2: [
    {
      id: '5',
      title: 'Barriers to VAWC Reporting in Rural Philippine Communities',
      authors: 'Prof. Jose Reyes',
      page_number: '1–18',
      pdf_url: '#',
    },
    {
      id: '6',
      title: 'Gender-Responsive Pedagogy in Davao Region Public Schools',
      authors: 'Dr. Ana Flores',
      page_number: '19–36',
      pdf_url: '#',
    },
  ],
  v1i1: [
    {
      id: '7',
      title: 'Beyond Gender Mainstreaming: Reframing GAD Practice in Higher Education',
      authors: 'Dr. Mary Fil M. Bauyot & Dr. Evelyn S. Ecle',
      page_number: '1–20',
      pdf_url: '#',
    },
  ],
}

async function getIssue(id: string) {
  const supabase = createClient()

  try {
    const { data: issueData } = await supabase
      .from('issues')
      .select('*')
      .eq('id', id)
      .single()

    if (issueData) {
      const { data: articlesData } = await supabase
        .from('articles')
        .select('id, title, page_number, pdf_url, authors(name)')
        .eq('issue_id', id)
        .eq('published', true)
        .order('page_number', { ascending: true })

      const articles: IssueArticle[] = (articlesData ?? []).map((a: any) => ({
        id: a.id,
        title: a.title,
        authors: a.authors?.name ?? 'GAD Research Center',
        page_number: a.page_number,
        pdf_url: a.pdf_url,
      }))

      return { issue: issueData as Issue, articles }
    }
  } catch {}

  const issue = SAMPLE_ISSUES[id]
  if (!issue) return null
  return { issue, articles: SAMPLE_ARTICLES[id] ?? [] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getIssue(params.id)
  if (!result) return { title: 'Issue' }
  const { issue } = result
  return {
    title: `Vol. ${issue.volume}, Issue ${issue.issue_no}`,
    description: issue.theme ?? 'An issue of the Gender Research and Policy Journal.',
  }
}

export default async function IssueDetailPage({ params }: Props) {
  const result = await getIssue(params.id)
  if (!result) notFound()
  const { issue, articles } = result

  return (
    <div className="pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/issue"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Issues
        </Link>

        {/* Issue header */}
        <div className="grid md:grid-cols-[220px_1fr] gap-10 mb-16">
          <IssueCover
            volume={issue.volume}
            issueNo={issue.issue_no}
            theme={issue.theme}
            coverImage={issue.cover_image}
            className="max-w-[220px] mx-auto md:mx-0"
            priority
          />
          <div className="flex flex-col justify-center">
            {issue.is_current && (
              <span className="inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                Current Issue
              </span>
            )}
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">
              Vol. {issue.volume}, Issue {issue.issue_no}
            </h1>
            {issue.theme && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {issue.theme}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Published {formatDate(issue.published_at ?? issue.created_at)}
              </span>
              {issue.doi && (
                <span className="flex items-center gap-1.5">
                  <Hash className="h-4 w-4" />
                  DOI: {issue.doi}
                </span>
              )}
            </div>
            {issue.pdf_url && (
              <Button variant="gad" size="sm" asChild className="w-fit">
                <a href={issue.pdf_url} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Download Full Issue (PDF)
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Editorial */}
        {issue.editorial && (
          <div className="mb-16 pb-16 border-b border-border">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Editorial
            </p>
            <div
              className="article-prose text-foreground/85 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: issue.editorial }}
            />
            {issue.editorial_author && (
              <p className="mt-6 text-sm font-medium text-foreground/70">
                — {issue.editorial_author}
              </p>
            )}
          </div>
        )}

        {/* Table of contents */}
        <div>
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
            In This Issue
          </p>
          <h2 className="font-display text-2xl font-bold mb-8">Articles</h2>

          {articles.length > 0 ? (
            <div className="divide-y divide-border border-y border-border">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6"
                >
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-lg leading-snug mb-1.5">
                      {article.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 shrink-0" />
                        {article.authors}
                      </span>
                      {article.page_number && (
                        <span>pp. {article.page_number}</span>
                      )}
                    </div>
                  </div>
                  {article.pdf_url && (
                    <Button variant="outline" size="sm" asChild className="w-fit shrink-0">
                      <a href={article.pdf_url} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-2" />
                        View PDF
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Articles for this issue will be posted as they clear production.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
