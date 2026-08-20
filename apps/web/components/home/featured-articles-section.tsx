import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Calendar, User } from 'lucide-react'
import { formatDate } from '@/lib/utils'

// Placeholder articles for static display; replace with Supabase fetch
const featured = [
  {
    id: '1',
    slug: 'intersectionality-in-philippine-gender-policy',
    title: 'Intersectionality in Philippine Gender Policy: A Systematic Review',
    excerpt: 'This study examines how intersecting identities shape access to social protection programs, revealing critical gaps in current GAD-mainstreaming strategies.',
    category: 'Gender Policy',
    author: 'Dr. Maria Santos',
    published_at: '2024-05-15',
    cover_image: null,
    featured: true,
  },
  {
    id: '2',
    slug: 'gad-budget-utilization-lgu-compliance',
    title: 'GAD Budget Utilization and LGU Compliance: A National Assessment',
    excerpt: 'An evaluation of local government unit compliance with RA 9710 mandates and the actual utilization of the 5% GAD budget allocation across 15 regions.',
    category: 'Governance',
    author: 'Atty. Rosa Dela Cruz',
    published_at: '2024-04-02',
    cover_image: null,
    featured: false,
  },
  {
    id: '3',
    slug: 'indigenous-women-ancestral-domain-rights',
    title: 'Indigenous Women and Ancestral Domain Rights in Mindanao',
    excerpt: 'A qualitative study on the lived experiences of Lumad women navigating land rights, customary law, and national gender legislation.',
    category: 'Social Inclusion',
    author: 'Dr. Elena Matubang',
    published_at: '2024-03-18',
    cover_image: null,
    featured: false,
  },
]

const categoryColors: Record<string, string> = {
  'Gender Policy': 'bg-purple-100 text-purple-700',
  'Governance': 'bg-teal-100 text-teal-700',
  'Social Inclusion': 'bg-blue-100 text-blue-700',
  'Women Empowerment': 'bg-rose-100 text-rose-700',
  'Education': 'bg-amber-100 text-amber-700',
}

export function FeaturedArticlesSection() {
  const [main, ...rest] = featured

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Latest Work</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold">Featured Research</h2>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/issue">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Main featured article */}
          <Link
            href="/issue"
            className="lg:col-span-3 group bg-white rounded-3xl border border-border hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Placeholder cover */}
            <div className="h-64 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-6xl font-bold text-primary/10 select-none">GAD</span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[main.category] || 'bg-primary/10 text-primary'}`}>
                  {main.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                {main.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{main.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{main.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(main.published_at)}</span>
              </div>
            </div>
          </Link>

          {/* Secondary articles */}
          <div className="lg:col-span-2 space-y-6">
            {rest.map((article) => (
              <Link
                key={article.id}
                href="/issue"
                className="group flex flex-col bg-white rounded-2xl border border-border hover:shadow-lg transition-all duration-300 p-5 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[article.category] || 'bg-primary/10 text-primary'}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{formatDate(article.published_at)}</span>
                </div>
                <h3 className="font-display font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{article.excerpt}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span>{article.author}</span>
                </div>
              </Link>
            ))}

            <Button variant="outline" asChild className="w-full">
              <Link href="/issue">
                All Research Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
