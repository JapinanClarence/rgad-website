import React from 'react'
import { Scale, HeartHandshake, GraduationCap, Landmark, Users2, Globe } from 'lucide-react'

const areas = [
  {
    icon: Scale,
    title: 'Legal & Policy Framework',
    description: 'Analysis of legislation, jurisprudence, and policy gaps affecting gender equality in the Philippines.',
    color: 'bg-purple-50 text-purple-700',
    accent: 'border-purple-200',
  },
  {
    icon: HeartHandshake,
    title: 'Women Empowerment',
    description: 'Research on economic participation, leadership, and social protection for Filipino women.',
    color: 'bg-rose-50 text-rose-700',
    accent: 'border-rose-200',
  },
  {
    icon: GraduationCap,
    title: 'Education & Capacity',
    description: 'Studies on gender-responsive pedagogy, curriculum development, and educational access.',
    color: 'bg-amber-50 text-amber-700',
    accent: 'border-amber-200',
  },
  {
    icon: Landmark,
    title: 'Governance & GAD Budget',
    description: 'Monitoring and evaluation of LGU compliance, GAD plan implementation, and budget utilization.',
    color: 'bg-teal-50 text-teal-700',
    accent: 'border-teal-200',
  },
  {
    icon: Users2,
    title: 'Social Inclusion',
    description: 'Intersectional research on LGBTQIA+, indigenous peoples, persons with disabilities, and marginalized groups.',
    color: 'bg-blue-50 text-blue-700',
    accent: 'border-blue-200',
  },
  {
    icon: Globe,
    title: 'Regional & Global GAD',
    description: 'Comparative studies on regional gender frameworks, CEDAW compliance, and SDG progress.',
    color: 'bg-green-50 text-green-700',
    accent: 'border-green-200',
  },
]

export function ResearchAreasSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Our Focus</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">Research Areas</h2>
          <p className="text-muted-foreground text-lg">
            We pursue interdisciplinary research across six thematic areas that collectively address the systemic roots of gender inequality.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, i) => (
            <div
              key={area.title}
              className={`group p-6 bg-white rounded-2xl border ${area.accent} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${area.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <area.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{area.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
