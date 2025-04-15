"use client";

import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Tables } from "@/lib/utils/supabase/database.types";

interface Choice {
  text: string;
  isCorrect: boolean;
}

interface QuizBoardProps {
  quiz: Tables<"quizzes"> & {
    quiz_items: (Tables<"quiz_items"> & {
      choices: Array<Choice>;
    })[];
  };
}

export function QuizBoard({ quiz }: QuizBoardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo(0, 0);
    }
  }, [isSubmitted]);

  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress =
    (Object.keys(selectedAnswers).length / quiz.quiz_items.length) * 100;

  const handleAnswerSelect = (value: string, questionId: string) => {
    if (isSubmitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length !== quiz.quiz_items.length) {
      return;
    }

    try {
      setIsSubmitting(true);
      const totalQuestions = quiz.quiz_items.length;
      let correctAnswers = 0;

      quiz.quiz_items.forEach((item) => {
        if (
          selectedAnswers[item.id] ===
          item.choices.find((choice) => choice?.isCorrect)?.text
        ) {
          correctAnswers++;
        }
      });

      const finalScore = (correctAnswers / totalQuestions) * 100;
      setScore(finalScore);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Quiz Complete!</h2>
          <p className="mb-6 text-lg">
            🎉 Your score: {score.toFixed(0)}% (
            {Math.round((score / 100) * quiz.quiz_items.length)}/
            {quiz.quiz_items.length} correct) 🎉
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setSelectedAnswers({});
              setScore(0);
            }}
          >
            Try Again
          </Button>
        </Card>

        <div className="space-y-6">
          {quiz.quiz_items.map((item, index) => {
            const correctAnswer = item.choices.find(
              (choice) => choice.isCorrect
            )?.text;
            const userAnswer = selectedAnswers[item.id];

            return (
              <Card key={item.id} className="p-6">
                <p className="mb-4 text-lg font-medium">
                  {index + 1}. {item.question}
                </p>

                <div className="space-y-4">
                  {item.choices.map((choice, choiceIndex) => (
                    <div
                      key={choiceIndex}
                      className={cn(
                        "rounded-lg border p-4",
                        choice.text === correctAnswer
                          ? "border-green-500 bg-green-50"
                          : choice.text === userAnswer
                            ? "border-red-500 bg-red-50"
                            : "bg-secondary"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>{choice.text}</span>
                        {choice.text === correctAnswer && (
                          <span className="text-green-600">✓ Correct</span>
                        )}
                        {choice.text === userAnswer && !choice.isCorrect && (
                          <span className="text-red-600">✗ Your Answer</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="fixed right-6 top-20 z-10 flex w-[300px] flex-col items-end gap-2 rounded-lg border bg-background p-4 shadow-lg">
        <Progress value={progress} className="w-full" />
        <h2 className="text-sm font-medium">
          {Object.keys(selectedAnswers).length} of {quiz.quiz_items.length}{" "}
          Questions Answered
        </h2>
      </div>

      <div className="space-y-6">
        {quiz.quiz_items.map((item, index) => (
          <Card key={item.id} className="p-6">
            <p className="mb-6 text-lg font-medium">
              {index + 1}. {item.question}
            </p>

            <RadioGroup
              value={selectedAnswers[item.id]}
              onValueChange={(value) => handleAnswerSelect(value, item.id)}
              className="grid grid-cols-2 gap-4"
            >
              {item.choices &&
                item.choices.map((choice, choiceIndex) => (
                  <div
                    key={choiceIndex}
                    className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-secondary"
                  >
                    <RadioGroupItem
                      value={choice.text}
                      id={`choice-${index}-${choiceIndex}`}
                    />
                    <label
                      htmlFor={`choice-${index}-${choiceIndex}`}
                      className="w-full cursor-pointer text-base"
                    >
                      {choice.text}
                    </label>
                  </div>
                ))}
            </RadioGroup>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="lg" className="mx-auto">
              Submit Quiz
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Submit Quiz</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to submit your answers? You won&apos;t be
                able to change them after submission.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Yes, Submit"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
