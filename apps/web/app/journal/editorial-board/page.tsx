import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  BadgeCheck,
  Landmark,
  Mail,
  MapPin,
  Globe2,
  BookUser,
  Building2,
  ChevronRight,
} from "lucide-react";
import { JournalTabs } from "@/components/journal/journal-tabs";
import { JournalPageHeader } from "@/components/journal/journal-page-header";
import { PolicySection } from "@/components/journal/policy-section";
import Image from "next/image";
import { images } from "@/constants/images";

export const metadata: Metadata = {
  title: "Editorial Board & Contact — GRPJ",
  description:
    "The Editorial Board, editorial office, and contact information for the Gender Research and Policy Journal (GRPJ), published by RGAN XI.",
};

const gradients = [
  "from-purple-500 to-pink-500",
  "from-teal-500 to-cyan-500",
  "from-orange-500 to-red-500",
  "from-blue-500 to-indigo-500",
  "from-green-500 to-emerald-500",
  "from-rose-500 to-fuchsia-500",
];

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

type Member = {
  profile?: any;
  name: string;
  affiliation: string;
  orcid?: string;
  researcherId?: string;
  scopusId?: string;
  interests: string;
};

const editorsInChief: Member[] = [
  {
    profile: images.villegas,
    name: "Jhonnel P. Villegas",
    affiliation: "Davao Oriental State University, Philippines",
    orcid: "https://orcid.org/0000-0001-6387-2381",
    researcherId: "IST-3086-2023",
    scopusId: "57747764800",
    interests:
      "Wildlife Ecology, Conservation Biology, Human-Wildlife Interactions, Tropical Cervidology, Gender and Conservation",
  },
  {
    profile: images.bauyot,
    name: "Mary Fil M. Bauyot",
    affiliation: "Davao Oriental State University, Philippines",
    orcid: "https://orcid.org/0000-0002-4600-0570",
    interests:
      "Psychology, Indigenous Psychology, Women and Gender, Reproductive Health",
  },
];

const managingEditor: Member[] = [
  {
    profile: images.rafon,
    name: "John Kenny A. Rafon",
    affiliation: "Davao de Oro State College, Philippines",
    orcid: "https://orcid.org/0009-0006-0615-984X",
    interests:
      "Science Education, Conservation Education, Fisheries Management, Gender and Development",
  },
];

const associateEditors: Member[] = [
  {
    profile: images.orencita,
    name: "Orencita Aireen V. Lozada",
    affiliation: "San Pedro College, Philippines",
    orcid: "https://orcid.org/0009-0000-5069-5654",
    interests:
      "Gender and Marital Dynamics, Pastoral and Existential Counseling, Community and Indigenous Mental Health, Workplace and Family Wellness",
  },
  {
    profile: images.jeralyn,
    name: "Jeralyn N. Hemillan",
    affiliation: "Davao Oriental State University, Philippines",
    orcid: "https://orcid.org/0000-0003-1237-4037",
    interests:
      "Criminal Justice, Criminology, Gender Mainstreaming, Governance",
  },
  {
    profile: images.helina,
    name: "Helina Jean P. Dupa",
    affiliation: "Davao Oriental State University, Philippines",
    orcid: "https://orcid.org/0000-0002-8440-9422",
    interests:
      "Pedagogy, Gender Sociology, Rural Sociology, Gender and Development",
  },
  {
    profile: images.sadie,
    name: "Sadie D. Law-ay",
    affiliation: "Davao del Norte State College, Philippines",
    orcid: "https://orcid.org/0000-0001-6288-4428",
    interests:
      "Gender and Development, Women and Youth, Indigenous Culture, Development Studies",
  },
  {
    profile: images.tio,
    name: "Revrev A. Tio",
    affiliation: "Davao del Norte State College, Philippines",
    orcid: "https://orcid.org/0009-0004-1166-8177",
    interests: "Gender and Development, Social Studies, Sociology, Education",
  },
  {
    profile: images.canoy,
    name: "Fe T. Canoy",
    affiliation:
      "Southern Philippines Agri-Business and Marine and Aquatic School of Technology (SPAMAST), Philippines",
    orcid: "https://orcid.org/0009-0001-5276-6185",
    interests: "Language, Sociolinguistics, Education, Leadership",
  },
  {
    profile: images.sanjose,
    name: "Ariel E. San Jose",
    affiliation:
      "Southern Philippines Agri-Business and Marine and Aquatic School of Technology (SPAMAST), Philippines",
    orcid: "https://orcid.org/0000-0002-3117-7728",
    interests: "Linguistics, Gender, Culture, Language Learning",
  },
  {
    profile: images.condes,
    name: "Rikka Bianca Condes",
    affiliation: "Davao del Sur State College, Philippines",
    orcid: "https://orcid.org/0000-0003-4335-6202",
    interests: "Science Education, Biology, Disaster Risk Reduction",
  },
  {
    profile: images.matalandang,
    name: "Sheruel G. Matalandang",
    affiliation: "Davao del Sur State College, Philippines",
    orcid: "https://orcid.org/0000-0003-4907-1566",
    interests:
      "Indigenous Knowledge Systems and Practices, Public Administration, Sustainable Development Studies, Women, Peace and Security",
  },
  {
    profile: images.ingilan,
    name: "Sajed S. Ingilan",
    affiliation: "University of Southeastern Philippines, Philippines",
    orcid: "https://orcid.org/0000-0002-4466-2028",
    interests: "Linguistics, Language Education, Sulu and Mindanao Studies",
  },
  {
    profile: images.reginio,
    name: "Francis N. Reginio",
    affiliation: "University of Southeastern Philippines, Philippines",
    orcid: "https://orcid.org/0000-0001-5939-4508",
    interests:
      "Public Policy, Political Science, Cultural Studies, Development Studies",
  },
  {
    profile: images.bantayan,
    name: "Jay Mark D. Bantayan",
    affiliation: "Davao de Oro State College, Philippines",
    orcid: "https://orcid.org/0000-0002-0361-1929",
    interests:
      "Marine Biodiversity, Subsistence Fisheries, Environmental Science, Gender Studies",
  },
  {
    profile: images.rebucas,
    name: "Elizer M. Rebucas",
    affiliation: "Davao de Oro State College, Philippines",
    orcid: "https://orcid.org/0000-0003-1485-6689",
    interests:
      "Science Education, Instructional Design, Applied Social Sciences, Higher Education",
  },
];

