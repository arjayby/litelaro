import { z } from "zod";

export const studentQuizAttemptSchema = z.object({
  quizId: z.string().uuid(),
  studentId: z.string().uuid(),
  answers: z.array(
    z.object({
      quizItemId: z.string().uuid(),
      selectedChoice: z.string(),
      isCorrect: z.boolean(),
    })
  ),
});

export const studentQuizResultSchema = z.object({
  quizId: z.string().uuid(),
  studentId: z.string().uuid(),
  score: z.number().min(0),
  answers: z.array(
    z.object({
      quizItemId: z.string().uuid(),
      selectedChoice: z.string(),
      isCorrect: z.boolean(),
    })
  ),
  submittedAt: z.date(),
});
