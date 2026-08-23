import React from "react";

export function JournalPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <section className="py-16 hero-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
