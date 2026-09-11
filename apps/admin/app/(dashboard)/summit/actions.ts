"use server";

import { revalidatePath } from "next/cache";
import { createSummit, deleteSummit, updateSummit } from "@/services/summit";
import type { SummitFormInput } from "@gad/schema";

export async function createSummitAction(input: SummitFormInput) {
  const result = await createSummit(input);

  if (result.success) {
    revalidatePath("/summit");
  }

  return result;
}

export async function updateSummitAction(
  id: string,
  input: Partial<SummitFormInput>,
) {
  const result = await updateSummit(id, input);

  if (result.success) {
    revalidatePath("/summit");
    revalidatePath(`/summit/${id}`);
  }

  return result;
}

export async function deleteSummitAction(id: string) {
  const result = await deleteSummit(id);

  if (result.success) {
    revalidatePath("/summit");
  }

  return result;
}
