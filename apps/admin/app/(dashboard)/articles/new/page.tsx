import React from "react";
import { ArticleForm, DEFAULT_ARTICLE_VALUES } from "@/components/articles/article-form";

export default function NewArticlePage() {
  return <ArticleForm mode="create" defaultValues={DEFAULT_ARTICLE_VALUES} />;
}
