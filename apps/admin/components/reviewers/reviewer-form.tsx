"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewerFormSchema, type ReviewerFormInput } from "@gad/schema";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createReviewerAction, updateReviewerAction } from "@/app/(dashboard)/reviewers/actions";
import { Button } from "@gad/components/ui/button";
import { Input } from "@gad/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@gad/components/ui/form";

export const DEFAULT_REVIEWER_VALUES: ReviewerFormInput = {
  firstname: "",
  middlename: "",
  lastname: "",
  school: "",
  country: "",
};

type ReviewerFormProps = {
  mode: "create" | "edit";
  reviewerId?: string;
  defaultValues?: ReviewerFormInput;
};

export function ReviewerForm({
  mode,
  reviewerId,
  defaultValues = DEFAULT_REVIEWER_VALUES,
}: ReviewerFormProps) {
  const router = useRouter();

  const [saving, setSaving] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");

  const form = useForm<ReviewerFormInput>({
    resolver: zodResolver(reviewerFormSchema),
    defaultValues,
  });

  const { control, handleSubmit, watch, setError } = form;

  const firstname = watch("firstname");
  const lastname = watch("lastname");
  const school = watch("school");

  const onSubmit: SubmitHandler<ReviewerFormInput> = async (values) => {
    setSubmitError("");
    setSaving(true);

    const result =
      mode === "edit" && reviewerId
        ? await updateReviewerAction(reviewerId, values)
        : await createReviewerAction(values);

    if (!result.success) {
      setSubmitError(result.error);
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          if (messages?.[0]) {
            setError(field as keyof ReviewerFormInput, {
              message: messages[0],
            });
          }
        });
      }
      setSaving(false);
      return;
    }

    router.push("/reviewers");
  };

  const heading = mode === "edit" ? "Edit Reviewer" : "New Reviewer";
  const description =
    mode === "edit"
      ? "Update this reviewer's details."
      : "Add a reviewer to the journal's pool.";
  const saveLabel = mode === "edit" ? "Save Changes" : "Save Reviewer";

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/reviewers"
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
            disabled={saving || !firstname || !lastname || !school}
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

        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-5">
          <div className="grid sm:grid-cols-3 gap-4">
            <FormField
              control={control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Maria" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="middlename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. L." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Santos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School / Institution *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Davao Oriental State University"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Philippines" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
