"use client";

import React from "react";
import { Trash2, Loader2, TriangleAlert, X } from "lucide-react";
import { deleteAnnouncementAction } from "./actions";
import { Button } from "@gad/components/ui/button";

type DeleteAnnouncementButtonProps = {
  id: string;
  title: string;
};

export function DeleteAnnouncementButton({
  id,
  title,
}: DeleteAnnouncementButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleClose = () => {
    if (deleting) return;
    setOpen(false);
    setError("");
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError("");

    const result = await deleteAnnouncementAction(id);

    if (!result.success) {
      setError(result.error ?? "Failed to delete announcement");
      setDeleting(false);
      return;
    }

    setDeleting(false);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
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
                  <h2 className="font-display text-lg font-bold">
                    Delete announcement
                  </h2>
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
              <p className="text-sm text-foreground">
                Are you sure you want to delete{" "}
                <span className="font-medium">&ldquo;{title}&rdquo;</span>?
                This announcement will be permanently removed.
              </p>

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
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
