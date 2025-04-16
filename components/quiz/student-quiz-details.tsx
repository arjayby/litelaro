"use client";

import { useRouter } from "next/navigation";
import { Calendar, Play } from "lucide-react";

import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { getQuizEmoji } from "@/lib/utils/quiz-emoji";
import { Tables } from "@/lib/utils/supabase/database.types";

import { Button } from "../ui/button";

interface StudentQuizDetailsProps {
  quiz: Tables<"quizzes"> & {
    quiz_items: (Tables<"quiz_items"> & {
      choices: Array<{
        text: string;
        isCorrect: boolean;
      }>;
    })[];
  };
  quizAttempt?: Tables<"student_quiz_attempts"> & {
    answers: Array<{
      quizItemId: string;
      selectedChoice: string;
      isCorrect: boolean;
    }>;
  };
}

export function StudentQuizDetails({
  quiz,
  quizAttempt,
}: StudentQuizDetailsProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {/* Left column - Image */}
      <div className="relative overflow-hidden rounded-lg border">
        <PlaceholderImage title={quiz.title} />
      </div>

      {/* Right column - Quiz details */}
      <div className="space-y-6 md:col-span-2">
        <div>
          <h1 className="text-3xl font-bold">{quiz.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {quiz.description || "No description provided"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
            <span className="capitalize">{quiz.type}</span>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
            <span>{getQuizEmoji.difficulty(quiz.difficulty).emoji}</span>
            <span className="capitalize">
              {getQuizEmoji.difficulty(quiz.difficulty).label}
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
            <span>{getQuizEmoji.visibility(quiz.visibility).emoji}</span>
            <span>{getQuizEmoji.visibility(quiz.visibility).label}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date(quiz.created_at))}
            </span>
          </div>
        </div>

        {quizAttempt ? (
          <div className="space-y-4">
            <div className="text-lg font-medium">
              Your Score: {quizAttempt.score} / {quiz.quiz_items.length} (
              {((quizAttempt.score / quiz.quiz_items.length) * 100).toFixed(0)}%)
            </div>
            <Button size="lg" className="gap-2" disabled variant="secondary">
              <Play className="h-4 w-4" />
              Quiz Completed
            </Button>
          </div>
        ) : (
          <div className="flex pt-8">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => router.push(`/dashboard/quizzes/${quiz.id}/take`)}
            >
              <Play className="h-4 w-4" />
              Take Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
