import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getProfileById } from "@/lib/queries/profile";

export default async function Home() {
  const { user, supabase } = await getAuthSession();

  const profile = await getProfileById({ supabase }, user.id);

  if (profile?.role === "teacher") {
    redirect("/classrooms");
  } else {
    redirect("/dashboard/classrooms");
  }
}
