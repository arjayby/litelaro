import { notFound } from "next/navigation";

import { StudentQuizDetails } from "@/components/quiz/student-quiz-details";
import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getQuizByIdWithQuizItems } from "@/lib/queries/quiz";
import { getStudentQuizAttempt } from "@/lib/queries/student-quiz-attempt";

export default async function StudentQuizDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user, supabase } = await getAuthSession();

  // Fetch the quiz with the given ID
  const quiz = await getQuizByIdWithQuizItems({ supabase }, id);

  if (!quiz) {
    notFound();
  }

  // Fetch student's quiz attempt if exists
  const quizAttempt = await getStudentQuizAttempt(supabase, id, user.id);

  return (
    <div className="container space-y-8 p-8">
      <StudentQuizDetails
        quiz={{
          ...quiz,
          quiz_items: quiz.quiz_items.map((item) => ({
            ...item,
            choices: item.choices as { text: string; isCorrect: boolean }[],
          })),
        }}
        quizAttempt={
          quizAttempt
            ? {
                ...quizAttempt,
                answers: quizAttempt.answers as {
                  quizItemId: string;
                  selectedChoice: string;
                  isCorrect: boolean;
                }[],
              }
            : undefined
        }
      />
    </div>
  );
}
