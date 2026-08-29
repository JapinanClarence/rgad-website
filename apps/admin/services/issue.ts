import { createClient } from "@gad/supabase/server";
import { issueFormSchema, type IssueFormInput } from "@gad/schema";
import type { Issue } from "@gad/types";

type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

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
      editorial: null,
      editorial_author: null,
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

  const updatePayload: Record<string, unknown> = {};
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

export async function deleteIssue(id: string): Promise<ServiceResult<null>> {
  const supabase = createClient();
  const { error } = await supabase.from("archive").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
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

export async function listIssues(): Promise<ServiceResult<Issue[]>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("archive")
    .select(
      "id, volume_no, issue_no, doi, issn, cover_image, published_at, is_current",
    )
    .order("volume_no", { ascending: false })
    .order("issue_no", { ascending: false });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: (data ?? []).map(toIssue) };
}
