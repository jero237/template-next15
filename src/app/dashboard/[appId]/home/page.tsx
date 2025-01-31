import SidebarNav from "@/components/sidebar-nav";
import { pages } from "@/lib/pages";
import React from "react";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const { appId } = await params;
  return (
    <>
      <SidebarNav currentPage={pages.dashboard.appId(appId).root.title} />
    </>
  );
}
