import React from 'react'
import type { Metadata } from 'next'
import { Target, Eye, BookOpen, Users, Award, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about the GAD Research Center — our mission, vision, team, and research focus areas.',
}

const team = [
  { name: 'Dr. Maria Santos', role: 'Executive Director', dept: 'Leadership', initials: 'MS' },
  { name: 'Atty. Rosa Dela Cruz', role: 'Legal & Policy Lead', dept: 'Research', initials: 'RD' },
  { name: 'Dr. Elena Matubang', role: 'Senior Researcher', dept: 'Research', initials: 'EM' },
  { name: 'Prof. Jose Reyes', role: 'Community Engagement', dept: 'Outreach', initials: 'JR' },
  { name: 'Dr. Ana Flores', role: 'Data & Methodology', dept: 'Research', initials: 'AF' },
  { name: 'Mr. Carlo Domingo', role: 'Communications', dept: 'Outreach', initials: 'CD' },
]

const milestones = [
  { year: '2009', event: 'GAD Research Center established in Davao City' },
  { year: '2012', event: 'Launch of first national GAD budget compliance study' },
  { year: '2015', event: 'Partnership with PCW and NCRFW on Magna Carta implementation monitoring' },
  { year: '2018', event: 'Regional office opened in Cebu; digital research library launched' },
  { year: '2021', event: '100th research publication milestone reached' },
  { year: '2024', event: 'Launch of this open-access research platform' },
]

const gradients = [
  'from-purple-500 to-pink-500',
  'from-teal-500 to-cyan-500',
  'from-orange-500 to-red-500',
  'from-blue-500 to-indigo-500',
  'from-green-500 to-emerald-500',
  'from-rose-500 to-fuchsia-500',
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Who We Are</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About the{' '}
              <span className="text-gradient">GAD Research Center</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We are a Philippine-based research institution dedicated to advancing gender and development knowledge through rigorous, community-grounded scholarship.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To produce rigorous, intersectional research on gender and development that informs policy, strengthens advocacy, and empowers communities — with a particular focus on the Philippine context and the broader Southeast Asian region.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                <Eye className="h-6 w-6 text-secondary" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                A Philippines where gender equality is not merely a legislative mandate but a lived, embodied reality — where every person, regardless of gender, can fully participate in and benefit from society's institutions and opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section id="research" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Focus Areas</p>
            <h2 className="font-display text-4xl font-bold">What We Study</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: 'Legal & Policy Analysis', desc: 'Philippine gender legislation, GAD mainstreaming, and international treaties.' },
              { icon: Users, title: 'Women Empowerment', desc: 'Economic participation, political representation, and leadership development.' },
              { icon: Globe, title: 'Social Inclusion', desc: 'LGBTQIA+ rights, indigenous women, PWDs, and intersectional vulnerabilities.' },
              { icon: Award, title: 'GAD Governance', desc: 'LGU compliance, GAD budget audit, planning and implementation monitoring.' },
              { icon: Target, title: 'Education & Capacity', desc: 'Gender-responsive curricula, teacher training, and safe spaces in schools.' },
              { icon: Eye, title: 'VAWC & Protection', desc: 'Violence against women and children, survivor support systems, and legal remedies.' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-white rounded-2xl border border-border hover:shadow-md transition-shadow">
                <item.icon className="h-7 w-7 text-primary mb-3" />
                <h3 className="font-display font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">History</p>
            <h2 className="font-display text-4xl font-bold">Our Journey</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative pl-8 border-l-2 border-primary/20 space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative">
                  <div className="absolute -left-[calc(2rem+1px)] w-4 h-4 rounded-full bg-primary border-4 border-background shadow-sm" />
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">{m.year}</span>
                  <p className="mt-1 text-foreground/80">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">People</p>
            <h2 className="font-display text-4xl font-bold">Our Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div key={member.name} className="group bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-all hover:-translate-y-0.5 duration-200">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white font-display font-bold text-lg mb-4 group-hover:scale-105 transition-transform`}>
                  {member.initials}
                </div>
                <h3 className="font-display font-bold text-lg">{member.name}</h3>
                <p className="text-primary text-sm font-medium">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{member.dept}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
