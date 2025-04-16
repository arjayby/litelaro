"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createStudentQuizAttempt } from "@/lib/queries/student-quiz-attempt";
import { Tables } from "@/lib/utils/supabase/database.types";
import { createClientBrowser } from "@/lib/utils/supabase/client";
import { useReward } from "react-rewards";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// choices bugged out, it confuses ts (Json or array of object) for some reason
// had to make this interface
interface QuizItem {
  choices: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  created_at: string;
  id: string;
  question: string;
  quiz_id: string;
  updated_at: string;
}

interface QuizFormProps {
  quiz: Tables<"quizzes"> & {
    quiz_items: QuizItem[];
  };
  userId: string;
}

export function QuizForm({ quiz, userId }: QuizFormProps) {
  const supabase = createClientBrowser();
  const router = useRouter();
  const [answers, setAnswers] = useState<
    Array<{ quizItemId: string; selectedChoice: string }>
  >([]);
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [scorePercentage, setScorePercentage] = useState(0);

  const { reward: confettiReward, isAnimating } = useReward(
    "confettiReward",
    "confetti",
    {
      elementCount: 100,
      spread: 70,
    }
  );

  const handleAnswerChange = (quizItemId: string, selectedChoice: string) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.quizItemId === quizItemId);
      if (existing) {
        return prev.map((a) =>
          a.quizItemId === quizItemId ? { ...a, selectedChoice } : a
        );
      }
      return [...prev, { quizItemId, selectedChoice }];
    });
  };

  const handleSubmit = async () => {
    if (answers.length !== quiz.quiz_items.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const answersWithCorrectness = answers.map((answer) => {
      const quizItem = quiz.quiz_items.find(
        (item) => item.id === answer.quizItemId
      );
      const isCorrect =
        quizItem?.choices.find((c) => c.text === answer.selectedChoice)
          ?.isCorrect || false;
      return { ...answer, isCorrect };
    });

    const correctCount = answersWithCorrectness.filter(
      (a) => a.isCorrect
    ).length;
    const percentage = Math.round(
      (correctCount / quiz.quiz_items.length) * 100
    );

    await createStudentQuizAttempt(
      supabase,
      quiz.id,
      userId,
      correctCount,
      answersWithCorrectness
    );

    setScore(correctCount);
    setCorrectAnswers(correctCount);
    setScorePercentage(percentage);
    setShowScoreDialog(true);
    confettiReward();
  };

  return (
    <div className="container space-y-8 p-8">
      <div className="fixed right-6 top-20 z-10 flex w-[300px] flex-col items-end gap-2 rounded-lg border bg-background p-4 shadow-lg">
        <Progress
          value={(answers.length / quiz.quiz_items.length) * 100}
          className="w-full"
        />
        <h2 className="text-sm font-medium">
          {answers.length} of {quiz.quiz_items.length} Questions Answered
        </h2>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {quiz.description || "No description provided"}
        </p>
      </div>

      <div className="space-y-6">
        {quiz.quiz_items.map((item, index) => (
          <Card key={`${index}-${item.id}`} className="p-6">
            <p className="mb-6 text-lg font-medium">
              {index + 1}. {item.question}
            </p>
            <RadioGroup
              value={
                answers.find((a) => a.quizItemId === item.id)?.selectedChoice
              }
              onValueChange={(value) => handleAnswerChange(item.id, value)}
              className="grid grid-cols-2 gap-4"
            >
              {item.choices.map((choice, choiceIndex) => (
                <div
                  key={`${choiceIndex}-${choice.text}`}
                  className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-secondary"
                >
                  <RadioGroupItem
                    value={choice.text}
                    id={`${item.id}-${choice.text}`}
                  />
                  <label
                    className="w-full cursor-pointer text-base"
                    htmlFor={`${item.id}-${choice.text}`}
                  >
                    {choice.text}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <span
          id="confettiReward"
          className="fixed left-1/2 top-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2"
        />
        <Button
          size="lg"
          className="gap-2"
          onClick={handleSubmit}
          disabled={answers.length !== quiz.quiz_items.length || isAnimating}
        >
          Submit Quiz
        </Button>
      </div>

      <AlertDialog open={showScoreDialog} onOpenChange={setShowScoreDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              🎉 Quiz Completed! 🎉
            </AlertDialogTitle>
            <AlertDialogDescription className="py-4 text-center">
              <span className="mb-2 text-2xl font-bold">
                Your Score: {score} / {quiz.quiz_items.length} (
                {scorePercentage}%)
              </span>
              <br />
              <span className="text-muted-foreground">
                You got {correctAnswers} out of {quiz.quiz_items.length}{" "}
                questions correct
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              onClick={() => {
                router.push(`/dashboard/quizzes/${quiz.id}`);
              }}
              className="w-full"
            >
              View Quiz Details
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
