import React from "react";
import { ExpertForm, DEFAULT_EXPERT_VALUES } from "@/components/experts/expert-form";

export default function NewExpertPage() {
  return (
    <ExpertForm mode="create" defaultValues={DEFAULT_EXPERT_VALUES} />
  );
}
