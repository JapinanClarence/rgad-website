'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@gad/supabase/client'
import { Save, Send, ArrowLeft, ImagePlus, X } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  'Gender Policy', 'Women Empowerment', 'Social Inclusion',
  'Governance', 'Education', 'VAWC', 'Legal Framework',
]

export default function NewArticlePage() {
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Gender Policy',
    tags: [] as string[],
    published: false,
    featured: false,
  })
  const [tagInput, setTagInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setForm((f) => ({ ...f, title, slug: slugify(title) }))
  }

  const addTag = () => {
    if (tagInput && !form.tags.includes(tagInput)) {
      setForm((f) => ({ ...f, tags: [...f.tags, tagInput.trim()] }))
      setTagInput('')
    }
  }

  const removeTag = (tag: string) =>
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }))

  const handleSave = async (publish = false) => {
    setSaving(true)
    setError('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error: err } = await supabase.from('articles').insert({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        tags: form.tags,
        published: publish ? true : form.published,
        featured: form.featured,
        author_id: user.id,
        published_at: publish ? new Date().toISOString() : null,
      })
      if (err) throw err
      router.push('/articles')
    } catch (e: any) {
      setError(e.message)
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/articles"
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold">New Article</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave(false)}
            disabled={saving || !form.title}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-white text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving || !form.title}
            className="flex items-center gap-2 px-4 py-2 rounded-lg gad-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={handleTitleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter article title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">/articles/</span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                  placeholder="article-slug"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Brief summary of the article (shown on listing pages)..."
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <label className="block text-sm font-medium mb-3">Article Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              rows={20}
              className="w-full px-4 py-3 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y font-mono text-xs leading-relaxed"
              placeholder="Write your article content here. HTML is supported for rich formatting (e.g., <h2>, <p>, <blockquote>, <ul>)..."
            />
            <p className="text-xs text-muted-foreground mt-2">
              HTML is supported. Use semantic tags: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;blockquote&gt;, etc.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Category */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
            <h3 className="font-medium text-sm mb-3">Category</h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={form.category === cat}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="accent-primary"
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
            <h3 className="font-medium text-sm mb-3">Tags</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-1.5 rounded-md border border-input text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="Add tag..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="h-2.5 w-2.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
            <h3 className="font-medium text-sm mb-3">Options</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">Mark as Featured</span>
                <div
                  onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${form.featured ? 'bg-primary' : 'bg-muted'}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </label>
            </div>
          </div>

          {/* Cover image placeholder */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
            <h3 className="font-medium text-sm mb-3">Cover Image</h3>
            <div className="border-2 border-dashed border-border rounded-xl h-32 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer group">
              <ImagePlus className="h-6 w-6 group-hover:text-primary transition-colors" />
              <p className="text-xs">Click to upload or enter URL</p>
            </div>
            <input
              type="url"
              className="mt-2 w-full px-3 py-1.5 rounded-md border border-input text-xs focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="https://... (optional)"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
