"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Journal Information", href: "/journal" },
  { label: "Publication Ethics & Integrity", href: "/journal/publication-ethics" },
  { label: "Peer Review Policy", href: "/journal/peer-review-policy" },
  { label: "Submission Guidelines", href: "/journal/submission-guidelines" },
  { label: "Editorial Workflow", href: "/journal/workflow" },
  { label: "Editorial Board & Contact", href: "/journal/editorial-board" },
];

export function JournalTabs() {
  const pathname = usePathname();

  return (
    <div className="sticky top-16 lg:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
          {tabs.map((tab) => {
            const active =
              tab.href === "/journal"
                ? pathname === "/journal"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0",
                  active
                    ? "gad-gradient text-white shadow-sm"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
