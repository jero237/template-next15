"use client";

import * as React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getIcon, type IconName } from "@/lib/icons";

export type NavItems = {
  title: string;
  items: {
    title: string;
    url: string;
    iconName: IconName;
  }[];
};

export function NavMain({ navItems }: { navItems: NavItems }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{navItems.title}</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.items.map((item) => (
          <Link href={item.url} key={item.title}>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={item.title}
                className={cn(
                  pathname.startsWith(item.url) && "bg-muted font-medium",
                )}
              >
                {item.iconName &&
                  // @ts-expect-error Dynamic Icons
                  React.createElement(getIcon(item.iconName))}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
