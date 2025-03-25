import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth/get-auth-session";

// import { StudentSidebar } from "@/components/student/sidebar";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, supabase } = await getAuthSession();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "student") {
    redirect("/classrooms");
  }

  return (
    <div className="flex flex-1">
      {/* <StudentSidebar /> */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
