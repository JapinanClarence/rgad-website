import React from "react";
import { ReviewerForm, DEFAULT_REVIEWER_VALUES } from "@/components/reviewers/reviewer-form";

export default function NewReviewerPage() {
  return (
    <ReviewerForm mode="create" defaultValues={DEFAULT_REVIEWER_VALUES} />
  );
}
