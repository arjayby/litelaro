import { MoveRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getProfileById } from "@/lib/queries/profile";

export default async function ClassroomPage() {
  const { user, supabase } = await getAuthSession();

  const profile = await getProfileById({ supabase }, user.id);

  if (!profile) {
    return notFound();
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
          />
          <SidebarInset>
            <div className="container space-y-8 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    Classroom
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your virtual learning spaces
                  </p>
                </div>
                <Link href="/classrooms/create">
                  <Button variant="ghost" size="lg">
                    Create Classroom
                    <MoveRight />
                  </Button>
                </Link>
              </div>
              <div className="grid gap-4">
                {/* Classroom list will be added here */}
                <p className="py-8 text-center text-muted-foreground">
                  No classrooms created yet
                </p>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
