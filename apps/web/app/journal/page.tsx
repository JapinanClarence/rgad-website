import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Globe,
  ShieldCheck,
  Repeat,
  Landmark,
  Mail,
  MapPin,
  FileCheck2,
  ScanSearch,
  Scale,
  Users,
  Library,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Gender Research & Policy Journal",
  description:
    "The Gender Research and Policy Journal (GRPJ) — a peer-reviewed, open-access journal published by RGAN XI. ISSN 3082-5431 (Print). Published biannually.",
};

// Core bibliographic facts — kept in one place so the record stays consistent
// wherever it is referenced on the page.
const journalFacts = [
  { label: "Journal Title", value: "Gender Research and Policy Journal" },
  { label: "Abbreviation", value: "GRPJ" },
  {
    label: "Publisher / Published by",
    value: "Region XI Gender and Development Advocates Network (RGAN XI)",
  },
  { label: "Publication Frequency", value: "Biannual — June and December" },
  { label: "Publication Model", value: "Open Access" },
  { label: "Peer Review", value: "Double-blind" },
  { label: "Language", value: "English" },
  { label: "ISSN (Print)", value: "3082-5431" },
  { label: "ISSN (Online)", value: "Pending" },
  { label: "Article Processing Charges", value: "None" },
  { label: "Submission Fee", value: "None" },
  { label: "Copyright", value: "Retained by the authors" },
  { label: "License", value: "Creative Commons Attribution 4.0 International (CC BY 4.0)" },
  { label: "DOI Registration", value: "Crossref (10.63346/RGANXI)" },
];

const scope = [
  "Gender and Development (GAD)",
  "Gender Equality and Social Inclusion (GESI)",
  "Women's Empowerment and Leadership",
  "Feminist Theory and Gender Studies",
  "LGBTQIA+ Studies",
  "Gender and Public Policy",
  "Gender and Governance",
  "Gender and Human Rights",
  "Gender and Education",
  "Gender and Health",
  "Gender-Based Violence",
  "Gender and Climate Justice",
  "Migration and Gender",
  "Indigenous Peoples, Gender, and Traditional Knowledge",
  "Gender and Digital Technologies",
  "Comparative and International Gender Studies",
];

const indexing = [
  "Asian Science Citation Index (ASCI)",
  "Philippine E-Journals (PEJ)",
  "Registered through Crossref",
];

const ethicsPillars = [
  {
    icon: ScanSearch,
    title: "Originality Screening",
    desc: "Every submission is screened with plagiarism-detection software before it is sent out for review.",
  },
  {
    icon: Scale,
    title: "COPE-Aligned Standards",
    desc: "The journal follows COPE Core Practices, ICMJE recommendations, and the DOAJ/OASPA/WAME principles of transparency.",
  },
  {
    icon: Users,
    title: "Double-Blind Peer Review",
    desc: "Author and reviewer identities are kept confidential throughout evaluation, decision, and revision.",
  },
  {
    icon: FileCheck2,
    title: "Disclosed AI Use",
    desc: "AI tools may assist with language and formatting only; authors remain fully responsible and must disclose substantial use.",
  },
];

export default function JournalPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              RGAN XI Scholarly Publication
            </p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Gender Research &amp;{" "}
              <span className="text-gradient">Policy Journal</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              GRPJ is a peer-reviewed, open-access journal that publishes
              interdisciplinary research on gender and its implications for
              policy, governance, education, health, and development —
              published by the Region XI Gender and Development Advocates
              Network (RGAN XI).
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "ISSN (Print) 3082-5431",
                "Open Access",
                "Double-Blind Peer Review",
                "Published Biannually",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-border text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/issue"
                className="inline-flex items-center gap-2 gad-gradient text-white px-6 py-3 rounded-md text-sm font-medium shadow-md hover:opacity-90 transition-opacity"
              >
                View Published Articles
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#journal-info"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium border border-border bg-white hover:bg-muted transition-colors"
              >
                Journal Information
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Journal Information — bibliographic record */}
      <section id="journal-info" className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Bibliographic Record
            </p>
            <h2 className="font-display text-4xl font-bold">
              Journal Information
            </h2>
            <p className="mt-3 text-muted-foreground">
              Publisher, frequency, and registration details for the Gender
              Research and Policy Journal.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden max-w-4xl mx-auto">
            <dl className="divide-y divide-border">
              {journalFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid sm:grid-cols-3 gap-1 sm:gap-4 px-6 sm:px-8 py-4"
                >
                  <dt className="text-sm font-medium text-muted-foreground sm:col-span-1">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-foreground sm:col-span-2 font-medium">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* About the Journal */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-display text-3xl font-bold mb-4">
                About the Journal
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Gender Research and Policy Journal (GRPJ) is a
                peer-reviewed, open-access scholarly journal published by the
                Region XI Gender and Development Advocates Network (RGAN XI).
                It provides an interdisciplinary platform for research that
                advances scholarly understanding of gender and its
                implications for policy, governance, education, health,
                development, culture, and society.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Published in English, GRPJ accepts manuscripts from authors
                worldwide while maintaining a strong focus on gender issues
                and policy innovations relevant to the Philippines, Southeast
                Asia, and the Global South — contributing to the United
                Nations Sustainable Development Goals, particularly SDG 5:
                Gender Equality.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                <Globe className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">
                Open Access Policy
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                All published articles are made freely and permanently
                available online immediately upon publication — no
                subscription fees, registration requirements, or access
                restrictions. Authors are not charged for submission, review,
                or publication, and retain copyright under a CC BY 4.0
                license.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Aims and Scope */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Coverage
            </p>
            <h2 className="font-display text-4xl font-bold">
              Aims &amp; Scope
            </h2>
            <p className="mt-3 text-muted-foreground">
              GRPJ welcomes empirical, theoretical, methodological, and
              policy-oriented contributions across these areas, among others.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {scope.map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-border text-foreground/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Publication Ethics & Peer Review */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Integrity
            </p>
            <h2 className="font-display text-4xl font-bold">
              Publication Ethics &amp; Peer Review
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ethicsPillars.map((item) => (
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

      {/* Indexing & Current Issue */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Library className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-4">
                Indexing &amp; Abstracting
              </h3>
              <ul className="space-y-2.5">
                {indexing.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                <Repeat className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">
                Published Research
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                GRPJ is published biannually, every June and December.
                Articles are posted to the RGAN XI research library as they
                clear peer review and production, and remain freely
                accessible without restriction.
              </p>
              <Link
                href="/issue"
                className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Browse published articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Office / Contact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-foreground text-background rounded-3xl p-10 lg:p-14 grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-background/60 font-medium text-sm uppercase tracking-widest mb-3">
                Get in Touch
              </p>
              <h2 className="font-display text-3xl font-bold mb-4">
                Editorial Office
              </h2>
              <p className="text-background/70 leading-relaxed text-sm">
                All correspondence regarding manuscripts, submissions, and
                editorial matters should be addressed to the Editors-in-Chief
                of the Gender Research and Policy Journal.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Landmark className="h-5 w-5 text-background/50 mt-0.5 shrink-0" />
                <p className="text-sm text-background/80">
                  Center for Gender and Development
                  <br />
                  Davao Oriental State University
                  <br />
                  Guang-guang, Dahican, 8200 Mati, Davao Oriental, Philippines
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-background/50 shrink-0" />
                <p className="text-sm text-background/80">
                  Publisher: Region XI Gender and Development Advocates
                  Network (RGAN XI)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-background/50 shrink-0" />
                <a
                  href="mailto:journal.grp@gmail.com"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  journal.grp@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
