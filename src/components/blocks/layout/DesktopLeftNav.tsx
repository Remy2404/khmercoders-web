'use client';
import { UserProfileMenu } from '@/components/blocks/layout/UserProfileMenu';
import { buttonVariants } from '@/components/generated/button';
import { cn } from '@/utils';
import { useNavigationRoutes } from './NavigationRoute';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DesktopLeftNavigation() {
  const path = usePathname();
  const routes = useNavigationRoutes();

  return (
    <div className="hidden lg:block lg:w-[280px] shrink-0">
      <div className="sticky top-0 z-10 flex flex-col gap-4 p-4 h-screen">
        <input
          type="text"
          placeholder="Search articles..."
          className="text-sm w-full bg-secondary p-2 border rounded"
        />

        <div className="flex lg:flex-col flex-row flex-wrap grow">
          {routes.map((item, index) => {
            if (item === '---') {
              return <hr key={index} className="my-2" />;
            }

            const isMatched = path === item.path;
            const IconComponent = item.icon;

            return (
              <Link
                key={index}
                href={item.path}
                target={item.target}
                className={cn(
                  buttonVariants({ variant: isMatched ? 'default' : 'ghost' }),
                  'text-left justify-start flex gap-2 px-2'
                )}
              >
                <IconComponent className="w-4 h-4" />
                {item.title}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          <ModeToggle variant="ghost" />
          <UserProfileMenu />
        </div>
      </div>
    </div>
  );
}
