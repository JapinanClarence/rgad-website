import { z } from "zod";

export const summitFormSchema = z.object({
  theme: z
    .string()
    .trim()
    .min(1, "Theme is required")
    .max(300, "Theme must be at most 300 characters"),
  location: z
    .string()
    .trim()
    .min(1, "Location is required")
    .max(300, "Location must be at most 300 characters"),
  host: z
    .string()
    .trim()
    .min(1, "Host is required")
    .max(300, "Host must be at most 300 characters"),
  summary: z
    .string()
    .trim()
    .min(1, "Summary is required")
    .max(5000, "Summary must be at most 5000 characters"),
  note: z
    .string()
    .trim()
    .max(2000, "Note must be at most 2000 characters")
    .optional()
    .or(z.literal("")),
  details: z.array(z.string().trim().min(1)).default([]),
  outcomes: z.array(z.string().trim().min(1)).default([]),
  images: z
    .array(z.string().trim().url("Enter a valid image URL"))
    .default([]),
  date: z.coerce.date({
    errorMap: () => ({ message: "Enter a valid date" }),
  }),
});

export type SummitFormInput = z.infer<typeof summitFormSchema>;
