import { z } from "zod";

export const authorFormSchema = z.object({
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
  department: z
    .string()
    .trim()
    .max(150, "Department must be at most 150 characters")
    .optional()
    .or(z.literal("")),
  school: z
    .string()
    .trim()
    .min(1, "School / institution is required")
    .max(200, "School must be at most 200 characters"),
  city: z
    .string()
    .trim()
    .max(100, "City must be at most 100 characters")
    .optional()
    .or(z.literal("")),
  country: z
    .string()
    .trim()
    .max(100, "Country must be at most 100 characters")
    .optional()
    .or(z.literal("")),
});

export const articleFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(500, "Title must be at most 500 characters"),
  abstract: z
    .string()
    .trim()
    .max(5000, "Abstract must be at most 5000 characters")
    .optional()
    .or(z.literal("")),
  pages: z
    .string()
    .trim()
    .max(20, "Pages must be at most 20 characters")
    .optional()
    .or(z.literal("")),
  pdf_url: z
    .string()
    .trim()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  archive_id: z.string().uuid("Please select an issue"),
  keywords: z.array(z.string().trim().min(1)).default([]),
  authors: z.array(authorFormSchema).min(1, "At least one author is required"),
});

export type AuthorFormInput = z.infer<typeof authorFormSchema>;
export type ArticleFormInput = z.infer<typeof articleFormSchema>;
