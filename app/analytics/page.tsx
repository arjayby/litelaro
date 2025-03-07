import { notFound } from "next/navigation";

import { EngagementTrends } from "@/components/analytics/engagement-trends";
import { PerformanceMetrics } from "@/components/analytics/performance-metrics";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getProfileById } from "@/lib/queries/profile";

import { privatePageMetadata } from "../private-metadata";

export const metadata = privatePageMetadata;

export default async function AnalyticsPage() {
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
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">
                  Track student performance and engagement metrics
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <PerformanceMetrics />
                <EngagementTrends />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
