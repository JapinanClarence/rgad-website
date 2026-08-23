import React from "react";
import type { Metadata } from "next";
import { Workflow, Clock3, ShieldCheck } from "lucide-react";
import { JournalTabs } from "@/components/journal/journal-tabs";
import { JournalPageHeader } from "@/components/journal/journal-page-header";
import { PolicySection } from "@/components/journal/policy-section";

export const metadata: Metadata = {
  title: "Submission & Publication Workflow — GRPJ",
  description:
    "The 14-step editorial workflow, from manuscript submission through post-publication monitoring, for the Gender Research and Policy Journal (GRPJ).",
};

const steps = [
  {
    n: 1,
    title: "Manuscript Submission",
    desc: "Authors submit the manuscript to the Editor-in-Chief through email at journal.grp@gmail.com.",
  },
  {
    n: 2,
    title: "Administrative Screening",
    desc: "The Editorial Office verifies completeness of submission files, manuscript formatting, adherence to author guidelines, completeness of declarations, anonymization, reference formatting, and quality of figures and tables. Manuscripts that do not meet these requirements may be returned for technical revision.",
  },
  {
    n: 3,
    title: "Editorial Screening (Desk Evaluation)",
    desc: "The Editor-in-Chief or an assigned Associate Editor evaluates relevance to scope, originality, scholarly significance, methodological quality, language clarity, ethical compliance, and overall readiness for peer review. Manuscripts may be desk-rejected at this stage.",
  },
  {
    n: 4,
    title: "Similarity Screening",
    desc: "Before external review, manuscripts are screened using plagiarism detection software. Where concerns arise, authors may be asked for clarification or to revise before peer review.",
  },
  {
    n: 5,
    title: "Reviewer Selection",
    desc: "The handling editor invites at least two independent reviewers with relevant expertise, selected for subject expertise, publication record, reviewing experience, absence of conflicts of interest, and availability.",
  },
  {
    n: 6,
    title: "Double-Blind Peer Review",
    desc: "Reviewers independently evaluate originality, significance, methodological rigor, ethical compliance, presentation of results, discussion and conclusions, quality of references, and overall contribution to scholarship and policy.",
  },
  {
    n: 7,
    title: "Editorial Decision",
    desc: "Following peer review, the handling editor evaluates reviewer reports and recommends an editorial decision. The Editor-in-Chief makes the final decision.",
  },
  {
    n: 8,
    title: "Author Revision",
    desc: "When revisions are requested, authors submit a revised manuscript, a point-by-point response to reviewer comments, revised supplementary materials, and an explanation when a recommendation is not adopted. Extensions may be granted upon reasonable request.",
  },
  {
    n: 9,
    title: "Secondary Evaluation",
    desc: "Revised manuscripts are evaluated by the handling editor. For major revisions, the revised version may be returned to the original reviewers, and additional revisions may be requested when necessary.",
  },
  {
    n: 10,
    title: "Final Acceptance",
    desc: "When all editorial and reviewer concerns have been satisfactorily addressed, the Editor-in-Chief issues a formal acceptance decision and authors receive an official acceptance notification.",
  },
  {
    n: 11,
    title: "Copyediting",
    desc: "Accepted manuscripts undergo professional copyediting to improve grammar, spelling, punctuation, consistency, formatting, references, and adherence to journal style, without altering scientific content.",
  },
  {
    n: 12,
    title: "Typesetting and Proof Production",
    desc: "Manuscripts are professionally typeset for publication. The corresponding author receives page proofs to verify formatting, figures, tables, equations, references, author information, and typographical accuracy. Only minor corrections are permitted at this stage.",
  },
  {
    n: 13,
    title: "Publication",
    desc: "Following approval of the proof, each published article receives final citation details, page numbers or article number, a DOI where available, a publication date, and online publication in the journal archive. GRPJ follows a continuous publication model — accepted articles are published online individually as soon as they are ready, rather than waiting to be grouped into a scheduled issue.",
  },
  {
    n: 14,
    title: "Post-Publication",
    desc: "The Editorial Office monitors published articles for requests for corrections, ethical concerns, reader comments, post-publication discussions, allegations of misconduct, and citation and indexing records, publishing errata, corrigenda, expressions of concern, or retractions where appropriate.",
  },
];

const timeline = [
  ["Submission acknowledgment", "Within 2 working days"],
  ["Administrative screening", "3–5 working days"],
  ["Editorial screening", "Within 7 working days"],
  ["Similarity screening", "Concurrent with editorial screening"],
  ["Reviewer invitation", "Within 7 days"],
  ["Peer review", "21–28 days"],
  ["Editorial decision", "Within 14 days after review"],
  ["Minor revision by authors", "Within 14 days"],
  ["Major revision by authors", "Within 30 days"],
  ["Final acceptance", "Within 14 days after satisfactory revision"],
  ["Copyediting and typesetting", "7–14 days"],
  ["Author proof review", "Within 5 working days"],
  ["Online publication", "As soon as practicable after proof approval"],
];

export default function WorkflowPage() {
  return (
    <div className="pt-20">
      <JournalPageHeader
        eyebrow="Editorial Process"
        title="Submission & Publication Workflow"
        description="From manuscript submission to online publication, GRPJ follows a 14-step editorial workflow designed to be efficient, fair, and transparent."
      />

      <JournalTabs />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Workflow className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold">
              Editorial Workflow
            </h2>
          </div>

          <ol className="relative border-l-2 border-border ml-4 space-y-8 mb-16">
            {steps.map((step) => (
              <li key={step.n} className="pl-8 relative">
                <span className="absolute -left-[calc(1rem+9px)] top-0 w-8 h-8 rounded-full gad-gradient text-white text-sm font-display font-bold flex items-center justify-center shadow-sm">
                  {step.n}
                </span>
                <h3 className="font-display font-bold text-lg mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>

          <PolicySection icon={Clock3} title="Workflow Timeline">
            <p>
              The journal strives to complete the editorial process
              efficiently while maintaining rigorous peer-review standards.
              These timelines are targets and may vary depending on reviewer
              availability, manuscript complexity, and the extent of
              revisions required.
            </p>
            <div className="not-prose overflow-x-auto rounded-xl border border-border mt-4">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">Editorial Stage</th>
                    <th className="text-left font-semibold px-4 py-3">Target Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {timeline.map(([stage, target]) => (
                    <tr key={stage}>
                      <td className="px-4 py-3 text-foreground">{stage}</td>
                      <td className="px-4 py-3 text-muted-foreground">{target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PolicySection>

          <div className="mt-6">
            <PolicySection icon={ShieldCheck} title="Commitment to Timeliness and Transparency">
              <p>
                GRPJ is committed to maintaining an efficient, fair, and
                transparent editorial process. Authors are kept informed at
                every stage of manuscript handling, and all editorial
                decisions are communicated promptly with clear explanations
                and anonymized reviewer feedback. The journal continuously
                monitors its editorial performance and reviews its
                procedures to ensure alignment with internationally
                recognized best practices in scholarly publishing.
              </p>
            </PolicySection>
          </div>
        </div>
      </section>
    </div>
  );
}
