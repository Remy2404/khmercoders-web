import { DiscordIcon } from '@/components/atoms/icons';
import { buttonVariants } from '@/components/generated/button';
import { KCLinks } from '@/data/link';
import { cn } from '@/utils';
import { SendIcon, FacebookIcon } from 'lucide-react';
import Link from 'next/link';

export async function HomeHeroBanner() {
  const bannerClassName = cn(
    'bg-card border-b p-4',
    'lg:border lg:rounded lg:sticky lg:top-4' // Desktop layout
  );

  return (
    <div className="-mt-8 lg:mt-0 lg:w-[350px] shrink-0">
      <div className={bannerClassName}>
        <h1 className="font-bold">Largest Cambodian Developer Community</h1>
        <p className="my-2">
          <span className="font-mono text-3xl font-bold">12,000+</span>
          <span className="font-regular text-muted-foreground text-base ml-2">members</span>
        </p>
        <p className="text-sm text-muted-foreground mb-4">{`Founded in 2018, Khmer Coders has grown to become Cambodia's largest coding community. We
        bring together developers, designers, and tech enthusiasts to learn, share, and grow
        together.`}</p>

        <div className="flex lg:flex-col flex-row flex-wrap">
          <Link
            href={KCLinks.telegramLink}
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'text-left justify-start flex gap-2'
            )}
          >
            <SendIcon className="w-4 h-4" />
            Join Telegram
          </Link>
          <Link
            href={KCLinks.discordLink}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'text-left justify-start flex gap-2'
            )}
          >
            <DiscordIcon className="w-4 h-4" />
            Join Discord
          </Link>
          <Link
            href={KCLinks.facebookGroupLink}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'text-left justify-start flex gap-2'
            )}
          >
            <FacebookIcon className="w-4 h-4" />
            Join Facebook
          </Link>
        </div>
      </div>
    </div>
  );
}
