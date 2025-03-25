import { MoveRight } from "lucide-react";
import Link from "next/link";

import { QuizList } from "@/components/quiz-list";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getQuizzesByUserId } from "@/lib/queries/quiz";

import { privatePageMetadata } from "../../../private-metadata";

export const metadata = privatePageMetadata;

export default async function QuizzesPage() {
  const { user, supabase } = await getAuthSession();

  const quizzes = await getQuizzesByUserId({ supabase }, user.id);

  return (
    <div className="container space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
          <p className="text-muted-foreground">
            Create and manage your literature quizzes
          </p>
        </div>
        <Link href="/quizzes/create">
          <Button variant="ghost" size="lg">
            Create Quiz
            <MoveRight />
          </Button>
        </Link>
      </div>
      <QuizList quizzes={quizzes ?? []} />
    </div>
  );
}
