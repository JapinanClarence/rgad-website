import React from "react";
import { AnnouncementForm, DEFAULT_ANNOUNCEMENT_VALUES } from "@/components/announcements/announcement-form";

export default function NewAnnouncementPage() {
  return (
    <AnnouncementForm mode="create" defaultValues={DEFAULT_ANNOUNCEMENT_VALUES} />
  );
}
