"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { GalleryVerticalEnd } from "lucide-react";

export default function LoginModal() {
  const router = useRouter();
  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent className="bg-muted p-10 sm:max-w-fit">
        <DialogHeader>
          <DialogTitle className="hidden">Login</DialogTitle>
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
