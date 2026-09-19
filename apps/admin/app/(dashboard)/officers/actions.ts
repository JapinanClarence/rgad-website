"use server";

import { revalidatePath } from "next/cache";
import {
  createOfficer,
  deleteOfficer,
  updateOfficer,
} from "@/services/officer";
import type { OfficerFormInput } from "@gad/schema";

export async function createOfficerAction(input: OfficerFormInput) {
  const result = await createOfficer(input);

  if (result.success) {
    revalidatePath("/officers");
  }

  return result;
}

export async function updateOfficerAction(
  id: string,
  input: Partial<OfficerFormInput>,
) {
  const result = await updateOfficer(id, input);

  if (result.success) {
    revalidatePath("/officers");
    revalidatePath(`/officers/${id}`);
  }

  return result;
}

export async function deleteOfficerAction(id: string) {
  const result = await deleteOfficer(id);

  if (result.success) {
    revalidatePath("/officers");
  }

  return result;
}
