import { UserLevel } from '@/types';

export const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://khmercoder.com';

export const USER_UPLOAD_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/dev_only/r2'
    : 'https://cdn.khmercoder.com';

export const KV_TELERAM_MEMBER_COUNT = 'telegram_member_count';
export const KV_TOTAL_MEMBER_COUNT = 'member_count';

export const USER_LEVEL_DESCRIPTION: Record<
  UserLevel,
  {
    description: string;
    name: string;
  }
> = {
  [UserLevel.Basic]: {
    description: 'Community member who is starting their journey with us',
    name: 'Basic',
  },
  [UserLevel.Regular]: {
    description: 'Active participant in our community discussions and events',
    name: 'Regular',
  },
  [UserLevel.Premium]: {
    description: 'Financial supporter whose contributions help sustain our community growth',
    name: 'Premium',
  },
  [UserLevel.Volunteer]: {
    description: 'Dedicated member who assists with community initiatives and events',
    name: 'Volunteer',
  },
  [UserLevel.Contributor]: {
    description:
      'Content creator who shares knowledge through articles, code examples, or educational resources',
    name: 'Contributor',
  },
  [UserLevel.Moderator]: {
    description: 'Community guardian who ensures discussions remain constructive and supportive',
    name: 'Moderator',
  },
  [UserLevel.Director]: {
    description: 'Strategic leader who guides community direction and major initiatives',
    name: 'Director',
  },
  [UserLevel.SuperAdmin]: {
    description: 'Founding member who established the community and oversees its long-term vision',
    name: 'Founder',
  },
};

export const MODERATOR_ACCESS = [
  UserLevel.SuperAdmin,
  UserLevel.Director,
  UserLevel.Moderator,
  UserLevel.Contributor,
];
