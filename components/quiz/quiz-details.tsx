import { Calendar, Play } from "lucide-react";
import Link from "next/link";

import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { getQuizEmoji } from "@/lib/utils/quiz-emoji";
import { Tables } from "@/lib/utils/supabase/database.types";

import { Button } from "../ui/button";

interface Choice {
  text: string;
  isCorrect: boolean;
}

interface QuizDetailsProps {
  quiz: Tables<"quizzes"> & {
    quiz_items?: (Tables<"quiz_items"> & {
      choices: Choice[];
    })[];
  };
}

export function QuizDetails({ quiz }: QuizDetailsProps) {
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

        <div className="flex pt-8">
          <Link href={`/quizzes/${quiz.id}/practice`}>
            <Button size="lg" className="gap-2">
              <Play className="h-4 w-4" />
              Practice Take Quiz
            </Button>
          </Link>
        </div>

        {quiz.quiz_items && quiz.quiz_items.length > 0 && (
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-xl font-semibold">
              Questions ({quiz.quiz_items.length})
            </h2>
            <div className="space-y-4">
              {quiz.quiz_items.map((item, index) => (
                <div key={item.id} className="rounded-md border p-3">
                  <p className="font-medium">
                    {index + 1}. {item.question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
