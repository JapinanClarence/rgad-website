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
  Library,
  ArrowRight,
} from "lucide-react";
import { JournalTabs } from "@/components/journal/journal-tabs";

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
  { label: "ORCID Integration", value: "Required for corresponding authors" },
  { label: "Digital Preservation", value: "To be implemented" },
];

const scope = [
  "Gender and Development (GAD)",
  "Gender Equality and Social Inclusion (GESI)",
  "Women's Empowerment and Leadership",
  "Feminist Theory and Gender Studies",
  "Masculinity and Positive Masculinity",
  "LGBTQIA+ Studies",
  "Gender and Public Policy",
  "Gender and Governance",
  "Gender and Human Rights",
  "Gender and Education",
  "Gender and Health",
  "Gender and Labor and Employment",
  "Gender and Entrepreneurship",
  "Gender and Economics",
  "Gender and Agriculture and Rural Development",
  "Gender and Environmental Sustainability",
  "Gender, Climate Change, and Climate Justice",
  "Gender and Disaster Risk Reduction",
  "Indigenous Peoples, Gender, and Traditional Knowledge",
  "Gender and Peacebuilding",
  "Gender and Conflict Studies",
  "Migration and Gender",
  "Gender-Based Violence",
  "Sexual and Reproductive Health and Rights",
  "Gender and Digital Technologies",
  "Artificial Intelligence and Gender",
  "Media, Communication, and Gender",
  "Gender and Culture",
  "Gender and Religion",
  "Gender and Disability",
  "Gender and Social Protection",
  "Gender and Urban Development",
  "Community Development and Inclusive Governance",
  "Intersectionality and Social Justice",
  "Comparative and International Gender Studies",
  "Monitoring and Evaluation of Gender Programs",
  "Innovations in Gender Research Methodology",
];

const indexing = [
  "Asian Science Citation Index (ASCI)",
  "Philippine E-Journals (PEJ)",
  "Registered through Crossref",
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
                href="/issue/archive"
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

      <JournalTabs />

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
                The journal provides an interdisciplinary platform for
                disseminating high-quality research that advances scholarly
                understanding of gender and its implications for policy,
                governance, education, health, development, culture, and
                society.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                GRPJ is committed to publishing original and rigorous
                research that contributes to evidence-based policymaking and
                promotes gender equality, diversity, equity, and social
                inclusion across local, national, regional, and global
                contexts. The journal welcomes empirical, theoretical,
                methodological, and policy-oriented contributions from
                diverse academic disciplines and encourages dialogue among
                researchers, educators, practitioners, policymakers, civil
                society organizations, and development partners.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Published in English, GRPJ accepts manuscripts from authors
                worldwide while maintaining a strong commitment to
                highlighting gender issues and policy innovations relevant to
                the Philippines and the broader Southeast Asia and the Global
                South. Through international collaboration and scholarly
                exchange, the journal aims to foster inclusive knowledge
                production and contribute to the achievement of the United
                Nations Sustainable Development Goals (SDGs), particularly
                SDG 5: Gender Equality, while recognizing the
                interconnectedness of gender with other development
                priorities.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                <Globe className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">
                Open Access Policy
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                GRPJ is a fully open-access journal. All published articles
                are made freely and permanently available online immediately
                upon publication without subscription fees, registration
                requirements, or access restrictions.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Authors are not charged any fees for manuscript submission,
                peer review, editorial processing, or publication. Published
                articles are distributed under the Creative Commons
                Attribution 4.0 International (CC BY 4.0) License. Authors
                retain copyright of their published work while granting GRPJ
                the right to publish and identify itself as the original
                publisher.
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
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              GRPJ publishes original research articles, review papers,
              methodological papers, policy analyses, short communications,
              and policy briefs that advance interdisciplinary knowledge on
              gender and related fields, welcoming contributions from —
              though not limited to — the following areas.
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

      {/* Indexing & Current Issue */}
      <section className="py-20">
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
                GRPJ is published biannually, every June and December, under
                a continuous publication model — accepted articles are
                copyedited, typeset, and published online individually as
                soon as they are ready, and remain freely accessible without
                restriction.
              </p>
              <Link
                href="/issue/archive"
                className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Browse published articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Publication Ethics & Integrity — see dedicated page */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-border p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
                Integrity
              </p>
              <h2 className="font-display text-3xl font-bold mb-3">
                Publication Ethics &amp; Integrity
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                GRPJ is committed to maintaining the highest standards of
                publication ethics, research integrity, transparency, and
                academic excellence, in line with COPE, ICMJE, DOAJ, OASPA,
                and WAME guidance — covering author responsibilities,
                research integrity, originality and plagiarism, data
                availability, AI use, authorship, and how allegations of
                misconduct are handled.
              </p>
            </div>
            <Link
              href="/journal/publication-ethics"
              className="inline-flex items-center gap-2 gad-gradient text-white px-6 py-3 rounded-md text-sm font-medium shadow-md hover:opacity-90 transition-opacity shrink-0"
            >
              Read the full policy
              <ArrowRight className="h-4 w-4" />
            </Link>
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
              <p className="text-background/70 leading-relaxed text-sm mb-4">
                All correspondence regarding manuscripts, submissions, and
                editorial matters should be addressed to the Editors-in-Chief
                of the Gender Research and Policy Journal.
              </p>
              <Link
                href="/journal/editorial-board"
                className="inline-flex items-center gap-2 text-sm font-medium text-background hover:underline"
              >
                View full Editorial Board &amp; contact details
                <ArrowRight className="h-4 w-4" />
              </Link>
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
