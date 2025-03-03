import { notFound } from "next/navigation";

import { ProfileForm } from "@/components/profile-form";
import { getProfileById } from "@/lib/queries/profile";
import { createClientServer } from "@/lib/utils/supabase/server";

import { privatePageMetadata } from "../private-metadata";

export const metadata = privatePageMetadata;

export default async function ProfilePage() {
  const supabase = await createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = await getProfileById({ supabase }, user!.id);

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
