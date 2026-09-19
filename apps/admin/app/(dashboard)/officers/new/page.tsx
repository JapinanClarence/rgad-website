import React from "react";
import {
  OfficerForm,
  DEFAULT_OFFICER_VALUES,
} from "@/components/officers/officer-form";

export default function NewOfficerPage() {
  return <OfficerForm mode="create" defaultValues={DEFAULT_OFFICER_VALUES} />;
}
