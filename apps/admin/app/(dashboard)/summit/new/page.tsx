import React from "react";
import { SummitForm, DEFAULT_SUMMIT_VALUES } from "@/components/summit/summit-form";

export default function NewSummitPage() {
  return <SummitForm mode="create" defaultValues={DEFAULT_SUMMIT_VALUES} />;
}
