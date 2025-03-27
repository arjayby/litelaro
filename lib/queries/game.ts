import { Database } from "@/lib/utils/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

type QueryConfig = {
  supabase: SupabaseClient<Database>;
};

export async function getGameById({ supabase }: QueryConfig, id: string) {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching game:", error);
    return null;
  }

  return data;
}

export async function getGameByIdWithGameItems(
  { supabase }: QueryConfig,
  id: string
) {
  const { data, error } = await supabase
    .from("games")
    .select("*, game_items(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching game:", error);
    return null;
  }

  return data;
}

export async function getAllGames({ supabase }: QueryConfig) {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching games:", error);
    return [];
  }

  return data;
}
