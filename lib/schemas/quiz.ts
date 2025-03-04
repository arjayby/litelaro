import { z } from "zod";

export const quizDifficulty = ["easy", "average", "difficult"] as const;
export const quizType = ["subject", "topic", "questions"] as const;
export const quizVisibility = ["public", "invite-only", "only-me"] as const;

export const quizSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    visibility: z.enum(quizVisibility).default("public"),
    type: z.enum(quizType, { message: "Type is required" }),
    difficulty: z.enum(quizDifficulty).optional(),
    items: z.array(
      z.object({
        question: z.string().min(1, "Question is required"),
        choices: z
          .array(
            z.object({
              text: z.string().min(1, "Choice is required"),
              isCorrect: z.boolean().default(false),
            })
          )
          .length(4, "Must have exactly 4 choices")
          .refine(
            (choices) => {
              const correctChoices = choices.filter((c) => c.isCorrect);
              return correctChoices.length === 1;
            },
            {
              message: "Select one correct answer",
              path: ["choices"],
            }
          ),
      })
    ),
  })
  .refine(
    (data) => {
      if (data.type === "questions" && !data.difficulty) {
        return false;
      }
      return true;
    },
    {
      message: "Difficulty is required",
      path: ["difficulty"],
    }
  );

export type QuizFormValues = z.infer<typeof quizSchema>;
