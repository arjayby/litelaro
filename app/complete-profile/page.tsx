import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { CompleteProfileForm } from "@/components/complete-profile-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function CompleteProfilePage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <CompleteProfileForm  />
      </div>
    </div>
  );
}