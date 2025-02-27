import { z } from "zod";

export const profileSchema = z.object({
  givenName: z.string().trim().min(1, {
    message: "First name is required",
  }),
  familyName: z.string().trim().min(1, {
    message: "First name is required",
  }),
  role: z.enum(["teacher", "student"], {
    required_error: "Please select a role",
  }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
