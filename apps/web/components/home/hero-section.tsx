import React from "react";
import Link from "next/link";
import { Button } from "@gad/ui/button";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Calendar,
  Hash,
} from "lucide-react";
import { formatDate, formatDateShort, formatYear } from "@/lib/utils";
import type { Issue, IssueArticle } from "@gad/types/issue";

const stats = [
  { icon: BookOpen, value: "200+", label: "Research Articles" },
  { icon: Users, value: "50+", label: "Researchers" },
  { icon: Award, value: "3+", label: "Years of Advocacy" },
];

// Fallback current issue if Supabase returns empty — mirrors the structure
// used on /issue and /issue/[id] for local/dev preview.
const CURRENT_ISSUE = {
  id: "v2i1",
  volume: 2,
  issue_no: 1,
  title: "Volume 2, Issue 1",
  theme: "Beyond Gender Mainstreaming: New Frontiers in Policy and Practice",
  doi: "10.63346/RGANXI.2025.0201",
  cover_image: null,
  editorial: `
<p>This issue arrives at a moment when Gender and Development practice across Region XI is being asked to move past compliance and toward genuine institutional transformation. The five studies gathered here take up that challenge from different vantage points — budget governance, indigenous land rights, education, legal implementation, and community-based reporting systems.</p>
  `,
  editorial_author: "Dr. Mary Fil M. Bauyot",
  pdf_url: null,
  is_current: true,
  published_at: "2025-06-15",
  created_at: "2025-06-15",
};

const CURRENT_ISSUE_ARTICLE_COUNT = 4;

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

interface HeroSectionProps {
  issue: Issue;
}

export function HeroSection({ issue }: HeroSectionProps) {
  const articleCount = CURRENT_ISSUE_ARTICLE_COUNT;
  const editorialExcerpt = issue.editorial
    ? stripHtml(issue.editorial).slice(0, 150).trim() + "…"
    : "Peer-reviewed studies, policy analyses, and field research from across Region XI.";
  const [editorialName, editorialRole] = (
    issue.editorialAuthor ?? "RGAN XI Editorial Board"
  )
    .split(",")
    .map((part) => part.trim());

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden hero-pattern">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-40 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />

        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(270,72%,40%) 1px, transparent 1px), linear-gradient(90deg, hsl(270,72%,40%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating shapes */}
        <div className="absolute top-32 right-[15%] w-3 h-3 rounded-full bg-primary/30 animate-pulse" />
        <div
          className="absolute top-48 right-[25%] w-2 h-2 rounded-full bg-secondary/40 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 left-[10%] w-4 h-4 rounded-full bg-accent/20 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center py-16">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6 animate-slide-in">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Est. 2023 · Region XI's GAD Advocates Network
            </div>

            <h1 className="font-display text-5xl lg:text-6xl xl:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
              Advocating <span className="text-gradient">gender equality</span>{" "}
              beyond{" "}
              <em className="not-italic text-secondary"> mainstreaming</em>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              The Region XI Gender and Development Advocates Network builds
              evidence-based research and cross-sector partnerships that turn
              gender advocacy into lasting policy and institutional change.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="gad" size="lg" asChild className="group">
                <Link href="/journal">
                  Gender Research and Policy Journal
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Explore RGAN XI</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-2xl leading-tight">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            {/* Main card */}
            <Link
              href={`/issue/${issue.id}`}
              className="relative block bg-white rounded-3xl shadow-2xl border border-border/50 p-8 overflow-hidden hover:shadow-primary/10 transition-shadow"
            >
              <div className="absolute top-0 left-0 right-0 h-1 gad-gradient" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    Current Issue
                  </span>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>

                <h3 className="font-display text-xl font-bold leading-snug">
                  {`Vol. ${issue.volume} No. ${issue.issueNo} (${formatYear(issue.publishedAt)}) Gender Research and Policy Journal`}
                </h3>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    Vol. {issue.volume}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    Issue {issue.issueNo}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    Peer-Reviewed
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {editorialExcerpt}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary" />
                    <div>
                      <p className="text-xs font-medium">{editorialName}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {editorialRole ?? "Editor"}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDateShort(issue.publishedAt)}
                  </span>
                </div>
              </div>
            </Link>

            {/* Floating accent cards */}
            {/* <div
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-border/50 p-4 w-44 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                <Hash className="h-3 w-3" />
                DOI
              </p>
              <p className="text-sm font-display font-semibold leading-snug break-all">
                {issue.doi ?? "Pending assignment"}
              </p>
            </div> */}

            <div
              className="absolute -top-4 -right-4 bg-primary rounded-2xl shadow-xl p-4 w-36 text-white animate-fade-up"
              style={{ animationDelay: "0.6s" }}
            >
              <p className="text-3xl font-display font-bold">{articleCount}</p>
              <p className="text-xs text-white/80 flex items-center gap-1">
                {/* <Calendar className="h-3 w-3" /> */}
                articles in this issue
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
