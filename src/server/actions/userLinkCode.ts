'use server';
import { generateId } from 'better-auth';
import { withAuthAction } from './middleware';
import * as schema from '@/libs/db/schema';

export interface UserLinkCode {
  userId: string;
  code: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const getUserLinkCode = withAuthAction(async ({ db, user }) => {
  const userLinkCode = await db.query.userLinkCode.findFirst({
    where: (each, { eq }) => eq(each.userId, user.id),
  });

  if (!userLinkCode) {
    return await generateUserLinkCode();
  }
  return userLinkCode;
});

export const generateUserLinkCode = withAuthAction(async ({ db, user }) => {
  const newCode = generateId(9).toUpperCase();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  const now = new Date();

  const [result] = await db
    .insert(schema.userLinkCode)
    .values({
      userId: user.id,
      code: newCode,
      expiresAt,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: schema.userLinkCode.userId,
      set: {
        code: newCode,
        expiresAt,
        updatedAt: now,
      },
    })
    .returning();

  return {
    userId: result.userId,
    code: result.code,
    expiresAt: result.expiresAt,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  } satisfies UserLinkCode;
});
