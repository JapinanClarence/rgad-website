import { createClient } from "@gad/supabase/server";
import type { Database } from "@gad/supabase/types";
import { officerFormSchema, type OfficerFormInput } from "@gad/schema";
import type { Officer } from "@gad/types";

type ServiceResult<T> =
  | { success: true; data: T; error?: never; fieldErrors?: never }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
      data?: never;
    };

const OFFICER_FIELDS =
  "id, firstname, middlename, lastname, position, school, extension, profile, is_officer, is_founding_officer, is_current, display_order";

function toOfficer(row: {
  id: string;
  firstname: string;
  middlename: string | null;
  lastname: string;
  position: string;
  school: string;
  extension: string | null;
  profile: string | null;
  is_officer: boolean;
  is_founding_officer: boolean;
  is_current: boolean;
  display_order: number;
}): Officer {
  return {
    id: row.id,
    firstname: row.firstname,
    middlename: row.middlename,
    lastname: row.lastname,
    position: row.position,
    school: row.school,
    extension: row.extension,
    profile: row.profile,
    isOfficer: row.is_officer,
    isFoundingOfficer: row.is_founding_officer,
    isCurrent: row.is_current,
    displayOrder: row.display_order,
  };
}

export async function createOfficer(
  input: OfficerFormInput,
): Promise<ServiceResult<Officer>> {
  const parsed = officerFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid officer data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const fields = parsed.data;
  const supabase = createClient();
  const { data, error } = await supabase
    .from("officers")
    .insert({
      firstname: fields.firstname,
      middlename: fields.middlename || null,
      lastname: fields.lastname,
      extension: fields.extension || null,
      position: fields.position,
      school: fields.school,
      profile: fields.profile || null,
      is_officer: fields.isOfficer,
      is_founding_officer: fields.isFoundingOfficer,
      is_current: fields.isCurrent,
      display_order: fields.displayOrder,
    })
    .select(OFFICER_FIELDS)
    .single();

  if (error || !data) {
    return {
      success: false,
      error: error?.message ?? "Failed to create officer",
    };
  }

  return { success: true, data: toOfficer(data) };
}

export async function updateOfficer(
  id: string,
  input: Partial<OfficerFormInput>,
): Promise<ServiceResult<Officer>> {
  const parsed = officerFormSchema.partial().safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid officer data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const fields = parsed.data;
  const updatePayload: Database["public"]["Tables"]["officers"]["Update"] =
    {};

  if (fields.firstname !== undefined) updatePayload.firstname = fields.firstname;
  if (fields.middlename !== undefined)
    updatePayload.middlename = fields.middlename || null;
  if (fields.lastname !== undefined) updatePayload.lastname = fields.lastname;
  if (fields.extension !== undefined)
    updatePayload.extension = fields.extension || null;
  if (fields.position !== undefined) updatePayload.position = fields.position;
  if (fields.school !== undefined) updatePayload.school = fields.school;
  if (fields.profile !== undefined) updatePayload.profile = fields.profile || null;
  if (fields.isOfficer !== undefined) updatePayload.is_officer = fields.isOfficer;
  if (fields.isFoundingOfficer !== undefined)
    updatePayload.is_founding_officer = fields.isFoundingOfficer;
  if (fields.isCurrent !== undefined) updatePayload.is_current = fields.isCurrent;
  if (fields.displayOrder !== undefined)
    updatePayload.display_order = fields.displayOrder;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("officers")
    .update(updatePayload)
    .eq("id", id)
    .select(OFFICER_FIELDS)
    .single();

  if (error || !data) {
    return {
      success: false,
      error: error?.message ?? "Failed to update officer",
    };
  }

  return { success: true, data: toOfficer(data) };
}

export async function deleteOfficer(id: string): Promise<ServiceResult<null>> {
  const supabase = createClient();
  const { error } = await supabase.from("officers").delete().eq("id", id);

  if (error) return { success: false, error: error.message };

  return { success: true, data: null };
}

export async function getOfficerById(
  id: string,
): Promise<ServiceResult<Officer | null>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("officers")
    .select(OFFICER_FIELDS)
    .eq("id", id)
    .maybeSingle();

  if (error) return { success: false, error: error.message };

  return { success: true, data: data ? toOfficer(data) : null };
}

export type ListOfficersParams = {
  page?: number;
  pageSize?: number;
};

export type PaginatedOfficers = {
  items: Officer[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export async function listOfficers(
  params: ListOfficersParams = {},
): Promise<ServiceResult<PaginatedOfficers>> {
  const page = params.page && params.page > 0 ? Math.floor(params.page) : 1;
  const pageSize =
    params.pageSize && params.pageSize > 0 ? Math.floor(params.pageSize) : 6;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = createClient();
  const { data, error, count } = await supabase
    .from("officers")
    .select(OFFICER_FIELDS, { count: "exact" })
    .order("display_order", { ascending: true, nullsFirst: false })
    .range(from, to);

  if (error) return { success: false, error: error.message };

  return {
    success: true,
    data: {
      items: (data ?? []).map(toOfficer),
      totalCount: count ?? 0,
      page,
      pageSize,
    },
  };
}
