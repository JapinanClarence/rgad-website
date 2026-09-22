"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { officerFormSchema, type OfficerFormInput } from "@gad/schema";
import { Save, ArrowLeft, X, ImagePlus, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  createOfficerAction,
  updateOfficerAction,
} from "@/app/(dashboard)/officers/actions";
import { uploadImage } from "@/services/storage";
import { cn } from "@/lib/utils";
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

const OFFICER_PROFILE_MAX_SIZE_BYTES = 30 * 1024 * 1024; // 30MB

export const DEFAULT_OFFICER_VALUES: OfficerFormInput = {
  firstname: "",
  middlename: "",
  lastname: "",
  extension: "",
  position: "",
  school: "",
  profile: "",
  isOfficer: true,
  isFoundingOfficer: false,
  isCurrent: true,
};

type OfficerFormProps = {
  mode: "create" | "edit";
  officerId?: string;
  defaultValues?: OfficerFormInput;
};

function ToggleField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          checked ? "bg-primary" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}

export function OfficerForm({
  mode,
  officerId,
  defaultValues = DEFAULT_OFFICER_VALUES,
}: OfficerFormProps) {
  const router = useRouter();

  const [saving, setSaving] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const [uploadingProfile, setUploadingProfile] = React.useState(false);
  const [profileUploadError, setProfileUploadError] = React.useState("");
  const profileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<OfficerFormInput>({
    resolver: zodResolver(officerFormSchema),
    defaultValues,
  });

  const { control, handleSubmit, watch, setValue, setError } = form;

  const firstname = watch("firstname");
  const lastname = watch("lastname");
  const position = watch("position");
  const school = watch("school");
  const profile = watch("profile");
  const isOfficer = watch("isOfficer");
  const isFoundingOfficer = watch("isFoundingOfficer");
  const isCurrent = watch("isCurrent");

  const handleProfileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setProfileUploadError("");
    setUploadingProfile(true);

    const result = await uploadImage(file, {
      folder: "officers",
      maxSizeBytes: OFFICER_PROFILE_MAX_SIZE_BYTES,
    });

    setUploadingProfile(false);

    if (!result.success) {
      setProfileUploadError(result.error);
      return;
    }

    setValue("profile", result.url, { shouldValidate: true });
  };

  const handleRemoveProfile = () => {
    setProfileUploadError("");
    setValue("profile", "", { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<OfficerFormInput> = async (values) => {
    setSubmitError("");
    setSaving(true);

    const result =
      mode === "edit" && officerId
        ? await updateOfficerAction(officerId, values)
        : await createOfficerAction(values);

    if (!result.success) {
      setSubmitError(result.error);
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          if (messages?.[0]) {
            setError(field as keyof OfficerFormInput, {
              message: messages[0],
            });
          }
        });
      }
      setSaving(false);
      return;
    }

    router.push("/officers");
  };

  const heading = mode === "edit" ? "Edit Officer" : "New Officer";
  const description =
    mode === "edit"
      ? "Update this officer's details."
      : "Add an officer to the network's roster.";
  const saveLabel = mode === "edit" ? "Save Changes" : "Save Officer";

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/officers"
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
              saving || !firstname || !lastname || !position || !school
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
          <div>
            <p className="text-sm font-medium mb-2">Profile Photo</p>
            <div className="flex items-center gap-4">
              {profile ? (
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-border shrink-0">
                  <img
                    src={profile}
                    alt="Officer profile"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveProfile}
                    className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-black/60 text-white hover:bg-black/80"
                    title="Remove photo"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-2xl border border-dashed border-border flex items-center justify-center text-muted-foreground shrink-0">
                  <ImagePlus className="h-5 w-5" />
                </div>
              )}
              <div>
                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploadingProfile}
                  onClick={() => profileInputRef.current?.click()}
                  className="gap-2"
                >
                  {uploadingProfile ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <ImagePlus className="h-3.5 w-3.5" />
                  )}
                  {uploadingProfile ? "Uploading..." : "Upload Photo"}
                </Button>
                {profileUploadError && (
                  <p className="text-xs text-destructive mt-1">
                    {profileUploadError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-4 gap-4">
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
            <FormField
              control={control}
              name="extension"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extension</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Jr., PhD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. President" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </div>

          <div className="border-t border-border pt-4 divide-y divide-border">
            <ToggleField
              label="Officer"
              description="Include this person in the network's officer roster."
              checked={isOfficer}
              onChange={(value) =>
                setValue("isOfficer", value, { shouldValidate: true })
              }
            />
            <ToggleField
              label="Founding Officer"
              description="Mark this person as one of RGAN XI's founding officers."
              checked={isFoundingOfficer}
              onChange={(value) =>
                setValue("isFoundingOfficer", value, { shouldValidate: true })
              }
            />
            <ToggleField
              label="Currently Serving"
              description="Show this person as a currently serving officer on the website."
              checked={isCurrent}
              onChange={(value) =>
                setValue("isCurrent", value, { shouldValidate: true })
              }
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
