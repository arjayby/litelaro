import { Database } from "@/lib/utils/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

type Classroom = Database["public"]["Tables"]["classrooms"]["Row"] & {
  students: { count: number }[];
};

type ClassroomWithStudents =
  Database["public"]["Tables"]["classrooms"]["Row"] & {
    students: {
      joined_at: string;
      user: {
        id: string;
        email: string;
        given_name: string | null;
        family_name: string | null;
        avatar_url: string | null;
      };
    }[];
  };

export async function getClassroomById(
  supabase: SupabaseClient<Database>,
  id: string
): Promise<ClassroomWithStudents | null> {
  const { data: classroom } = await supabase
    .from("classrooms")
    .select(
      `
      *,
      students:classroom_students(
        joined_at,
        user:profiles(
          id,
          given_name,
          family_name,
          avatar_url
        )
      )
    `
    )
    .eq("id", id)
    .single();

  return classroom as ClassroomWithStudents | null;
}

export async function getClassroomsByUserId(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<Classroom[] | null> {
  const { data: classrooms } = await supabase
    .from("classrooms")
    .select("*, students:classroom_students(count)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return classrooms;
}

export async function getClassroomByCode(
  supabase: SupabaseClient<Database>,
  code: string
) {
  const { data } = await supabase
    .from("classrooms")
    .select("*")
    .eq("code", code)
    .single();

  return data;
}
