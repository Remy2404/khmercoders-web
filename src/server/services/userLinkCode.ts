import { MainDatabase } from '@/types';

export const getUserLinkCode = async (
  db: MainDatabase,
  code: string
): Promise<{
  userId: string;
  expiresAt: Date;
}> => {
  const linkCode = await db.query.userLinkCode.findFirst({
    where: (each_1, { eq }) => eq(each_1.code, code),
    columns: {
      userId: true,
      expiresAt: true,
    },
  });
  if (!linkCode) {
    throw new Error('Invalid link code');
  }
  return linkCode;
};
