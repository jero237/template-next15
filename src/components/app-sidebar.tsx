"use client";

import { authClient } from "@/lib/auth-client";
import * as React from "react";

import { AppSwitcher } from "@/components/app-switcher";
import { NavItems, NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { App } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  apps?: App[];
  navItems: NavItems;
}

export function AppSidebar({ apps, navItems, ...props }: AppSidebarProps) {
  const { data: session, isPending } = authClient.useSession();
  const { state } = useSidebar();

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        {apps && <AppSwitcher apps={apps} />}
        <div className="relative">
          <Input placeholder={state === "expanded" ? "Search" : undefined} />
          <SearchIcon className="absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain navItems={navItems} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            avatar: session?.user?.image ?? "",
            name: session?.user?.name ?? "",
            email: session?.user?.email ?? "",
          }}
          isPending={isPending}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
