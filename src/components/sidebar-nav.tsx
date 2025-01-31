import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

type Action = {
  title: string;
  href: string;
  icon: LucideIcon;
  variant: VariantProps<typeof buttonVariants>["variant"];
};

type SidebarNavProps = {
  parentSection?: {
    title: string;
    href: string;
  };
  currentPage: string;
  actions?: Action[];
};

export default function SidebarNav({
  parentSection,
  currentPage,
  actions,
}: SidebarNavProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {parentSection && (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href={parentSection.href}>{parentSection.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">
                {currentPage}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {actions && (
        <div className="flex items-center gap-1">
          {actions.map((a, i) => (
            <Link
              key={i}
              href={a.href}
              className={buttonVariants({
                variant: a.variant ?? "default",
                size: "sm",
              })}
            >
              <a.icon className="size-4" />
              {a.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
