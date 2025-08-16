import '@/app/globals.css';
import { KhmerCoderDevtool } from '@/components/devtool';
import { ReactQueryProvider } from '@/components/react-query-prodiver';
import { UserUploadProvider } from '@/components/user-upload/context';
import { NavigationGuardProvider } from 'next-navigation-guard';
import type React from 'react';
import { SessionProvider } from './session';
import { ThemeProvider } from 'next-themes';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { ServerStatsProvider } from '@/components/contexts/ServerStatsContext';
import { Toaster } from '@/components/generated/toaster';
import { TooltipProvider } from '@/components/generated/tooltip';
import { getDB } from '@/libs/db';

export const metadata = {
  title: "Khmer Coders - Cambodia's Largest Coding Community",
  description: "Join Cambodia's largest community of developers, designers, and tech enthusiasts.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { env } = getCloudflareContext();

  const db = await getDB();
  const stats = await db.query.cacheTable.findMany({
    where: (cacheTable, { inArray }) =>
      inArray(cacheTable.key, [
        'telegram_member_count',
        'discord_member_count',
        'facebook_member_count',
      ]),
  });

  const telegramMemberCount = Number(
    stats.find(stat => stat.key === 'telegram_member_count')?.value || 0
  );

  const discordMemberCount = Number(
    stats.find(stat => stat.key === 'discord_member_count')?.value || 0
  );

  const facebookMemberCount = Number(
    stats.find(stat => stat.key === 'facebook_member_count')?.value || 0
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Kantumruy+Pro:ital,wght@0,100..700;1,100..700&family=VT323&display=swap"
          rel="stylesheet"
        />
        <title>{metadata.title}</title>
      </head>
      <body className="overflow-hidden-x md:overflow-x-auto">
        <TooltipProvider>
          <NavigationGuardProvider>
            <ServerStatsProvider
              telegramMembers={telegramMemberCount}
              discordMembers={discordMemberCount}
              facebookMembers={facebookMemberCount}
            >
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <ReactQueryProvider>
                  <SessionProvider>
                    <UserUploadProvider>
                      <div className="min-h-screen relative">
                        {/* Content container */}
                        <div className="relative">{children}</div>
                      </div>
                      <Toaster />
                      {process.env.NODE_ENV === 'development' && <KhmerCoderDevtool />}
                    </UserUploadProvider>
                  </SessionProvider>
                </ReactQueryProvider>
              </ThemeProvider>
            </ServerStatsProvider>
          </NavigationGuardProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
