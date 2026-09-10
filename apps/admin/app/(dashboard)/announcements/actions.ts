"use server";

import { revalidatePath } from "next/cache";
import { createAnnouncement, deleteAnnouncement, updateAnnouncement } from "@/services/announcement";
import type { AnnouncementFormInput } from "@gad/schema";

export async function createAnnouncementAction(input: AnnouncementFormInput) {
  const result = await createAnnouncement(input);

  if (result.success) {
    revalidatePath("/announcements");
  }

  return result;
}

export async function updateAnnouncementAction(
  id: string,
  input: Partial<AnnouncementFormInput>,
) {
  const result = await updateAnnouncement(id, input);

  if (result.success) {
    revalidatePath("/announcements");
    revalidatePath(`/announcements/${id}`);
  }

  return result;
}

export async function deleteAnnouncementAction(id: string) {
  const result = await deleteAnnouncement(id);

  if (result.success) {
    revalidatePath("/announcements");
  }

  return result;
}
