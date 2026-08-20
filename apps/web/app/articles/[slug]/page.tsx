import React from 'react'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react'
import type { Metadata } from 'next'
import type { Database } from '@gad/supabase/types'

interface Props {
  params: { slug: string }
}

type ArticleWithAuthor = Database['public']['Tables']['articles']['Row'] & {
  authors: Pick<Database['public']['Tables']['authors']['Row'], 'name' | 'bio' | 'avatar'> | null
}

// Sample article content for fallback
const SAMPLE: Record<string, any> = {
  'intersectionality-philippine-gender-policy': {
    id: '1',
    title: 'Intersectionality in Philippine Gender Policy: A Systematic Review',
    excerpt: 'This study examines how intersecting identities shape access to social protection programs.',
    content: `
<h2>Abstract</h2>
<p>This systematic review examines the presence and application of intersectionality as an analytical framework within Philippine gender policy from 2009 to 2024. Drawing from 87 policy documents, legislative records, and program evaluations, the study reveals that while the Magna Carta of Women (RA 9710) and its implementing rules acknowledge multiple bases of discrimination, actual programming continues to treat women as a homogeneous group.</p>

<h2>Introduction</h2>
<p>Gender and Development (GAD) mainstreaming in the Philippines is legally mandated through the 1987 Constitution, Executive Order No. 273, and the Magna Carta of Women. However, the operationalization of these mandates has often relied on a singular, essentialized conception of "woman" that fails to account for the varied and compounding vulnerabilities experienced by women of different ethnicities, classes, abilities, ages, and sexual orientations.</p>
<p>This review asks: To what extent do Philippine gender policies incorporate an intersectional approach? Where gaps exist, what are their policy implications?</p>

<h2>Methodology</h2>
<p>We conducted a systematic literature review using PRISMA guidelines, screening 312 documents and retaining 87 for full analysis. Documents included national agency GAD plans, annual accomplishment reports, legislative committee deliberations, and program evaluations from PhilHealth, DSWD, DOLE, and DepEd.</p>

<h2>Key Findings</h2>
<p>Our analysis reveals three dominant patterns. First, policy frameworks frequently acknowledge intersecting vulnerabilities in their problem analysis sections but default to universalized interventions that serve the median woman. Second, data collection mechanisms rarely disaggregate beyond sex and age, making intersectional monitoring impossible in most program contexts. Third, agencies with the strongest intersectional performance — notably NCIP and NCMF — tend to have dedicated institutional mechanisms for specific sub-groups rather than integrated mainstreaming approaches.</p>

<blockquote>The challenge is not the absence of will, but the absence of tools — methodological, budgetary, and administrative — that would enable agencies to act on the intersectional commitments already present in their mandates.</blockquote>

<h2>Recommendations</h2>
<p>Based on these findings, we recommend that PCW issue supplementary guidelines requiring intersectional disaggregation in all GAD Accomplishment Reports, that the Annual Gender Statistics Programme be expanded to capture disability, ethnicity, and economic class alongside sex and age, and that LGUs be provided capacity-building support to conduct participatory intersectional needs assessments at the barangay level.</p>
    `,
    category: 'Gender Policy',
    author: 'Dr. Maria Santos',
    published_at: '2024-05-15',
    tags: ['Intersectionality', 'Policy Analysis', 'RA 9710', 'GAD Mainstreaming'],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: SAMPLE[params.slug]?.title ?? 'Research Article',
    description: SAMPLE[params.slug]?.excerpt ?? '',
  }
}

export default async function ArticlePage({ params }: Props) {
  const supabase = createClient()
  let article: any = SAMPLE[params.slug] ?? null

  try {
    const { data: articleData } = await supabase
      .from('articles')
      .select('*, authors(name, bio, avatar)')
      .eq('slug', params.slug)
      .eq('published', true)
      .single()

    const data = articleData as ArticleWithAuthor | null
    if (data) {
      article = { ...data, author: data.authors?.name ?? 'GAD Research Center' }
    }
  } catch {}

  if (!article) notFound()

  const categoryColors: Record<string, string> = {
    'Gender Policy': 'bg-purple-100 text-purple-700',
    'Women Empowerment': 'bg-rose-100 text-rose-700',
    'Social Inclusion': 'bg-blue-100 text-blue-700',
    'Governance': 'bg-teal-100 text-teal-700',
    'Education': 'bg-amber-100 text-amber-700',
    'VAWC': 'bg-red-100 text-red-700',
    'Legal Framework': 'bg-green-100 text-green-700',
  }

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back */}
        <Link
          href="/issue"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Issues
        </Link>

        {/* Article header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[article.category] || 'bg-primary/10 text-primary'}`}>
              {article.category}
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(article.published_at)}
            </span>
          </div>

          <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4 py-4 border-y border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gad-gradient flex items-center justify-center text-white text-sm font-bold">
                {(article.author || 'G')[0]}
              </div>
              <div>
                <p className="text-sm font-medium">{article.author}</p>
                <p className="text-xs text-muted-foreground">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {article.tags?.map((tag: string) => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Article body */}
        <div
          className="article-prose text-foreground/85 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content ?? '<p>Full article content coming soon.</p>' }}
        />

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Cite this article: {article.author} ({new Date(article.published_at).getFullYear()}). <em>{article.title}</em>. GAD Research Center.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/issue">← More Articles</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
