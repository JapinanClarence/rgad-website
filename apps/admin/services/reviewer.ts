import { createClient } from "@gad/supabase/server";
import { reviewerFormSchema, type ReviewerFormInput } from "@gad/schema";
import type { Reviewer } from "@gad/types";

type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

function toReviewer(row: {
  id: string;
  firstname: string;
  middlename: string | null;
  lastname: string;
  school: string;
  country: string | null;
}): Reviewer {
  return {
    id: row.id,
    firstname: row.firstname,
    middlename: row.middlename,
    lastname: row.lastname,
    school: row.school,
    country: row.country,
  };
}

export async function createReviewer(
  input: ReviewerFormInput,
): Promise<ServiceResult<Reviewer>> {
  const parsed = reviewerFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid reviewer data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const fields = parsed.data;
  const supabase = createClient();

  const { data, error } = await supabase
    .from("reviewers")
    .insert({
      firstname: fields.firstname,
      middlename: fields.middlename || null,
      lastname: fields.lastname,
      school: fields.school,
      country: fields.country || null,
    })
    .select("id, firstname, middlename, lastname, school, country")
    .single();

  if (error || !data) {
    return {
      success: false,
      error: error?.message ?? "Failed to create reviewer",
    };
  }

  return { success: true, data: toReviewer(data) };
}

export async function updateReviewer(
  id: string,
  input: Partial<ReviewerFormInput>,
): Promise<ServiceResult<Reviewer>> {
  const parsed = reviewerFormSchema.partial().safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid reviewer data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const fields = parsed.data;
  const supabase = createClient();

  const updatePayload: Record<string, unknown> = {};
  if (fields.firstname !== undefined)
    updatePayload.firstname = fields.firstname;
  if (fields.middlename !== undefined)
    updatePayload.middlename = fields.middlename || null;
  if (fields.lastname !== undefined) updatePayload.lastname = fields.lastname;
  if (fields.school !== undefined) updatePayload.school = fields.school;
  if (fields.country !== undefined)
    updatePayload.country = fields.country || null;

  const { data, error } = await supabase
    .from("reviewers")
    .update(updatePayload)
    .eq("id", id)
    .select("id, firstname, middlename, lastname, school, country")
    .single();

  if (error || !data) {
    return {
      success: false,
      error: error?.message ?? "Failed to update reviewer",
    };
  }

  return { success: true, data: toReviewer(data) };
}

export async function deleteReviewer(id: string): Promise<ServiceResult<null>> {
  const supabase = createClient();
  const { error } = await supabase.from("reviewers").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: null };
}

export async function getReviewerById(
  id: string,
): Promise<ServiceResult<Reviewer | null>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reviewers")
    .select("id, firstname, middlename, lastname, school, country")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data ? toReviewer(data) : null };
}

export async function listReviewers(): Promise<ServiceResult<Reviewer[]>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reviewers")
    .select("id, firstname, middlename, lastname, school, country")
    .order("lastname", { ascending: true });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: (data ?? []).map(toReviewer) };
}
