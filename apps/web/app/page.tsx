import { HeroSection } from "@/components/home/hero-section";
import { ResearchAreasSection } from "@/components/home/research-areas-section";
import { FeaturedArticlesSection } from "@/components/home/featured-articles-section";
import { MissionSection } from "@/components/home/mission-section";
import Link from "next/link";
import { Button } from "@gad/ui/button";
import { ArrowRight } from "lucide-react";
import { getIssueById, getIssues } from "@/services/issue";

export default async function HomePage() {
  const issues = await getIssues();
  const currentIssue = issues.find((i) => i.isCurrent) ?? issues[0];
  const result = await getIssueById(currentIssue.id);

  return (
    <>
      <HeroSection issue={result.issue} articles={result.articles} />
      <ResearchAreasSection />
      <FeaturedArticlesSection />
      <MissionSection />

      {/* Newsletter / CTA Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gad-gradient rounded-3xl p-10 lg:p-16 text-white text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
                Stay at the frontier of GAD research
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Access our full library of peer-reviewed studies, policy briefs,
                and advocacy tools — all free and open access.
              </p>
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-primary hover:bg-white/90 border-white"
                asChild
              >
                <Link href="/issue/archive">
                  Browse All Research <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
