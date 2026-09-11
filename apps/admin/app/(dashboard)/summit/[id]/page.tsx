import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSummitById } from "@/services/summit";
import { SummitForm } from "@/components/summit/summit-form";
import type { SummitFormInput } from "@gad/schema";

export const metadata: Metadata = { title: "Edit Summit" };

interface Props {
  params: { id: string };
}

export default async function EditSummitPage({ params }: Props) {
  const result = await getSummitById(params.id);

  if (!result.success || !result.data) {
    notFound();
  }

  const summit = result.data;

  const defaultValues: SummitFormInput = {
    theme: summit.theme,
    location: summit.location,
    host: summit.host,
    summary: summit.summary,
    note: summit.note ?? "",
    details: summit.details ?? [],
    outcomes: summit.outcomes ?? [],
    images: summit.images ?? [],
    date: summit.date ? new Date(summit.date) : new Date(),
  };

  return (
    <SummitForm mode="edit" summitId={summit.id} defaultValues={defaultValues} />
  );
}
