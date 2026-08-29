import { z } from "zod";

export const reviewerFormSchema = z.object({
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
  school: z
    .string()
    .trim()
    .min(1, "School is required")
    .max(200, "School must be at most 200 characters"),
  country: z
    .string()
    .trim()
    .max(100, "Country must be at most 100 characters")
    .optional()
    .or(z.literal("")),
});

export type ReviewerFormInput = z.infer<typeof reviewerFormSchema>;
