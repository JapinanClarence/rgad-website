import { createClient } from "@gad/supabase/server";
import {
  articleFormSchema,
  type ArticleFormInput,
  type AuthorFormInput,
} from "@gad/schema";
import type { IssueArticle, ArticleAuthor } from "@gad/types";

// The success/error branches both declare the other's fields as `?: never`.
// Without this, TypeScript's control-flow narrowing does not reliably
// narrow a boolean-literal discriminant (`success: true | false`) on a
// negated check like `if (!result.success)`, so `result.error` stays
// unresolved at the call site even though the branch is provably correct.
// This mirrors the pattern zod itself uses for `SafeParseReturnType`.
type ServiceResult<T> =
  | { success: true; data: T; error?: never; fieldErrors?: never }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
      data?: never;
    };

function toArticleAuthor(row: {
  firstname: string;
  middlename: string | null;
  lastname: string;
  department: string | null;
  school: string;
  city: string | null;
  country: string | null;
}): ArticleAuthor {
  return {
    firstname: row.firstname,
    middlename: row.middlename,
    lastname: row.lastname,
    school: row.school,
    department: row.department,
    orcid_no: null,
  };
}

function toIssueArticle(
  row: {
    id: string;
    title: string;
    abstract: string;
    pages: string;
    pdf_url: string;
    keywords: string[] | null;
  },
  authors: ArticleAuthor[],
): IssueArticle {
  return {
    id: row.id,
    title: row.title,
    abstract: row.abstract,
    pages: row.pages,
    pdfUrl: row.pdf_url,
    authors,
    keywords: row.keywords ?? [],
  };
}

export async function createArticle(
  input: ArticleFormInput,
): Promise<ServiceResult<IssueArticle>> {
  const parsed = articleFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid article data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { authors, ...fields } = parsed.data;
  const supabase = createClient();

  const { data: article, error: articleError } = await supabase
    .from("articles")
    .insert({
      title: fields.title,
      abstract: fields.abstract || "",
      pages: fields.pages || "",
      pdf_url: fields.pdf_url || "",
      archive_id: fields.archive_id,
      keywords: fields.keywords,
    })
    .select("id, title, abstract, pages, pdf_url, keywords")
    .single();

  if (articleError || !article) {
    return {
      success: false,
      error: articleError?.message ?? "Failed to create article",
    };
  }

  const { data: insertedAuthors, error: authorsError } = await supabase
    .from("authors")
    .insert(
      authors.map((author: AuthorFormInput) => ({
        article_id: article.id,
        firstname: author.firstname,
        middlename: author.middlename || null,
        lastname: author.lastname,
        department: author.department || null,
        school: author.school,
        city: author.city || null,
        country: author.country || null,
      })),
    )
    .select(
      "firstname, middlename, lastname, department, school, city, country",
    );

  if (authorsError) {
    await supabase.from("articles").delete().eq("id", article.id);
    return { success: false, error: authorsError.message };
  }

  return {
    success: true,
    data: toIssueArticle(article, (insertedAuthors ?? []).map(toArticleAuthor)),
  };
}

export async function updateArticle(
  id: string,
  input: Partial<ArticleFormInput>,
): Promise<ServiceResult<IssueArticle>> {
  const parsed = articleFormSchema.partial().safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid article data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { authors, ...fields } = parsed.data;
  const supabase = createClient();

  const updatePayload: Record<string, unknown> = {};
  if (fields.title !== undefined) updatePayload.title = fields.title;
  if (fields.abstract !== undefined)
    updatePayload.abstract = fields.abstract || "";
  if (fields.pages !== undefined) updatePayload.pages = fields.pages || "";
  if (fields.pdf_url !== undefined)
    updatePayload.pdf_url = fields.pdf_url || "";
  if (fields.archive_id !== undefined)
    updatePayload.archive_id = fields.archive_id;
  if (fields.keywords !== undefined) updatePayload.keywords = fields.keywords;

  const { data: article, error: articleError } = await supabase
    .from("articles")
    .update(updatePayload)
    .eq("id", id)
    .select("id, title, abstract, pages, pdf_url, keywords")
    .single();

  if (articleError || !article) {
    return {
      success: false,
      error: articleError?.message ?? "Failed to update article",
    };
  }

  if (authors) {
    const { error: deleteError } = await supabase
      .from("authors")
      .delete()
      .eq("article_id", id);

    if (deleteError) {
      return { success: false, error: deleteError.message };
    }

    const { error: authorsError } = await supabase.from("authors").insert(
      authors.map((author: AuthorFormInput) => ({
        article_id: id,
        firstname: author.firstname,
        middlename: author.middlename || null,
        lastname: author.lastname,
        department: author.department || null,
        school: author.school,
        city: author.city || null,
        country: author.country || null,
      })),
    );

    if (authorsError) {
      return { success: false, error: authorsError.message };
    }
  }

  const { data: currentAuthors, error: authorsFetchError } = await supabase
    .from("authors")
    .select(
      "firstname, middlename, lastname, department, school, city, country",
    )
    .eq("article_id", id);

  if (authorsFetchError) {
    return { success: false, error: authorsFetchError.message };
  }

  return {
    success: true,
    data: toIssueArticle(article, (currentAuthors ?? []).map(toArticleAuthor)),
  };
}

export async function deleteArticle(id: string): Promise<ServiceResult<null>> {
  const supabase = createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: null };
}

export async function getArticleById(
  id: string,
): Promise<ServiceResult<IssueArticle | null>> {
  const supabase = createClient();

  const { data: article, error: articleError } = await supabase
    .from("articles")
    .select("id, title, abstract, pages, pdf_url, keywords")
    .eq("id", id)
    .maybeSingle();

  if (articleError) {
    return { success: false, error: articleError.message };
  }

  if (!article) {
    return { success: true, data: null };
  }

  const { data: authors, error: authorsError } = await supabase
    .from("authors")
    .select(
      "firstname, middlename, lastname, department, school, city, country",
    )
    .eq("article_id", id);

  if (authorsError) {
    return { success: false, error: authorsError.message };
  }

  return {
    success: true,
    data: toIssueArticle(article, (authors ?? []).map(toArticleAuthor)),
  };
}

export async function listArticlesByIssue(
  archiveId: string,
): Promise<ServiceResult<IssueArticle[]>> {
  const supabase = createClient();

  const { data: articles, error: articlesError } = await supabase
    .from("articles")
    .select("id, title, abstract, pages, pdf_url, keywords")
    .eq("archive_id", archiveId);

  if (articlesError) {
    return { success: false, error: articlesError.message };
  }

  const results: IssueArticle[] = [];
  for (const article of articles ?? []) {
    const { data: authors, error: authorsError } = await supabase
      .from("authors")
      .select(
        "firstname, middlename, lastname, department, school, city, country",
      )
      .eq("article_id", article.id);

    if (authorsError) {
      return { success: false, error: authorsError.message };
    }

    results.push(toIssueArticle(article, (authors ?? []).map(toArticleAuthor)));
  }

  return { success: true, data: results };
}
