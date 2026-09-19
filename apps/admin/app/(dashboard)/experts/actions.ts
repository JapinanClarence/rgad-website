"use server";

import { revalidatePath } from "next/cache";
import { createExpert, deleteExpert, updateExpert } from "@/services/expert";
import type { ReviewerFormInput } from "@gad/schema";

export async function createExpertAction(input: ReviewerFormInput) {
  const result = await createExpert(input);

  if (result.success) {
    revalidatePath("/experts");
  }

  return result;
}

export async function updateExpertAction(
  id: string,
  input: Partial<ReviewerFormInput>,
) {
  const result = await updateExpert(id, input);

  if (result.success) {
    revalidatePath("/experts");
    revalidatePath(`/experts/${id}`);
  }

  return result;
}

export async function deleteExpertAction(id: string) {
  const result = await deleteExpert(id);

  if (result.success) {
    revalidatePath("/experts");
  }

  return result;
}
