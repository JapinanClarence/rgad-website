import { createClient } from "@gad/supabase/server";
import type { Database } from "@gad/supabase/types";
import type { Expert } from "@gad/types";

// Placeholder records shown on the About page until the "experts" table in
// Supabase is populated with real entries. Remove this once real data has
// been seeded.
const MOCK_EXPERTS: Expert[] = [
  {
    id: "mock-1",
    firstname: "Ana",
    middlename: "R.",
    lastname: "Domingo",
    email: "ana.domingo@example.edu.ph",
    school: "Davao Oriental State University",
    expertise: "Gender Mainstreaming, Policy Advocacy",
  },
  {
    id: "mock-2",
    firstname: "Ramil",
    middlename: "S.",
    lastname: "Enriquez",
    email: "ramil.enriquez@example.edu.ph",
    school: "University of Southeastern Philippines",
    expertise: "Gender Research, Development Studies",
  },
  {
    id: "mock-3",
    firstname: "Liza",
    middlename: "M.",
    lastname: "Torrefiel",
    email: "liza.torrefiel@example.edu.ph",
    school: "Davao del Norte State College",
    expertise: "GAD Planning and Budgeting, Institutional Capacity Building",
  },
  {
    id: "mock-4",
    firstname: "Noel",
    middlename: "P.",
    lastname: "Ariola",
    email: "noel.ariola@example.edu.ph",
    school: "Davao de Oro State College",
    expertise: "Community Engagement, Social Inclusion",
  },
  {
    id: "mock-5",
    firstname: "Grace",
    middlename: "T.",
    lastname: "Ubarra",
    email: "grace.ubarra@example.edu.ph",
    school: "San Pedro College",
    expertise: "Women's Empowerment, Psychosocial Support",
  },
];

export async function getExperts(): Promise<Expert[]> {
  const { data, error } = await createClient()
    .from("experts")
    .select("*")
    .order("created_at", { ascending: false, nullsFirst: false });

  if (error) throw error;

  const rows = (data ?? []) as Database["public"]["Tables"]["experts"]["Row"][];

  if (rows.length === 0) {
    return MOCK_EXPERTS;
  }

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
