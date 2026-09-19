import React from "react";
import type { Metadata } from "next";
import {
  Target,
  Eye,
  BookOpen,
  Users,
  Award,
  Globe,
  GraduationCap,
  Presentation,
  Mic,
  ClipboardList,
  CalendarDays,
  FileSearch,
  Settings2,
  Mail,
  Send,
  ListChecks,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import { getExperts } from "@/services/expert";
import { getOfficers } from "@/services/officer";
import type { Expert, Officer } from "@gad/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about RGAN XI — the Region XI Gender and Development Advocates Network — our mission, vision, founding officers, and advocacy.",
};

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

const services = [
  {
    icon: GraduationCap,
    title: "Training and Capacity Building",
    desc: "Specialized training on GAD, gender research, policy, and related fields.",
  },
  {
    icon: Presentation,
    title: "Workshops and Technical Sessions",
    desc: "Practical learning sessions on gender analysis, research, policy development, planning, and monitoring.",
  },
  {
    icon: Mic,
    title: "Speakership and Resource Persons",
    desc: "Speakers, lecturers, panelists, and moderators for conferences, seminars, and institutional events.",
  },
  {
    icon: ClipboardList,
    title: "GAD Planning and Budgeting Assistance",
    desc: "Technical support in gender analysis, GAD planning and budgeting, program development, and documentation.",
  },
  {
    icon: CalendarDays,
    title: "Annual Conferences and Scholarly Events",
    desc: "Research conferences, forums, symposia, and knowledge-sharing activities that foster collaboration and scholarly exchange.",
  },
  {
    icon: FileSearch,
    title: "Research and Policy Engagement",
    desc: "Support for translating research evidence into policies, programs, and institutional action.",
  },
  {
    icon: Settings2,
    title: "Customized Institutional Services",
    desc: "Tailored capacity building and technical assistance based on the needs of partner organizations.",
  },
];

const speakersPoolDescription =
  "This directory presents the qualified speakers and trainers registered with RGAN XI. Each member has demonstrated relevant knowledge, professional competence, and practical experience in their respective field of expertise, serving as a reliable resource for organizations seeking competent facilitators for seminars, training programs, workshops, and other capacity-building activities on gender and development.";

const engagementSteps = [
  {
    icon: Send,
    title: "Send your inquiry",
    desc: "Direct your official correspondence to rganxi2023@gmail.com to begin coordination with RGAN XI.",
  },
  {
    icon: ListChecks,
    title: "Share your activity details",
    desc: "Include the proposed activity title, objectives, preferred date and venue, and target participants.",
  },
  {
    icon: UserCheck,
    title: "Specify the expertise you need",
    desc: "State the specific area of expertise required so RGAN XI can match you with the most suitable speaker or trainer.",
  },
];

function expertInitials(expert: Expert) {
  return `${expert.firstname[0] ?? ""}${expert.lastname[0] ?? ""}`.toUpperCase();
}

function expertName(expert: Expert) {
  const middle = expert.middlename ? ` ${expert.middlename}` : "";
  return `${expert.firstname}${middle} ${expert.lastname}`.trim();
}

function officerInitials(officer: Officer) {
  return `${officer.firstname[0] ?? ""}${officer.lastname[0] ?? ""}`.toUpperCase();
}

function officerName(officer: Officer) {
  const middle = officer.middlename ? ` ${officer.middlename}` : "";
  const extension = officer.extension ? `, ${officer.extension}` : "";
  return `${officer.firstname}${middle} ${officer.lastname}${extension}`.trim();
}

