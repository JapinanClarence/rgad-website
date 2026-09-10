import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getIssueById } from "@/services/issue";
import { IssueForm } from "@/components/issues/issue-form";
import type { IssueFormInput } from "@gad/schema";

export const metadata: Metadata = { title: "Edit Issue" };

interface Props {
  params: { id: string };
}

export default async function EditIssuePage({ params }: Props) {
  const result = await getIssueById(params.id);

  if (!result.success || !result.data) {
    notFound();
  }

  const issue = result.data;
  const publishedAt = new Date(issue.publishedAt);

  const defaultValues: IssueFormInput = {
    volume: issue.volume,
    issueNo: issue.issueNo,
    doi: issue.doi ?? "",
    issn: issue.issn,
    coverImage: issue.coverImage ?? "",
    publishedAt,
    isCurrent: issue.isCurrent,
    date: publishedAt,
  };

  return (
    <IssueForm mode="edit" issueId={issue.id} defaultValues={defaultValues} />
  );
}
