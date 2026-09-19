import { createClient } from "@gad/supabase/server";
import type { Database } from "@gad/supabase/types";
import type { Officer } from "@gad/types";

export async function getOfficers(): Promise<Officer[]> {
  const { data, error } = await createClient()
	.from("officers")
	.select("*")
	.order("display_order", { ascending: true, nullsFirst: false });

  if (error) throw error;

  const rows = (data ??
	[]) as Database["public"]["Tables"]["officers"]["Row"][];

  return rows.map((item) => ({
	id: item.id,
	firstname: item.firstname,
	lastname: item.lastname,
	middlename: item.middlename ?? undefined,
	school: item.school,
	position: item.position,
	extension: item.extension ?? undefined,
	profile: item.profile ?? undefined,
	isOfficer: item.is_officer,
	isFoundingOfficer: item.is_founding_officer,
	isCurrent: item.is_current,
	displayOrder: item.display_order,
  }));
}
