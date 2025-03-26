import { redirect } from "next/navigation";

import { createClientServer } from "../utils/supabase/server";

export async function getAuthSession(redirectPath?: string) {
  const supabase = await createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (redirectPath && redirectPath !== "/login") {
      redirect(`/login?next=${encodeURIComponent(redirectPath)}`);
    } else {
      redirect("/login");
    }
  }

  return { user, supabase };
}
