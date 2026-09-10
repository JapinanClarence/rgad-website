"use server";

import { revalidatePath } from "next/cache";
import { createAnnouncement } from "@/services/announcement";
import type { AnnouncementFormInput } from "@gad/schema";

export async function createAnnouncementAction(input: AnnouncementFormInput) {
  const result = await createAnnouncement(input);

  if (result.success) {
    revalidatePath("/announcements");
  }

  return result;
}
