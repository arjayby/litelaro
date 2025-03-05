import { CalendarIcon, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getQuizEmoji } from "@/lib/utils/quiz-emoji";
import { Database } from "@/lib/utils/supabase/database.types";

interface QuizListProps {
  quizzes: Database["public"]["Tables"]["quizzes"]["Row"][];
}

export async function QuizList({ quizzes }: QuizListProps) {
  if (!quizzes?.length) {
    return (
      <div className="flex items-center justify-center">
        <Card className="flex flex-col items-center justify-center text-center">
          <CardHeader>
            <h3 className="text-lg font-semibold">No quizzes found</h3>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              You haven&apos;t created any quizzes yet. Start by creating your
              first quiz!
            </p>
            <Link href="/quizzes/create">
              <Button size="lg">Create Quiz</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
        <Card key={quiz.id} className="overflow-hidden">
          <CardHeader>
            <h3 className="truncate font-semibold">{quiz.title}</h3>
            <p className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-1 h-3 w-3" />
              {new Date(quiz.created_at).toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {quiz.description || "No description provided"}
            </p>
            <div className="mt-2 flex gap-2">
              <Badge className="capitalize">{quiz.type}</Badge>
              {quiz.difficulty && (
                <Badge variant="secondary">
                  {getQuizEmoji.difficulty(quiz.difficulty).emoji}{" "}
                  {getQuizEmoji.difficulty(quiz.difficulty).label}
                </Badge>
              )}
              <Badge variant="secondary">
                {getQuizEmoji.visibility(quiz.visibility).emoji}{" "}
                {getQuizEmoji.visibility(quiz.visibility).label}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="mb-[-12px] justify-between">
            <Button variant="ghost" size="sm" className="ml-[-12px]">
              <EyeIcon className="h-4 w-4" />
              Preview
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <PencilIcon className="h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="mr-[-12px] text-destructive hover:text-destructive"
              >
                <TrashIcon className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
