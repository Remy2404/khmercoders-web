import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/generated/sheet';
import { AlignJustify, HomeIcon, PlusIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useNavigationRoutes } from './NavigationRoute';

export function MobileTabNavigation() {
  const tabButtonClass = 'flex text-center p-3 items-center justify-center focus:outline-none';
  const routes = useNavigationRoutes();

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-screen bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
      <nav className="grid grid-cols-4">
        <Link className={tabButtonClass} href="/">
          <HomeIcon />
        </Link>
        <Link className={tabButtonClass} href="/mobile-search">
          <SearchIcon />
        </Link>
        <Link className={tabButtonClass} href="/mobile-post">
          <PlusIcon />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <button className={tabButtonClass}>
              <AlignJustify />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Khmer Coders</SheetTitle>
            <SheetDescription></SheetDescription>
            <div className="flex flex-col -m-2 my-4">
              {routes.map((route, routeIdx) => {
                if (route === '---') {
                  return <hr key={routeIdx} className="my-2" />;
                }

                return (
                  <Link key={routeIdx} className="justify-start p-2" href={route.path}>
                    {route.title}
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
