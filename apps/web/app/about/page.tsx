import React from "react";
import type { Metadata } from "next";
import { Target, Eye, BookOpen, Users, Award, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about RGAN XI — the Region XI Gender and Development Advocates Network — our mission, vision, founding officers, and advocacy.",
};

const team = [
  {
    name: "Mary Fil M. Bauyot, PhD",
    role: "President",
    dept: "Founding Officer",
    initials: "MB",
  },
  {
    name: "Genesesly Tahoy",
    role: "Vice-President for Operations",
    dept: "Founding Officer",
    initials: "GT",
  },
  {
    name: "Orencita Aireen V. Lozada, PhD",
    role: "Vice-President for Partnerships",
    dept: "Founding Officer",
    initials: "OL",
  },
  {
    name: "Sadie D. Law-ay, MA",
    role: "Secretary",
    dept: "Founding Officer",
    initials: "SL",
  },
  {
    name: "Cecile C. Lofranco, MBA",
    role: "Treasurer",
    dept: "Founding Officer",
    initials: "CL",
  },
  {
    name: "Vaneza C. Paquiao, MAEm",
    role: "Auditor",
    dept: "Founding Officer",
    initials: "VP",
  },
  {
    name: "Sarah C. Aranges, MBA",
    role: "Business Manager",
    dept: "Founding Officer",
    initials: "SA",
  },
  {
    name: "Corazon Mamon-Umblero",
    role: "Board of Directors",
    dept: "Board",
    initials: "CM",
  },
  {
    name: "Jeralyn N. Hemillan, PhD",
    role: "Board of Directors",
    dept: "Board",
    initials: "JH",
  },
  {
    name: "Helina Jean P. Dupa, PhD",
    role: "Board of Directors",
    dept: "Board",
    initials: "HD",
  },
  {
    name: "Joyce C. Jasa",
    role: "Board of Directors",
    dept: "Board",
    initials: "JJ",
  },
  {
    name: "Imelda T. Lauron",
    role: "Board of Directors",
    dept: "Board",
    initials: "IL",
  },
  {
    name: "Jhonnel P. Villegas, MSc",
    role: "Board of Directors",
    dept: "Board",
    initials: "JV",
  },
  { name: "Evelyn S. Ecle", role: "Adviser", dept: "Adviser", initials: "EE" },
];

const milestones = [
  { year: "2009", event: "GAD Research Center established in Davao City" },
  {
    year: "2012",
    event: "Launch of first national GAD budget compliance study",
  },
  {
    year: "2015",
    event:
      "Partnership with PCW and NCRFW on Magna Carta implementation monitoring",
  },
  {
    year: "2018",
    event: "Regional office opened in Cebu; digital research library launched",
  },
  { year: "2021", event: "100th research publication milestone reached" },
  { year: "2024", event: "Launch of this open-access research platform" },
];

