import React from "react";
import { IssueForm, DEFAULT_ISSUE_VALUES } from "@/components/issues/issue-form";

export default function NewIssuePage() {
  return <IssueForm mode="create" defaultValues={DEFAULT_ISSUE_VALUES} />;
}
