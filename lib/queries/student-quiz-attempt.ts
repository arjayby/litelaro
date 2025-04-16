import { Database } from "@/lib/utils/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getStudentQuizAttempt(
  supabase: SupabaseClient<Database>,
  quizId: string,
  studentId: string
) {
  const { data: quizAttempt } = await supabase
    .from("student_quiz_attempts")
    .select("*")
    .eq("quiz_id", quizId)
    .eq("student_id", studentId)
    .single();

  return quizAttempt;
}

export async function createStudentQuizAttempt(
  supabase: SupabaseClient<Database>,
  quizId: string,
  studentId: string,
  score: number,
  answers: Array<{
    quizItemId: string;
    selectedChoice: string;
    isCorrect: boolean;
  }>
) {
  const { data: quizAttempt } = await supabase
    .from("student_quiz_attempts")
    .insert({
      quiz_id: quizId,
      student_id: studentId,
      score,
      answers,
    })
    .select()
    .single();

  return quizAttempt;
}
