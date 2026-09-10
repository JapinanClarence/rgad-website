"use server";

import { revalidatePath } from "next/cache";
import { createReviewer, deleteReviewer, updateReviewer } from "@/services/reviewer";
import type { ReviewerFormInput } from "@gad/schema";

export async function createReviewerAction(input: ReviewerFormInput) {
  const result = await createReviewer(input);

  if (result.success) {
    revalidatePath("/reviewers");
  }

  return result;
}

export async function updateReviewerAction(
  id: string,
  input: Partial<ReviewerFormInput>,
) {
  const result = await updateReviewer(id, input);

  if (result.success) {
    revalidatePath("/reviewers");
    revalidatePath(`/reviewers/${id}`);
  }

  return result;
}

export async function deleteReviewerAction(id: string) {
  const result = await deleteReviewer(id);

  if (result.success) {
    revalidatePath("/reviewers");
  }

  return result;
}
