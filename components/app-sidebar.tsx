"use client";

import {
  Gamepad2,
  LayoutDashboard,
  Presentation,
  ScrollText,
  Telescope,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { NavPrimary } from "@/components/nav-primary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  mainItems: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Classrooms",
      url: "/classrooms",
      icon: Presentation,
    },
    {
      name: "Quizzes",
      url: "/quizzes",
      icon: ScrollText,
    },
    {
      name: "Motivational Games",
      url: "/motivational-games",
      icon: Gamepad2,
    },
  ],
  otherItems: [
    {
      name: "Explore",
      url: "/explore",
      icon: Telescope,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    givenName: string;
    email: string;
    avatar: string;
  };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="flex justify-center"
            >
              <Link href="/">
                <span className="font-instrument-serif text-xl font-normal italic">
                  Litelaro
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavPrimary title="Main" items={data.mainItems} />
        <NavPrimary title="Others" items={data.otherItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
