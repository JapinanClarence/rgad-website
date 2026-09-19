import { createClient } from "@gad/supabase/server";
import type { Database } from "@gad/supabase/types";
import type { Expert } from "@gad/types";

// Temporary data shown on the About page until the "experts" table in
// Supabase is populated. Sourced from the RGAN XI Pool of Speakers and
// Trainers directory. Remove this once the table has been seeded with the
// same records.
const MOCK_EXPERTS: Expert[] = [
  {
    id: "mock-1",
    firstname: "Sarah",
    middlename: "C.",
    lastname: "Aranges",
    email: "sarah.cabahit@ddosc.edu.ph",
    school: "Davao de Oro State College",
    expertise: "Gender Analysis, GAD Planning and Budgeting",
  },
  {
    id: "mock-2",
    firstname: "Mary Fil",
    middlename: "M.",
    lastname: "Bauyot",
    email: "maryfil.bauyot@dorsu.edu.ph",
    school: "Davao Oriental State University",
    expertise:
      "Gender Sensitivity Training, Gender Mainstreaming, Gender Analysis, GAD Planning and Budgeting, Gender and Environment",
  },
  {
    id: "mock-3",
    firstname: "Helina Jean",
    middlename: "P.",
    lastname: "Dupa",
    email: "dupa.helinajean@dorsu.edu.ph",
    school: "Davao Oriental State University",
    expertise:
      "Gender Sensitivity Training, Gender Analysis, Gender-Responsive Research, Gender-Responsive Project Development, Gender and Environment",
  },
  {
    id: "mock-4",
    firstname: "Jeralyn",
    middlename: "N.",
    lastname: "Hemillan",
    email: "jeralynhemillan@gmail.com",
    school: "Davao Oriental State University",
    expertise: "Gender Sensitivity Training, Gender-related Laws, Human Rights",
  },
  {
    id: "mock-5",
    firstname: "Sadie",
    middlename: "D.",
    lastname: "Law-ay",
    email: "sadie.law-ay@dnsc.edu.ph",
    school:
      "Davao del Norte State College / National Gender and Development (GAD) Resource Pool (NGRP)",
    expertise:
      "Gender Sensitivity Training, Gender Mainstreaming, Gender Analysis, Gender-Responsive Research, GAD Planning and Budgeting, GAD Capacity Building",
  },
  {
    id: "mock-6",
    firstname: "Cecile",
    middlename: "C.",
    lastname: "Lofranco",
    email: "gad@dssc.edu.ph",
    school: "Davao del Sur State College",
    expertise: "Gender Sensitivity Training",
  },
  {
    id: "mock-7",
    firstname: "Vaneza",
    middlename: "C.",
    lastname: "Paquiao",
    email: "paquiaovan03@gmail.com",
    school: "Samal Island City College",
    expertise:
      "Gender Sensitivity Training, Gender Mainstreaming, Gender Analysis, GAD Planning and Budgeting, GAD Capacity Building, Gender and Development Laws",
  },
  {
    id: "mock-8",
    firstname: "Genesesly",
    middlename: "R.",
    lastname: "Tahoy",
    email: "grtahoy@usep.edu.ph",
    school: "University of Southeastern Philippines",
    expertise: "GAD Capacity Building",
  },
  {
    id: "mock-9",
    firstname: "Jhonnel",
    middlename: "P.",
    lastname: "Villegas",
    email: "jhonnel.villegas@dorsu.edu.ph",
    school: "Davao Oriental State University",
    expertise:
      "Gender Sensitivity Training, Gender Mainstreaming, Gender Analysis, Gender-Responsive Research, Gender and Indigenous Peoples, Gender and Environment, Gender and Conservation",
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
