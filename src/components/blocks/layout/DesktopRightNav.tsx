import { GithubIcon } from '@/components/atoms/icons';
import { useServerStats } from '@/components/contexts/ServerStatsContext';
import { KCLinks } from '@/data/link';
import { ArrowUpRight, OutdentIcon } from 'lucide-react';
import Link from 'next/link';

export function DesktopRightNavigation() {
  const {
    telegramMembers: telegramMemberCount,
    discordMembers: discordMemberCount,
    facebookMembers: facebookMemberCount,
  } = useServerStats();

  return (
    <div className="hidden lg:block lg:w-[280px] shrink-0 p-4">
      <div className="sticky top-4 flex flex-col gap-4">
        <img src="/logo.svg" alt="Khmer Coders Logo" className="w-16 h-16 h-auto mb-4" />

        <p className="text-sm">
          <strong>Khmer Coders</strong>
          {` has grown to become Cambodia's largest coding community. We bring together
          developers, designers, and tech enthusiasts to learn, share, and grow together.`}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-sm flex flex-col">
            <h3 className="font-bold mb-1">Website</h3>
            <span className="text-lg font-bold">455</span>
            <span className="text-muted-foreground -mt-2">members</span>
          </div>

          <div className="text-sm flex flex-col">
            <Link
              href={KCLinks.telegramLink}
              target="_blank"
              className="flex items-center hover:underline"
            >
              <h3 className="font-bold mb-1">Telegram</h3>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <span className="text-lg font-bold">{telegramMemberCount.toLocaleString()}</span>
            <span className="text-muted-foreground -mt-2">members</span>
          </div>

          <div className="text-sm flex flex-col">
            <Link
              href={KCLinks.facebookGroupLink}
              target="_blank"
              className="flex items-center hover:underline"
            >
              <h3 className="font-bold mb-1">Facebook</h3>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <span className="text-lg font-bold">{facebookMemberCount.toLocaleString()}</span>
            <span className="text-muted-foreground -mt-2">members</span>
          </div>

          <div className="text-sm flex flex-col">
            <Link
              href={KCLinks.discordLink}
              target="_blank"
              className="flex items-center hover:underline"
            >
              <h3 className="font-bold mb-1">Discord</h3>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <span className="text-lg font-bold">{discordMemberCount.toLocaleString()}</span>
            <span className="text-muted-foreground -mt-2">members</span>
          </div>
        </div>

        <hr />

        <p className="text-sm">
          Our platform is open source. If you'd like to help us improve it, please submit a pull
          request or contribute directly to{' '}
          <a
            href="https://github.com/KhmerCoders/khmercoders-web"
            className="text-blue-600 hover:underline"
            target="_blank"
          >
            {' '}
            our repository on GitHub.
          </a>
        </p>

        <GithubIcon className="text-muted-foreground w-8 h-8" />
      </div>
    </div>
  );
}
