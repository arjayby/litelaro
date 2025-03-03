import { AppSidebar } from "@/components/app-sidebar";
import { ClassOverview } from "@/components/dashboard/class-overview";
import { PendingTasks } from "@/components/dashboard/pending-tasks";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { DashboardStats } from "@/components/dashboard/stats";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { privatePageMetadata } from "../private-metadata";

export const metadata = privatePageMetadata;

export default function DashboardPage() {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
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
