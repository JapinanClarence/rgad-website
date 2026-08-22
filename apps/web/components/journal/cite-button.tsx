"use client";

import React, { useState } from "react";
import { Button } from "@gad/ui/button";
import { Quote, Copy, Check } from "lucide-react";

interface CiteButtonProps {
  citation: string;
  className?: string;
}

export function CiteButton({ citation, className }: CiteButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable; silently ignore.
    }
  }

  return (
    <div className={className}>
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => setOpen((v) => !v)}
      >
        <Quote className="h-4 w-4 mr-2" />
        How to Cite
      </Button>

      {open && (
        <div className="mt-3 rounded-lg border border-border bg-muted/40 p-4">
          <p className="text-xs text-foreground/80 leading-relaxed">
            {citation}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy citation
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
