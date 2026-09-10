import { createClient } from "@gad/supabase/server";
import type { Database } from "@gad/supabase/types";
import {
  announcementFormSchema,
  type AnnouncementFormInput,
} from "@gad/schema";
import type { Announcement } from "@gad/types";
import { ListReviewersParams } from "./reviewer";

type ServiceResult<T> =
  | { success: true; data: T; error?: never; fieldErrors?: never }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
      data?: never;
    };

function toAnnouncement(row: {
  id: string;
  title: string;
  slug: string;
  description: string;
  published_at: string;
  external_url: string | null;
  is_pinned: boolean;
}): Announcement {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    publishedAt: row.published_at,
    externalUrl: row.external_url ?? undefined,
    isPinned: row.is_pinned,
  };
}

export async function createAnnouncement(
  input: AnnouncementFormInput,
): Promise<ServiceResult<Announcement>> {
  const parsed = announcementFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid announcement data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const fields = parsed.data;
  const supabase = createClient();

  const { data, error } = await supabase
    .from("announcements")
    .insert({
      title: fields.title,
      slug: fields.slug,
      description: fields.description,
      published_at: fields.publishedAt.toISOString(),
      external_url: fields.externalUrl || null,
      is_pinned: fields.isPinned,
    })
    .select(
      "id, title, slug, description, published_at, external_url, is_pinned",
    )
    .single();

  if (error || !data) {
    return {
      success: false,
      error: error?.message ?? "Failed to create announcement",
    };
  }

  return { success: true, data: toAnnouncement(data) };
}

export async function updateAnnouncement(
  id: string,
  input: Partial<AnnouncementFormInput>,
): Promise<ServiceResult<Announcement>> {
  const parsed = announcementFormSchema.partial().safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid announcement data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const fields = parsed.data;
  const supabase = createClient();

  const updatePayload: Database["public"]["Tables"]["announcements"]["Update"] =
    {};
  if (fields.title !== undefined) updatePayload.title = fields.title;
  if (fields.slug !== undefined) updatePayload.slug = fields.slug;
  if (fields.description !== undefined)
    updatePayload.description = fields.description;
  if (fields.publishedAt !== undefined)
    updatePayload.published_at = fields.publishedAt.toISOString();
  if (fields.externalUrl !== undefined)
    updatePayload.external_url = fields.externalUrl || null;
  if (fields.isPinned !== undefined) updatePayload.is_pinned = fields.isPinned;

  const { data, error } = await supabase
    .from("announcements")
    .update(updatePayload)
    .eq("id", id)
    .select(
      "id, title, slug, description, published_at, external_url, is_pinned",
    )
    .single();

  if (error || !data) {
    return {
      success: false,
      error: error?.message ?? "Failed to update announcement",
    };
  }

  return { success: true, data: toAnnouncement(data) };
}

export async function deleteAnnouncement(
  id: string,
): Promise<ServiceResult<null>> {
  const supabase = createClient();
  const { error } = await supabase.from("announcements").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: null };
}

export async function getAnnouncementById(
  id: string,
): Promise<ServiceResult<Announcement | null>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("announcements")
    .select(
      "id, title, slug, description, published_at, external_url, is_pinned",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data ? toAnnouncement(data) : null };
}

export type ListAnnouncementsParams = {
  page?: number;
  pageSize?: number;
};

export type PaginatedAnnouncements = {
  items: Announcement[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export async function listAnnouncements(
  params: ListAnnouncementsParams = {},
): Promise<ServiceResult<PaginatedAnnouncements>> {
  const page = params.page && params.page > 0 ? Math.floor(params.page) : 1;
  const pageSize =
    params.pageSize && params.pageSize > 0 ? Math.floor(params.pageSize) : 6;

  const supabase = createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("announcements")
    .select(
      "id, title, slug, description, published_at, external_url, is_pinned",
      {
        count: "exact",
      },
    )
    .order("published_at", { ascending: false })
    .range(from, to);

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    data: {
      items: (data ?? []).map(toAnnouncement),
      totalCount: count ?? 0,
      page,
      pageSize,
    },
  };
}
