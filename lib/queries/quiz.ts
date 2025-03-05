import { Database } from "@/lib/utils/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

type QueryConfig = {
  supabase: SupabaseClient<Database>;
};

export async function getQuizzesByUserId({ supabase }: QueryConfig, userId: string) {
  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return quizzes;
}