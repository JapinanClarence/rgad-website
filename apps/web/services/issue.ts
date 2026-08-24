import { createClient } from "@/lib/supabase/server";
import type { Database } from "@gad/supabase/types";
import type { Issue, IssueArticle } from "@gad/types/issue";

function formatIssueDate(value: string): string {
  return new Intl.DateTimeFormat("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function toAuthorName(author: {
  firstname?: string | null;
  middlename?: string | null;
  lastname?: string | null;
}): string {
  const first = author.firstname ?? "";
  const middle = author.middlename ? ` ${author.middlename}` : "";
  const last = author.lastname ?? "";
  return `${first}${middle} ${last}`.trim();
}

export async function getIssues(): Promise<Issue[]> {
  const { data, error } = await createClient()
    .from("archive")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) throw error;

  const rows = (data ?? []) as Database["public"]["Tables"]["archive"]["Row"][];

  return rows.map((item) => ({
    id: item.id,
    volume: item.volume_no,
    issueNo: item.issue_no,
    title: `Vol. ${item.volume_no}, Issue ${item.issue_no}`,
    doi: item.doi ?? undefined,
    issn: item.issn,
    coverImage: item.cover_image ?? undefined,
    publishedAt: item.published_at,
    isCurrent: item.is_current,
    date: formatIssueDate(item.published_at),
  }));
}

export async function getIssueById(
  id: string,
): Promise<{ issue: Issue; articles: IssueArticle[] } | null> {
  const { data, error } = await createClient()
    .from("archive")
    .select("*, articles(*, authors(*))")
    .eq("id", id)
    .order("created_at", { foreignTable: "articles", ascending: true })
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const archive = data as Database["public"]["Tables"]["archive"]["Row"] & {
    articles?: Array<{
      id: string;
      title: string;
      abstract: string;
      pages: string;
      pdf_url: string;
      keywords: string[] | null;
      doi: string | null;
      authors?: Array<{
        firstname?: string | null;
        middlename?: string | null;
        lastname?: string | null;
      }>;
    }>;
  };

  const issue: Issue = {
    id: archive.id,
    volume: archive.volume_no,
    issueNo: archive.issue_no,
    title: `Vol. ${archive.volume_no}, Issue ${archive.issue_no}`,
    doi: archive.doi ?? undefined,
    issn: archive.issn,
    coverImage: archive.cover_image ?? undefined,
    publishedAt: archive.published_at,
    isCurrent: archive.is_current,
    date: formatIssueDate(archive.published_at),
  };

  const articles: IssueArticle[] = (archive.articles ?? []).map((article) => {
    const authors = (article.authors ?? [])
      .map((author) => toAuthorName(author))
      .filter(Boolean);

    return {
      id: article.id,
      title: article.title,
      abstract: article.abstract,
      pages: article.pages,
      pdfUrl: article.pdf_url,
      authors,
      doi: article.doi,
      keywords: article.keywords ?? [],
    };
  });

  return { issue, articles };
}
