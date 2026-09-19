import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getOfficerById } from "@/services/officer";
import { OfficerForm } from "@/components/officers/officer-form";
import type { OfficerFormInput } from "@gad/schema";

export const metadata: Metadata = { title: "Edit Officer" };

interface Props {
  params: { id: string };
}

export default async function EditOfficerPage({ params }: Props) {
  const result = await getOfficerById(params.id);

  if (!result.success || !result.data) {
    notFound();
  }

  const officer = result.data;

  const defaultValues: OfficerFormInput = {
    firstname: officer.firstname,
    middlename: officer.middlename ?? "",
    lastname: officer.lastname,
    extension: officer.extension ?? "",
    position: officer.position,
    school: officer.school,
    profile: officer.profile ?? "",
    isOfficer: officer.isOfficer,
    isFoundingOfficer: officer.isFoundingOfficer,
    isCurrent: officer.isCurrent,
  };

  return (
    <OfficerForm
      mode="edit"
      officerId={officer.id}
      defaultValues={defaultValues}
    />
  );
}
