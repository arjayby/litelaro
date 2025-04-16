import { QuizCard } from "@/components/quiz-card";
import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getStudentAssignedQuizzes } from "@/lib/queries/student-quiz";

export default async function StudentQuizzesPage() {
  const { user, supabase } = await getAuthSession();
  const assignedQuizzes = await getStudentAssignedQuizzes(supabase, user.id);

  return (
    <div className="container space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Quizzes</h1>
        <p className="text-muted-foreground">View your assigned quizzes</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assignedQuizzes?.map((assignedQuiz) => (
          <QuizCard
            key={assignedQuiz.id}
            {...assignedQuiz.quiz}
            role="student"
            createdAt={new Date(assignedQuiz.assigned_at)}
          />
        )) ?? (
          <p className="py-8 text-center text-muted-foreground md:col-span-2 lg:col-span-3">
            No quizzes assigned yet.
          </p>
        )}
      </div>
    </div>
  );
}
