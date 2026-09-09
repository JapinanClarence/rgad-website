"use server";

import { revalidatePath } from "next/cache";
import { createSummit } from "@/services/summit";
import type { SummitFormInput } from "@gad/schema";

export async function createSummitAction(input: SummitFormInput) {
  const result = await createSummit(input);

  if (result.success) {
    revalidatePath("/summit");
  }

  return result;
}
