"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { slugify } from "@/utils/slug";
import { pages } from "@/lib/pages";
import { createApp } from "@/app/actions/apps";
import SidebarNav from "@/components/sidebar-nav";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "App name must be at least 3 characters")
    .max(50, "App name must be less than 50 characters"),
});

export default function CreateApp() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await createApp({
        name: values.name,
        slug: slugify(values.name),
      });

      if (!result?.data || !result.success) {
        toast.error(result?.error || "Something went wrong");
        return;
      }

      toast.success("App created successfully");
      router.push(pages.dashboard.appId(result.data.id).root.href);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  }

  return (
    <>
      <SidebarNav
        currentPage={pages.dashboard.createApp.title}
        parentSection={{
          title: pages.dashboard.apps.title,
          href: pages.dashboard.apps.href,
        }}
      />
      <div className="flex flex-1 items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create App</CardTitle>
            <CardDescription>
              Give your app a name to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>App Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Awesome App" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be used to identify your app
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create App"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
