import { createClient } from "@gad/supabase/server";
import type { Database } from "@gad/supabase/types";
import type { Expert } from "@gad/types";

export async function getExperts(): Promise<Expert[]> {
  const { data, error } = await createClient()
    .from("experts")
    .select("*")
    .order("created_at", { ascending: false, nullsFirst: false });

  if (error) throw error;

  const rows = (data ?? []) as Database["public"]["Tables"]["experts"]["Row"][];

  return rows.map((item) => ({
    id: item.id,
    firstname: item.firstname,
    middlename: item.middlename,
    lastname: item.lastname,
    email: item.email,
    school: item.school,
    expertise: item.expertise,
  }));
}
