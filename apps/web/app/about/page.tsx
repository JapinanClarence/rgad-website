import React from "react";
import type { Metadata } from "next";
import { Target, Eye, BookOpen, Users, Award, Globe } from "lucide-react";
import { images } from "@/constants/images";
import Image from "next/image";
import { profile } from "console";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about RGAN XI — the Region XI Gender and Development Advocates Network — our mission, vision, founding officers, and advocacy.",
};

const team = [
  {
    profile: images.bauyot,
    name: "Mary Fil M. Bauyot, PhD",
    role: "President",
    dept: "Davao Oriental State University",
    initials: "MB",
  },
  {
    profile: images.tahoy,
    name: "Genesesly Tahoy, MAEd",
    role: "Vice-President for Operations",
    dept: "University of Southeastern Philippines ",
    initials: "GT",
  },
  {
    profile: images.orencita,
    name: "Orencita Aireen V. Lozada, PhD",
    role: "Vice-President for Partnerships",
    dept: "San Pedro College",
    initials: "OL",
  },
  {
    profile: images.sadie,
    name: "Sadie D. Law-ay, MA",
    role: "Secretary",
    dept: "Davao del Norte State College",
    initials: "SL",
  },
  {
    profile: images.cecile,
    name: "Cecile C. Lofranco, MBA",
    role: "Treasurer",
    dept: "Davao del Sur State College",
    initials: "CL",
  },
  {
    profile: images.vaneza,
    name: "Vaneza C. Paquiao, MAEm",
    role: "Auditor",
    dept: "Samal City Island College",
    initials: "VP",
  },
  {
    profile: images.sarah,
    name: "Sarah C. Aranges, MBA",
    role: "Business Manager",
    dept: "Davao de Oro State College",
    initials: "SA",
  },
  {
    profile: images.corazon,
    name: "Corazon Mamon-Umblero",
    role: "Board of Directors",
    dept: "University of Immaculate Conception",
    initials: "CM",
  },
  {
    profile: images.jeralyn,
    name: "Jeralyn N. Hemillan, PhD",
    role: "Board of Directors",
    dept: "Davao Oriental State University",
    initials: "JH",
  },
  {
    profile: images.helina,
    name: "Helina Jean P. Dupa, PhD",
    role: "Board of Directors",
    dept: "Davao Oriental State University",
    initials: "HD",
  },
  {
    profile: images.joyce,
    name: "Joyce C. Jasa, MAEd",
    role: "Board of Directors",
    dept: "Brokenshire College",
    initials: "JJ",
  },
  {
    profile: images.imelda,
    name: "Imelda T. Lauron, MA",
    role: "Board of Directors",
    dept: "Southern Philippines Agri-Business and Marine and Aquatic School of Technology",
    initials: "IL",
  },
  {
    profile: images.villegas,
    name: "Jhonnel P. Villegas, MSc",
    role: "Board of Directors",
    dept: "Davao Oriental State University",
    initials: "JV",
  },
  {
    profile: images.evelyn,
    name: "Evelyn S. Ecle",
    role: "Adviser",
    dept: "Commission on Higher Education - Regional Office XI",
    initials: "EE",
  },
];

// const milestones = [
//   { year: "2009", event: "GAD Research Center established in Davao City" },
//   {
//     year: "2012",
//     event: "Launch of first national GAD budget compliance study",
//   },
//   {
//     year: "2015",
//     event:
//       "Partnership with PCW and NCRFW on Magna Carta implementation monitoring",
//   },
//   {
//     year: "2018",
//     event: "Regional office opened in Cebu; digital research library launched",
//   },
//   { year: "2021", event: "100th research publication milestone reached" },
//   { year: "2024", event: "Launch of this open-access research platform" },
// ];

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
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To strengthen collaboration among higher education institutions,
                government agencies, civil society organizations, and
                development partners through research, capacity development,
                policy advocacy, scholarly publication, technical assistance,
                and community engagement in advancing Gender and Development.
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
                A dynamic regional community of Gender and Development advocates
                leading transformative, inclusive, evidence-informed, and
                sustainable development in Region XI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      {/* <section id="research" className="py-20">
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
      </section> */}
      {/* Strategic Programs */}
      <section id="strategic-programs" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Focus Areas
            </p>
            <h2 className="font-display text-4xl font-bold">
              Our Strategic Programs
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Capacity Development",
                desc: "Regional GAD Summit, specialized trainings, certificate programs, faculty development, and leadership programs.",
              },
              {
                icon: Eye,
                title: "Research and Innovation",
                desc: "Collaborative gender research, policy studies, research mentoring, research grants, and gender statistics.",
              },
              {
                icon: BookOpen,
                title: "Publication and Knowledge Management",
                desc: "The Gender Research and Policy Journal, policy briefs, books and manuals, conference proceedings, and a digital knowledge repository.",
              },
              {
                icon: Award,
                title: "Technical Assistance",
                desc: "Gender mainstreaming assessment, GAD planning, gender audit, institutional mentoring, and consultancy services.",
              },
              {
                icon: Users,
                title: "Community Engagement",
                desc: "Extension programs, women\u2019s empowerment initiatives, LGBTQIA+ inclusion, disability-inclusive development, and youth engagement.",
              },
              {
                icon: Globe,
                title: "Partnerships and Resource Mobilization",
                desc: "National collaborations, international partnerships, industry engagement, development cooperation, and resource generation.",
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
      <section id="herstory" className="py-20 bg-muted/20">
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
                  {member.profile && (
                    <Image
                      src={member.profile}
                      alt={member.name}
                      className="w-14 h-14 rounded-2xl object-cover absolute "
                    />
                  )}
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
