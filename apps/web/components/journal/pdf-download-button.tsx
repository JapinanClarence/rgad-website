"use client";

import { useState } from "react";
import type { ComponentProps } from "react";
import { Button } from "@gad/components/ui/button";
import { FileText, Loader2 } from "lucide-react";
import { recordArticleDownloadAction } from "@/app/issue/[id]/[articleId]/actions";

interface PdfDownloadButtonProps {
  articleId: string;
  pdfUrl: string;
  fileName?: string;
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
  className?: string;
}

export function PdfDownloadButton({
  articleId,
  pdfUrl,
  fileName,
  variant = "gad",
  size = "sm",
  className = "w-full",
}: PdfDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleClick() {
    if (isDownloading) return;
    setIsDownloading(true);

    // Fire and forget; don't hold up the download waiting on this.
    void recordArticleDownloadAction(articleId);

    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error("Failed to fetch PDF");
      const blob = await response.blob();

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = fileName || pdfUrl.split("/").pop() || "article.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch {
      // Fallback: if the fetch/blob approach fails (e.g. CORS), open the
      // file directly so the visitor can still save it manually.
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
      disabled={isDownloading}
    >
      {isDownloading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <FileText className="h-4 w-4 mr-2" />
      )}
      Download PDF
    </Button>
  );
}
