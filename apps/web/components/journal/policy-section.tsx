import React from "react";
import { LucideIcon } from "lucide-react";

export function PolicySection({
  icon: Icon,
  title,
  children,
}: {
  icon?: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-3xl border border-border shadow-sm p-8 lg:p-10">
      <div className="flex items-center gap-3 mb-5">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="article-prose text-muted-foreground text-sm lg:text-[15px]">
        {children}
      </div>
    </div>
  );
}
