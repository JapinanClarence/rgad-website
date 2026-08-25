"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    _altmetric?: {
      embed_load?: (context?: Document | HTMLElement) => void;
    };
  }
}

const ALTMETRIC_SCRIPT_ID = "altmetric-embed-script";
const ALTMETRIC_SCRIPT_SRC =
  "https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js";

interface AltmetricBadgeProps {
  doi: string;
  className?: string;
}

export function AltmetricBadge({ doi, className }: AltmetricBadgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = document.getElementById(
      ALTMETRIC_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (!existing) {
      const script = document.createElement("script");
      script.id = ALTMETRIC_SCRIPT_ID;
      script.src = ALTMETRIC_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
      return;
    }

    // Script already loaded (e.g. navigated to another article) — ask
    // Altmetric to reprocess this badge without a full page reload.
    window._altmetric?.embed_load?.(containerRef.current ?? undefined);
  }, [doi]);

  return (
    <div ref={containerRef} className={className}>
      <a
        href={`https://www.altmetric.com/details/doi/${doi}`}
        target="_blank"
        rel="noopener noreferrer"
        data-badge-type="donut"
        data-hide-no-mentions="true"
        data-doi={doi}
        className="altmetric-embed"
      />
    </div>
  );
}
