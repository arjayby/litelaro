import { notFound } from "next/navigation";

import { ProfileForm } from "@/components/profile-form";
import { createServerClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createServerClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .single();

  if (!profile) {
    return notFound();
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <ProfileForm defaultValues={profile} />
      </div>
    </div>
  );
}
