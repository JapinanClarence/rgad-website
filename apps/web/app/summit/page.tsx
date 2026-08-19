"use client";

import { useEffect, useState } from "react";
import { CalendarDays, ImagePlus, MapPin, Users } from "lucide-react";
import { Skeleton } from "@gad/ui";
import { getSummits } from "@/services/summit";

type Summit = {
  year: string;
  host: string;
  location: string;
  date: string;
  theme: string;
  summary: string;
  details: string[];
  outcomes: string[];
  note?: string;
  images?: string[];
};

/* Static archive content retired in favor of the Supabase summit table.
  {
    year: "2025",
    host: "University of Southeastern Philippines (USeP)",
    location: "Obrero Campus, Davao City",
    date: "November 25–26, 2025",
    theme: "Gender Justice and the Digital Age",
    summary:
      "The third Regional GAD Summit convened GAD directors, focal persons, researchers, and faculty members from higher education institutions across Region XI to examine gender justice in an increasingly digital society.",
    details: [
      "Four plenary conversations considered campus justice and CODI institutionalization, legal protections against gender-based violence online and offline, bias and ethics in AI, and the role of research in advocacy.",
      "The gathering also served as the regional kick-off for the 18-Day Campaign to End Violence Against Women, bringing institutional commitments into public conversation.",
    ],
    outcomes: [
      "Launch of the Gender Research and Policy Journal (GRPJ)",
      "Four plenary sessions on justice, safety, and technology",
      "Regional launch of the 18-Day Campaign to End VAW",
      "GAD extension poster exhibit",
    ],
    note: "RGAN XI launched the Gender Research and Policy Journal (GRPJ) during this summit—its first standing scholarly publication.",
  },
  {
    year: "2024",
    host: "Davao del Norte State College (DNSC)",
    location: "Panabo City",
    date: "2024 archive",
    theme: "Regional GAD Summit 2024",
    summary:
      "The 2024 summit brought Region XI partners together in Panabo City for another year of shared learning, institutional collaboration, and gender-responsive action.",
    details: [
      "Programme details, speakers, and summit outputs will be added to this archive as they are digitized.",
    ],
    outcomes: ["Summit programme and proceedings to be added"],
  },
  {
    year: "2023",
    host: "Davao Oriental State University (DOrSU)",
    location: "City of Mati",
    date: "2023 archive",
    theme: "Regional GAD Summit 2023",
    summary:
      "Hosted in the City of Mati, the inaugural archive entry reflects the network’s continuing commitment to regional cooperation on gender and development.",
    details: [
      "Photos, programme materials, and summit highlights will be added as the archive is completed.",
    ],
    outcomes: ["Summit programme and proceedings to be added"],
  },
*/

function SummitSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading summit archive"
      className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20"
      role="status"
    >
      <aside>
        <Skeleton className="mb-6 h-3 w-28" />
        <div className="space-y-7 border-l-2 border-primary/15 pl-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="space-y-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-40" />
            </div>
          ))}
        </div>
      </aside>
      <article className="min-w-0">
        <div className="mb-7 flex flex-wrap gap-2.5">
          <Skeleton className="h-9 w-64 rounded-full" />
          <Skeleton className="h-9 w-48 rounded-full" />
          <Skeleton className="h-9 w-44 rounded-full" />
        </div>
        <Skeleton className="h-12 w-full max-w-3xl sm:h-14" />
        <Skeleton className="mt-3 h-12 w-3/4 max-w-2xl sm:h-14" />
        <div className="mt-9 grid gap-10 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="mt-6 h-5 w-full" />
            <Skeleton className="h-5 w-10/12" />
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <Skeleton className="h-4 w-28" />
            <div className="mt-6 space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
        <Skeleton className="mt-14 h-4 w-28" />
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="aspect-[4/3] w-full rounded-xl" />
          ))}
        </div>
      </article>
    </div>
  );
}

