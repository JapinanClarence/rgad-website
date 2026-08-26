import { createClient } from "@gad/supabase";
import type { Database } from "@gad/supabase/types";
import type { Summit } from "@gad/types/";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function toList(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter(isNonEmptyString);
  if (!isNonEmptyString(value)) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed))
      return parsed.filter(
        (item): item is string =>
          typeof item === "string" && item.trim().length > 0,
      );
  } catch {
    /* Plain text is parsed below. */
  }
  return value
    .split(/\r?\n/)
    .map((item) => item.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
}

function formatDate(startDate: string | null, endDate: string | null): string {
  if (!startDate) return "Date to be announced";
  const format = (date: string) =>
    new Intl.DateTimeFormat("en-PH", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));
  return endDate && endDate !== startDate
    ? `${format(startDate)} – ${format(endDate)}`
    : format(startDate);
}

export async function getSummits(): Promise<Summit[]> {
  const { data, error } = await createClient()
    .from("summit")
    .select("*")
    .order("start_date", { ascending: false, nullsFirst: false });
  if (error) throw error;
  const rows = (data ?? []) as Database["public"]["Tables"]["summit"]["Row"][];
  return rows.map((item) => ({
    id: item.id,
    year: item.start_date
      ? new Date(`${item.start_date}T00:00:00Z`).getUTCFullYear().toString()
      : "Archive",
    host: item.host ?? "Host to be announced",
    location: item.location ?? "Location to be announced",
    date: formatDate(item.start_date, item.end_date),
    theme: item.theme ?? "Regional GAD Summit",
    summary: item.summary ?? "",
    details: toList(item.details),
    outcomes: toList(item.outcomes),
    note: item.note ?? undefined,
    images: toList(item.images),
  }));
}
