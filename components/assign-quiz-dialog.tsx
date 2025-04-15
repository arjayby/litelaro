"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Database } from "@/lib/utils/supabase/database.types";
import { createClientBrowser } from "@/lib/utils/supabase/client";
import { toast } from "sonner";
import { getQuizzesByUserId } from "@/lib/queries/quiz";
import { getClassroomQuizzes } from "@/lib/queries/classroom-quiz";

export function AssignQuizDialog({ classroomId }: { classroomId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<
    (Database["public"]["Tables"]["quizzes"]["Row"] & {
      isAssigned?: boolean;
    })[]
  >([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  const router = useRouter();

  const supabase = createClientBrowser();

  const loadQuizzes = async () => {
    const { data } = await supabase.auth.getSession();

    const quizzes = await getQuizzesByUserId(
      { supabase },
      data.session!.user.id
    );

    const assignedQuizzes = await getClassroomQuizzes(supabase, classroomId);
    const assignedQuizIds = new Set(assignedQuizzes?.map((aq) => aq.quiz_id));

    setQuizzes(
      (quizzes || []).map((quiz) => ({
        ...quiz,
        isAssigned: assignedQuizIds.has(quiz.id),
      }))
    );
  };

  useEffect(() => {
    loadQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAssignQuiz = async () => {
    if (!selectedQuizId) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("classroom_quizzes").insert({
        classroom_id: classroomId,
        quiz_id: selectedQuizId,
      });

      if (error) throw error;

      toast("Quiz assigned to classrooom successfully");

      setOpen(false);
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_: unknown) {
      toast("Error assigning quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Assign Quiz</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Quiz to Classroom</DialogTitle>
          <DialogDescription>
            Select a quiz to assign to this classroom.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className={`rounded-lg border p-4 transition-colors ${quiz.isAssigned ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${selectedQuizId === quiz.id ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                onClick={() => !quiz.isAssigned && setSelectedQuizId(quiz.id)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{quiz.title}</h3>
                  {quiz.isAssigned && (
                    <span className="text-sm text-muted-foreground">
                      Already assigned
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {quiz.description || "No description provided"}
                </p>
              </div>
            ))}
          </div>
          {quizzes.length === 0 && (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">No quizzes available</p>
            </div>
          )}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAssignQuiz}
              disabled={!selectedQuizId || loading}
            >
              Assign Quiz
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
