import React from "react";
import type { Metadata } from "next";
import { FileCheck2, ScanSearch, Scale, Users } from "lucide-react";
import { JournalTabs } from "@/components/journal/journal-tabs";
import { JournalPageHeader } from "@/components/journal/journal-page-header";
import { PolicySection } from "@/components/journal/policy-section";

export const metadata: Metadata = {
  title: "Publication Ethics & Integrity — GRPJ",
  description:
    "The publication ethics and research integrity policy of the Gender Research and Policy Journal (GRPJ), published by RGAN XI, aligned with COPE, ICMJE, DOAJ, OASPA, and WAME guidance.",
};

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

export default function PublicationEthicsPage() {
  return (
    <div className="pt-20">
      <JournalPageHeader
        eyebrow="Integrity"
        title="Publication Ethics & Integrity"
        description="GRPJ is committed to maintaining the highest standards of publication ethics, research integrity, transparency, and academic excellence, in line with COPE, ICMJE, DOAJ, OASPA, and WAME guidance."
      />

      <JournalTabs />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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

          <div className="space-y-6">
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
    </div>
  );
}
