"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { summitFormSchema, type SummitFormInput } from "@gad/schema";
import {
  Save,
  ArrowLeft,
  X,
  Plus,
  ImagePlus,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { createSummitAction } from "../actions";
import { uploadImage } from "@/services/storage";
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

const SUMMIT_IMAGE_MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const DEFAULT_VALUES: SummitFormInput = {
  theme: "",
  location: "",
  host: "",
  summary: "",
  note: "",
  details: [],
  outcomes: [],
  images: [],
  date: new Date(),
};

function toDateInputValue(value: unknown): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value as string);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export default function NewSummitPage() {
  const router = useRouter();

  const [detailInput, setDetailInput] = React.useState("");
  const [outcomeInput, setOutcomeInput] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const [uploadingImages, setUploadingImages] = React.useState(false);
  const [imageUploadError, setImageUploadError] = React.useState("");
  const imagesInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<SummitFormInput>({
    resolver: zodResolver(summitFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { control, handleSubmit, watch, setValue, setError } = form;

  const theme = watch("theme");
  const location = watch("location");
  const host = watch("host");
  const summary = watch("summary");
  const details = watch("details") ?? [];
  const outcomes = watch("outcomes") ?? [];
  const images = watch("images") ?? [];

  const addDetail = () => {
    const trimmed = detailInput.trim();
    if (trimmed) {
      setValue("details", [...details, trimmed], { shouldValidate: true });
      setDetailInput("");
    }
  };

  const removeDetail = (index: number) =>
    setValue(
      "details",
      details.filter((_, i) => i !== index),
      { shouldValidate: true },
    );

  const addOutcome = () => {
    const trimmed = outcomeInput.trim();
    if (trimmed) {
      setValue("outcomes", [...outcomes, trimmed], { shouldValidate: true });
      setOutcomeInput("");
    }
  };

  const removeOutcome = (index: number) =>
    setValue(
      "outcomes",
      outcomes.filter((_, i) => i !== index),
      { shouldValidate: true },
    );

  const handleImagesChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    setImageUploadError("");
    setUploadingImages(true);

    const results = await Promise.all(
      files.map((file) =>
        uploadImage(file, {
          folder: "summit",
          maxSizeBytes: SUMMIT_IMAGE_MAX_SIZE_BYTES,
        }),
      ),
    );

    setUploadingImages(false);

    const uploadedUrls = results
      .filter((result) => result.success)
      .map((result) => result.url);

    const failedCount = results.length - uploadedUrls.length;
    if (failedCount > 0) {
      const firstError = results.find((result) => !result.success);
      setImageUploadError(
        failedCount === results.length
          ? (firstError && !firstError.success
              ? firstError.error
              : "Failed to upload images.")
          : `${failedCount} of ${results.length} image(s) failed to upload.`,
      );
    }

    if (uploadedUrls.length > 0) {
      setValue("images", [...images, ...uploadedUrls], {
        shouldValidate: true,
      });
    }
  };

  const removeImage = (index: number) =>
    setValue(
      "images",
      images.filter((_, i) => i !== index),
      { shouldValidate: true },
    );

  const onSubmit: SubmitHandler<SummitFormInput> = async (values) => {
    setSubmitError("");
    setSaving(true);

    const result = await createSummitAction(values);

    if (!result.success) {
      setSubmitError(result.error);
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          if (messages?.[0]) {
            setError(field as keyof SummitFormInput, {
              message: messages[0],
            });
          }
        });
      }
      setSaving(false);
      return;
    }

    router.push("/summit");
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/summit"
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold">New Summit</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Record a Gender and Development Summit.
            </p>
          </div>
          <Button
            type="submit"
            variant="gad"
            disabled={saving || !theme || !location || !host || !summary}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Summit"}
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
              <FormField
                control={control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theme *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Beyond Gender Mainstreaming" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="host"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Host *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. DOrSU & CHEDRO XI" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date *</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={toDateInputValue(field.value)}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value ? new Date(e.target.value) : undefined,
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Adelina Hotel and Suites, City of Mati, Davao Oriental"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary *</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        rows={5}
                        className="w-full px-4 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        placeholder="Enter a summary of the summit..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        placeholder="Optional additional note..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h3 className="font-medium text-sm mb-4">Details</h3>
              <div className="flex gap-2 mb-3">
                <Input
                  value={detailInput}
                  onChange={(e) => setDetailInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addDetail())
                  }
                  placeholder="Add a detail and press Enter..."
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={addDetail}
                  className="shrink-0 bg-primary/10 text-primary hover:bg-primary/20"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {details.length > 0 && (
                <ul className="space-y-2">
                  {details.map((detail, index) => (
                    <li
                      key={`${detail}-${index}`}
                      className="flex items-start justify-between gap-3 rounded-lg border border-border px-3 py-2 text-sm"
                    >
                      <span className="min-w-0 flex-1">{detail}</span>
                      <button
                        type="button"
                        onClick={() => removeDetail(index)}
                        className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Outcomes */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h3 className="font-medium text-sm mb-4">Outcomes</h3>
              <div className="flex gap-2 mb-3">
                <Input
                  value={outcomeInput}
                  onChange={(e) => setOutcomeInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addOutcome())
                  }
                  placeholder="Add an outcome and press Enter..."
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={addOutcome}
                  className="shrink-0 bg-primary/10 text-primary hover:bg-primary/20"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {outcomes.length > 0 && (
                <ul className="space-y-2">
                  {outcomes.map((outcome, index) => (
                    <li
                      key={`${outcome}-${index}`}
                      className="flex items-start justify-between gap-3 rounded-lg border border-border px-3 py-2 text-sm"
                    >
                      <span className="min-w-0 flex-1">{outcome}</span>
                      <button
                        type="button"
                        onClick={() => removeOutcome(index)}
                        className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Images */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <Label className="block text-sm mb-3">Images</Label>
              <FormField
                control={control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <input
                          ref={imagesInputRef}
                          type="file"
                          multiple
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          className="hidden"
                          onChange={handleImagesChange}
                        />

                        <button
                          type="button"
                          onClick={() => imagesInputRef.current?.click()}
                          disabled={uploadingImages}
                          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input py-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/50 disabled:opacity-50"
                        >
                          {uploadingImages ? (
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
                                Click to upload images
                              </span>
                              <span className="text-xs text-muted-foreground/70">
                                Select multiple files at once. JPEG, PNG, WEBP
                                or GIF, up to 5MB each.
                              </span>
                            </>
                          )}
                        </button>

                        {images.length > 0 && (
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            {images.map((url, index) => (
                              <div
                                key={`${url}-${index}`}
                                className="group relative aspect-square overflow-hidden rounded-lg border border-input bg-muted"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={url}
                                  alt={`Summit image ${index + 1}`}
                                  className="h-full w-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  disabled={uploadingImages}
                                  className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-50"
                                  title="Remove image"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    {imageUploadError && (
                      <p className="text-sm font-medium text-destructive">
                        {imageUploadError}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
