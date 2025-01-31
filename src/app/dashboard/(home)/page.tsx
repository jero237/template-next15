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
import Link from "next/link";

export default async function AppsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const apps = await prisma.app.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return (
    <>
      <SidebarNav
        currentPage="Apps"
        actions={[
          {
            title: pages.dashboard.createApp.title,
            href: pages.dashboard.createApp.href,
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
              <TableHead>Slug</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apps.map((app) => (
              <TableRow key={app.id}>
                <TableCell>
                  <Link
                    href={pages.dashboard.appId(app.id).root.href}
                    className="font-medium underline hover:cursor-pointer"
                  >
                    {app.name}
                  </Link>
                </TableCell>
                <TableCell>{app.slug}</TableCell>
                <TableCell>{app.createdAt.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
