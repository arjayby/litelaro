import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-center font-instrument-serif text-[64px] font-normal italic leading-[83px]">
          <Link href="/">Litelaro</Link>
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
