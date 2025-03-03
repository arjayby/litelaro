import { redirect } from "next/navigation";

import { Database } from "@/lib/utils/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

import { createClientServer } from "../utils/supabase/server";

export async function withAuth<T>(
  action: (client: {
    supabase: SupabaseClient<Database>;
    user: NonNullable<
      Awaited<ReturnType<SupabaseClient["auth"]["getUser"]>>["data"]["user"]
    >;
  }) => Promise<T>
): Promise<T> {
  const supabase = await createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return action({ supabase, user });
}
