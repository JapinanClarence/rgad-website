import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleById } from "@/services/article";
import { ArticleForm } from "@/components/articles/article-form";
import type { ArticleFormInput } from "@gad/schema";

export const metadata: Metadata = { title: "Edit Article" };

interface Props {
  params: { id: string };
}

export default async function EditArticlePage({ params }: Props) {
  const result = await getArticleById(params.id);

  if (!result.success || !result.data) {
    notFound();
  }

  const article = result.data;

  const defaultValues: ArticleFormInput = {
    title: article.title,
    abstract: article.abstract ?? "",
    pages: article.pages ?? "",
    pdf_url: article.pdfUrl ?? "",
    archive_id: article.archiveId ?? "",
    keywords: article.keywords ?? [],
    doi: article.doi ?? "",
    correspondence: article.correspondence ?? "",
    authors:
      article.authors.length > 0
        ? article.authors.map((author) => ({
            firstname: author.firstname,
            middlename: author.middlename ?? "",
            lastname: author.lastname,
            department: author.department ?? "",
            school: author.school ?? "",
            city: author.city ?? "",
            country: author.country ?? "",
          }))
        : [
            {
              firstname: "",
              middlename: "",
              lastname: "",
              department: "",
              school: "",
              city: "",
              country: "",
            },
          ],
  };

  return (
    <ArticleForm mode="edit" articleId={article.id} defaultValues={defaultValues} />
  );
}
