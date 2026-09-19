import { z } from "zod";

export const expertsFormSchema = z.object({
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
   email: z
    .string()
    .email("Please enter a valid email address")
    .trim()
    .min(1, "Email is required"), 
	expertise: z
	.string()
	.trim()
	.min(1, "Expertise is required")
	.max(200, "Expertise must be at most 200 characters"),
});

export type ExpertsFormInput = z.infer<typeof expertsFormSchema>;
