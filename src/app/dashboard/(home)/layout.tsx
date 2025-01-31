import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { pages } from "@/lib/pages";
import { type IconName } from "@/lib/icons";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = {
    title: "Home",
    items: [
      {
        title: pages.dashboard.apps.title,
        url: pages.dashboard.apps.href,
        iconName: "LayoutGrid" as IconName,
      },
    ],
  };

  return (
    <SidebarProvider>
      <AppSidebar navItems={navItems} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
