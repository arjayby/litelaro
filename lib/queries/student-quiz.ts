import { Database } from "@/lib/utils/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getStudentAssignedQuizzes(
  supabase: SupabaseClient<Database>,
  studentId: string
) {
  const { data: assignedQuizzes } = await supabase
    .from("classroom_quizzes")
    .select(
      `
      *,
      quiz:quizzes(*),
      classroom:classrooms (
        id,
        title,
        classroom_students!inner (
          user_id
        )
      )
    `
    )
    .eq("classroom.classroom_students.user_id", studentId);

  return assignedQuizzes;
}
