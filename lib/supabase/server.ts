import { cookies } from "next/headers";

import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient } from "@supabase/supabase-js";

export async function createServerClient(): Promise<SupabaseClient<Database>> {
  const cookieStore = await cookies();
  // @ts-expect-error: cookiestore is not a function
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
}
