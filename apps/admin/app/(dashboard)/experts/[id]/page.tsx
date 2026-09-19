import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getExpertById } from "@/services/expert";
import { ExpertForm } from "@/components/experts/expert-form";
import type { ExpertsFormInput } from "@gad/schema";

export const metadata: Metadata = { title: "Edit Expert" };

interface Props {
  params: { id: string };
}

export default async function EditExpertPage({ params }: Props) {
  const result = await getExpertById(params.id);

  if (!result.success || !result.data) {
    notFound();
  }

  const expert = result.data;

  const defaultValues: ExpertsFormInput = {
    firstname: expert.firstname,
    middlename: expert.middlename ?? "",
    lastname: expert.lastname,
    school: expert.school,
    email: expert.email ?? "",
    expertise: expert.expertise ?? "",
  };

  return (
    <ExpertForm
      mode="edit"
      expertId={expert.id}
      defaultValues={defaultValues}
    />
  );
}
