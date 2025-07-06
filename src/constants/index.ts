import { UserLevel } from '@/types';

export const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://khmercoder.com';

export const USER_UPLOAD_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/dev_only/r2'
    : 'https://cdn.khmercoder.com';

export const KV_TELERAM_MEMBER_COUNT = 'telegram_member_count';

export const USER_LEVEL_DESCRIPTION: Record<
  UserLevel,
  {
    description: string;
    name: string;
  }
> = {
  [UserLevel.Basic]: {
    description: 'Basic user with limited access',
    name: 'Basic',
  },
  [UserLevel.Regular]: {
    description: 'Regular user with standard access',
    name: 'Regular',
  },
  [UserLevel.Premium]: {
    description: 'Premium user with enhanced features',
    name: 'Premium',
  },
  [UserLevel.Volunteer]: {
    description: 'Volunteer with special permissions',
    name: 'Volunteer',
  },
  [UserLevel.Contributor]: {
    description: 'Contributor with additional privileges',
    name: 'Contributor',
  },
  [UserLevel.Moderator]: {
    description: 'Moderator with management capabilities',
    name: 'Moderator',
  },
  [UserLevel.Director]: {
    description: 'Director with high-level access and control',
    name: 'Director',
  },
  [UserLevel.SuperAdmin]: {
    description: 'Founding member with full administrative rights',
    name: 'Founder',
  },
};

export const MODERATOR_ACCESS = [
  UserLevel.SuperAdmin,
  UserLevel.Director,
  UserLevel.Moderator,
  UserLevel.Contributor,
];
