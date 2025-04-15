import { Database } from "@/lib/utils/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getClassroomQuizzes(
  supabase: SupabaseClient<Database>,
  classroomId: string
) {
  const { data: assignedQuizzes } = await supabase
    .from("classroom_quizzes")
    .select("*, quiz:quizzes(*)")
    .eq("classroom_id", classroomId)
    .order("assigned_at", { ascending: false });

  return assignedQuizzes;
}
