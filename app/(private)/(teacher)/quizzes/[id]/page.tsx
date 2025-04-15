import { notFound } from "next/navigation";

import { QuizDetails } from "@/components/quiz/quiz-details";
import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getQuizByIdWithQuizItems } from "@/lib/queries/quiz";

import { privatePageMetadata } from "../../../../private-metadata";

export const metadata = privatePageMetadata;

export default async function QuizDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await getAuthSession();

  // Fetch the quiz with the given ID
  const quiz = await getQuizByIdWithQuizItems({ supabase }, id);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="container space-y-8 p-8">
      <QuizDetails
        quiz={{
          ...quiz,
          quiz_items: quiz.quiz_items.map((item) => ({
            ...item,
            choices: item.choices as { text: string; isCorrect: boolean }[],
          })),
        }}
      />
    </div>
  );
}
