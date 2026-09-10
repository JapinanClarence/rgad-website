import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getReviewerById } from "@/services/reviewer";
import { ReviewerForm } from "@/components/reviewers/reviewer-form";
import type { ReviewerFormInput } from "@gad/schema";

export const metadata: Metadata = { title: "Edit Reviewer" };

interface Props {
  params: { id: string };
}

export default async function EditReviewerPage({ params }: Props) {
  const result = await getReviewerById(params.id);

  if (!result.success || !result.data) {
    notFound();
  }

  const reviewer = result.data;

  const defaultValues: ReviewerFormInput = {
    firstname: reviewer.firstname,
    middlename: reviewer.middlename ?? "",
    lastname: reviewer.lastname,
    school: reviewer.school,
    country: reviewer.country ?? "",
  };

  return (
    <ReviewerForm
      mode="edit"
      reviewerId={reviewer.id}
      defaultValues={defaultValues}
    />
  );
}
