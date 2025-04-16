import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getQuizByIdWithQuizItems } from "@/lib/queries/quiz";

import { QuizForm } from "./quiz-form";

export default async function TakeQuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user, supabase } = await getAuthSession();

  // Fetch the quiz with the given ID
  const quiz = await getQuizByIdWithQuizItems({ supabase }, id);

  if (!quiz) {
    return null;
  }

  return (
    <QuizForm
      quiz={{
        ...quiz,
        quiz_items: quiz.quiz_items.map((item) => ({
          ...item,
          choices: item.choices as { text: string; isCorrect: boolean }[],
        })),
      }}
      userId={user.id}
    />
  );
}
