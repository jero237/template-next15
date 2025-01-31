import { AppSidebar } from "@/components/app-sidebar";
import { NavItems } from "@/components/nav-main";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { pages } from "@/lib/pages";
import { headers } from "next/headers";

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ appId: string }>;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const apps = await db.app.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  const { appId } = await params;

  const navMain: NavItems = {
    title: "Home",
    items: [
      {
        title: pages.dashboard.appId(appId).root.title,
        url: pages.dashboard.appId(appId).root.href,
        iconName: "HomeIcon",
      },
      {
        title: pages.dashboard.appId(appId).databases.title,
        url: pages.dashboard.appId(appId).databases.href,
        iconName: "DatabaseIcon",
      },
      {
        title: "Contacts",
        url: "#",
        iconName: "UsersIcon",
      },
      {
        title: "Settings",
        url: "#",
        iconName: "Settings2Icon",
      },
    ],
  };

  return (
    <SidebarProvider>
      <AppSidebar navItems={navMain} apps={apps} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