const statisticalEditors: Member[] = [
  {
    profile: images.delagente,
    name: "Jerd M. Dela Gente",
    affiliation: "Davao Oriental State University, Philippines",
    orcid: "https://orcid.org/0000-0001-9711-9515",
    interests:
      "Mathematics Education, Multivariate Analysis, Time Series Analysis, Regenerative Education",
  },
  {
    profile: images.montejo,
    name: "Diether C. Montejo",
    affiliation: "Davao Oriental State University, Philippines",
    orcid: "https://orcid.org/0009-0000-2123-1797",
    interests:
      "Applied Mathematics, Machine Learning, Mathematics Education, Regenerative Education",
  },
];

const websiteManager: Member[] = [
  {
    profile: images.simo,
    name: "Wilkin F. Simo",
    affiliation: "Davao Oriental State University, Philippines",
    interests: "Website and digital infrastructure management",
  },
];

const advisoryBoard: Member[] = [
  {
    profile: images.caquejo,
    name: "Maricar R. Casquejo",
    affiliation:
      "Commission on Higher Education – Regional Office XI, Philippines",
    interests:
      "Higher Education, Educational Leadership, Gender and Development",
  },
  {
    profile: images.evelyn,
    name: "Evelyn S. Ecle",
    affiliation:
      "Commission on Higher Education – Regional Office XI, Philippines",
    interests:
      "Higher Education, Educational Leadership, Gender and Development",
  },
];

const coPublishers = [
  "Commission on Higher Education – Regional Office XI (CHEDRO XI)",
  "Davao del Norte State College (DNSC)",
  "Davao de Oro State College (DdOSC)",
  "Davao del Sur State College (DSSC)",
  "Davao Oriental State University (DOrSU)",
  "Southern Philippines Agri-Business and Marine and Aquatic School of Technology (SPAMAST)",
  "University of Southeastern Philippines (USeP)",
];

