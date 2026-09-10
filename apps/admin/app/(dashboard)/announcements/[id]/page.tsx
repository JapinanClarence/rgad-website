import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAnnouncementById } from "@/services/announcement";
import { AnnouncementForm } from "@/components/announcements/announcement-form";
import type { AnnouncementFormInput } from "@gad/schema";

export const metadata: Metadata = { title: "Edit Announcement" };

interface Props {
  params: { id: string };
}

export default async function EditAnnouncementPage({ params }: Props) {
  const result = await getAnnouncementById(params.id);

  if (!result.success || !result.data) {
    notFound();
  }

  const announcement = result.data;

  const defaultValues: AnnouncementFormInput = {
    title: announcement.title,
    slug: announcement.slug,
    description: announcement.description,
    publishedAt: new Date(announcement.publishedAt),
    externalUrl: announcement.externalUrl ?? "",
    isPinned: announcement.isPinned,
  };

  return (
    <AnnouncementForm
      mode="edit"
      announcementId={announcement.id}
      defaultValues={defaultValues}
    />
  );
}
