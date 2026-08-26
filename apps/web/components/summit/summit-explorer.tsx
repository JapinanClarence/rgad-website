"use client";

import { useState } from "react";
import { CalendarDays, ImagePlus, MapPin, Users } from "lucide-react";
import type { Summit } from "@gad/types/summit";

export function SummitExplorer({ summits }: { summits: Summit[] }) {
  const [selectedYear, setSelectedYear] = useState(summits[0]?.year ?? "");

  const summit =
    summits.find(({ year }) => year === selectedYear) ?? summits[0];

  if (!summit) {
    return (
      <p className="text-muted-foreground">
        No summit records have been published yet.
      </p>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
      <aside aria-label="Summit archive">
        <p className=" text-xs uppercase tracking-[0.16em] text-muted-foreground mb-6">
          GAD Summit archive
        </p>
        <div className="relative ml-2 border-l-2 border-primary/15 space-y-7">
          {summits.map((item) => {
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
            <MapPin className="h-3.5 w-3.5 text-secondary" /> {summit.location}
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
  );
}
