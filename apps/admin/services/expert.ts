import { createClient } from "@gad/supabase/server";
import type { Database } from "@gad/supabase/types";
import { expertsFormSchema, type ExpertsFormInput } from "@gad/schema";
import type { Expert } from "@gad/types";
import { ListReviewersParams, PaginatedReviewers } from "./reviewer";

type ServiceResult<T> =
  | { success: true; data: T; error?: never; fieldErrors?: never }
  | {
	  success: false;
	  error: string;
	  fieldErrors?: Record<string, string[]>;
	  data?: never;
	};

function toExpert(row: {
  id: string;
  firstname: string;
  middlename: string | null;
  lastname: string;
  school: string;
  email: string | null;
  expertise: string;
}): Expert {
  return {
	id: row.id,
	firstname: row.firstname,
	middlename: row.middlename,
	lastname: row.lastname,
	school: row.school,
	email: row.email,
	expertise: row.expertise,
  };
}

export async function createExpert(
  input: ExpertsFormInput,
): Promise<ServiceResult<Expert>> {
  const parsed = expertsFormSchema.safeParse(input);
  if (!parsed.success) {
	return {
	  success: false,
	  error: "Invalid expert data",
	  fieldErrors: parsed.error.flatten().fieldErrors,
	};
  }

  const fields = parsed.data;
  const supabase = createClient();

  const { data, error } = await supabase
	.from("experts")
	.insert({
	  firstname: fields.firstname,
	  middlename: fields.middlename || null,
	  lastname: fields.lastname,
	  school: fields.school,
	  email: fields.email || null,
	  expertise: fields.expertise,
	})
	.select("id, firstname, middlename, lastname, school, email, expertise")
	.single();

  if (error || !data) {
	return {
	  success: false,
	  error: error?.message ?? "Failed to create expert",
	};
  }

  return { success: true, data: toExpert(data) };
}

export async function updateExpert(
  id: string,
  input: Partial<ExpertsFormInput>,
): Promise<ServiceResult<Expert>> {
  const parsed = expertsFormSchema.partial().safeParse(input);
  if (!parsed.success) {
	return {
	  success: false,
	  error: "Invalid expert data",
	  fieldErrors: parsed.error.flatten().fieldErrors,
	};
  }

  const fields = parsed.data;
  const supabase = createClient();

  const updatePayload: Database["public"]["Tables"]["experts"]["Update"] =
	{};
  if (fields.firstname !== undefined)
	updatePayload.firstname = fields.firstname;
  if (fields.middlename !== undefined)
	updatePayload.middlename = fields.middlename || null;
  if (fields.lastname !== undefined) updatePayload.lastname = fields.lastname;
  if (fields.school !== undefined) updatePayload.school = fields.school;
  if (fields.email !== undefined)
	updatePayload.email = fields.email || null;
  if (fields.expertise !== undefined)
	updatePayload.expertise = fields.expertise;

  const { data, error } = await supabase
	.from("experts")
	.update(updatePayload)
	.eq("id", id)
	.select("id, firstname, middlename, lastname, school, email, expertise")
	.single();

  if (error || !data) {
	return {
	  success: false,
	  error: error?.message ?? "Failed to update expert",
	};
  }

  return { success: true, data: toExpert(data) };
}

export async function deleteExpert(id: string): Promise<ServiceResult<null>> {
  const supabase = createClient();
  const { error } = await supabase.from("experts").delete().eq("id", id);

  if (error) {
	return { success: false, error: error.message };
  }

  return { success: true, data: null };
}

export async function getExpertById(
  id: string,
): Promise<ServiceResult<Expert | null>> {
  const supabase = createClient();
  const { data, error } = await supabase
	.from("experts")
	.select("id, firstname, middlename, lastname, school, email, expertise")
	.eq("id", id)
	.maybeSingle();

  if (error) {
	return { success: false, error: error.message };
  }

  return { success: true, data: data ? toExpert(data) : null };
}

export type ListExpertsParams = {
  page?: number;
  pageSize?: number;
};

export type PaginatedExperts = {
  items: Expert[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export async function listExperts(
  params: ListExpertsParams = {},
): Promise<ServiceResult<PaginatedExperts>> {
  const page = params.page && params.page > 0 ? Math.floor(params.page) : 1;
  const pageSize =
	params.pageSize && params.pageSize > 0 ? Math.floor(params.pageSize) : 6;

  const supabase = createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
	.from("experts")
	.select("id, firstname, middlename, lastname, school, email, expertise", {
	  count: "exact",
	})
	.order("lastname", { ascending: true })
	.range(from, to);

  if (error) {
	return { success: false, error: error.message };
  }

  return {
	success: true,
	data: {
	  items: (data ?? []).map(toExpert),
	  totalCount: count ?? 0,
	  page,
	  pageSize,
	},
  };
}
