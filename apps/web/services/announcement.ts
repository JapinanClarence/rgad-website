import type { Announcement } from "@gad/types/announcement";
import { createClient } from "@gad/supabase/server";
import type { Database } from "@gad/supabase/types";

export async function getAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await createClient()
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false, nullsFirst: false });

  if (error) throw error;

  const rows = (data ??
    []) as Database["public"]["Tables"]["announcements"]["Row"][];

  return rows.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    publishedAt: item.published_at,
    isPinned: item.is_pinned,
  }));
}

export async function getAnnouncementBySlug(
  slug: string,
): Promise<Announcement | null> {
  const { data, error } = await createClient()
    .from("announcements")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  if (!data) return null;

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    description: data.description,
    publishedAt: data.published_at,
    isPinned: data.is_pinned,
  };
}
