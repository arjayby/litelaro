import { Search } from "lucide-react";
import { notFound } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getProfileById } from "@/lib/queries/profile";
import { createClientServer } from "@/lib/utils/supabase/server";

export default async function ExplorePage() {
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
              familyName: profile.family_name,
              email: user?.email ?? "",
            }}
          />
          <SidebarInset>
            <div className="container space-y-8 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Explore</h1>
                  <p className="text-muted-foreground">
                    Discover new quizzes and learning materials
                  </p>
                </div>
                <Button variant="ghost" size="lg">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Featured content will be added here */}
                <p className="py-8 text-center text-muted-foreground md:col-span-2 lg:col-span-3">
                  No featured content available yet
                </p>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
