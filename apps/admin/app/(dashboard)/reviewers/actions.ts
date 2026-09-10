"use server";

import { revalidatePath } from "next/cache";
import { createReviewer } from "@/services/reviewer";
import type { ReviewerFormInput } from "@gad/schema";

export async function createReviewerAction(input: ReviewerFormInput) {
  const result = await createReviewer(input);

  if (result.success) {
    revalidatePath("/reviewers");
  }

  return result;
}
