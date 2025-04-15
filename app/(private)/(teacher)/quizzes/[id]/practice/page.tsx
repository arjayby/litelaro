import { notFound } from "next/navigation";

import { privatePageMetadata } from "@/app/private-metadata";
import { QuizBoard } from "@/components/quiz/quiz-board";
import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getQuizByIdWithQuizItems } from "@/lib/queries/quiz";

export const metadata = privatePageMetadata;

export default async function QuizTakePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await getAuthSession();
  const quiz = await getQuizByIdWithQuizItems({ supabase }, id);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="container space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{quiz.title}</h1>
        <p className="text-muted-foreground">{quiz.description}</p>
      </div>
      <QuizBoard
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
