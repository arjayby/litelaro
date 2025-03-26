import { redirect } from "next/navigation";

import { createClientServer } from "../utils/supabase/server";

export async function getAuthSession() {
  const supabase = await createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { user, supabase };
}
