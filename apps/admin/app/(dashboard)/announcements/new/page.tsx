"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  announcementFormSchema,
  type AnnouncementFormInput,
} from "@gad/schema";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createAnnouncementAction } from "../actions";
import { cn } from "@/lib/utils";
import { Button } from "@gad/components/ui/button";
import { Input } from "@gad/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@gad/components/ui/form";

const DEFAULT_VALUES: AnnouncementFormInput = {
  title: "",
  slug: "",
  description: "",
  publishedAt: new Date(),
  externalUrl: "",
  isPinned: false,
};

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toDateInputValue(value: unknown): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value as string);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export default function NewAnnouncementPage() {
  const router = useRouter();

  const [saving, setSaving] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const [slugTouched, setSlugTouched] = React.useState(false);

  const form = useForm<AnnouncementFormInput>({
    resolver: zodResolver(announcementFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { control, handleSubmit, watch, setValue, setError } = form;

  const title = watch("title");
  const slug = watch("slug");
  const description = watch("description");

  const handleTitleChange = (
    value: string,
    onChange: (value: string) => void,
  ) => {
    onChange(value);
    if (!slugTouched) {
      setValue("slug", slugify(value), { shouldValidate: true });
    }
  };

  const handleSlugChange = (
    value: string,
    onChange: (value: string) => void,
  ) => {
    setSlugTouched(true);
    onChange(value);
  };

  const onSubmit: SubmitHandler<AnnouncementFormInput> = async (values) => {
    setSubmitError("");
    setSaving(true);

    const result = await createAnnouncementAction({
      ...values,
      slug: slugify(values.slug),
    });

    if (!result.success) {
      setSubmitError(result.error);
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          if (messages?.[0]) {
            setError(field as keyof AnnouncementFormInput, {
              message: messages[0],
            });
          }
        });
      }
      setSaving(false);
      return;
    }

    router.push("/announcements");
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/announcements"
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold">
              New Announcement
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Publish a new announcement for the network.
            </p>
          </div>
          <Button
            type="submit"
            variant="gad"
            disabled={saving || !title || !slug || !description}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Announcement"}
          </Button>
        </div>

        {submitError && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {submitError}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-5">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Call for Papers: Volume 3, Issue 2"
                    {...field}
                    onChange={(e) =>
                      handleTitleChange(e.target.value, field.onChange)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={6}
                    className="w-full px-4 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Enter the announcement details..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="publishedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Published Date *</FormLabel>
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

            <FormField
              control={control}
              name="externalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>External Link</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="isPinned"
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
                    Pin this announcement
                  </FormLabel>
                  <p className="text-xs text-muted-foreground">
                    Pinned announcements are highlighted above others.
                  </p>
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
