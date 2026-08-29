import { z } from "zod";

export const issueFormSchema = z.object({
  volume: z.coerce
    .number({ invalid_type_error: "Volume must be a number" })
    .int("Volume must be a whole number")
    .positive("Volume must be a positive number"),
  issueNo: z.coerce
    .number({ invalid_type_error: "Issue number must be a number" })
    .int("Issue number must be a whole number")
    .positive("Issue number must be a positive number"),
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(300, "Title must be at most 300 characters"),
  doi: z
    .string()
    .trim()
    .max(100, "DOI must be at most 100 characters")
    .optional()
    .or(z.literal("")),
  issn: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{3}[\dXx]$/, "Enter a valid ISSN (e.g. 2984-1234)"),
  coverImage: z
    .string()
    .trim()
    .url("Enter a valid image URL")
    .nullable()
    .optional()
    .or(z.literal("")),
  publishedAt: z.coerce.date({
    errorMap: () => ({ message: "Enter a valid publish date" }),
  }),
  isCurrent: z.boolean().optional().default(false),
  date: z.coerce.date({
    errorMap: () => ({ message: "Enter a valid date" }),
  }),
});

export type IssueFormInput = z.infer<typeof issueFormSchema>;
