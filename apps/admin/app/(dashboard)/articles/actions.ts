"use server";

import { revalidatePath } from "next/cache";
import { createArticle, deleteArticle } from "@/services/article";
import type { ArticleFormInput } from "@gad/schema";

export async function createArticleAction(input: ArticleFormInput) {
  const result = await createArticle(input);

  if (result.success) {
    revalidatePath("/articles");
  }

  return result;
}

export async function deleteArticleAction(id: string) {
  const result = await deleteArticle(id);

  if (result.success) {
    revalidatePath("/articles");
  }

  return result;
}
