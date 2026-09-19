import { z } from "zod";

export const officerFormSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name must be at most 100 characters"),
  middlename: z
    .string()
    .trim()
    .max(100, "Middle name must be at most 100 characters")
    .optional()
    .or(z.literal("")),
  lastname: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name must be at most 100 characters"),
  extension: z
    .string()
    .trim()
    .max(20, "Extension must be at most 20 characters")
    .optional()
    .or(z.literal("")),
  position: z
    .string()
    .trim()
    .min(1, "Position is required")
    .max(150, "Position must be at most 150 characters"),
  school: z
    .string()
    .trim()
    .min(1, "School is required")
    .max(200, "School must be at most 200 characters"),
  profile: z
    .string()
    .trim()
    .url("Enter a valid image URL")
    .optional()
    .or(z.literal("")),
  isOfficer: z.boolean().optional().default(false),
  isFoundingOfficer: z.boolean().optional().default(false),
  isCurrent: z.boolean().optional().default(false),
});

export type OfficerFormInput = z.infer<typeof officerFormSchema>;
