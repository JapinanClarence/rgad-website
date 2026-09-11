"use client";

import type { ComponentProps } from "react";
import { Button } from "@gad/components/ui/button";
import { FileText } from "lucide-react";
import { recordArticleDownloadAction } from "@/app/issue/[id]/[articleId]/actions";

interface PdfDownloadButtonProps {
  articleId: string;
  pdfUrl: string;
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
  className?: string;
}

export function PdfDownloadButton({
  articleId,
  pdfUrl,
  variant = "gad",
  size = "sm",
  className = "w-full",
}: PdfDownloadButtonProps) {
  function handleClick() {
    // Fire and forget; don't hold up the download waiting on the network
    // round trip to record it.
    void recordArticleDownloadAction(articleId);
  }

  return (
    <Button
      variant={variant}
      size={size}
      asChild
      className={className}
      onClick={handleClick}
    >
      <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
        <FileText className="h-4 w-4 mr-2" />
        Download PDF
      </a>
    </Button>
  );
}
