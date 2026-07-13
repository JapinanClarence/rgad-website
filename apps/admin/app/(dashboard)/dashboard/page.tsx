import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { FileText, Users, Eye, TrendingUp, PlusCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

const SAMPLE_STATS = [
  { label: 'Total Articles', value: '47', icon: FileText, change: '+3 this month', color: 'text-purple-600 bg-purple-100' },
  { label: 'Published', value: '38', icon: Eye, change: '81% published', color: 'text-green-600 bg-green-100' },
  { label: 'Team Members', value: '12', icon: Users, change: '3 departments', color: 'text-blue-600 bg-blue-100' },
  { label: 'Total Views', value: '8.4k', icon: TrendingUp, change: '+22% this month', color: 'text-rose-600 bg-rose-100' },
]

const RECENT_ARTICLES = [
  { id: '1', title: 'Intersectionality in Philippine Gender Policy', category: 'Gender Policy', published: true, published_at: '2024-05-15' },
  { id: '2', title: 'GAD Budget Utilization and LGU Compliance', category: 'Governance', published: true, published_at: '2024-04-02' },
  { id: '3', title: 'Indigenous Women and Ancestral Domain Rights', category: 'Social Inclusion', published: false, published_at: '2024-03-18' },
  { id: '4', title: 'VAWC Reporting Barriers in Rural Communities', category: 'VAWC', published: true, published_at: '2024-01-25' },
  { id: '5', title: 'Gender-Responsive Pedagogy in Davao Schools', category: 'Education', published: false, published_at: '2023-12-05' },
]

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let articles = RECENT_ARTICLES as any[]
  try {
    const { data } = await supabase
      .from('articles')
      .select('id, title, category, published, published_at')
      .order('created_at', { ascending: false })
      .limit(10)
    if (data && data.length > 0) articles = data
  } catch {}

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome back, {user?.email?.split('@')[0] ?? 'Admin'}
          </p>
        </div>
        <Link
          href="/articles/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gad-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          New Article
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {SAMPLE_STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="font-display text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm font-medium text-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Articles */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display font-bold text-lg">Recent Articles</h2>
            <Link href="/articles" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {articles.map((article) => (
              <div key={article.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-sm font-medium truncate">{article.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{article.category}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{formatDate(article.published_at)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${article.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {article.published ? 'Published' : 'Draft'}
                  </span>
                  <Link href={`/articles/${article.id}`} className="text-xs text-primary hover:underline">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <h2 className="font-display font-bold text-lg mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: 'Write New Article', href: '/articles/new', icon: PlusCircle, color: 'text-purple-600' },
                { label: 'Manage Team', href: '/team', icon: Users, color: 'text-blue-600' },
                { label: 'View All Articles', href: '/articles', icon: FileText, color: 'text-green-600' },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors group"
                >
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                  <span className="text-sm font-medium">{action.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden gad-gradient p-6 text-white">
            <h3 className="font-display font-bold text-lg mb-2">Tip of the Day</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Use descriptive slugs and well-structured excerpts to improve SEO and reader engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
