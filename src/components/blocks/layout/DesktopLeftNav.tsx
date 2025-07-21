'use client';
import UserProfilePage from '@/app/[username]/page';
import { UserAvatar } from '@/components/atoms/user-avatar';
import { buttonVariants } from '@/components/generated/button';
import { KCLinks } from '@/data/link';
import { cn } from '@/utils';
import {
  Home,
  Star,
  Package,
  MessageSquareShare,
  BookAIcon,
  ProjectorIcon,
  Settings,
} from 'lucide-react';
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
          <Link
            href={KCLinks.telegramLink}
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'text-left justify-start flex gap-2 px-2'
            )}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>

          <Link
            href={'#'}
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'text-left justify-start flex gap-2 px-2'
            )}
          >
            <ProjectorIcon className="w-4 h-4" />
            Showcase
          </Link>

          <Link
            href={'#'}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'text-left justify-start flex gap-2 px-2'
            )}
          >
            <Home className="w-4 h-4" />
            Events
          </Link>

          <Link
            href={'#'}
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'text-left justify-start flex gap-2 px-2'
            )}
          >
            <Package className="w-4 h-4" />
            Sponsors
          </Link>

          <Link
            href={'#'}
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'text-left justify-start flex gap-2 px-2'
            )}
          >
            <MessageSquareShare className="w-4 h-4" />
            Chatroom
          </Link>

          <Link
            href={'#'}
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'text-left justify-start flex gap-2 px-2'
            )}
          >
            <BookAIcon className="w-4 h-4" />
            About us
          </Link>

          <hr className="my-2" />

          <Link
            href={'#'}
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'text-left justify-start flex gap-2 px-2'
            )}
          >
            <BookAIcon className="w-4 h-4" />
            Profile
          </Link>

          <Link
            href={'/profile/setup'}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'text-left justify-start flex gap-2 px-2'
            )}
          >
            <Settings className="w-4 h-4" />
            Setting
          </Link>
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
