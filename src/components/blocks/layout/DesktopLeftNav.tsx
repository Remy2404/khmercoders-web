'use client';
import UserProfilePage from '@/app/[username]/page';
import { UserAvatar } from '@/components/atoms/user-avatar';
import { buttonVariants } from '@/components/generated/button';
import { KCLinks } from '@/data/link';
import { cn } from '@/utils';
import { NavigationRoutes } from './NavigationRoute';
import Link from 'next/link';

export function DesktopLeftNavigation() {
  return (
    <div className="hidden lg:block lg:w-[280px] shrink-0">
      <div className="sticky top-0 z-10 flex flex-col gap-4 p-4 h-screen">
        <input
          type="text"
          placeholder="Search articles..."
          className="text-sm w-full bg-secondary p-2 border rounded"
        />

        <div className="flex lg:flex-col flex-row flex-wrap grow">
          {NavigationRoutes.map((item, index) => {
            if (item === '---') {
              return <hr key={index} className="my-2" />;
            }

            const IconComponent = item.icon;

            return (
              <Link
                key={index}
                href={item.path}
                target={item.target}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'text-left justify-start flex gap-2 px-2'
                )}
              >
                <IconComponent className="w-4 h-4" />
                {item.title}
              </Link>
            );
          })}
        </div>

        <div>
          <UserAvatar />
        </div>

        {/* <Link
          href={KCLinks.telegramLink}
          target="_blank"
          className={cn(buttonVariants({ variant: 'ghost' }), 'text-left justify-start flex gap-2')}
        >
          <SendIcon className="w-4 h-4" />
          Join Telegram
        </Link>
        <Link
          href={KCLinks.discordLink}
          className={cn(buttonVariants({ variant: 'ghost' }), 'text-left justify-start flex gap-2')}
        >
          <DiscordIcon className="w-4 h-4" />
          Join Discord
        </Link>
        <Link
          href={KCLinks.facebookGroupLink}
          className={cn(buttonVariants({ variant: 'ghost' }), 'text-left justify-start flex gap-2')}
        >
          <FacebookIcon className="w-4 h-4" />
          Join Facebook
        </Link> */}
      </div>
    </div>
  );
}
