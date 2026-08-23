"use client";

import React from "react";

interface DoiLinkProps {
  doi: string;
}

export function DoiLink({ doi }: DoiLinkProps) {
  const open = () => {
    window.open(`https://doi.org/${doi}`, "_blank", "noopener,noreferrer");
  };

  return (
    <span
      role="link"
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        open();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          open();
        }
      }}
      className="underline hover:text-primary transition-colors cursor-pointer"
    >
      https://doi.org/{doi}
    </span>
  );
}
