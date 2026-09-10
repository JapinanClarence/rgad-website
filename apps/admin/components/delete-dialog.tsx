"use client";

import React from "react";
import { Trash2, Loader2, TriangleAlert, X } from "lucide-react";
import { Button } from "@gad/components/ui/button";
import { cn } from "@/lib/utils";

type DeleteDialogProps = {
  /** Dialog heading, e.g. "Delete announcement" */
  title?: string;
  /** Confirmation message body, e.g. what item is being removed */
  description: React.ReactNode;
  /** Called when the user confirms the deletion. Throw an Error to surface a message in the dialog. */
  onConfirm: () => Promise<void> | void;
  /** Tooltip/title attribute for the trigger button */
  triggerLabel?: string;
  /** Extra classes applied to the trigger button */
  triggerClassName?: string;
  /** Icon rendered inside the trigger button */
  triggerIcon?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
};

export function DeleteDialog({
  title = "Delete item",
  description,
  onConfirm,
  triggerLabel = "Delete",
  triggerClassName,
  triggerIcon,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
}: DeleteDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleClose = () => {
    if (deleting) return;
    setOpen(false);
    setError("");
  };

  const handleConfirm = async () => {
    setDeleting(true);
    setError("");

    try {
      await onConfirm();
      setOpen(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive",
          triggerClassName,
        )}
        title={triggerLabel}
      >
        {triggerIcon ?? <Trash2 className="h-4 w-4" />}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in"
            onClick={handleClose}
          />

          <div className="relative w-full max-w-md rounded-2xl border border-border bg-white shadow-lg animate-fade-in">
            <div className="flex items-start justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <TriangleAlert className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold">{title}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={deleting}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              <div className="text-sm text-foreground">{description}</div>

              {error && (
                <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 p-5 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={deleting}
              >
                {cancelLabel}
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleConfirm}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  confirmLabel
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