function MemberGrid({ members }: { members: Member[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {members.map((member, i) => (
        <div
          key={member.name}
          className="group bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
        >
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white font-display font-bold mb-4 group-hover:scale-105 transition-transform`}
          >
            {initials(member.name)}
            {member.profile && (
              <Image
                src={member.profile}
                alt={member.name}
                className="w-14 h-14 rounded-2xl object-cover absolute "
              />
            )}
          </div>
          <h3 className="font-display font-bold text-base leading-tight">
            {member.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {member.affiliation}
          </p>
          <p className="text-xs text-muted-foreground/80 mt-2 leading-relaxed">
            {member.interests}
          </p>
          {(member.researcherId || member.scopusId) && (
            <div className="mt-2 space-y-0.5">
              {member.researcherId && (
                <p className="text-[11px] text-muted-foreground/70">
                  ResearcherID: {member.researcherId}
                </p>
              )}
              {member.scopusId && (
                <p className="text-[11px] text-muted-foreground/70">
                  Scopus Author ID: {member.scopusId}
                </p>
              )}
            </div>
          )}
          {member.orcid && (
            <a
              href={member.orcid}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline mt-3"
            >
              <BadgeCheck className="h-3.5 w-3.5" />
              ORCID Profile
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function BoardSection({
  title,
  members,
}: {
  title: string;
  members: Member[];
}) {
  return (
    <div className="mb-14">
      <h3 className="font-display text-xl font-bold mb-5">{title}</h3>
      <MemberGrid members={members} />
    </div>
  );
}

export default function EditorialBoardPage() {
  return (
    <div className="pt-20">
      <JournalPageHeader
        eyebrow="People & Contact"
        title="Editorial Board & Contact Information"
        description="The scholars and reviewers who guide GRPJ's editorial standards, and how to reach the Editorial Office."
      />

      <JournalTabs />

      {/* Editorial Structure */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold">
              Editorial Structure
            </h2>
          </div>

          <BoardSection title="Editors-in-Chief" members={editorsInChief} />
          <BoardSection title="Managing Editor" members={managingEditor} />
          <BoardSection title="Associate Editors" members={associateEditors} />
          <BoardSection
            title="Statistical Editors"
            members={statisticalEditors}
          />
          <BoardSection title="Website Manager" members={websiteManager} />
          <BoardSection
            title="Editorial Advisory Board"
            members={advisoryBoard}
          />
        </div>
      </section>

      {/* Reviewer Database & Editorial Office */}
      <section className="py-4 pb-16 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/journal/editorial-board/reviewers"
            className="group block bg-white rounded-3xl border border-border shadow-sm p-8 lg:p-10 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <BookUser className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold flex-1">
                Reviewer Database
              </h2>
              <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 group-hover:translate-x-1 group-hover:text-primary transition-all" />
            </div>
            <div className="article-prose text-muted-foreground text-sm lg:text-[15px]">
              <p>
                The journal maintains an international database of qualified
                peer reviewers representing diverse disciplines relevant to
                gender research and policy. Reviewer selection is based on
                subject expertise, publication history, peer-review
                experience, research integrity, absence of conflicts of
                interest, and demonstrated commitment to timely,
                high-quality reviews. The reviewer database is updated
                regularly to ensure diversity, expertise, and
                responsiveness.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary mt-2">
              View the Reviewer List
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </Link>

          <PolicySection icon={Landmark} title="Editorial Office">
            <p>
              The Editorial Office coordinates manuscript submission, peer
              review, production, publication, and post-publication
              communications, including receiving manuscript submissions,
              administrative screening, editorial correspondence, coordinating
              peer review, copyediting and production, maintaining publication
              records, assisting authors and reviewers, and responding to
              general inquiries.
            </p>
          </PolicySection>

          <PolicySection icon={Building2} title="Publisher">
            <p>
              GRPJ is published by the Region XI Gender and Development
              Advocates Network (RGAN XI), a non-profit, non-stock,
              non-sectarian, and apolitical organization dedicated to advancing
              gender equality, women&apos;s empowerment, diversity, equity, and
              inclusive development through research, education, policy
              engagement, capacity-building, and community partnerships. As the
              publisher of GRPJ, RGAN XI supports high-quality scholarly
              publishing while respecting the Editorial Board&apos;s
              independence in all editorial decisions.
            </p>
            <p>The journal is co-published by:</p>
            <ul>
              {coPublishers.map((pub) => (
                <li key={pub}>{pub}</li>
              ))}
            </ul>
          </PolicySection>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-foreground text-background rounded-3xl p-10 lg:p-14 grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-background/60 font-medium text-sm uppercase tracking-widest mb-3">
                Contact Information
              </p>
              <h2 className="font-display text-3xl font-bold mb-4">
                Editorial Office
              </h2>
              <p className="text-background/70 leading-relaxed text-sm">
                Gender Research and Policy Journal (GRPJ)
                <br />
                Regional Gender and Development Advocates Network XI (RGAN XI)
              </p>
              <p className="text-background/70 leading-relaxed text-sm mt-4">
                All correspondence to the journal must be addressed to the
                Editors-in-Chief: Jhonnel P. Villegas and Mary Fil M. Bauyot.
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
                  Publisher: Region XI Gender and Development Advocates Network
                  (RGAN XI)
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
              <div className="flex items-center gap-3">
                <Globe2 className="h-5 w-5 text-background/50 shrink-0" />
                <p className="text-sm text-background/80">
                  You are on the journal&apos;s official website —{" "}
                  <Link
                    href="/journal"
                    className="underline hover:text-background"
                  >
                    view Journal Information
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
