import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const pillars = [
  "Promote and advocate for gender equality and women’s empowerment in the region.",
  "Foster collaboration and knowledge sharing among gender and development (GAD) advocates, GAD focal persons, and GAD practitioners.",
  "Champion inclusive and sustainable development practices that benefit people of all genders.",
  "Implement GAD capacity development programs in instruction and curriculum, research, and extension.",
  "Provide technical assistance to higher education institutions, government agencies, local government units, and civil society organizations.",
  "Lead and support research and development programs, projects, and activities on gender and development.",
  "Increase public awareness through advocacy and information campaigns.",
];

export function MissionSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gad-gradient-subtle opacity-60" />
      <div className="absolute inset-0 hero-pattern" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Mission */}
          <div>
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Who We Are
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              A regional network for{" "}
              <span className="text-gradient">gender and development</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              RGAN XI is a non-stock, non-profit, non-sectarian, and apolitical
              organization dedicated to advancing gender equality, diversity,
              equity, and social inclusion through research, education, policy
              engagement, and community partnerships.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We bring together academics, researchers, government agencies,
              civil society organizations, and private sector partners as a
              regional platform for collaboration and innovation in gender and
              development — guided by integrity, collaboration, inclusivity, and
              innovation.
            </p>
            <Button variant="gad" asChild>
              <Link href="/about#herstory">
                Our Herstory <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right: Pillars */}
          <div className="bg-white rounded-3xl border border-border shadow-xl p-8">
            <h3 className="font-display font-bold text-xl mb-6">
              Our Objectives
            </h3>
            <ul className="space-y-4">
              {pillars.map((pillar) => (
                <li key={pillar} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {pillar}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="text-sm font-medium text-primary mb-1">
                Our Vision
              </p>
              <p className="text-sm text-muted-foreground italic">
                "A dynamic regional community of Gender and Development
                advocates leading transformative, inclusive, evidence-informed,
                and sustainable development in Region XI."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
