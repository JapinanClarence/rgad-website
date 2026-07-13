import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react'

const stats = [
  { icon: BookOpen, value: '200+', label: 'Research Articles' },
  { icon: Users, value: '50+', label: 'Researchers' },
  { icon: Award, value: '3+', label: 'Years of Advocacy' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden hero-pattern">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-40 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />

        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(hsl(270,72%,40%) 1px, transparent 1px), linear-gradient(90deg, hsl(270,72%,40%) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating shapes */}
        <div className="absolute top-32 right-[15%] w-3 h-3 rounded-full bg-primary/30 animate-pulse" />
        <div className="absolute top-48 right-[25%] w-2 h-2 rounded-full bg-secondary/40 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-[10%] w-4 h-4 rounded-full bg-accent/20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center py-16">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6 animate-slide-in">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
               Est. 2023 · Region XI's GAD Advocates Network
            </div>

            <h1 className="font-display text-5xl lg:text-6xl xl:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
              Advocating{' '}
              <span className="text-gradient">gender equality</span>{' '}
              beyond{' '}
              <em className="not-italic text-secondary"> mainstreaming</em>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              The Region XI Gender and Development Advocates Network builds evidence-based research and cross-sector partnerships that turn gender advocacy into lasting policy and institutional change.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="gad" size="lg" asChild className="group">
                <Link href="/articles">
                  Explore RGAN XI
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Our Research Journal</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-2xl leading-tight">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            {/* Main card */}
            <div className="relative bg-white rounded-3xl shadow-2xl border border-border/50 p-8 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 gad-gradient" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Featured Research</span>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>

                <h3 className="font-display text-xl font-bold leading-snug">
                  Intersectionality in Philippine Gender Policy: A Systematic Review
                </h3>

                <div className="flex flex-wrap gap-2">
                  {['Policy', 'Women', 'Philippines'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  This study examines how intersecting identities of gender, class, ethnicity, and disability shape access to social protection programs...
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary" />
                    <div>
                      <p className="text-xs font-medium">Dr. Maria Santos</p>
                      <p className="text-[10px] text-muted-foreground">Lead Researcher</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">May 2024</span>
                </div>
              </div>
            </div>

            {/* Floating accent cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-border/50 p-4 w-44 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-xs text-muted-foreground mb-1">Latest Insight</p>
              <p className="text-sm font-display font-semibold leading-snug">GAD Budget Utilization Trends 2024</p>
            </div>

            <div className="absolute -top-4 -right-4 bg-primary rounded-2xl shadow-xl p-4 w-36 text-white animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <p className="text-3xl font-display font-bold">78%</p>
              <p className="text-xs text-white/80">of policies show gender gaps</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
