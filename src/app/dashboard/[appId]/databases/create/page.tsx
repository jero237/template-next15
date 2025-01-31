import SidebarNav from "@/components/sidebar-nav";
import { pages } from "@/lib/pages";

export default async function CreateDatabasePage({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const { appId } = await params;
  return (
    <>
      <SidebarNav
        currentPage="Create Database"
        parentSection={pages.dashboard.appId(appId).databases}
      />
    </>
  );
}
