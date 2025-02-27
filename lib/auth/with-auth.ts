import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Database } from "@/lib/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient } from "@supabase/supabase-js";

export async function withAuth<T>(
  action: (client: {
    supabase: SupabaseClient<Database>;
    session: NonNullable<
      Awaited<
        ReturnType<SupabaseClient["auth"]["getSession"]>
      >["data"]["session"]
    >;
  }) => Promise<T>
): Promise<T> {
  const cookieStore = await cookies();
  const supabase = createServerActionClient<Database>({
    // @ts-expect-error: cookiestore is not a function
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // @ts-expect-error: supabase is not a function
  return action({ supabase, session });
}
