import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getProfileById } from "@/lib/queries/profile";

const menuItems = [
  {
    name: "Classrooms",
    url: "/classrooms",
    icon: "Presentation",
  },
  {
    name: "Quizzes",
    url: "/quizzes",
    icon: "ScrollText",
  },
  {
    name: "Motivational Games",
    url: "/motivational-games",
    icon: "Gamepad2",
  },
];

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, supabase } = await getAuthSession();

  const profile = await getProfileById({ supabase }, user.id);

  if (profile?.role !== "teacher") {
    redirect("/dashboard/classrooms");
  }

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader givenName={profile.given_name} />
        <div className="flex flex-1">
          <AppSidebar
            user={{
              avatar: profile.avatar_url ?? "",
              givenName: profile.given_name,
              familyName: profile.family_name,
              email: user.email ?? "",
            }}
            menuItems={menuItems}
          />
          <SidebarInset className="w-full flex-1">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
