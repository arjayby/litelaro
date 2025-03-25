import { Clock, Users } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getQuizEmoji } from "@/lib/utils/quiz-emoji";
import { Database } from "@/lib/utils/supabase/database.types";

type Quiz = Database["public"]["Tables"]["quizzes"]["Row"];

interface QuizCardProps extends Quiz {
  createdAt: Date;
}

export function QuizCard({
  id,
  title,
  description,
  type,
  difficulty,
  visibility,
  createdAt,
}: QuizCardProps) {
  return (
    <Link href={`/quizzes/${id}`}>
      <Card className="transition-colors hover:bg-accent">
        <CardHeader>
          <CardTitle className="line-clamp-1">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {description || "No description provided"}
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
                <span className="capitalize">{type}</span>
              </div>
              <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
                {getQuizEmoji.difficulty(difficulty).emoji}{" "}
                {getQuizEmoji.difficulty(difficulty).label}
              </div>
              <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
                <span>
                  {getQuizEmoji.visibility(visibility).emoji}{" "}
                  {getQuizEmoji.visibility(visibility).label}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{1}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
