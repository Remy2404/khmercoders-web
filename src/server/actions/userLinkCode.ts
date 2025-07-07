'use server';
import { generateId } from 'better-auth';
import { withAuthAction } from './middleware';
import * as schema from '@/libs/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export interface UserLinkCode {
  id: string;
  userId: string;
  code: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const getUserLinkCode = withAuthAction(async ({ db, user }) => {
  try {
    const userLinkCode = await db.query.userLinkCode.findFirst({
      where: (each, { eq }) => eq(each.userId, user.id),
    });

    if (!userLinkCode) {
      return await generateUserLinkCode();
    }
    return userLinkCode;
  } catch (error) {
    console.error('Error fetching user link code:', error);
    throw new Error('Failed to fetch user link code');
  }
});

export const generateUserLinkCode = withAuthAction(async ({ db, user }) => {
  const newCode = generateId(9).toUpperCase();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  const existingUserLinkCode = await db.query.userLinkCode.findFirst({
    where: (each, { eq }) => eq(each.userId, user.id),
  });

  const now = new Date();
  if (existingUserLinkCode) {
    await db
      .update(schema.userLinkCode)
      .set({
        code: newCode,
        expiresAt,
        updatedAt: now,
      })
      .where(eq(schema.userLinkCode.id, existingUserLinkCode.id));
  } else {
    const id = uuidv4();
    await db.insert(schema.userLinkCode).values({
      id,
      userId: user.id,
      code: newCode,
      expiresAt,
      createdAt: now,
      updatedAt: now,
    });
  }

  return {
    id: existingUserLinkCode?.id || uuidv4(),
    userId: user.id,
    code: newCode,
    expiresAt,
    createdAt: now,
    updatedAt: now,
  } satisfies UserLinkCode;
});
