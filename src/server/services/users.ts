"use server"

import { getDB } from "@/libs/db"
import * as schema from "@/libs/db/schema"
import { desc, eq } from "drizzle-orm";

export async function getUserList(page: number, size: number) {
  const db = await getDB();

  return await db.select().from(schema.user)
    .innerJoin(schema.memberProfile, eq(schema.user.id, schema.memberProfile.userId))
    .limit(size)
    .offset((page - 1) * size)
    .orderBy(desc(schema.user.followersCount), desc(schema.user.followingCount), schema.user.name);
}

export async function getUserCount() {
  const db = await getDB();

  const count = await db.$count(schema.user);
  return count;
}