"use client";

import { AppWindowIcon, ChevronsUpDown, Plus, PlusIcon } from "lucide-react";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { pages } from "@/lib/pages";
import { App } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export function AppSwitcher({ apps }: { apps: App[] }) {
  const { isMobile } = useSidebar();
  const [activeApp, setActiveApp] = React.useState<App | null>(null);
  const params = useParams<{ appId: string }>();

  useEffect(() => {
    if (apps.length > 0) {
      setActiveApp(apps.find((app) => app.id === params.appId) || null);
    }
  }, [apps, params.appId]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {activeApp ? (
                  <AppWindowIcon className="size-4" />
                ) : (
                  <PlusIcon className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeApp?.name || "Create App"}
                </span>
                {!activeApp && (
                  <span className="truncate text-xs">
                    Create your first app
                  </span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {apps.length > 0 &&
              apps.map((app, index) => (
                <DropdownMenuItem
                  key={app.name}
                  onClick={() => setActiveApp(app)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <AppWindowIcon className="size-4 shrink-0" />
                  </div>
                  {app.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                className="gap-2 p-2 hover:cursor-pointer"
                href={pages.dashboard.createApp.href}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  {pages.dashboard.createApp.title}
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
