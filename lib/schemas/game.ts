import { z } from "zod";

export const gameType = ["individual", "group"] as const;
export const gameDifficulty = ["easy", "average", "difficult"] as const;
export const gameCategory = [
  "title-of-stories",
  "author",
  "periods",
  "epic",
  "music",
] as const;
export const gameVisibility = ["public", "invite-only", "only-me"] as const;

export const gameSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  visibility: z.enum(gameVisibility).default("public"),
  type: z.enum(gameType),
  difficulty: z.enum(gameDifficulty),
  category: z.enum(gameCategory),
  items: z
    .array(
      z.object({
        question: z.string().min(1, "Question is required"),
        answer: z.string().min(1, "Answer is required"),
      })
    )
    .min(1, "At least one question is required"),
});

export type GameFormValues = z.infer<typeof gameSchema>;