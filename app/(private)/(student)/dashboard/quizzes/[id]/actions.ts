"use server";

import { createStudentQuizAttempt } from "@/lib/queries/student-quiz-attempt";
import { studentQuizAttemptSchema } from "@/lib/schemas/student-quiz";
import { actionClient } from "@/lib/safe-action";
import { withAuth } from "@/lib/auth/with-auth";

const submitQuizSchema = studentQuizAttemptSchema;

export const submitQuizAction = actionClient
  .schema(submitQuizSchema)
  .action(async ({ parsedInput: { quizId, answers } }) => {
    return withAuth(async ({ supabase, user }) => {
      // Calculate score
      const score = answers.filter((answer) => answer.isCorrect).length;

      try {
        // Create quiz attempt
        const quizAttempt = await createStudentQuizAttempt(
          supabase,
          quizId,
          user.id,
          score,
          answers
        );

        return { quizAttempt };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_: unknown) {
        return { error: "Failed to submit quiz" };
      }
    });
  });
