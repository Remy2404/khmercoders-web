import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';
import { getDB } from '@/libs/db';
import * as schema from '@/libs/db/schema';

export const auth = betterAuth({
  database: drizzleAdapter(await getDB(), {
    provider: 'sqlite',
    schema: schema,
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 60, // 60 days (Facebook-like)
    updateAge: 60 * 60 * 24 * 7, // Refresh every 7 days if user is active
  },
  emailAndPassword: {
    // Enable email/password authentication only in development mode
    // This allows for easier testing and debugging without requiring GitHub OAuth
    // In production, users will need to authenticate through GitHub
    enabled: process.env.NODE_ENV === 'development',
  },
  user: {
    additionalFields: {
      reputation: {
        type: 'number',
      },
      level: {
        type: 'number',
      },
      storageUsed: {
        type: 'number',
      },
      followersCount: {
        type: 'number',
      },
      followingCount: {
        type: 'number',
      },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  databaseHooks: {
    user: {
      create: {
        // Automatically create a member profile when a new user is created
        after: async user => {
          console.log('Creating member profile for new user:', user.id);

          const db = await getDB();

          // Generate random alias for new user "user{randomNumber}" where random number is 7 digits
          const alias = `user${1000000 + Math.floor(Math.random() * 9000000)}`;

          // Create member profile for new user
          await db.insert(schema.memberProfile).values({
            userId: user.id,
            alias,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        },
      },
    },
  },
});