export default async function AboutPage() {
  const experts = await getExperts();
  const officers = await getOfficers();
  const currentOfficers = officers.filter(
    (officer) => officer.isOfficer && officer.isCurrent,
  );
  const foundingOfficers = officers.filter(
    (officer) => officer.isFoundingOfficer,
  );
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
      
      {/* Services */}
      <section id="services" className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              What We Offer
            </p>
            <h2 className="font-display text-4xl font-bold">Our Services</h2>
            <p className="mt-3 text-muted-foreground">
              We provide professional services that connect gender research,
              policy, education, and practice.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item) => (
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

      {/* Speakers and Trainers */}
      <section id="speakers-trainers" className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Resource Persons
            </p>
            <h2 className="font-display text-4xl font-bold">RGAN XI Speakers and Trainers</h2>
            <p className="mt-3 text-muted-foreground">
              {speakersPoolDescription}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert, i) => (
              <div
                key={expert.id}
                className="group bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white font-display font-bold text-lg mb-4 group-hover:scale-105 transition-transform`}
                >
                  {expertInitials(expert)}
                </div>
                <h3 className="font-display font-bold text-lg">
                  {expertName(expert)}
                </h3>
                <p className="text-primary text-sm font-medium">
                  {expert.school}
                </p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {expert.expertise}
                </p>
                <a
                  href={`mailto:${expert.email}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline mt-3"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {expert.email}
                </a>
              </div>
            ))}
          </div>

          {/* How to engage a speaker or trainer */}
          <div className="mt-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="font-display text-2xl font-bold mb-3">
                How to Engage a Speaker or Trainer
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Organizations and institutions may invite members of the Pool
                of Speakers and Trainers to facilitate seminars, training
                programs, workshops, and other capacity-building activities
                on gender and development.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {engagementSteps.map((step, i) => (
                <div
                  key={step.title}
                  className="p-6 bg-white rounded-2xl border border-border"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm shrink-0">
                      {i + 1}
                    </div>
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-display font-bold mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-foreground text-background rounded-3xl p-10 lg:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="font-display text-2xl font-bold mb-2">
                  Ready to Book a Speaker or Trainer?
                </h2>
                <p className="text-background/70 leading-relaxed text-sm max-w-xl">
                  Reach out to RGAN XI with your activity details, and we
                  will help identify the most suitable resource speaker or
                  trainer for your organization.
                </p>
              </div>
              <a
                href="mailto:rganxi2023@gmail.com"
                className="inline-flex items-center gap-2 gad-gradient text-white font-medium text-sm px-5 py-3 rounded-full shrink-0 hover:opacity-90 transition-opacity"
              >
                <Mail className="h-4 w-4" />
                rganxi2023@gmail.com
              </a>
            </div>
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
              Meet the founding officers, Board of Directors, and Adviser of RGAN XI.
            </p>
          </div>

          {currentOfficers.length > 0 && (
            <div className="mb-16">
              <h3 className="font-display text-2xl font-bold mb-6">
                Officers
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentOfficers.map((officer, i) => (
                  <div
                    key={officer.id}
                    className="group bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
                  >
                    <div
                      className={`relative w-14 h-14 overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white font-display font-bold text-lg mb-4 group-hover:scale-105 transition-transform`}
                    >
                      {officerInitials(officer)}
                      {officer.profile && (
                        <Image
                          src={officer.profile}
                          alt={officerName(officer)}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg">
                      {officerName(officer)}
                    </h3>
                    <p className="text-primary text-sm font-medium">
                      {officer.position}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {officer.school}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {foundingOfficers.length > 0 && (
            <div>
              {currentOfficers.length > 0 && (
                <h3 className="font-display text-2xl font-bold mb-6">
                  Founding Officers
                </h3>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {foundingOfficers.map((officer, i) => (
                  <div
                    key={officer.id}
                    className="group bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
                  >
                    <div
                      className={`relative w-14 h-14 overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white font-display font-bold text-lg mb-4 group-hover:scale-105 transition-transform`}
                    >
                      {officerInitials(officer)}
                      {officer.profile && (
                        <Image
                          src={officer.profile}
                          alt={officerName(officer)}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg">
                      {officerName(officer)}
                    </h3>
                    <p className="text-primary text-sm font-medium">
                      {officer.position}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {officer.school}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
