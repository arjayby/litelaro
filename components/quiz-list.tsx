import { QuizCard } from "@/components/quiz-card";
import { Database } from "@/lib/utils/supabase/database.types";

type Quiz = Database["public"]["Tables"]["quizzes"]["Row"];

interface QuizListProps {
  quizzes: Quiz[] | null;
}

export function QuizList({ quizzes }: QuizListProps) {
  if (!quizzes?.length) {
    return (
      <p className="py-8 text-center text-muted-foreground md:col-span-2 lg:col-span-3">
        No quiz found. Create your first quiz!
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          {...quiz}
          role="teacher"
          createdAt={new Date(quiz.created_at)}
        />
      ))}
    </div>
  );
}
