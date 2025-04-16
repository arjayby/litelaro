"use client";

import { Tables } from "@/lib/utils/supabase/database.types";

interface QuizResultProps {
  quiz: Tables<"quizzes"> & {
    quiz_items: (Tables<"quiz_items"> & {
      choices: Array<{
        text: string;
        isCorrect: boolean;
      }>;
    })[];
  };
  quizAttempt: Tables<"student_quiz_attempts"> & {
    answers: Array<{
      quizItemId: string;
      selectedChoice: string;
      isCorrect: boolean;
    }>;
  };
}

export function QuizResult({ quiz, quizAttempt }: QuizResultProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quiz Results</h2>
        <div className="text-lg">
          Score: {quizAttempt.score} / {quiz.quiz_items.length}
        </div>
      </div>
      <div className="space-y-6">
        {quiz.quiz_items.map((item, index) => {
          const answer = quizAttempt.answers.find(
            (a) => a.quizItemId === item.id
          );
          const selectedChoice = item.choices.find(
            (c) => c.text === answer?.selectedChoice
          );
          const correctChoice = item.choices.find((c) => c.isCorrect);

          return (
            <div key={item.id} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Question {index + 1}:</span>
                <span>{item.question}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Your answer:</span>
                  <span
                    className={`${answer?.isCorrect ? "text-green-600" : "text-red-600"}`}
                  >
                    {selectedChoice?.text}
                  </span>
                </div>
                {!answer?.isCorrect && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Correct answer:</span>
                    <span className="text-green-600">
                      {correctChoice?.text}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
