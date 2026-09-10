import { createClient } from "@gad/supabase/server";
import type { Database } from "@gad/supabase/types";
import { issueFormSchema, type IssueFormInput } from "@gad/schema";
import type { Issue } from "@gad/types";
import { deleteArticle } from "./article";

type ServiceResult<T> =
  | { success: true; data: T; error?: never; fieldErrors?: never }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
      data?: never;
    };

function toIssue(row: {
  id: string;
  volume_no: number;
  issue_no: number;
  doi: string | null;
  issn: string;
  cover_image: string | null;
  published_at: string;
  is_current: boolean;
}): Issue {
  return {
    id: row.id,
    volume: row.volume_no,
    issueNo: row.issue_no,
    title: `Volume ${row.volume_no}, Issue ${row.issue_no}`,
    doi: row.doi ?? undefined,
    issn: row.issn,
    coverImage: row.cover_image,
    publishedAt: row.published_at,
    isCurrent: row.is_current,
    date: row.published_at,
  };
}

async function unsetOtherCurrentIssues(
  supabase: ReturnType<typeof createClient>,
  exceptId?: string,
) {
  return exceptId
    ? supabase.from("archive").update({ is_current: false }).neq("id", exceptId)
    : supabase
        .from("archive")
        .update({ is_current: false })
        .gte("volume_no", 0);
}

export async function createIssue(
  input: IssueFormInput,
): Promise<ServiceResult<Issue>> {
  const parsed = issueFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid issue data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const fields = parsed.data;
  const supabase = createClient();

  if (fields.isCurrent) {
    const { error: unsetError } = await unsetOtherCurrentIssues(supabase);
    if (unsetError) {
      return { success: false, error: unsetError.message };
    }
  }

  const { data, error } = await supabase
    .from("archive")
    .insert({
      volume_no: fields.volume,
      issue_no: fields.issueNo,
      doi: fields.doi || null,
      issn: fields.issn,
      cover_image: fields.coverImage || null,
      published_at: fields.publishedAt.toISOString(),
      is_current: fields.isCurrent ?? false,
    })
    .select(
      "id, volume_no, issue_no, doi, issn, cover_image, published_at, is_current",
    )
    .single();

  if (error || !data) {
    return {
      success: false,
      error: error?.message ?? "Failed to create issue",
    };
  }

  return { success: true, data: toIssue(data) };
}

export async function updateIssue(
  id: string,
  input: Partial<IssueFormInput>,
): Promise<ServiceResult<Issue>> {
  const parsed = issueFormSchema.partial().safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid issue data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const fields = parsed.data;
  const supabase = createClient();

  if (fields.isCurrent) {
    const { error: unsetError } = await unsetOtherCurrentIssues(supabase, id);
    if (unsetError) {
      return { success: false, error: unsetError.message };
    }
  }

  const updatePayload: Database["public"]["Tables"]["archive"]["Update"] = {};
  if (fields.volume !== undefined) updatePayload.volume_no = fields.volume;
  if (fields.issueNo !== undefined) updatePayload.issue_no = fields.issueNo;
  if (fields.doi !== undefined) updatePayload.doi = fields.doi || null;
  if (fields.issn !== undefined) updatePayload.issn = fields.issn;
  if (fields.coverImage !== undefined)
    updatePayload.cover_image = fields.coverImage || null;
  if (fields.publishedAt !== undefined)
    updatePayload.published_at = fields.publishedAt.toISOString();
  if (fields.isCurrent !== undefined)
    updatePayload.is_current = fields.isCurrent;

  const { data, error } = await supabase
    .from("archive")
    .update(updatePayload)
    .eq("id", id)
    .select(
      "id, volume_no, issue_no, doi, issn, cover_image, published_at, is_current",
    )
    .single();

  if (error || !data) {
    return {
      success: false,
      error: error?.message ?? "Failed to update issue",
    };
  }

  return { success: true, data: toIssue(data) };
}

// Matches the bucket used by uploadImage() in services/storage.ts. Issue
// cover images live under the "covers" folder inside this bucket, e.g.
// ".../object/public/images/covers/<unique>-<filename>.jpg".
const IMAGE_BUCKET = "images";

/**
 * Recovers the storage path (bucket-relative) from a Supabase public
 * storage URL, e.g. turns
 * "https://xyz.supabase.co/storage/v1/object/public/images/covers/123-a.jpg"
 * into "covers/123-a.jpg". Returns null if the URL doesn't match the
 * expected public-storage shape for the given bucket.
 */
function extractStoragePath(url: string, bucket: string): string | null {
  const marker = `/object/public/${bucket}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;

  const path = url.slice(index + marker.length);
  return path ? decodeURIComponent(path) : null;
}

export async function deleteIssue(id: string): Promise<ServiceResult<null>> {
  const supabase = createClient();

  const { data: existingIssue, error: issueFetchError } = await supabase
    .from("archive")
    .select("cover_image")
    .eq("id", id)
    .maybeSingle();

  if (issueFetchError) {
    return { success: false, error: issueFetchError.message };
  }

  const { data: articles, error: articlesFetchError } = await supabase
    .from("articles")
    .select("id")
    .eq("archive_id", id);

  if (articlesFetchError) {
    return { success: false, error: articlesFetchError.message };
  }

  // An issue's articles are not automatically removed when the issue is
  // deleted, so route each one through deleteArticle first. That also
  // cleans up each article's authors and uploaded PDF, the same as
  // deleting an article individually.
  for (const article of articles ?? []) {
    const result = await deleteArticle(article.id);
    if (!result.success) {
      return { success: false, error: result.error };
    }
  }

  const { error } = await supabase.from("archive").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  // Remove the issue's cover image from storage last, after the row is
  // gone. If this fails we still treat the delete as successful (the issue
  // is already gone from the listing/database), but log it so an orphaned
  // file in the "images" bucket can be cleaned up manually.
  const storagePath = existingIssue?.cover_image
    ? extractStoragePath(existingIssue.cover_image, IMAGE_BUCKET)
    : null;

  if (storagePath) {
    const { error: storageError } = await supabase.storage
      .from(IMAGE_BUCKET)
      .remove([storagePath]);

    if (storageError) {
      console.error(
        `Failed to remove issue cover image "${storagePath}" from storage: ${storageError.message}`,
      );
    }
  }

  return { success: true, data: null };
}

export async function getIssueById(
  id: string,
): Promise<ServiceResult<Issue | null>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("archive")
    .select(
      "id, volume_no, issue_no, doi, issn, cover_image, published_at, is_current",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data ? toIssue(data) : null };
}

export type ListIssuesParams = {
  page?: number;
  pageSize?: number;
};

export type PaginatedIssues = {
  items: Issue[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export async function listIssues(
  params: ListIssuesParams = {},
): Promise<ServiceResult<PaginatedIssues>> {
  const page = params.page && params.page > 0 ? Math.floor(params.page) : 1;
  const pageSize =
    params.pageSize && params.pageSize > 0 ? Math.floor(params.pageSize) : 6;

  const supabase = createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("archive")
    .select(
      "id, volume_no, issue_no, doi, issn, cover_image, published_at, is_current",
      { count: "exact" },
    )
    .order("volume_no", { ascending: false })
    .order("issue_no", { ascending: false })
    .range(from, to);

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    data: {
      items: (data ?? []).map(toIssue),
      totalCount: count ?? 0,
      page,
      pageSize,
    },
  };
}
