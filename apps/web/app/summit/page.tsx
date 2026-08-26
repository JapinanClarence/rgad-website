import { getSummits } from "@/services/summit";
import { SummitExplorer } from "@/components/summit/summit-explorer";

export default async function SummitPage() {
  let summits: Awaited<ReturnType<typeof getSummits>> = [];
  let hasError = false;

  try {
    summits = await getSummits();
  } catch {
    hasError = true;
  }

  return (
    <div className="pt-20">
      <section className="hero-pattern  py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
            Regional Gender and Development Summit
          </p>
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              One summit, every year, a region{" "}
              <span className="text-gradient">moving forward together.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Each Regional GAD Summit is hosted by a different member
              institution across Region XI. Choose a year to revisit its theme,
              host, outcomes, and photo story.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {hasError ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
          >
            Summit records could not be loaded. Please try again later.
          </p>
        ) : (
          <SummitExplorer summits={summits} />
        )}
      </section>
    </div>
  );
}
