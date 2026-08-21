import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Calendar, User, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Research Articles",
  description:
    "Browse our full library of gender and development research, policy briefs, and studies.",
};

const CATEGORIES = [
  "All",
  "Gender Policy",
  "Women Empowerment",
  "Social Inclusion",
  "Governance",
  "Education",
  "VAWC",
  "Legal Framework",
];

const categoryColors: Record<string, string> = {
  "Gender Policy": "bg-purple-100 text-purple-700",
  "Women Empowerment": "bg-rose-100 text-rose-700",
  "Social Inclusion": "bg-blue-100 text-blue-700",
  Governance: "bg-teal-100 text-teal-700",
  Education: "bg-amber-100 text-amber-700",
  VAWC: "bg-red-100 text-red-700",
  "Legal Framework": "bg-green-100 text-green-700",
};

// Fallback sample articles if Supabase returns empty
const SAMPLE_ARTICLES = [
  {
    id: "1",
    slug: "intersectionality-philippine-gender-policy",
    title: "Intersectionality in Philippine Gender Policy: A Systematic Review",
    excerpt:
      "This study examines how intersecting identities shape access to social protection programs, revealing critical gaps in current GAD-mainstreaming strategies.",
    category: "Gender Policy",
    author: "Dr. Maria Santos",
    published_at: "2024-05-15",
  },
  {
    id: "2",
    slug: "gad-budget-utilization-lgu",
    title: "GAD Budget Utilization and LGU Compliance: A National Assessment",
    excerpt:
      "An evaluation of local government unit compliance with RA 9710 mandates and the actual utilization of the 5% GAD budget allocation across 15 regions.",
    category: "Governance",
    author: "Atty. Rosa Dela Cruz",
    published_at: "2024-04-02",
  },
  {
    id: "3",
    slug: "indigenous-women-ancestral-domain",
    title: "Indigenous Women and Ancestral Domain Rights in Mindanao",
    excerpt:
      "A qualitative study on the lived experiences of Lumad women navigating land rights, customary law, and national gender legislation.",
    category: "Social Inclusion",
    author: "Dr. Elena Matubang",
    published_at: "2024-03-18",
  },
  {
    id: "4",
    slug: "magna-carta-women-implementation",
    title: "Implementation Gaps in the Magna Carta of Women: A Decade Review",
    excerpt:
      "Ten years after RA 9710s passage, this study assesses compliance levels across national agencies and identifies persistent implementation barriers.",
    category: "Legal Framework",
    author: "Atty. Rosa Dela Cruz",
    published_at: "2024-02-10",
  },
  {
    id: "5",
    slug: "vawc-reporting-barriers-rural",
    title: "Barriers to VAWC Reporting in Rural Philippine Communities",
    excerpt:
      "Community-based research in three provinces reveals systemic, cultural, and logistical barriers that prevent survivors from accessing legal protection.",
    category: "VAWC",
    author: "Prof. Jose Reyes",
    published_at: "2024-01-25",
  },
  {
    id: "6",
    slug: "gender-responsive-education-davao",
    title: "Gender-Responsive Pedagogy in Davao Region Public Schools",
    excerpt:
      "An action research project on the integration of GAD perspectives into classroom instruction, teacher training, and school policy.",
    category: "Education",
    author: "Dr. Ana Flores",
    published_at: "2023-12-05",
  },
];

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const articles = SAMPLE_ARTICLES; // Fallback to sample articles

  const activeCategory = searchParams.category || "All";

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
            Knowledge Base
          </p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4">
            Research Articles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Peer-reviewed studies, policy analyses, and field research on gender
            and development in the Philippines.
          </p>
        </div>
      </section>

      <section className="py-10 border-b border-border sticky top-16 bg-background/95 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={
                cat === "All"
                  ? "/articles"
                  : `/articles?category=${encodeURIComponent(cat)}`
              }
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group bg-white rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className="h-3 w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(270,72%,40%), hsl(338,85%,50%))",
                    opacity: 0.7,
                  }}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[article.category] || "bg-primary/10 text-primary"}`}
                    >
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(article.published_at)}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-3">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <User className="h-3.5 w-3.5" />
                    <span>{article.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
