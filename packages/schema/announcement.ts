import { z } from "zod";

export const announcementFormSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(150, "Slug must be at most 150 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase, alphanumeric, and hyphen-separated",
    ),
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be at most 200 characters"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(1000, "Description must be at most 1000 characters"),
  publishedAt: z.coerce.date({
    errorMap: () => ({ message: "Enter a valid publish date" }),
  }),
  isPinned: z.boolean().optional().default(false),
});

export type AnnouncementFormInput = z.infer<typeof announcementFormSchema>;
