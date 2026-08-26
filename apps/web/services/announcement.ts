import type { Announcement } from "@gad/types/announcement";

// TODO: replace with a Supabase-backed query (see services/issue.ts and
// services/reviewer.ts for the pattern) once the `announcements` table
// exists. Keeping the same async signature now means the page won't need
// to change when that happens.
const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    slug: "grpj-call-for-papers-vol-3-no-1",
    title: "Call for Papers: GRPJ Volume 3, Issue 1 now accepting submissions",
    excerpt:
      "The Gender Research and Policy Journal is inviting researchers, practitioners, and graduate students to submit original manuscripts on gender mainstreaming, policy studies, and inclusive development for its upcoming issue.",
    category: "Call for Papers",
    publishedAt: "2026-08-15",
    isPinned: true,
  },
  {
    id: "2",
    slug: "2026-regional-gad-summit-registration-open",
    title: "Registration is now open for the 2026 Regional GAD Summit",
    excerpt:
      "Join fellow advocates, focal persons, and institutional partners across Region XI for a full day of plenaries, workshops, and networking. Early-bird registration closes September 30.",
    category: "Event",
    publishedAt: "2026-08-10",
    isPinned: true,
  },
  {
    id: "3",
    slug: "reviewer-database-now-open",
    title: "RGAN XI opens its external reviewer database to new applicants",
    excerpt:
      "GRPJ is expanding its pool of peer reviewers across gender studies, education, public policy, and the social sciences. Qualified academics and practitioners are encouraged to apply.",
    category: "Membership",
    publishedAt: "2026-07-28",
  },
  {
    id: "4",
    slug: "grpj-volume-2-issue-2-published",
    title: "GRPJ Volume 2, Issue 2 has been published",
    excerpt:
      "The latest issue features six peer-reviewed articles on gender-responsive governance, indigenous women's participation, and inclusive higher education policy in Mindanao.",
    category: "Publication",
    publishedAt: "2026-06-30",
  },
  {
    id: "5",
    slug: "new-member-institutions-welcomed",
    title: "RGAN XI welcomes three new member institutions",
    excerpt:
      "The Network formally welcomed three additional state colleges to its growing coalition of higher education institutions committed to gender and development work across the region.",
    category: "Membership",
    publishedAt: "2026-06-12",
  },
  {
    id: "6",
    slug: "gad-focal-persons-training-schedule",
    title: "Schedule released for the 2026 GAD Focal Persons training series",
    excerpt:
      "A four-part capacity-building series for institutional GAD focal persons begins this September, covering gender mainstreaming, GAD planning and budgeting, and monitoring and evaluation.",
    category: "Event",
    publishedAt: "2026-05-20",
  },
  {
    id: "7",
    slug: "peer-review-policy-updated",
    title: "GRPJ updates its peer review policy",
    excerpt:
      "The editorial board has revised the journal's peer review policy to clarify review timelines, conflict-of-interest disclosures, and the double-blind review process.",
    category: "General",
    publishedAt: "2026-04-18",
  },
];

export async function getAnnouncements(): Promise<Announcement[]> {
  return [...MOCK_ANNOUNCEMENTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
