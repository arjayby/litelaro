import { notFound } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { ClassOverview } from "@/components/dashboard/class-overview";
import { PendingTasks } from "@/components/dashboard/pending-tasks";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { DashboardStats } from "@/components/dashboard/stats";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getProfileById } from "@/lib/queries/profile";
import { createClientServer } from "@/lib/utils/supabase/server";

import { privatePageMetadata } from "../private-metadata";

export const metadata = privatePageMetadata;

export default async function DashboardPage() {
  const supabase = await createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = await getProfileById({ supabase }, user!.id);

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
              email: user?.email ?? "",
            }}
          />
          <SidebarInset>
            <div className="container space-y-8 p-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <DashboardStats />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <PendingTasks />
                <RecentActivities />
              </div>

              <ClassOverview />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
