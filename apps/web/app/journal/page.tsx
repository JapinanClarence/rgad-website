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
import { JournalTabs } from "@/components/journal/journal-tabs";
import { PolicySection } from "@/components/journal/policy-section";

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

      {/* Publication Ethics & Integrity */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Integrity
            </p>
            <h2 className="font-display text-4xl font-bold">
              Publication Ethics &amp; Integrity
            </h2>
            <p className="mt-3 text-muted-foreground">
              GRPJ is committed to maintaining the highest standards of
              publication ethics, research integrity, transparency, and
              academic excellence, in line with COPE, ICMJE, DOAJ, OASPA, and
              WAME guidance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
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

          <div className="max-w-5xl mx-auto space-y-6">
            <PolicySection title="Responsibilities of Authors">
              <p>Authors submitting manuscripts to GRPJ certify that:</p>
              <ul>
                <li>the work is original and has not been published previously;</li>
                <li>the manuscript is not simultaneously under consideration by another journal;</li>
                <li>all listed authors satisfy the journal&apos;s authorship requirements;</li>
                <li>all data presented are accurate, authentic, and honestly reported;</li>
                <li>appropriate ethical approval has been obtained when required;</li>
                <li>informed consent has been secured where applicable;</li>
                <li>all sources are properly acknowledged and cited;</li>
                <li>all conflicts of interest have been disclosed; and</li>
                <li>the manuscript complies with all journal policies.</li>
              </ul>
              <p>Authors remain responsible for the integrity of their work even after publication.</p>
            </PolicySection>

            <PolicySection title="Research Integrity">
              <p>
                Authors are expected to conduct and report research honestly,
                transparently, and responsibly. Research misconduct
                includes, but is not limited to:
              </p>
              <ul>
                <li>fabrication or falsification of data;</li>
                <li>selective reporting of results;</li>
                <li>inappropriate statistical manipulation;</li>
                <li>image manipulation that alters scientific meaning;</li>
                <li>suppression of conflicting findings;</li>
                <li>misleading interpretation of results; and</li>
                <li>deliberate misrepresentation of research methods.</li>
              </ul>
            </PolicySection>

            <PolicySection title="Originality and Plagiarism">
              <p>
                Submitted manuscripts must represent original scholarly
                work. The journal screens all submissions using plagiarism
                detection software before peer review. The following
                constitute unacceptable publication practices: plagiarism,
                self-plagiarism without proper citation, duplicate
                publication, redundant publication, mosaic plagiarism,
                translated plagiarism, and unattributed use of text,
                figures, tables, or ideas. Proper quotation, citation, and
                acknowledgment of previously published work are mandatory.
                The Editorial Board reserves the right to reject manuscripts
                or retract published articles found to contain plagiarism or
                other forms of academic misconduct.
              </p>
            </PolicySection>

            <PolicySection title="Duplicate and Redundant Publication">
              <p>
                Authors shall not submit substantially similar manuscripts
                to more than one journal simultaneously. The journal does
                not accept manuscripts that have already been published,
                substantially overlap with previously published work, have
                been divided into multiple publications without scientific
                justification (&quot;salami publication&quot;), or
                constitute duplicate publication. Any overlap with
                previously disseminated work, including conference
                proceedings, dissertations, or preprints, must be fully
                disclosed at submission.
              </p>
            </PolicySection>

            <PolicySection title="Data Availability and Reproducibility">
              <p>
                Authors are encouraged to make research data, analytical
                code, instruments, and supplementary materials publicly
                available whenever ethically and legally possible. Each
                manuscript should include a Data Availability Statement
                indicating one of the following:
              </p>
              <ul>
                <li>data are publicly available;</li>
                <li>data are available upon reasonable request;</li>
                <li>data cannot be shared because of ethical or legal restrictions; or</li>
                <li>no new datasets were generated.</li>
              </ul>
            </PolicySection>

            <PolicySection title="Human Participants, Animals, and Ethical Approval">
              <p>
                Research involving human participants must comply with
                internationally accepted ethical standards, including the
                Declaration of Helsinki and relevant national regulations.
                Authors must indicate the approving ethics committee or IRB,
                approval or protocol number (where applicable), confirmation
                that informed consent was obtained, and additional
                safeguards for vulnerable populations. Personally
                identifiable information shall not be published unless
                scientifically justified, explicit written consent has been
                obtained, and publication complies with applicable data
                protection laws. Research involving animals must comply with
                institutional, national, and international ethical
                standards governing animal welfare, with evidence of ethical
                approval provided.
              </p>
            </PolicySection>

            <PolicySection title="Artificial Intelligence (AI)">
              <p>
                AI technologies may assist authors during manuscript
                preparation provided their use is transparent, responsible,
                and does not compromise research integrity — for example,
                language editing, grammar improvement, formatting
                assistance, coding assistance, data visualization support,
                and literature organization. Authors remain fully
                responsible for all content generated with AI assistance. AI
                tools shall not be listed as authors, assume responsibility
                for the manuscript, replace scientific interpretation,
                fabricate references or data, or generate misleading
                scientific conclusions. All substantial AI assistance must
                be disclosed in an AI Use Declaration.
              </p>
            </PolicySection>

            <PolicySection title="Authorship, Conflicts of Interest, and Funding">
              <p>
                Authorship should accurately reflect substantial scholarly
                contributions, following the ICMJE authorship
                recommendations. Each submission must include an Author
                Contributions Statement using the CRediT (Contributor Roles
                Taxonomy). Guest, honorary, gift, and ghost authorship are
                considered unethical and are prohibited.
              </p>
              <p>
                Authors must disclose all financial, institutional,
                personal, professional, or political relationships that
                could reasonably influence the interpretation of their
                research, and must disclose all funding sources supporting
                the research, including the funding organization, grant
                number(s), and the funder&apos;s role in the study.
              </p>
            </PolicySection>

            <PolicySection title="Citation Integrity, Peer Review Manipulation, and Image Integrity">
              <p>
                Authors should cite literature fairly, accurately, and
                appropriately; citation practices intended solely to
                manipulate citation metrics — such as excessive
                self-citation, coercive citation, or citation cartels — are
                prohibited. Any attempt to manipulate the peer-review
                process, including fabricated reviewer identities or
                improperly influencing reviewers, constitutes serious
                misconduct. Figures, photographs, and graphical materials
                must accurately represent the original data; manipulation
                intended to deceive readers is strictly prohibited.
              </p>
            </PolicySection>

            <PolicySection title="Corrections, Expressions of Concern, and Retractions">
              <p>
                The journal is committed to maintaining the accuracy of the
                scholarly record. When necessary, GRPJ may publish an
                Erratum to correct publisher errors, a Corrigendum to
                correct author errors, an Expression of Concern while
                allegations are under investigation, or a Retraction when
                findings are unreliable because of error or misconduct.
                Retractions remain permanently linked to the original
                publication.
              </p>
            </PolicySection>

            <PolicySection title="Handling Allegations of Misconduct">
              <p>
                All allegations of research or publication misconduct shall
                be investigated fairly, confidentially, and in accordance
                with COPE guidance. Depending on the nature of the
                allegation, the journal may request explanations from
                authors, obtain original data, consult independent experts,
                contact the authors&apos; institutions, suspend editorial
                processing, publish corrections, issue expressions of
                concern, retract published articles, or prohibit future
                submissions for a specified period. All decisions are based
                on evidence, due process, and the principles of fairness,
                transparency, and academic integrity.
              </p>
            </PolicySection>
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
