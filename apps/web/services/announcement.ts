import type { Announcement } from "@gad/types/announcement";

// TODO: replace with a Supabase-backed query (see services/issue.ts and
// services/reviewer.ts for the pattern) once the `announcements` table
// exists. Keeping the same async signatures now means the pages won't need
// to change when that happens.
const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    slug: "grpj-call-for-papers-vol-3-no-1",
    title: "Call for Papers: GRPJ Volume 3, Issue 1 now accepting submissions",
    description:
      "The Gender Research and Policy Journal is inviting researchers, practitioners, and graduate students across Region XI to submit original manuscripts on gender mainstreaming, policy studies, and inclusive development. Submissions undergo double blind peer review under the editorial leadership of Asst. Prof. Jhonnel P. Villegas of Davao Oriental State University. Authors are encouraged to review the journal's submission guidelines and peer review policy before sending their manuscripts. The editorial board welcomes contributions that advance evidence-based advocacy and shape the regional gender research agenda.",
    publishedAt: "2026-08-15",
    isPinned: true,
  },
  {
    id: "2",
    slug: "2026-regional-gad-summit-registration-open",
    title: "Registration is now open for the 2026 Regional GAD Summit",
    description:
      "Join fellow advocates, focal persons, and institutional partners across Region XI for a full day of plenaries, workshops, and networking. This year's summit builds on the momentum of the 2023 Mati Summit, the 2024 Panabo gathering, and the 2025 USeP summit that launched the Gender Research and Policy Journal. Sessions will cover campus justice, digital age gender issues, and continuing efforts to move GAD from paper to practice. Early bird registration closes September 30, and seats are limited for member institutions and their delegates.",
    publishedAt: "2026-08-10",
    isPinned: true,
  },
  {
    id: "3",
    slug: "reviewer-database-now-open",
    title: "RGAN XI opens its external reviewer database to new applicants",
    description:
      "GRPJ is expanding its pool of peer reviewers across gender studies, education, public policy, and the social sciences. Qualified academics and practitioners from higher education institutions, government agencies, and civil society organizations in and beyond Region XI are encouraged to apply. Reviewers help uphold the journal's double blind review process and contribute to strengthening the quality and rigor of published research. Interested applicants may submit their credentials and areas of expertise through the journal's reviewer application form.",
    publishedAt: "2026-07-28",
  },
  {
    id: "4",
    slug: "grpj-volume-2-issue-2-published",
    title: "GRPJ Volume 2, Issue 2 has been published",
    description:
      "The latest issue features six peer-reviewed articles on gender-responsive governance, indigenous women's participation, and inclusive higher education policy in Mindanao. Contributing authors represent member institutions from across Region XI, reflecting the Network's growing role as a venue for evidence-based gender scholarship. The full issue, including abstracts, citations, and downloadable PDFs, is now available on the journal's archive page. Readers are encouraged to explore the issue and share it with colleagues working on gender and development research.",
    publishedAt: "2026-06-30",
  },
  {
    id: "5",
    slug: "new-member-institutions-welcomed",
    title: "RGAN XI welcomes three new member institutions",
    description:
      "The Network formally welcomed three additional state colleges to its growing coalition of higher education institutions committed to gender and development work across the region. The new members join founding partners Davao Oriental State University, Davao del Norte State College, Davao de Oro State College, Davao del Sur State College, SPAMAST, and the University of Southeastern Philippines. Their inclusion widens the base of institutional collaboration behind the Network's research, capacity building, and policy advocacy programs.",
    publishedAt: "2026-06-12",
  },
  {
    id: "6",
    slug: "gad-focal-persons-training-schedule",
    title: "Schedule released for the 2026 GAD Focal Persons training series",
    description:
      "A four part capacity building series for institutional GAD focal persons begins this September, covering gender mainstreaming, GAD planning and budgeting, and monitoring and evaluation. The series is designed to strengthen institutional capacities in line with the Network's Capacity Development program and CHED policies on Gender and Development. Focal persons from member institutions are encouraged to register early, as slots per institution are limited to ensure a participatory, workshop style format.",
    publishedAt: "2026-05-20",
  },
  {
    id: "7",
    slug: "peer-review-policy-updated",
    title: "GRPJ updates its peer review policy",
    description:
      "The editorial board has revised the journal's peer review policy to clarify review timelines, conflict of interest disclosures, and the double blind review process. The update responds to feedback gathered from reviewers and authors since the journal's launch at the 2025 Regional GAD Summit. Authors currently preparing manuscripts are advised to consult the revised policy on the journal's website before submission. The editorial board thanks the reviewer community for its continued contributions to the journal's quality.",
    publishedAt: "2026-04-18",
  },
];

export async function getAnnouncements(): Promise<Announcement[]> {
  return [...MOCK_ANNOUNCEMENTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getAnnouncementBySlug(
  slug: string,
): Promise<Announcement | null> {
  const announcement = MOCK_ANNOUNCEMENTS.find((a) => a.slug === slug);
  return announcement ?? null;
}
