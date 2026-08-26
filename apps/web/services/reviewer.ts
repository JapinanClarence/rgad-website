import { createClient } from "@gad/supabase/server";
import type { Database } from "@gad/supabase/types";
import type { Reviewer } from "@gad/types";

export async function getReviewers(): Promise<Reviewer[]> {
  const { data, error } = await createClient()
    .from("reviewers")
    .select("*")
    .order("created_at", { ascending: false, nullsFirst: false });

  if (error) throw error;

  const rows = (data ??
    []) as Database["public"]["Tables"]["reviewers"]["Row"][];

  return rows.map((item) => ({
    id: item.id,
    firstname: item.firstname,
    lastname: item.lastname,
    middlename: item.middlename,
    school: item.school,
    country: item.country,
  }));
}
