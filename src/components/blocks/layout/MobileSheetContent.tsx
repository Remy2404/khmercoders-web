'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/generated/avatar';
import SignInButton from '@/components/atoms/github-login-button';
import { useSession } from '@/components/auth-provider';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { useNavigationRoutes } from './NavigationRoute';

export function MobileSheetContent() {
  const { profile, session } = useSession();
  const routes = useNavigationRoutes();
  const user = session?.user;

  return (
    <div className="flex flex-col h-full">
      {/* Header with user info or sign in */}
      <div className="mb-6">
        {user ? (
          <Link href={profile ? `/@${profile.alias}` : '/profile/setup'}>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.image || undefined} alt={user.name || 'User avatar'} />
                <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {profile ? `@${profile.alias}` : 'Setup profile'}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="p-3">
            <SignInButton />
          </div>
        )}
      </div>

      {/* Navigation Routes */}
      <div className="flex flex-col flex-1 -mx-2">
        {routes.map((route, routeIdx) => {
          if (route === '---') {
            return <hr key={routeIdx} className="my-2 mx-2" />;
          }

          const IconComponent = route.icon;

          return (
            <Link
              key={routeIdx}
              className="flex items-center gap-3 p-3 mx-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              href={route.path}
              target={route.target}
            >
              <IconComponent className="w-4 h-4" />
              <span className="text-sm">{route.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Theme Toggle at the bottom */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
        <ModeToggle variant="ghost" />
      </div>
    </div>
  );
}
