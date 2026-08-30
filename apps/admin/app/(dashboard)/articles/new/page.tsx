"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@gad/supabase/client";
import {
  articleFormSchema,
  type ArticleFormInput,
  type AuthorFormInput,
} from "@gad/schema";
import { Save, ArrowLeft, X, Plus, UserPlus } from "lucide-react";
import Link from "next/link";
import { createArticleAction } from "../actions";
import { Button } from "@gad/ui/button";

type IssueOption = {
  id: string;
  volume_no: number;
  issue_no: number;
};

type AuthorForm = AuthorFormInput;

const EMPTY_AUTHOR: AuthorForm = {
  firstname: "",
  middlename: "",
  lastname: "",
  department: "",
  school: "",
  city: "",
  country: "",
};

type FieldErrors = Record<string, string[]>;

function fieldError(errors: FieldErrors, field: string) {
  return errors[field]?.[0];
}

export default function NewArticlePage() {
  const router = useRouter();
  const supabase = createClient();

  const [issues, setIssues] = useState<IssueOption[]>([]);
  const [loadingIssues, setLoadingIssues] = useState(true);

  const [form, setForm] = useState({
    title: "",
    abstract: "",
    pages: "",
    pdf_url: "",
    archive_id: "",
    keywords: [] as string[],
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [authors, setAuthors] = useState<AuthorForm[]>([{ ...EMPTY_AUTHOR }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

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
          if (data.length > 0)
            setForm((f) => ({ ...f, archive_id: data[0].id }));
        }
      } catch {
        // leave issues empty, dropdown will show "No issues found"
      } finally {
        setLoadingIssues(false);
      }
    };
    loadIssues();
  }, [supabase]);

  const addKeyword = () => {
    if (keywordInput && !form.keywords.includes(keywordInput)) {
      setForm((f) => ({
        ...f,
        keywords: [...f.keywords, keywordInput.trim()],
      }));
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) =>
    setForm((f) => ({
      ...f,
      keywords: f.keywords.filter((k) => k !== keyword),
    }));

  const updateAuthor = (
    index: number,
    field: keyof AuthorForm,
    value: string,
  ) => {
    setAuthors((prev) =>
      prev.map((a, i) => (i === index ? { ...a, [field]: value } : a)),
    );
  };

  const addAuthor = () => setAuthors((prev) => [...prev, { ...EMPTY_AUTHOR }]);

  const removeAuthor = (index: number) =>
    setAuthors((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev,
    );

  const handleSave = async () => {
    setError("");
    setFieldErrors({});

    const validAuthors = authors.filter(
      (a) => a.firstname.trim() && a.lastname.trim() && a.school.trim(),
    );

    const payload: ArticleFormInput = {
      title: form.title,
      abstract: form.abstract,
      pages: form.pages,
      pdf_url: form.pdf_url,
      archive_id: form.archive_id,
      keywords: form.keywords,
      authors: validAuthors,
    };

    const parsed = articleFormSchema.safeParse(payload);
    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors as FieldErrors);
      setError("Please fix the errors below before saving.");
      return;
    }

    setSaving(true);
    const result = await createArticleAction(parsed.data);

    if (!result.success) {
      setError(result.error);
      if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      setSaving(false);
      return;
    }

    router.push("/articles");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
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
          onClick={handleSave}
          disabled={saving || !form.title}
          className="flex items-center gap-2 px-4 py-2 rounded-lg gad-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Article"}
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter article title..."
              />
              {fieldError(fieldErrors, "title") && (
                <p className="mt-1 text-xs text-destructive">
                  {fieldError(fieldErrors, "title")}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Abstract
              </label>
              <textarea
                value={form.abstract}
                onChange={(e) =>
                  setForm((f) => ({ ...f, abstract: e.target.value }))
                }
                rows={6}
                className="w-full px-4 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Enter the article abstract..."
              />
              {fieldError(fieldErrors, "abstract") && (
                <p className="mt-1 text-xs text-destructive">
                  {fieldError(fieldErrors, "abstract")}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Pages
                </label>
                <input
                  type="text"
                  value={form.pages}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, pages: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="e.g. 1-18"
                />
                {fieldError(fieldErrors, "pages") && (
                  <p className="mt-1 text-xs text-destructive">
                    {fieldError(fieldErrors, "pages")}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  PDF URL
                </label>
                <input
                  type="url"
                  value={form.pdf_url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, pdf_url: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="https://..."
                />
                {fieldError(fieldErrors, "pdf_url") && (
                  <p className="mt-1 text-xs text-destructive">
                    {fieldError(fieldErrors, "pdf_url")}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Authors */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-sm">Authors *</h3>
              <Button
                type="button"
                onClick={addAuthor}
                className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Add Author
              </Button>
            </div>

            <div className="space-y-4">
              {authors.map((author, index) => (
                <div
                  key={index}
                  className="relative border border-border rounded-xl p-4"
                >
                  {authors.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeAuthor(index)}
                      className="absolute top-3 right-3 p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Remove author"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <p className="text-xs font-medium text-muted-foreground mb-3">
                    Author {index + 1}
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3 mb-3">
                    <input
                      type="text"
                      value={author.firstname}
                      onChange={(e) =>
                        updateAuthor(index, "firstname", e.target.value)
                      }
                      className="px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="First name *"
                    />
                    <input
                      type="text"
                      value={author.middlename}
                      onChange={(e) =>
                        updateAuthor(index, "middlename", e.target.value)
                      }
                      className="px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Middle name"
                    />
                    <input
                      type="text"
                      value={author.lastname}
                      onChange={(e) =>
                        updateAuthor(index, "lastname", e.target.value)
                      }
                      className="px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Last name *"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      value={author.school}
                      onChange={(e) =>
                        updateAuthor(index, "school", e.target.value)
                      }
                      className="px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="School / Institution *"
                    />
                    <input
                      type="text"
                      value={author.department}
                      onChange={(e) =>
                        updateAuthor(index, "department", e.target.value)
                      }
                      className="px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Department"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={author.city}
                      onChange={(e) =>
                        updateAuthor(index, "city", e.target.value)
                      }
                      className="px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="City"
                    />
                    <input
                      type="text"
                      value={author.country}
                      onChange={(e) =>
                        updateAuthor(index, "country", e.target.value)
                      }
                      className="px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Country"
                    />
                  </div>
                </div>
              ))}
            </div>
            {fieldError(fieldErrors, "authors") && (
              <p className="mt-3 text-xs text-destructive">
                {fieldError(fieldErrors, "authors")}
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Issue */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
            <h3 className="font-medium text-sm mb-3">Issue *</h3>
            {loadingIssues ? (
              <p className="text-xs text-muted-foreground">Loading issues...</p>
            ) : issues.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No issues found. Create an issue first before adding an article.
              </p>
            ) : (
              <select
                value={form.archive_id}
                onChange={(e) =>
                  setForm((f) => ({ ...f, archive_id: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-white"
              >
                {issues.map((issue) => (
                  <option key={issue.id} value={issue.id}>
                    Vol. {issue.volume_no}, Issue {issue.issue_no}
                  </option>
                ))}
              </select>
            )}
            {fieldError(fieldErrors, "archive_id") && (
              <p className="mt-2 text-xs text-destructive">
                {fieldError(fieldErrors, "archive_id")}
              </p>
            )}
          </div>

          {/* Keywords */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
            <h3 className="font-medium text-sm mb-3">Keywords</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addKeyword())
                }
                className="flex-1 px-3 py-1.5 rounded-md border border-input text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="Add keyword..."
              />
              <button
                type="button"
                onClick={addKeyword}
                className="px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs"
                >
                  {keyword}
                  <button
                    onClick={() => removeKeyword(keyword)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
