import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, BookUser } from "lucide-react";
import { JournalTabs } from "@/components/journal/journal-tabs";
import { JournalPageHeader } from "@/components/journal/journal-page-header";
import { getReviewers } from "@/services/reviewer";
import type { Reviewer } from "@gad/types";
export const metadata: Metadata = {
  title: "Reviewer Database — GRPJ",
  description:
    "The international database of peer reviewers supporting the Gender Research and Policy Journal (GRPJ), published by RGAN XI.",
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

// type Reviewer = {
//   name: string;
//   affiliation: string;
// };

// const reviewers: Reviewer[] = [
//   {
//     name: "Glory Dee A. Romo",
//     affiliation: "University of the Philippines Mindanao, Philippines",
//   },
//   {
//     name: "Ricksterlie C. Verzosa",
//     affiliation: "Davao Oriental State University, Philippines",
//   },
//   {
//     name: "Randy A. Tudy",
//     affiliation: "University of Southeastern Philippines, Philippines",
//   },
//   {
//     name: "Romeo Toring Jr.",
//     affiliation: "Eikei University, Japan",
//   },
//   {
//     name: "Mark Aljen D. Binocal",
//     affiliation: "Davao Oriental State University, Philippines",
//   },
//   {
//     name: "Leo D. Rayon",
//     affiliation: "Davao del Norte State College, Philippines",
//   },
//   {
//     name: "Daniel Fritz V. Silvallana",
//     affiliation:
//       "Davao del Norte State College, Philippines / Deakin University, Australia",
//   },
//   {
//     name: "Ronel G. Dagohoy",
//     affiliation:
//       "Kapalong College of Agriculture, Sciences and Technology, Philippines",
//   },
//   {
//     name: "Elsa May D. Baron",
//     affiliation: "San Pedro College, Philippines",
//   },
//   {
//     name: "Robie V. Catubigan",
//     affiliation: "Davao Oriental State University, Philippines",
//   },
//   {
//     name: "Rose Anelyn V. Ceniza",
//     affiliation: "Davao Oriental State University, Philippines",
//   },
//   {
//     name: "Klent Rodni M. Delima",
//     affiliation: "Hiraya-Diwa Psychological Services, Philippines",
//   },
//   {
//     name: "Aimee Lynn B. Dupo",
//     affiliation: "University of the Philippines - Los Baños, Philippines",
//   },
//   {
//     name: "Milton Norman D. Medina",
//     affiliation: "Davao Oriental State University, Philippines",
//   },
// ];

export function formatName(reviewer: Reviewer): string {
  const middle = reviewer.middlename ? ` ${reviewer.middlename}` : "";
  return `${reviewer.firstname}${middle} ${reviewer.lastname}`.trim();
}

export default async function ReviewersPage() {
  const reviewers = await getReviewers();
  // console.log(reviewer);

  return (
    <div className="pt-20">
      <JournalPageHeader
        eyebrow="People & Contact"
        title="Reviewer Database"
        description="The international pool of peer reviewers who support GRPJ's editorial standards across diverse gender research disciplines."
      />

      <JournalTabs />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/journal/editorial-board"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Editorial Board
          </Link>

          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BookUser className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold">Reviewers</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {reviewers.map((reviewer, i) => (
              <div
                key={reviewer.id}
                className="group bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white font-display font-bold mb-4 group-hover:scale-105 transition-transform`}
                >
                  {"GD"}
                </div>
                <h3 className="font-display font-bold text-base leading-tight">
                  {formatName(reviewer)}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {reviewer.school}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-foreground text-background rounded-3xl p-10 lg:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl font-bold mb-2">
                Join the Reviewer Database
              </h2>
              <p className="text-background/70 leading-relaxed text-sm max-w-xl">
                If you are interested in being part of GRPJ&apos;s external
                reviewers, please reach out to us via email.
              </p>
            </div>
            <a
              href="mailto:journal.grp@gmail.com"
              className="inline-flex items-center gap-2 gad-gradient text-white font-medium text-sm px-5 py-3 rounded-full shrink-0 hover:opacity-90 transition-opacity"
            >
              <Mail className="h-4 w-4" />
              journal.grp@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
