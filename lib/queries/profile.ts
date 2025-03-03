import { Database } from "@/lib/utils/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

type QueryConfig = {
  supabase: SupabaseClient<Database>;
};

export async function getProfileById({ supabase }: QueryConfig, id: string) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  return profile;
}
