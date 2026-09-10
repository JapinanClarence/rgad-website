"use server";

import { revalidatePath } from "next/cache";
import { createIssue, deleteIssue } from "@/services/issue";
import type { IssueFormInput } from "@gad/schema";

export async function createIssueAction(input: IssueFormInput) {
  const result = await createIssue(input);

  if (result.success) {
    revalidatePath("/issues");
  }

  return result;
}

export async function deleteIssueAction(id: string) {
  const result = await deleteIssue(id);

  if (result.success) {
    revalidatePath("/issues");
    revalidatePath("/articles");
  }

  return result;
}
