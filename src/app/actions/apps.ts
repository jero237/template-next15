"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { headers } from "next/headers";
import { z } from "zod";

const createAppSchema = z.object({
  name: z.string().min(3).max(50),
  slug: z.string().min(3).max(50),
});

export async function createApp(data: z.infer<typeof createAppSchema>) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const validatedData = createAppSchema.parse(data);

    const existingApp = await db.app.findUnique({
      where: {
        slug: validatedData.slug,
      },
    });

    if (existingApp) {
      throw new Error("App with this name already exists");
    }

    const app = await db.app.create({
      data: {
        name: validatedData.name,
        slug: validatedData.slug,
        userId: session.user.id,
      },
    });

    return { success: true, data: app };
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.message };
    }

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Something went wrong" };
  }
}