export default function SummitPage() {
  const [remoteSummits, setRemoteSummits] = useState<Summit[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getSummits()
      .then((data) => {
        setRemoteSummits(data);
        setSelectedYear(data[0]?.year ?? "");
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const summit =
    remoteSummits.find(({ year }) => year === selectedYear) ?? remoteSummits[0];
  console.log("Summit data:", summit);
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
        {hasError && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
          >
            Summit records could not be loaded. Please try again later.
          </p>
        )}
        {isLoading && <SummitSkeleton />}
        {!isLoading && !hasError && !summit && (
          <p className="text-muted-foreground">
            No summit records have been published yet.
          </p>
        )}
        {summit && (
          <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
            <aside aria-label="Summit archive">
              <p className=" text-xs uppercase tracking-[0.16em] text-muted-foreground mb-6">
                GAD Summit archive
              </p>
              <div className="relative ml-2 border-l-2 border-primary/15 space-y-7">
                {remoteSummits.map((item) => {
                  const isSelected = item.year === selectedYear;
                  return (
                    <button
                      key={item.year}
                      type="button"
                      onClick={() => setSelectedYear(item.year)}
                      className="group relative block -ml-[0.7rem] w-full pl-8 text-left"
                      aria-current={isSelected ? "true" : undefined}
                    >
                      <span
                        className={`absolute left-0 top-1 h-5 w-5 rounded-full border-4 border-[#fbfbfd] transition-colors ${isSelected ? "bg-secondary shadow-[0_0_0_4px_rgba(236,72,153,0.15)]" : "bg-white ring-1 ring-border group-hover:ring-primary/50"}`}
                      />
                      <span
                        className={`block font-display text-3xl font-bold leading-none transition-colors ${isSelected ? "text-primary" : "text-foreground/55 group-hover:text-primary"}`}
                      >
                        {item.year}
                      </span>
                      <span className="mt-1 block  text-xs leading-5 text-muted-foreground">
                        {item.host.replace(/\s\(.+\)/, "")} · {item.location}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <article key={summit.year} className="animate-fade-up min-w-0">
              <div className="flex flex-wrap gap-2.5 mb-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2  text-xs text-primary-foreground">
                  <Users className="h-3.5 w-3.5" /> Host: {summit.host}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2  text-xs text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 text-secondary" />{" "}
                  {summit.date}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2  text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-secondary" />{" "}
                  {summit.location}
                </span>
              </div>

              <h2 className="max-w-4xl font-display text-4xl leading-tight sm:text-5xl font-bold text-foreground">
                “{summit.theme}”
              </h2>

              <div className="mt-9 grid gap-10 xl:grid-cols-[minmax(0,1fr)_22rem]">
                <div className="max-w-2xl space-y-6 text-[1.05rem] leading-8 text-foreground/85">
                  <p>{summit.summary}</p>
                  {summit.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                  {summit.note && (
                    <blockquote className="border-l-4 border-secondary pl-5 py-1 font-display text-xl italic leading-8 text-primary">
                      {summit.note}
                    </blockquote>
                  )}
                </div>

                <section
                  className="h-fit rounded-2xl border border-border bg-white p-6 shadow-sm"
                  aria-labelledby="outcomes-heading"
                >
                  <h3
                    id="outcomes-heading"
                    className="font-display font-bold uppercase text-md mb-6 text-secondary"
                  >
                    Key outcomes
                  </h3>
                  <ul className="mt-5 space-y-4 text-sm leading-6 text-foreground/85">
                    {summit.outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="mt-14" aria-labelledby="photos-heading">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <h3
                    id="photos-heading"
                    className=" text-sm font-medium uppercase  text-primary"
                  >
                    Photos — {summit.year}
                  </h3>
                  {/* <p className=" text-xs text-muted-foreground">
                  Add images to{" "}
                  <code>/public/images/summit-{summit.year}/</code>
                </p> */}
                </div>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {summit.images?.length
                    ? summit.images.map((image, index) => (
                        <img
                          key={image}
                          src={image}
                          alt={`Summit ${summit.year} photo ${index + 1}`}
                          className="aspect-[4/3] w-full rounded-xl border border-border object-cover"
                        />
                      ))
                    : [1, 2, 3].map((slot) => (
                        <div
                          key={slot}
                          className="aspect-[4/3] rounded-xl border border-dashed border-primary/25 bg-primary/[0.025] flex flex-col items-center justify-center text-center px-5"
                        >
                          <ImagePlus className="h-6 w-6 text-secondary/70" />
                          <p className="mt-3  text-xs text-muted-foreground">
                            Photo {slot} placeholder
                          </p>
                        </div>
                      ))}
                </div>
              </section>
            </article>
          </div>
        )}
      </section>
    </div>
  );
}
