import React from "react";
import type { Metadata } from "next";
import {
  ClipboardCheck,
  ScanSearch,
  UserCheck,
  EyeOff,
  ListChecks,
  Gavel,
  RefreshCcw,
  Scale,
  Lock,
  ShieldAlert,
  Award,
} from "lucide-react";
import { JournalTabs } from "@/components/journal/journal-tabs";
import { JournalPageHeader } from "@/components/journal/journal-page-header";
import { PolicySection } from "@/components/journal/policy-section";

export const metadata: Metadata = {
  title: "Peer Review Policy — GRPJ",
  description:
    "The double-blind peer review policy of the Gender Research and Policy Journal (GRPJ), published by RGAN XI.",
};

export default function PeerReviewPolicyPage() {
  return (
    <div className="pt-20">
      <JournalPageHeader
        eyebrow="Editorial Process"
        title="Peer Review Policy"
        description="GRPJ is committed to ensuring that all published articles meet the highest standards of scientific quality, originality, methodological rigor, ethical integrity, and scholarly significance through a rigorous double-blind peer-review process."
      />

      <JournalTabs />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <PolicySection icon={ClipboardCheck} title="Principles of Peer Review">
            <p>
              All manuscripts submitted to GRPJ undergo a rigorous
              double-blind peer-review process, in which the identities of
              both authors and reviewers remain anonymous throughout the
              review process. Peer review serves as an essential mechanism
              for maintaining academic quality, improving manuscripts
              through constructive feedback, and ensuring that editorial
              decisions are objective, transparent, and evidence-based.
            </p>
          </PolicySection>

          <PolicySection icon={ScanSearch} title="Initial Editorial Screening">
            <p>
              Upon submission, every manuscript undergoes an initial
              assessment by the Editor-in-Chief or a designated Associate
              Editor. This preliminary screening determines whether the
              manuscript is suitable for external peer review, evaluating:
            </p>
            <ul>
              <li>alignment with the journal&apos;s aims and scope;</li>
              <li>originality and scholarly contribution;</li>
              <li>compliance with the journal&apos;s formatting and submission requirements;</li>
              <li>language quality and readability;</li>
              <li>completeness of required declarations and supporting documents;</li>
              <li>ethical compliance, including research ethics approval where applicable; and</li>
              <li>acceptable similarity index based on plagiarism screening.</li>
            </ul>
            <p>
              Manuscripts that fail to meet these minimum requirements may
              be returned to the authors for technical revision or rejected
              without external review (desk rejection).
            </p>
          </PolicySection>

          <PolicySection icon={ScanSearch} title="Similarity Screening">
            <p>
              Before peer review, all submissions are screened using
              plagiarism detection software. The Editorial Board evaluates
              similarity reports carefully, recognizing that numerical
              similarity scores alone do not necessarily indicate
              plagiarism — particular attention is given to the originality
              of ideas, appropriate citation practices, and potential
              overlap with previously published work. Where significant
              concerns are identified, authors may be asked to provide
              clarification, revise the manuscript, or the submission may
              be rejected in accordance with the journal&apos;s publication
              ethics policy.
            </p>
          </PolicySection>

          <PolicySection icon={UserCheck} title="Reviewer Selection">
            <p>
              Manuscripts passing the editorial screening are assigned to
              at least two independent expert reviewers with demonstrated
              expertise relevant to the subject matter. Reviewers are
              selected based on:
            </p>
            <ul>
              <li>academic qualifications;</li>
              <li>publication record;</li>
              <li>subject expertise;</li>
              <li>prior reviewing experience;</li>
              <li>absence of conflicts of interest; and</li>
              <li>ability to provide an objective and timely evaluation.</li>
            </ul>
            <p>
              The Editorial Board may invite additional reviewers whenever
              specialized expertise is required or when reviewer
              recommendations substantially differ. Author-suggested
              reviewers may be considered; however, the final selection of
              reviewers rests solely with the Editorial Board.
            </p>
          </PolicySection>

          <PolicySection icon={EyeOff} title="Double-Blind Review">
            <p>GRPJ adopts a double-blind peer-review model. Under this system:</p>
            <ul>
              <li>reviewers do not know the identities of the authors;</li>
              <li>authors do not know the identities of the reviewers; and</li>
              <li>all identifying information is removed from manuscripts before review.</li>
            </ul>
            <p>
              Authors are responsible for ensuring that submitted
              manuscripts are appropriately anonymized. Reviewer identities
              remain confidential unless disclosure is mutually agreed upon
              after publication.
            </p>
          </PolicySection>

          <PolicySection icon={ListChecks} title="Evaluation Criteria">
            <p>
              Reviewers evaluate manuscripts using, where appropriate, the
              following criteria: originality and novelty; relevance to the
              journal&apos;s aims and scope; significance of the research
              question; theoretical contribution; methodological rigor;
              appropriateness of statistical analyses or qualitative
              methods; ethical compliance; quality of data presentation;
              interpretation and discussion of findings; quality and
              relevance of references; clarity of writing and organization;
              and overall contribution to scholarship and policy. Reviewers
              may also provide recommendations regarding language editing,
              additional literature, methodological improvements, or
              further analyses.
            </p>
          </PolicySection>

          <PolicySection icon={Gavel} title="Reviewer Recommendations & Editorial Decision">
            <p>Following evaluation, reviewers may recommend one of the following editorial decisions:</p>
            <ul>
              <li>Accept without revision</li>
              <li>Accept with minor revisions</li>
              <li>Major revisions required</li>
              <li>Reject but encourage resubmission as a substantially revised new manuscript</li>
              <li>Reject</li>
            </ul>
            <p>
              Reviewer recommendations are advisory — the final editorial
              decision remains the responsibility of the Editor-in-Chief,
              who considers reviewer recommendations, editorial assessment,
              methodological soundness, ethical compliance, and the
              manuscript&apos;s contribution to the field. When reviewer
              opinions differ substantially, the Editor-in-Chief may consult
              an Associate Editor, invite an additional independent
              reviewer, or request further revisions before making a final
              decision. Editorial decisions are communicated to the
              corresponding author together with anonymized reviewer
              comments.
            </p>
          </PolicySection>

          <PolicySection icon={RefreshCcw} title="Revision Process & Appeals">
            <p>
              Authors receiving requests for revision should submit a
              revised manuscript with tracked or highlighted changes and a
              detailed response letter addressing each reviewer comment
              individually. Revised manuscripts may be returned to the
              original reviewers for further evaluation, particularly when
              major revisions have been requested. Failure to submit
              revisions within the specified timeframe may result in
              administrative withdrawal of the manuscript unless an
              extension has been approved.
            </p>
            <p>
              Authors who believe an editorial decision resulted from a
              factual error or procedural irregularity may submit a written
              appeal within 30 days of receiving the decision, with clear
              justification and supporting evidence. The appeal is reviewed
              by the Editor-in-Chief or an independent editor not involved
              in the manuscript&apos;s original evaluation, and additional
              external reviewers may be consulted when appropriate. The
              outcome of the appeal is final.
            </p>
          </PolicySection>

          <PolicySection icon={Lock} title="Confidentiality & Conflicts of Interest">
            <p>
              All manuscripts submitted to GRPJ are confidential documents.
              Editors, reviewers, and editorial staff shall not disclose
              manuscript contents, share unpublished data, use unpublished
              information for personal research, distribute manuscripts to
              unauthorized individuals, or discuss submissions outside the
              editorial process. Confidentiality is maintained throughout
              the review process and after editorial decisions have been
              made.
            </p>
            <p>
              Editors and reviewers must disclose any actual, potential, or
              perceived conflicts of interest before accepting
              responsibility for a manuscript — arising from financial
              relationships, institutional affiliations, collaborative
              research, supervisory relationships, personal relationships,
              professional competition, or ideological commitments.
              Individuals with significant conflicts shall recuse themselves
              from the review process.
            </p>
          </PolicySection>

          <PolicySection icon={ShieldAlert} title="Ethical Concerns Identified During Review">
            <p>
              If reviewers suspect plagiarism, duplicate publication,
              fabricated or falsified data, unethical research practices,
              image manipulation, authorship disputes, undeclared conflicts
              of interest, or any other form of research misconduct, they
              should immediately notify the Editor-in-Chief and provide
              supporting evidence. The Editorial Board will then investigate
              these concerns in accordance with the journal&apos;s
              Publication Ethics and Research Integrity Policy and the
              relevant COPE guidance.
            </p>
          </PolicySection>

          <PolicySection icon={Award} title="Recognition of Reviewers">
            <p>
              GRPJ acknowledges the essential contribution of peer reviewers
              to maintaining the quality and integrity of scholarly
              publishing. The journal will issue certificates of reviewing
              upon request, acknowledge reviewers annually with their
              consent, and encourage reviewers to record completed reviews
              through recognized reviewer recognition platforms where
              appropriate. Reviewer identities remain confidential unless
              disclosure is expressly authorized by both the reviewer and
              the journal.
            </p>
          </PolicySection>
        </div>
      </section>
    </div>
  );
}
