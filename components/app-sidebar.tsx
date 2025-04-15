"use client";

import { Gamepad2, LucideIcon, Presentation, ScrollText } from "lucide-react";
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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    givenName: string;
    familyName: string;
    email: string;
    avatar: string;
  };
  menuItems: {
    name: string;
    url: string;
    icon: string;
  }[];
}

const iconMap: Record<string, LucideIcon> = {
  Presentation,
  ScrollText,
  Gamepad2,
};

export function AppSidebar({ user, menuItems, ...props }: AppSidebarProps) {
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
        <NavPrimary
          items={menuItems.map((item) => {
            const Icon = iconMap[item.icon];
            return {
              name: item.name,
              url: item.url,
              icon: Icon,
            };
          })}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
