"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@gad/supabase/client";
import { articleFormSchema, type ArticleFormInput } from "@gad/schema";
import { Save, ArrowLeft, X, Plus, UserPlus } from "lucide-react";
import Link from "next/link";
import { createArticleAction } from "../actions";
import { Button } from "@gad/ui/button";
import { Input } from "@gad/ui/input";
import { Label } from "@gad/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@gad/ui/form";

type IssueOption = {
  id: string;
  volume_no: number;
  issue_no: number;
};

const EMPTY_AUTHOR = {
  firstname: "",
  middlename: "",
  lastname: "",
  department: "",
  school: "",
  city: "",
  country: "",
};

const DEFAULT_VALUES: ArticleFormInput = {
  title: "",
  abstract: "",
  pages: "",
  pdf_url: "",
  archive_id: "",
  keywords: [],
  authors: [{ ...EMPTY_AUTHOR }],
};

export default function NewArticlePage() {
  const router = useRouter();
  const supabase = createClient();

  const [issues, setIssues] = React.useState<IssueOption[]>([]);
  const [loadingIssues, setLoadingIssues] = React.useState(true);
  const [keywordInput, setKeywordInput] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");

  const form = useForm<ArticleFormInput>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = form;

  const {
    fields: authorFields,
    append: appendAuthor,
    remove: removeAuthor,
  } = useFieldArray({ control, name: "authors" });

  const title = watch("title");
  const keywords = watch("keywords") ?? [];

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const { data } = await supabase
          .from("archive")
          .select("id, volume_no, issue_no")
          .order("volume_no", { ascending: false })
          .order("issue_no", { ascending: false });
        if (data) {
          setIssues(data as IssueOption[]);
          if (data.length > 0) {
            setValue("archive_id", data[0].id);
          }
        }
      } catch {
        // leave issues empty, dropdown will show "No issues found"
      } finally {
        setLoadingIssues(false);
      }
    };
    loadIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  const addKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setValue("keywords", [...keywords, trimmed], { shouldValidate: true });
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) =>
    setValue(
      "keywords",
      keywords.filter((k) => k !== keyword),
      { shouldValidate: true },
    );

  const onSubmit: SubmitHandler<ArticleFormInput> = async (values) => {
    setSubmitError("");
    setSaving(true);

    const result = await createArticleAction(values);

    if (!result.success) {
      setSubmitError(result.error);
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          if (messages?.[0]) {
            setError(field as keyof ArticleFormInput, {
              message: messages[0],
            });
          }
        });
      }
      setSaving(false);
      return;
    }

    router.push("/articles");
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/articles"
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold">New Article</h1>
          </div>
          <Button
            type="submit"
            variant="gad"
            disabled={saving || !title}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Article"}
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter article title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="abstract"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Abstract</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        rows={6}
                        className="w-full px-4 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        placeholder="Enter the article abstract..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="pages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pages</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 1-18" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="pdf_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PDF URL</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Authors */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-sm">Authors *</h3>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={() => appendAuthor({ ...EMPTY_AUTHOR })}
                  className="h-auto p-0 gap-1.5 text-xs"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Add Author
                </Button>
              </div>

              <div className="space-y-4">
                {authorFields.map((authorField, index) => (
                  <div
                    key={authorField.id}
                    className="relative border border-border rounded-xl p-4"
                  >
                    {authorFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAuthor(index)}
                        className="absolute top-3 right-3 h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        title="Remove author"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    <Label className="block text-xs text-muted-foreground mb-3">
                      Author {index + 1}
                    </Label>
                    <div className="grid sm:grid-cols-3 gap-3 mb-3">
                      <FormField
                        control={control}
                        name={`authors.${index}.firstname`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="First name *" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`authors.${index}.middlename`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Middle name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`authors.${index}.lastname`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Last name *" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 mb-3">
                      <FormField
                        control={control}
                        name={`authors.${index}.school`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="School / Institution *"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`authors.${index}.department`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Department" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <FormField
                        control={control}
                        name={`authors.${index}.city`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`authors.${index}.country`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {errors.authors?.message && (
                <p className="mt-3 text-sm font-medium text-destructive">
                  {errors.authors.message}
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Issue */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <Label className="block text-sm mb-3">Issue *</Label>
              {loadingIssues ? (
                <p className="text-xs text-muted-foreground">
                  Loading issues...
                </p>
              ) : issues.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No issues found. Create an issue first before adding an
                  article.
                </p>
              ) : (
                <FormField
                  control={control}
                  name="archive_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                        >
                          {issues.map((issue) => (
                            <option key={issue.id} value={issue.id}>
                              Vol. {issue.volume_no}, Issue {issue.issue_no}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <Label htmlFor="keyword-input" className="block text-sm mb-3">
                Keywords
              </Label>
              <div className="flex gap-2 mb-3">
                <Input
                  id="keyword-input"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addKeyword())
                  }
                  className="h-9"
                  placeholder="Add keyword..."
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={addKeyword}
                  className="h-9 w-9 shrink-0 bg-primary/10 text-primary hover:bg-primary/20"
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeKeyword(keyword)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </span>
                ))}
              </div>
              {errors.keywords?.message && (
                <p className="mt-2 text-sm font-medium text-destructive">
                  {errors.keywords.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
