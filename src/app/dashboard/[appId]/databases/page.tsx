import SidebarNav from "@/components/sidebar-nav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { pages } from "@/lib/pages";
import { PlusIcon } from "lucide-react";
import { headers } from "next/headers";

export default async function DatabasesPage({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const { appId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const databases = await prisma.database.findMany({
    where: {
      app: {
        id: appId,
        userId: session?.user.id,
      },
    },
  });

  return (
    <div className="flex h-full flex-col space-y-8">
      <SidebarNav
        currentPage="Databases"
        actions={[
          {
            title: pages.dashboard.appId(appId).createDatabase.title,
            href: pages.dashboard.appId(appId).createDatabase.href,
            icon: PlusIcon,
            variant: "default",
          },
        ]}
      />

      <div className="rounded-lg bg-secondary p-4 text-secondary-foreground">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Connection String</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {databases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No databases found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              databases.map((database) => (
                <TableRow key={database.id}>
                  <TableCell>{database.name}</TableCell>
                  <TableCell>{database.connectionString}</TableCell>
                  <TableCell>
                    {new Date(database.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(database.updatedAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
