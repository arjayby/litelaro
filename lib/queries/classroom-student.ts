import { Database } from "@/lib/utils/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getClassroomStudentByIds(
  supabase: SupabaseClient<Database>,
  classroomId: string,
  userId: string
) {
  const { data } = await supabase
    .from("classroom_students")
    .select("*")
    .eq("classroom_id", classroomId)
    .eq("user_id", userId)
    .single();

  return data;
}
