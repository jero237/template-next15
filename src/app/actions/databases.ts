"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { headers } from "next/headers";
import { z } from "zod";

export const createDatabaseSchema = z.object({
  name: z.string().min(3).max(50),
  connectionString: z.string().min(3).max(50),
});

export async function createDatabase(
  data: z.infer<typeof createDatabaseSchema>,
  appId: string,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const validatedData = createDatabaseSchema.parse(data);

  const database = await db.database.create({
    data: {
      name: validatedData.name,
      connectionString: validatedData.connectionString,
      app: {
        connect: {
          id: appId,
          userId: session.user.id,
        },
      },
    },
  });

  return database;
}
