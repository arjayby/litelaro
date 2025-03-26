import { z } from "zod";

export const classroomVisibility = ["public", "invite-only"] as const;

export const classroomSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  visibility: z.enum(classroomVisibility).default("public"),
});

export type ClassroomFormValues = z.infer<typeof classroomSchema>;
