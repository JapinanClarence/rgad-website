import React from "react";
import {
  Scale,
  HeartHandshake,
  GraduationCap,
  Landmark,
  Users2,
  Globe,
  Target,
  Eye,
  BookOpen,
  Award,
  Users,
} from "lucide-react";

const areas = [
  {
    icon: Target,
    title: "Capacity Development",
    description:
      "Regional GAD Summit, specialized trainings, certificate programs, faculty development, and leadership programs.",
    color: "bg-purple-50 text-purple-700",
    accent: "border-purple-200",
  },
  {
    icon: Eye,
    title: "Research and Innovation",
    description:
      "Collaborative gender research, policy studies, research mentoring, research grants, and gender statistics.",
    color: "bg-rose-50 text-rose-700",
    accent: "border-rose-200",
  },
  {
    icon: BookOpen,
    title: "Publication and Knowledge Management",
    description:
      "The Gender Research and Policy Journal, policy briefs, books and manuals, conference proceedings, and a digital knowledge repository.",

    color: "bg-amber-50 text-amber-700",
    accent: "border-amber-200",
  },
  {
    icon: Award,
    title: "Technical Assistance",
    description:
      "Gender mainstreaming assessment, GAD planning, gender audit, institutional mentoring, and consultancy services.",
    color: "bg-teal-50 text-teal-700",
    accent: "border-teal-200",
  },
  {
    icon: Users,
    title: "Community Engagement",
    description:
      "Extension programs, women\u2019s empowerment initiatives, LGBTQIA+ inclusion, disability-inclusive development, and youth engagement.",
    color: "bg-blue-50 text-blue-700",
    accent: "border-blue-200",
  },
  {
    icon: Globe,
    title: "Partnerships and Resource Mobilization",
    description:
      "National collaborations, international partnerships, industry engagement, development cooperation, and resource generation.",
    color: "bg-green-50 text-green-700",
    accent: "border-green-200",
  },
];

export function ResearchAreasSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
            Focus Areas
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Our Strategic Programs
          </h2>
          <p className="text-muted-foreground text-lg">
            To realize its vision, RGAN XI shall implement six major strategic
            programs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, i) => (
            <div
              key={area.title}
              className={`group p-6 bg-white rounded-2xl border ${area.accent} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className={`w-12 h-12 rounded-xl ${area.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <area.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">
                {area.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