const gradients = [
  "from-purple-500 to-pink-500",
  "from-teal-500 to-cyan-500",
  "from-orange-500 to-red-500",
  "from-blue-500 to-indigo-500",
  "from-green-500 to-emerald-500",
  "from-rose-500 to-fuchsia-500",
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Who We Are
            </p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About <span className="text-gradient">RGAN XI</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The Region XI Gender and Development Advocates Network (RGAN XI
              Inc.) is a non-stock, non-profit, non-sectarian, and apolitical
              organization dedicated to advancing gender equality, diversity,
              equity, and social inclusion through research, education, policy
              engagement, and community partnerships.
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
              <h2 className="font-display text-2xl font-bold mb-4">
                Our Organization
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Bringing together academics, researchers, government agencies,
                civil society organizations, development practitioners, and
                private sector partners, RGAN XI serves as a regional platform
                for collaboration and innovation in gender and development
                (GAD). Guided by the principles of integrity, collaboration,
                inclusivity, and innovation, we strive to strengthen networks of
                gender advocates, foster cross-sector partnerships, and empower
                individuals and institutions to advocate for gender equality and
                inclusive development.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                <Eye className="h-6 w-6 text-secondary" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-4">
                Our Vision
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Through collective action and shared expertise, RGAN XI
                envisions a society where research and advocacy drive
                transformative policies, institutions champion equality and
                inclusion, and every individual has the opportunity to
                participate fully in sustainable development — contributing to
                the United Nations Sustainable Development Goals, particularly
                SDG 5: Gender Equality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section id="research" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Focus Areas
            </p>
            <h2 className="font-display text-4xl font-bold">What We Study</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Legal & Policy Analysis",
                desc: "Philippine gender legislation, GAD mainstreaming, and international treaties.",
              },
              {
                icon: Users,
                title: "Women Empowerment",
                desc: "Economic participation, political representation, and leadership development.",
              },
              {
                icon: Globe,
                title: "Social Inclusion",
                desc: "LGBTQIA+ rights, indigenous women, PWDs, and intersectional vulnerabilities.",
              },
              {
                icon: Award,
                title: "GAD Governance",
                desc: "LGU compliance, GAD budget audit, planning and implementation monitoring.",
              },
              {
                icon: Target,
                title: "Education & Capacity",
                desc: "Gender-responsive curricula, teacher training, and safe spaces in schools.",
              },
              {
                icon: Eye,
                title: "VAWC & Protection",
                desc: "Violence against women and children, survivor support systems, and legal remedies.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 bg-white rounded-2xl border border-border hover:shadow-md transition-shadow"
              >
                <item.icon className="h-7 w-7 text-primary mb-3" />
                <h3 className="font-display font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Herstory */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              History
            </p>
            <h2 className="font-display text-4xl font-bold">Our Herstory</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
            <p>
              RGAN XI was officially established on{" "}
              <strong>12 December 2023</strong> during the Gender and
              Development (GAD) Summit hosted by Davao Oriental State University
              in Mati City, Davao Oriental. With the theme{" "}
              <em>&ldquo;Beyond Gender Mainstreaming,&rdquo;</em> the summit
              convened gender and development advocates, higher education
              institutions, government agencies, researchers, educators, and
              development practitioners from across Region XI to strengthen
              collaboration and advance gender-responsive initiatives.
            </p>
            <p>
              Recognizing the need for a unified regional platform dedicated to
              research, policy, and advocacy on gender and development, summit
              participants initiated the creation of RGAN XI. Guided through the
              advisorship and support of the Commission on Higher Education
              Regional Office XI (CHED RO XI), the network was formally
              organized, and its founding officers were democratically elected
              during the summit.
            </p>
            <p>
              Since its inception, RGAN XI has evolved into a dynamic regional
              network committed to advancing gender equality, diversity, equity,
              and social inclusion through interdisciplinary research, policy
              engagement, capacity building, and strategic partnerships. The
              organization serves as a hub for collaboration among higher
              education institutions, government agencies, civil society
              organizations, and other stakeholders working toward
              transformative and evidence-based gender and development programs.
            </p>
            <p>
              Today, RGAN XI continues to champion innovation in gender
              scholarship and public policy while fostering partnerships that
              contribute to inclusive, equitable, and sustainable development in
              Region XI and beyond. Guided by its founding vision, the network
              remains steadfast in empowering institutions and communities to
              move beyond gender mainstreaming toward transformative gender
              justice and social change.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              People
            </p>
            <h2 className="font-display text-4xl font-bold">Our Team</h2>
            <p className="mt-3 text-muted-foreground">
              Meet the founding officers, Board of Directors, and adviser of
              RGAN XI.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="group bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white font-display font-bold text-lg mb-4 group-hover:scale-105 transition-transform`}
                >
                  {member.initials}
                </div>
                <h3 className="font-display font-bold text-lg">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium">
                  {member.role}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {member.dept}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
