"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expertsFormSchema, type ExpertsFormInput } from "@gad/schema";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  createExpertAction,
  updateExpertAction,
} from "@/app/(dashboard)/experts/actions";
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

export const DEFAULT_EXPERT_VALUES: ExpertsFormInput = {
  firstname: "",
  middlename: "",
  lastname: "",
  school: "",
  email: "",
  expertise: "",
};

type ExpertFormProps = {
  mode: "create" | "edit";
  expertId?: string;
  defaultValues?: ExpertsFormInput;
};

export function ExpertForm({
  mode,
  expertId,
  defaultValues = DEFAULT_EXPERT_VALUES,
}: ExpertFormProps) {
  const router = useRouter();

  const [saving, setSaving] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");

  const form = useForm<ExpertsFormInput>({
    resolver: zodResolver(expertsFormSchema),
    defaultValues,
  });

  const { control, handleSubmit, watch, setError } = form;

  const firstname = watch("firstname");
  const lastname = watch("lastname");
  const school = watch("school");
  const email = watch("email");
  const expertise = watch("expertise");

  const onSubmit: SubmitHandler<ExpertsFormInput> = async (values) => {
    setSubmitError("");
    setSaving(true);

    const result =
      mode === "edit" && expertId
        ? await updateExpertAction(expertId, values)
        : await createExpertAction(values);

    if (!result.success) {
      setSubmitError(result.error);
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          if (messages?.[0]) {
            setError(field as keyof ExpertsFormInput, {
              message: messages[0],
            });
          }
        });
      }
      setSaving(false);
      return;
    }

    router.push("/experts");
  };

  const heading = mode === "edit" ? "Edit Expert" : "New Expert";
  const description =
    mode === "edit"
      ? "Update this expert's details."
      : "Add an expert to the journal's pool.";
  const saveLabel = mode === "edit" ? "Save Changes" : "Save Expert";

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/experts"
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
            disabled={
              saving ||
              !firstname ||
              !lastname ||
              !school ||
              !email ||
              !expertise
            }
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. maria.santos@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="expertise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expertise *</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={6}
                    className="w-full px-4 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="e.g. Software Engineering"
                  />
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
