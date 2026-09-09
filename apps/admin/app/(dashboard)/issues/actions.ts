"use server";

import { revalidatePath } from "next/cache";
import { createIssue } from "@/services/issue";
import type { IssueFormInput } from "@gad/schema";

export async function createIssueAction(input: IssueFormInput) {
  const result = await createIssue(input);

  if (result.success) {
    revalidatePath("/issues");
  }

  return result;
}
