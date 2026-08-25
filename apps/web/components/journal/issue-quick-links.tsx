import React from "react";
import Link from "next/link";
import { BookOpen, Users, Archive, Mail, ChevronRight } from "lucide-react";

const QUICK_LINKS = [
  {
    label: "Journal Information",
    href: "/journal#journal-info",
    icon: BookOpen,
  },
  {
    label: "Editorial Team",
    href: "/journal/editorial-board",
    icon: Users,
  },
  {
    label: "Archive",
    href: "/issue/archive",
    icon: Archive,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
] as const;

export function IssueQuickLinks({ className }: { className?: string }) {
  return (
    <div
      className={` bg-white border border-border rounded-2xl p-6 ${className ?? ""}`}
    >
      <p className="font-display font-bold text-xs uppercase tracking-widest text-muted-foreground mb-4">
        Quick Links
      </p>
      <ul className="space-y-1">
        {QUICK_LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <link.icon className="h-4 w-4 text-primary/70" />
                {link.label}
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
