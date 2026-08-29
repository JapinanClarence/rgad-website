import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(120, "Full name must be at most 120 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Enter a valid email address"),
  institution: z
    .string()
    .trim()
    .max(200, "Institution must be at most 200 characters")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .max(200, "Subject must be at most 200 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message must be at most 5000 characters"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
