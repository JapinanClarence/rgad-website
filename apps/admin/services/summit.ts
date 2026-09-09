import { createClient } from "@gad/supabase/server";
import type { Database } from "@gad/supabase/types";
import { summitFormSchema, type SummitFormInput } from "@gad/schema";
import type { Summit } from "@gad/types";

type ServiceResult<T> =
  | { success: true; data: T; error?: never; fieldErrors?: never }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
      data?: never;
    };

function toSummit(row: {
  id: string;
  theme: string | null;
  location: string | null;
  summary: string | null;
  details: string[] | null;
  note: string | null;
  outcomes: string[] | null;
  host: string | null;
  start_date: string | null;
  end_date: string | null;
  images: string[] | null;
}): Summit {
  const date = row.start_date ?? row.end_date ?? "";
  return {
    id: row.id,
    year: date ? new Date(date).getFullYear().toString() : "",
    host: row.host ?? "",
    location: row.location ?? "",
    date,
    theme: row.theme ?? "",
    summary: row.summary ?? "",
    details: row.details ?? [],
    outcomes: row.outcomes ?? [],
    note: row.note ?? undefined,
    images: row.images ?? [],
  };
}

export async function createSummit(
  input: SummitFormInput,
): Promise<ServiceResult<Summit>> {
  const parsed = summitFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid summit data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const fields = parsed.data;
  const supabase = createClient();
  const isoDate = fields.date.toISOString();

  const { data, error } = await supabase
    .from("summit")
    .insert({
      theme: fields.theme,
      location: fields.location,
      summary: fields.summary,
      details: fields.details,
      note: fields.note || null,
      outcomes: fields.outcomes,
      host: fields.host,
      start_date: isoDate,
      end_date: isoDate,
      images: fields.images,
    })
    .select(
      "id, theme, location, summary, details, note, outcomes, host, start_date, end_date, images",
    )
    .single();

  if (error || !data) {
    return {
      success: false,
      error: error?.message ?? "Failed to create summit",
    };
  }

  return { success: true, data: toSummit(data) };
}

export async function updateSummit(
  id: string,
  input: Partial<SummitFormInput>,
): Promise<ServiceResult<Summit>> {
  const parsed = summitFormSchema.partial().safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid summit data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const fields = parsed.data;
  const supabase = createClient();

  const updatePayload: Database["public"]["Tables"]["summit"]["Update"] = {};
  if (fields.theme !== undefined) updatePayload.theme = fields.theme;
  if (fields.location !== undefined) updatePayload.location = fields.location;
  if (fields.summary !== undefined) updatePayload.summary = fields.summary;
  if (fields.details !== undefined) updatePayload.details = fields.details;
  if (fields.note !== undefined) updatePayload.note = fields.note || null;
  if (fields.outcomes !== undefined) updatePayload.outcomes = fields.outcomes;
  if (fields.host !== undefined) updatePayload.host = fields.host;
  if (fields.images !== undefined) updatePayload.images = fields.images;
  if (fields.date !== undefined) {
    const isoDate = fields.date.toISOString();
    updatePayload.start_date = isoDate;
    updatePayload.end_date = isoDate;
  }

  const { data, error } = await supabase
    .from("summit")
    .update(updatePayload)
    .eq("id", id)
    .select(
      "id, theme, location, summary, details, note, outcomes, host, start_date, end_date, images",
    )
    .single();

  if (error || !data) {
    return {
      success: false,
      error: error?.message ?? "Failed to update summit",
    };
  }

  return { success: true, data: toSummit(data) };
}

export async function deleteSummit(id: string): Promise<ServiceResult<null>> {
  const supabase = createClient();
  const { error } = await supabase.from("summit").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: null };
}

export async function getSummitById(
  id: string,
): Promise<ServiceResult<Summit | null>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("summit")
    .select(
      "id, theme, location, summary, details, note, outcomes, host, start_date, end_date, images",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data ? toSummit(data) : null };
}

export type ListSummitsParams = {
  page?: number;
  pageSize?: number;
};

export type PaginatedSummits = {
  items: Summit[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export async function listSummits(
  params: ListSummitsParams = {},
): Promise<ServiceResult<PaginatedSummits>> {
  const page = params.page && params.page > 0 ? Math.floor(params.page) : 1;
  const pageSize =
    params.pageSize && params.pageSize > 0 ? Math.floor(params.pageSize) : 6;

  const supabase = createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("summit")
    .select(
      "id, theme, location, summary, details, note, outcomes, host, start_date, end_date, images",
      { count: "exact" },
    )
    .order("start_date", { ascending: false })
    .range(from, to);

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    data: {
      items: (data ?? []).map(toSummit),
      totalCount: count ?? 0,
      page,
      pageSize,
    },
  };
}
