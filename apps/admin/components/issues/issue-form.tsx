"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueFormSchema, type IssueFormInput } from "@gad/schema";
import { Save, ArrowLeft, X, Upload, ImagePlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { createIssueAction, updateIssueAction } from "@/app/(dashboard)/issues/actions";
import { uploadImage } from "@/services/storage";
import { cn } from "@/lib/utils";
import { Button } from "@gad/components/ui/button";
import { Input } from "@gad/components/ui/input";
import { Label } from "@gad/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@gad/components/ui/form";

const ISSUE_COVER_MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export const DEFAULT_ISSUE_VALUES: IssueFormInput = {
  volume: 1,
  issueNo: 1,
  doi: "",
  issn: "",
  coverImage: "",
  publishedAt: new Date(),
  isCurrent: false,
  date: new Date(),
};

function toDateInputValue(value: unknown): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value as string);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

type IssueFormProps = {
  mode: "create" | "edit";
  issueId?: string;
  defaultValues?: IssueFormInput;
};

export function IssueForm({
  mode,
  issueId,
  defaultValues = DEFAULT_ISSUE_VALUES,
}: IssueFormProps) {
  const router = useRouter();

  const [saving, setSaving] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const [uploadingCover, setUploadingCover] = React.useState(false);
  const [coverUploadError, setCoverUploadError] = React.useState("");
  const coverInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<IssueFormInput>({
    resolver: zodResolver(issueFormSchema),
    defaultValues,
  });

  const { control, handleSubmit, watch, setValue, setError } = form;

  const volume = watch("volume");
  const issueNo = watch("issueNo");

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setCoverUploadError("");
    setUploadingCover(true);

    const result = await uploadImage(file, {
      folder: "covers",
      maxSizeBytes: ISSUE_COVER_MAX_SIZE_BYTES,
    });

    setUploadingCover(false);

    if (!result.success) {
      setCoverUploadError(result.error);
      return;
    }

    setValue("coverImage", result.url, { shouldValidate: true });
  };

  const handleRemoveCover = () => {
    setCoverUploadError("");
    setValue("coverImage", "", { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<IssueFormInput> = async (values) => {
    setSubmitError("");
    setSaving(true);

    const payload = { ...values, date: values.publishedAt };

    const result =
      mode === "edit" && issueId
        ? await updateIssueAction(issueId, payload)
        : await createIssueAction(payload);

    if (!result.success) {
      setSubmitError(result.error);
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          if (messages?.[0]) {
            setError(field as keyof IssueFormInput, {
              message: messages[0],
            });
          }
        });
      }
      setSaving(false);
      return;
    }

    router.push("/issues");
  };

  const heading = mode === "edit" ? "Edit Issue" : "New Issue";
  const description =
    mode === "edit"
      ? "Update the details for this issue."
      : "Create a new issue for the journal.";
  const saveLabel = mode === "edit" ? "Save Changes" : "Save Issue";

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/issues"
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold">{heading}</h1>
            <p className="text-muted-foreground text-sm mt-1">{description}</p>
          </div>
          <Button
            type="submit"
            variant="gad"
            disabled={saving || !volume || !issueNo}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : saveLabel}
          </Button>
        </div>

        {submitError && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {submitError}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="volume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Volume *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="e.g. 3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="issueNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue No. *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="e.g. 1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="issn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ISSN *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 2984-1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="doi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DOI</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 10.5555/rgan.v3i1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="publishedAt"
                render={({ field }) => (
                  <FormItem className="sm:max-w-xs">
                    <FormLabel>Published Date *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={toDateInputValue(field.value)}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined,
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="isCurrent"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 space-y-0 pt-2">
                    <FormControl>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={field.value}
                        onClick={() => field.onChange(!field.value)}
                        className={cn(
                          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          field.value ? "bg-primary" : "bg-muted",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                            field.value ? "translate-x-6" : "translate-x-1",
                          )}
                        />
                      </button>
                    </FormControl>
                    <div>
                      <FormLabel
                        className="cursor-pointer text-sm font-medium"
                        onClick={() => field.onChange(!field.value)}
                      >
                        Set as current issue
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Only one issue can be marked current at a time.
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Cover image */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <Label className="block text-sm mb-3">Cover Image</Label>
              <FormField
                control={control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <input
                          ref={coverInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          className="hidden"
                          onChange={handleCoverChange}
                        />
                        <input
                          type="hidden"
                          {...field}
                          value={field.value ?? ""}
                        />

                        {field.value ? (
                          <div className="space-y-2">
                            <div className="relative overflow-hidden rounded-lg border border-input aspect-[3/4] bg-muted">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={field.value}
                                alt="Issue cover preview"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => coverInputRef.current?.click()}
                                disabled={uploadingCover}
                                className="h-8 flex-1 text-xs"
                              >
                                Replace
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={handleRemoveCover}
                                disabled={uploadingCover}
                                className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                title="Remove cover image"
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => coverInputRef.current?.click()}
                            disabled={uploadingCover}
                            className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input py-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/50 disabled:opacity-50"
                          >
                            {uploadingCover ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                <span className="text-sm text-muted-foreground">
                                  Uploading...
                                </span>
                              </>
                            ) : (
                              <>
                                <ImagePlus className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  Click to upload a cover image
                                </span>
                                <span className="text-xs text-muted-foreground/70">
                                  JPEG, PNG, WEBP or GIF, up to 5MB
                                </span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </FormControl>
                    {coverUploadError && (
                      <p className="text-sm font-medium text-destructive">
                        {coverUploadError}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-white rounded-2xl border border-border shadow-sm p-5 flex items-start gap-2 text-xs text-muted-foreground">
              <Upload className="h-4 w-4 shrink-0 mt-0.5" />
              <p>
                The cover image is uploaded immediately and stored publicly.
                Save the issue to persist the rest of the details.
              </p>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
